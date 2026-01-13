import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  ORDER_BY_ORDER_NUMBER_QUERY,
  ORDER_BY_STRIPE_PAYMENT_ID_QUERY,
} from "@/lib/sanity/queries/orders";
import { generateOrderId, generateOrderNumber } from "@/lib/utils/order-id";
import { client, writeClient } from "@/sanity/lib/client";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  console.log("[Stripe Webhook] Received webhook request");

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.log("[Stripe Webhook] Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`[Stripe Webhook] Event verified: ${event.type}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Stripe Webhook] Signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        `[Stripe Webhook] Processing checkout.session.completed for session: ${session.id}`,
      );
      await handleCheckoutCompleted(session);
      break;
    }
    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripePaymentId = session.payment_intent as string;
  console.log(
    `[Stripe Webhook] handleCheckoutCompleted - Payment Intent: ${stripePaymentId}`,
  );

  try {
    // Idempotency check: prevent duplicate processing on webhook retries
    // Using writeClient to ensure we see freshly created orders
    const existingOrder = await writeClient.fetch(
      ORDER_BY_STRIPE_PAYMENT_ID_QUERY,
      {
        stripePaymentId,
      },
    );

    if (existingOrder) {
      console.log(
        `[Stripe Webhook] Already processed for payment ${stripePaymentId}, skipping`,
      );
      return;
    }

    // Extract metadata
    const {
      clerkUserId,
      userEmail,
      sanityCustomerId,
      productIds: productIdsString,
      quantities: quantitiesString,
    } = session.metadata ?? {};

    console.log(
      `[Stripe Webhook] Metadata: clerkUserId=${clerkUserId}, products=${productIdsString}`,
    );

    if (!clerkUserId || !productIdsString || !quantitiesString) {
      console.error("[Stripe Webhook] Missing metadata in checkout session");
      return;
    }

    const productIds = productIdsString.split(",");
    const quantities = quantitiesString.split(",").map(Number);

    // Get line items from Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Build order items array with unique keys for Sanity
    const orderItems = productIds.map((productId, index) => ({
      _key: `item-${index}`,
      product: {
        _type: "reference" as const,
        _ref: productId,
      },
      quantity: quantities[index],
      priceAtPurchase: lineItems.data[index]?.amount_total
        ? lineItems.data[index].amount_total / 100
        : 0,
    }));

    // ============================================================
    // ORDER ID GENERATION
    // ============================================================
    // Generate cryptographically secure unique identifiers:
    // - orderId: UUID-based internal document ID (collision-proof)
    // - orderNumber: Human-readable reference for customer display
    // ============================================================

    // Generate unique order document ID using UUID v4
    // This is cryptographically secure and safe for concurrent orders
    const orderId = generateOrderId();

    // Generate human-readable order number with collision check
    // Retry up to 3 times if collision is detected (extremely rare)
    let orderNumber: string;
    let attempts = 0;
    const maxAttempts = 3;

    do {
      orderNumber = generateOrderNumber();
      // Check if this order number already exists in the database
      const existingOrder = await client.fetch(ORDER_BY_ORDER_NUMBER_QUERY, {
        orderNumber,
      });

      if (!existingOrder) {
        break; // Unique order number found
      }

      attempts++;
      console.warn(
        `Order number collision detected: ${orderNumber}, attempt ${attempts}/${maxAttempts}`,
      );
    } while (attempts < maxAttempts);

    // If we exhausted all attempts (extremely unlikely), add timestamp suffix
    if (attempts >= maxAttempts) {
      orderNumber = `${orderNumber}-${Date.now().toString(36).toUpperCase()}`;
      console.warn(`Fallback order number generated: ${orderNumber}`);
    }

    // Extract shipping address
    const shippingAddress = session.customer_details?.address;
    const address = shippingAddress
      ? {
          name: session.customer_details?.name ?? "",
          line1: shippingAddress.line1 ?? "",
          line2: shippingAddress.line2 ?? "",
          city: shippingAddress.city ?? "",
          postcode: shippingAddress.postal_code ?? "",
          country: shippingAddress.country ?? "",
        }
      : undefined;

    // Create order in Sanity with customer reference
    // Using createOrReplace with explicit _id to create a PUBLISHED document
    // (without _id, create() generates a draft document with "drafts." prefix
    // which is invisible to clients using perspective: "published")
    const order = await writeClient.createOrReplace({
      _id: orderId,
      _type: "order",
      orderNumber,
      ...(sanityCustomerId && {
        customer: {
          _type: "reference",
          _ref: sanityCustomerId,
        },
      }),
      clerkUserId,
      email: userEmail ?? session.customer_details?.email ?? "",
      items: orderItems,
      total: (session.amount_total ?? 0) / 100,
      status: "paid",
      stripePaymentId,
      address,
      createdAt: new Date().toISOString(),
    });

    console.log(`Order created: ${order._id} (${orderNumber})`);

    // Decrease stock for all products in a single transaction
    await productIds
      .reduce(
        (tx, productId, i) =>
          tx.patch(productId, (p) => p.dec({ stock: quantities[i] })),
        writeClient.transaction(),
      )
      .commit();

    console.log(`Stock updated for ${productIds.length} products`);
  } catch (error) {
    console.error("Error handling checkout.session.completed:", error);
    throw error; // Re-throw to return 500 and trigger Stripe retry
  }
}
