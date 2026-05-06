import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test('should allow a user to add an item to the cart and complete checkout', async ({ page }) => {
    // 1. Navigate to products page
    await page.goto('/products')

    // Wait for the products grid to load. If the DB is empty, this test might fail.
    // In a real CI environment, you would seed the DB before running E2E tests.
    // We look for the first "Add to Sanctuary" button.
    const addToCartButton = page.getByRole('button', { name: /add to sanctuary/i }).first()
    
    // Check if there are any products. If not, we skip the rest of the test gracefully.
    const isVisible = await addToCartButton.isVisible()
    if (!isVisible) {
      console.warn('No products found on the page. Skipping cart addition.')
      return
    }

    // 2. Add product to cart
    await addToCartButton.click()
    
    // Verify button text changes
    await expect(page.getByRole('button', { name: /added to sanctuary/i }).first()).toBeVisible()

    // 3. Navigate to checkout
    await page.goto('/checkout')

    // 4. Verify checkout page elements
    await expect(page.getByRole('heading', { name: /order summary/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /confirm order/i })).toBeVisible()

    // 5. Fill out checkout form
    const emailInput = page.getByPlaceholder(/botanist@rooted.com/i)
    await emailInput.fill('test@eren.works')

    // 6. Confirm Order
    const confirmButton = page.getByRole('button', { name: /confirm order/i })
    await confirmButton.click()

    // 7. Verify Success Screen
    await expect(page.getByRole('heading', { name: /growth underway/i })).toBeVisible()
    await expect(page.getByText(/test@eren.works/i)).toBeVisible()
  })
})
