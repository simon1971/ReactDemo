import { test, expect } from '@playwright/test'

test.describe('Budget app routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('redirects to dashboard and shows app heading', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/)
    await expect(page.getByRole('heading', { name: 'ReactDemo Budget' })).toBeVisible()
  })

  test('transactions route renders add form heading and disabled submit by default', async ({ page }) => {
    await page.goto('/transactions')
    await expect(page).toHaveURL(/\/transactions/)
    await expect(page.getByRole('heading', { name: 'Add / Edit Transaction' })).toBeVisible()

    const addButton = page.getByRole('button', { name: 'Add transaction' })
    await expect(addButton).toBeDisabled()
  })
})
