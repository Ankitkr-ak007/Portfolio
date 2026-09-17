import { test, expect } from '@playwright/test';

test.describe('Responsive Viewports & Visual Stability', () => {
  test('renders key sections stably on configured project viewport', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check Hero visibility
    await expect(page.locator('text=ANKIT KUMAR').first()).toBeVisible();

    // Check Selected Work visibility
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    await expect(workSection).toBeVisible();

    // Check Contact section visibility
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });
});
