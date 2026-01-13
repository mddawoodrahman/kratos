import { expect, test } from "@playwright/test";

test.describe("E2E Checkout Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");
  });

  test("should complete a full checkout flow", async ({ page }) => {
    // Step 1: Navigate to products
    await page.click("text=Shop Collection");
    await expect(page).toHaveURL(/\/products/);

    // Step 2: Click on a product
    const productCard = page.locator('[data-testid="product-card"]').first();
    await productCard.click();

    // Wait for product page
    await expect(page.locator("h1")).toBeVisible();

    // Step 3: Add to cart
    await page.click("text=Add to bag");

    // Verify cart opened with item
    await expect(page.locator("text=Shopping Cart")).toBeVisible();
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);

    // Step 4: Proceed to checkout
    await page.click("text=Checkout Securely");

    // Should redirect to checkout or Stripe
    await expect(page).toHaveURL(/checkout|stripe/);
  });

  test("should update cart quantities", async ({ page }) => {
    // Add item to cart first
    await page.goto("/products");
    await page.locator('[data-testid="product-card"]').first().click();
    await page.click("text=Add to bag");

    // Increase quantity
    await page.click('[aria-label="Increase quantity"]');
    await expect(page.locator("text=2")).toBeVisible();

    // Decrease quantity
    await page.click('[aria-label="Decrease quantity"]');
    await expect(page.locator("text=1")).toBeVisible();
  });

  test("should remove items from cart", async ({ page }) => {
    // Add item to cart
    await page.goto("/products");
    await page.locator('[data-testid="product-card"]').first().click();
    await page.click("text=Add to bag");

    // Remove item
    await page.click('[aria-label="Remove item"]');

    // Cart should be empty
    await expect(page.locator("text=Your cart is empty")).toBeVisible();
  });

  test("should filter products by category", async ({ page }) => {
    await page.goto("/products");

    // Click on a category filter
    await page.click("text=Apparel");

    // URL should update
    await expect(page).toHaveURL(/category=apparel/i);
  });

  test("should search for products", async ({ page }) => {
    await page.goto("/");

    // Type in search
    await page.fill('input[type="search"]', "shirt");
    await page.press('input[type="search"]', "Enter");

    // Should show search results
    await expect(page).toHaveURL(/search=shirt/i);
  });
});
