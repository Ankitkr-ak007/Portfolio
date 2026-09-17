import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '430x932', width: 430, height: 932 },
  { name: '390x844', width: 390, height: 844 },
];

test.describe('Responsive Viewports & Visual Stability', () => {
  for (const vp of VIEWPORTS) {
    test(`renders key sections stably on viewport ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
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
  }
});
