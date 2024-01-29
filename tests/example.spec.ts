import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Jiro', () => {
  test('has title', async ({ page }) => {
    await page.goto('localhost:3000');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Jiro/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('localhost:3000');

    // Click the get started link.
    await page.getByRole('link', { name: 'Posts' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });
});

