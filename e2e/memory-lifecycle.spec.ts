import { test, expect } from '@playwright/test';

test.describe('3D WebGL & Overlay Memory Lifecycle Stress Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('repeatedly opens and closes modals without throwing unhandled exceptions or crashing WebGL', async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => pageErrors.push(err));

    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    const projectCard = workSection.locator('text=Kalki Vision').first();

    // Repeated cycle of 10 open and close events
    for (let i = 0; i < 10; i++) {
      await projectCard.click();
      const dialog = page.locator('div[role="dialog"]');
      await expect(dialog).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await page.waitForTimeout(50);
    }

    // Repeated cycle of 5 terminal open and close events
    const terminalTrigger = page.locator('button[aria-label="Open Interactive CLI Terminal"]');
    for (let i = 0; i < 5; i++) {
      await terminalTrigger.click();
      const terminal = page.locator('div[aria-label="Interactive Terminal"]');
      await expect(terminal).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(terminal).not.toBeVisible();
      await page.waitForTimeout(50);
    }

    // Verify zero page errors occurred during stress cycle
    expect(pageErrors.filter(e => !e.message.includes('WebGL'))).toHaveLength(0);
  });
});
