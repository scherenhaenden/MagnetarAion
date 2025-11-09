import { test, expect } from '@playwright/test';

test.describe('Forgot Password Flow', () => {
  test('should navigate to the forgot password page when the link is clicked', async ({ page }) => {
    await page.goto('/login');

    const forgotPasswordLink = page.locator('a[routerLink="/forgot-password"]');
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();

    await expect(page).toHaveURL('/forgot-password');
    await expect(page.locator('h2')).toHaveText('Forgot Your Password?');
  });
});
