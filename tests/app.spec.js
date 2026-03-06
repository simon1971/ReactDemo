import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/ReactDemo/i);
  });

  test('displays the ReactDemo heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ReactDemo' })).toBeVisible();
  });

  test('displays the description text', async ({ page }) => {
    await expect(page.getByText('A clean, mobile-responsive React starter.')).toBeVisible();
  });

  test('displays primary action button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Primary Action' })).toBeVisible();
  });

  test('displays secondary button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
  });
});
