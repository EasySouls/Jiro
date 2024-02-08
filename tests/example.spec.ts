import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Home page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Jiro/);
  });
});

