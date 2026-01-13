"use client";

import {
  ArrowRight,
  Check,
  CheckCircle,
  Copy,
  Loader2,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { formatPrice } from "@/lib/utils";

interface SuccessClientProps {
  session: {
    id: string;
    customerEmail?: string | null;
    customerName?: string | null;
    amountTotal?: number | null;
    paymentStatus: string;
    paymentIntentId?: string | null;
    shippingAddress?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country?: string | null;
    } | null;
    lineItems?: {
      name?: string | null;
      quantity?: number | null;
      amount: number;
    }[];
  };
}

interface OrderInfo {
  orderNumber: string;
  orderId: string;
}

export function SuccessClient({ session }: SuccessClientProps) {
  const { clearCart } = useCartActions();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  /**
   * Poll for order information after checkout completion
   *
   * The Stripe webhook creates the order asynchronously, so we poll
   * the API to fetch the order details once they're available.
   * This ensures the order number is displayed on the success page.
   */
  const fetchOrderInfo = useCallback(async () => {
    if (!session.paymentIntentId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/orders/by-payment?paymentIntentId=${encodeURIComponent(session.paymentIntentId)}`,
      );

      if (response.ok) {
        const data = await response.json();
        if (data.order) {
          setOrderInfo({
            orderNumber: data.order.orderNumber,
            orderId: data.order._id,
          });
          setIsLoading(false);
          return true; // Order found
        }
      }
      return false; // Order not yet created
    } catch (error) {
      console.error("Error fetching order info:", error);
      return false;
    }
  }, [session.paymentIntentId]);

  useEffect(() => {
    let attempts = 0;
    // Increased max attempts to give webhook more time to process
    const maxAttempts = 15;
    // Start with shorter intervals, then increase (exponential backoff)
    const getInterval = (attempt: number) =>
      Math.min(1000 * 1.5 ** attempt, 5000);

    const pollForOrder = async () => {
      const found = await fetchOrderInfo();
      if (found) return;

      attempts++;
      if (attempts < maxAttempts) {
        const interval = getInterval(attempts);
        setTimeout(pollForOrder, interval);
      } else {
        setIsLoading(false); // Stop loading after max attempts
      }
    };

    // Small initial delay to allow webhook to start processing
    setTimeout(pollForOrder, 500);
  }, [fetchOrderInfo]);

  /**
   * Copy order number to clipboard
   */
  const copyOrderNumber = async () => {
    if (!orderInfo?.orderNumber) return;

    try {
      await navigator.clipboard.writeText(orderInfo.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const address = session.shippingAddress;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thank you for your purchase. We&apos;ve sent a confirmation to{" "}
          <span className="font-medium">{session.customerEmail}</span>
        </p>
      </div>

      {/* Order Number Display */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {isLoading ? (
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Generating order number...</span>
          </div>
        ) : orderInfo?.orderNumber ? (
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
            <div className="text-center">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Order Number
              </span>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {orderInfo.orderNumber}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyOrderNumber}
              className="h-8 w-8 p-0"
              title="Copy order number"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          /* Show helpful message when order number couldn't be retrieved */
          <div className="rounded-lg bg-amber-50 px-4 py-3 text-center dark:bg-amber-900/20">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Your payment was successful! Order details will appear in{" "}
              <Link href="/orders" className="font-medium underline">
                My Orders
              </Link>{" "}
              shortly.
            </p>
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="mt-10 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Order Details
          </h2>
        </div>

        <div className="px-6 py-4">
          {/* Items */}
          {session.lineItems && session.lineItems.length > 0 && (
            <div className="space-y-3">
              {session.lineItems.map((item) => (
                <div
                  key={`${item.name}-${item.quantity}-${item.amount}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatPrice(item.amount / 100)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-zinc-900 dark:text-zinc-100">Total</span>
              <span className="text-zinc-900 dark:text-zinc-100">
                {formatPrice((session.amountTotal ?? 0) / 100)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {address && (
          <div className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Shipping to
            </h3>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {session.customerName && <p>{session.customerName}</p>}
              {address.line1 && <p>{address.line1}</p>}
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {[address.city, address.state, address.postal_code]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {address.country && <p>{address.country}</p>}
            </div>
          </div>
        )}

        {/* Payment Status */}
        <div className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-zinc-400" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Payment status:{" "}
              <span className="font-medium capitalize text-green-600">
                {session.paymentStatus}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="outline">
          <Link href="/orders">
            View Your Orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
