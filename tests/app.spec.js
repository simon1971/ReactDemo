import { test, expect } from '@playwright/test'

test.describe('Budget app routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('redirects to dashboard and shows app heading', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/)
    await expect(page.getByRole('heading', { name: 'ReactDemo Budget' })).toBeVisible()
  })

  test('can navigate to transactions and validate required amount', async ({ page }) => {
    await page.getByRole('link', { name: 'Transactions' }).click()
    await expect(page.getByRole('heading', { name: 'Add / Edit Transaction' })).toBeVisible()

    const addButton = page.getByRole('button', { name: 'Add transaction' })
    await expect(addButton).toBeDisabled()
  })
})
