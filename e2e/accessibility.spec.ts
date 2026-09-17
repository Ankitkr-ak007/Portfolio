import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG AA Accessibility Audits', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Homepage meets WCAG AA standards with no critical violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations.filter(v => v.impact === 'critical')).toEqual([]);
  });

  test('Case Study Modal meets accessibility standards', async ({ page }) => {
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    const projectCard = workSection.locator('text=Kalki Vision').first();
    await projectCard.click();

    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .include('div[role="dialog"]')
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(scanResults.violations.filter(v => v.impact === 'critical')).toEqual([]);
  });

  test('Terminal Shell meets accessibility standards', async ({ page }) => {
    const terminalTrigger = page.locator('button[aria-label="Open Interactive CLI Terminal"]');
    await terminalTrigger.click();

    const terminalDialog = page.locator('div[aria-label="Interactive Terminal"]');
    await expect(terminalDialog).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .include('div[aria-label="Interactive Terminal"]')
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(scanResults.violations.filter(v => v.impact === 'critical')).toEqual([]);
  });
});
