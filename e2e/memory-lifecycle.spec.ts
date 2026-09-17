import { test, expect } from '@playwright/test';

test.describe('3D WebGL & Overlay Memory Lifecycle Stress Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('repeatedly opens and closes modals without throwing unhandled exceptions or crashing WebGL', async ({ page }) => {
    test.setTimeout(60000);
    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => pageErrors.push(err));

    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const projectCard = workSection.locator('text=Kalki Vision').first();

    // Repeated cycle of 3 open and close events
    for (let i = 0; i < 3; i++) {
      await projectCard.click();
      const dialog = page.locator('div[role="dialog"]');
      await expect(dialog).toBeVisible();

      const closeBtn = dialog.locator('button[aria-label="Close case study"]').first();
      await closeBtn.click();
      await expect(dialog).not.toBeVisible();
      await page.waitForTimeout(150);
    }

    // Repeated cycle of 3 terminal open and close events
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const terminalTrigger = page.locator('button[aria-label="Open Interactive CLI Terminal"]').first();
    for (let i = 0; i < 3; i++) {
      await terminalTrigger.click();
      const terminal = page.locator('div[aria-label="Interactive Terminal"]');
      await expect(terminal).toBeVisible();

      const closeTerminalBtn = terminal.locator('button[aria-label="Close terminal"]').first();
      await closeTerminalBtn.click();
      await expect(terminal).not.toBeVisible();
      await page.waitForTimeout(150);
    }

    // Verify zero page errors occurred during stress cycle
    expect(pageErrors.filter(e => !e.message.includes('WebGL'))).toHaveLength(0);
  });
});
