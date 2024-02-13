import { test, expect } from '@playwright/test';

test('Elements on main page are visiblie', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('banner')).toContainText('Jiro');
  await expect(
    page.getByRole('banner').getByRole('link', { name: 'Login' })
  ).toBeVisible();
});

