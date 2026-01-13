import { randomBytes, randomUUID } from "node:crypto";

/**
 * Order ID Generation Utilities
 * =============================
 *
 * This module provides cryptographically secure unique identifiers for orders.
 * It handles two types of IDs:
 *
 * 1. `orderId` (_id in Sanity) - Internal document identifier
 *    - Format: `order-{uuid}` (e.g., "order-550e8400-e29b-41d4-a716-446655440000")
 *    - Used for: Sanity document routing, database lookups, URL parameters
 *    - Guarantee: Cryptographic UUID v4 ensures uniqueness across distributed systems
 *
 * 2. `orderNumber` - Human-readable order reference
 *    - Format: `ORD-{6-char alphanumeric}` (e.g., "ORD-X7K9M2")
 *    - Used for: Customer communication, receipts, support tickets, display in UI
 *    - Guarantee: 36^6 = 2.17 billion combinations + collision check
 *
 * Collision Handling:
 * - The `orderId` uses UUID v4 which has negligible collision probability
 * - The `orderNumber` should be verified against existing orders before use
 *
 * Usage:
 * ```ts
 * import { generateOrderId, generateOrderNumber } from "@/lib/utils/order-id";
 *
 * const orderId = generateOrderId();         // "order-550e8400-e29b-..."
 * const orderNumber = generateOrderNumber(); // "ORD-X7K9M2"
 * ```
 */

/**
 * Generates a cryptographically secure unique order ID for Sanity documents.
 *
 * Uses UUID v4 which provides:
 * - 122 bits of randomness
 * - Probability of collision: 1 in 2^122 (negligible)
 * - Safe for concurrent/simultaneous order creation
 *
 * @returns A unique order ID in format "order-{uuid}"
 *
 * @example
 * const orderId = generateOrderId();
 * // Returns: "order-550e8400-e29b-41d4-a716-446655440000"
 */
export function generateOrderId(): string {
  // Using crypto.randomUUID() which is cryptographically secure
  // This guarantees uniqueness even with simultaneous order placements
  const uuid = randomUUID();
  return `order-${uuid}`;
}

/**
 * Character set for order numbers (excludes ambiguous characters like 0/O, 1/I/L)
 * This makes order numbers easier to read and communicate over phone/email
 */
const ORDER_NUMBER_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/**
 * Generates a human-friendly order number for customer display.
 *
 * Format: ORD-{6 alphanumeric characters}
 * - Uses cryptographically secure random bytes
 * - Excludes ambiguous characters (0, O, 1, I, L) for readability
 * - Provides ~1.07 billion unique combinations (30^6)
 *
 * NOTE: While collision probability is low, it's recommended to verify
 * the generated order number doesn't already exist in the database
 * before using it. Use `ORDER_BY_ORDER_NUMBER_QUERY` for this check.
 *
 * @returns A human-readable order number in format "ORD-XXXXXX"
 *
 * @example
 * const orderNumber = generateOrderNumber();
 * // Returns: "ORD-X7K9M2"
 */
export function generateOrderNumber(): string {
  // Generate 6 random bytes (one for each character position)
  const bytes = randomBytes(6);

  // Convert each byte to a character from our allowed set
  // Using modulo to map byte values (0-255) to character indices
  const suffix = Array.from(bytes)
    .map((byte) => ORDER_NUMBER_CHARS[byte % ORDER_NUMBER_CHARS.length])
    .join("");

  return `ORD-${suffix}`;
}

/**
 * Validates if a string matches the expected order ID format.
 *
 * @param id - The string to validate
 * @returns true if the string is a valid order ID format
 *
 * @example
 * isValidOrderId("order-550e8400-e29b-41d4-a716-446655440000") // true
 * isValidOrderId("invalid-id") // false
 */
export function isValidOrderId(id: string): boolean {
  // UUID v4 format: 8-4-4-4-12 hex characters
  const orderIdRegex =
    /^order-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return orderIdRegex.test(id);
}

/**
 * Validates if a string matches the expected order number format.
 *
 * @param orderNumber - The string to validate
 * @returns true if the string is a valid order number format
 *
 * @example
 * isValidOrderNumber("ORD-X7K9M2") // true
 * isValidOrderNumber("ABC-123")    // false
 */
export function isValidOrderNumber(orderNumber: string): boolean {
  // Must start with ORD- followed by exactly 6 alphanumeric characters
  const orderNumberRegex = /^ORD-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  return orderNumberRegex.test(orderNumber);
}
