import { test, expect } from '@playwright/test';

test.describe('Command Palette & Interactive CLI Shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('opens Command Palette via shortcut or header trigger', async ({ page }) => {
    const paletteTrigger = page.locator('button[aria-label="Open Command Palette"]');
    await paletteTrigger.click();

    const palette = page.locator('div[aria-label="Command Palette"]');
    await expect(palette).toBeVisible();

    // Type query to filter
    const input = palette.locator('input[aria-label="Search command palette"]');
    await input.fill('Terminal');
    await expect(palette.locator('text=Open Interactive Terminal')).toBeVisible();

    // Close via Escape
    await page.keyboard.press('Escape');
    await expect(palette).not.toBeVisible();
  });

  test('executes terminal commands interactively', async ({ page }) => {
    const terminalTrigger = page.locator('button[aria-label="Open Interactive CLI Terminal"]');
    await terminalTrigger.click();

    const terminal = page.locator('div[aria-label="Interactive Terminal"]');
    await expect(terminal).toBeVisible();

    const input = terminal.locator('input[aria-label="Terminal command input"]');
    
    // Command 1: whoami
    await input.fill('whoami');
    await input.press('Enter');
    await expect(terminal.locator('text=Ankit Kumar — B.Tech Student')).toBeVisible();

    // Command 2: stack
    await input.fill('stack');
    await input.press('Enter');
    await expect(terminal.locator('text=Core: Rust, C++, TypeScript')).toBeVisible();

    // Command 3: sudo
    await input.fill('sudo');
    await input.press('Enter');
    await expect(terminal.locator('text=ROOT ACCESS GRANTED')).toBeVisible();
  });
});
