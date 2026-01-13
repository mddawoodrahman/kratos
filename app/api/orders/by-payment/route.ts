import { type NextRequest, NextResponse } from "next/server";
import { ORDER_BY_STRIPE_SESSION_QUERY } from "@/lib/sanity/queries/orders";
import { writeClient } from "@/sanity/lib/client";

/**
 * GET /api/orders/by-payment
 *
 * Fetches order information by Stripe payment intent ID.
 * Used by the success page to display the order number after checkout.
 *
 * This endpoint is necessary because the Stripe webhook creates the order
 * asynchronously, so the success page needs to poll for the order details.
 *
 * NOTE: Uses writeClient instead of read-only client to ensure fresh data
 * is fetched without any caching delays. This is important because the order
 * was just created by the webhook and needs to be immediately visible.
 *
 * IMPORTANT: If running locally, ensure you have `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
 * running to forward webhook events to your local server.
 *
 * Query Parameters:
 * - paymentIntentId: The Stripe payment intent ID from the checkout session
 *
 * Returns:
 * - 200: Order found with { order: { _id, orderNumber, total, status, createdAt } }
 * - 400: Missing paymentIntentId parameter
 * - 404: Order not yet created (webhook still processing)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const paymentIntentId = searchParams.get("paymentIntentId");

  console.log(
    `[Order Lookup] Searching for order with paymentIntentId: ${paymentIntentId}`,
  );

  if (!paymentIntentId) {
    console.log("[Order Lookup] Missing paymentIntentId parameter");
    return NextResponse.json(
      { error: "Missing paymentIntentId parameter" },
      { status: 400 },
    );
  }

  try {
    // Fetch order by Stripe payment intent ID
    // Using writeClient to bypass any caching and get fresh data
    const order = await writeClient.fetch(ORDER_BY_STRIPE_SESSION_QUERY, {
      stripePaymentId: paymentIntentId,
    });

    if (!order) {
      // Order not yet created - webhook may still be processing
      console.log(
        `[Order Lookup] Order not found for paymentIntentId: ${paymentIntentId}`,
      );
      console.log("[Order Lookup] This usually means:");
      console.log("  1. The Stripe webhook hasn't been received yet");
      console.log(
        "  2. If running locally, ensure 'stripe listen --forward-to localhost:3000/api/webhooks/stripe' is running",
      );
      return NextResponse.json(
        { error: "Order not found", order: null },
        { status: 404 },
      );
    }

    console.log(
      `[Order Lookup] Order found: ${order.orderNumber} (${order._id})`,
    );
    return NextResponse.json({ order });
  } catch (error) {
    console.error("[Order Lookup] Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}
