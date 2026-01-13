import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price amount with currency symbol
 * @param amount - The price amount (can be null/undefined)
 * @param currency - Currency symbol (default: "₹")
 * @returns Formatted price string (e.g., "₹599.99")
 */
export function formatPrice(
  amount: number | null | undefined,
  currency = "₹",
): string {
  return `${currency}${(amount ?? 0).toFixed(2)}`;
}

type DateFormatOption = "short" | "long" | "datetime";

const DATE_FORMAT_OPTIONS: Record<
  DateFormatOption,
  Intl.DateTimeFormatOptions
> = {
  short: { day: "numeric", month: "short" },
  long: { day: "numeric", month: "long", year: "numeric" },
  datetime: {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
};

/**
 * Format a date string with locale-specific formatting
 * @param date - ISO date string (can be null/undefined)
 * @param format - Format option: "short" (5 Jan), "long" (5 January 2025), "datetime" (5 January 2025, 14:30)
 * @param fallback - Fallback text when date is null/undefined
 * @returns Formatted date string
 */
export function formatDate(
  date: string | null | undefined,
  format: DateFormatOption = "long",
  fallback = "Date unknown",
): string {
  if (!date) return fallback;
  return new Date(date).toLocaleDateString(
    "en-GB",
    DATE_FORMAT_OPTIONS[format],
  );
}

/**
 * Format an order number for display
 *
 * Handles multiple order number formats:
 * - New format: "ORD-X7K9M2" → displays as "X7K9M2"
 * - Legacy format: "ORD-M5ABCD-XY7Z" → displays as "XY7Z" (last segment)
 * - Fallback format with timestamp: "ORD-X7K9M2-M5K2JN" → displays as "M5K2JN"
 *
 * The function extracts the last segment after the final hyphen for compact display,
 * while the full order number is preserved in the database for reference.
 *
 * @param orderNumber - Full order number (e.g., "ORD-X7K9M2" or "ORD-2024-ABC123")
 * @returns Shortened display format (e.g., "X7K9M2" or "ABC123") or "N/A" if null
 *
 * @example
 * formatOrderNumber("ORD-X7K9M2")        // Returns: "X7K9M2"
 * formatOrderNumber("ORD-2024-ABC123")   // Returns: "ABC123"
 * formatOrderNumber(null)                 // Returns: "N/A"
 */
export function formatOrderNumber(
  orderNumber: string | null | undefined,
): string {
  if (!orderNumber) return "N/A";
  // Extract the last segment after the final hyphen for compact display
  return orderNumber.split("-").pop() ?? orderNumber;
}
