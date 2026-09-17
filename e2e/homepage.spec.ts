import { test, expect } from '@playwright/test';

test.describe('Homepage Narrative & Systems Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('loads all narrative sections with expected headers', async ({ page }) => {
    // 01: Hero Systems Core
    await expect(page.locator('text=ANKIT KUMAR').first()).toBeVisible();
    await expect(page.locator('text=I BUILD SYSTEMS THAT TURN COMPLEXITY INTO SOFTWARE')).toBeVisible();

    // 02: Introduction
    await expect(page.locator('text=INTRODUCTION // 02')).toBeVisible();

    // 03: Engineering DNA
    await expect(page.locator('#engineering-dna').locator('text=INTERCONNECTED STACK & GRAPH')).toBeVisible();

    // 04: Selected Work
    await expect(page.locator('text=FEATURED SYSTEMS')).toBeVisible();
    await expect(page.locator('text=Kalki Vision').first()).toBeVisible();

    // 05: How I Think
    await expect(page.locator('text=ENGINEERING PRINCIPLES')).toBeVisible();
    await expect(page.locator('text=Architecture > Prompting')).toBeVisible();

    // 06: Architecture Process
    await expect(page.locator('text=HOW I SHIP DETERMINISTIC SYSTEMS')).toBeVisible();

    // 07: AI Lab
    const labSection = page.locator('#lab');
    await labSection.scrollIntoViewIfNeeded();
    await expect(page.locator('text=INTERACTIVE EXPERIMENTS')).toBeVisible();

    // 08: Experience
    await expect(page.locator('text=Google Gemini Student Ambassador').first()).toBeVisible();

    // 09: About
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(page.locator('text=BEHIND THE SYSTEMS')).toBeVisible();

    // 10: Writing / Philosophy
    await expect(page.locator('text=AI BUILDS FASTER.')).toBeVisible();

    // 11: Contact
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(page.locator("text=LET'S BUILD SOMETHING WORTH SHIPPING")).toBeVisible();

    // 12: Footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator('text=PORTFOLIO SYSTEM ONLINE')).toBeVisible();
    await expect(footer.locator('text=BACK TO TOP')).toBeVisible();
  });

  test('verifies email and social external links', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    const href = await emailLink.getAttribute('href');
    expect(href).toContain('ankit.kr.dev@gmail.com');

    const githubLinks = page.locator('a[href*="github.com"]');
    expect(await githubLinks.count()).toBeGreaterThan(0);
  });
});
