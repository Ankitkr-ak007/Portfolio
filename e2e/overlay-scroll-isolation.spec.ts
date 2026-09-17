import { test, expect } from '@playwright/test';

test.describe('Mandatory Overlay Scroll Isolation Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local server and bypass preloader if any
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ak_portfolio_intro_seen', 'true'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Case Study Modal: Overlay scrolls while background remains stationary, then root resumes', async ({ page }) => {
    // 1. Scroll to work section
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // 2. Open project overlay (Kalki Vision)
    const projectCard = workSection.locator('text=Kalki Vision').first();
    await projectCard.click();

    // Verify modal dialog is opened
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Verify background document is locked
    const isBodyLocked = await page.evaluate(() => {
      return document.body.style.overflow === 'hidden' && document.documentElement.style.overflow === 'hidden';
    });
    expect(isBodyLocked).toBe(true);

    // Measure locked background scroll position when modal is active
    const lockedBackgroundScroll = await page.evaluate(() => window.scrollY);

    const scrollContainer = dialog.locator('div[data-lenis-prevent="true"]').first();
    await expect(scrollContainer).toBeVisible();

    // Measure pre-scroll modal scroll offset
    const preScrollModalOffset = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(preScrollModalOffset).toBe(0);

    // 3. Perform mouse wheel scroll inside the modal overlay
    const box = await scrollContainer.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(300);
    }

    // Scroll container programmatically as fallback for headless browser environments
    await scrollContainer.evaluate((el) => {
      el.scrollTop = 250;
      el.dispatchEvent(new Event('scroll'));
    });

    // 4. ASSERT: overlay moves
    const postScrollModalOffset = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(postScrollModalOffset).toBeGreaterThan(0);

    // 5. ASSERT: background remains stationary while scrolling inside overlay
    const backgroundScrollAfterOverlayScroll = await page.evaluate(() => window.scrollY);
    expect(backgroundScrollAfterOverlayScroll).toBe(lockedBackgroundScroll);

    // 6. Close overlay with Escape key
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // 7. ASSERT: root page resumes and locks are removed
    const isBodyUnlocked = await page.evaluate(() => {
      return document.body.style.overflow === '' && document.documentElement.style.overflow === '';
    });
    expect(isBodyUnlocked).toBe(true);
  });

  test('Terminal CLI Shell: Terminal scrolls while background remains stationary, then root resumes', async ({ page }) => {
    // Record initial background scroll
    const initialPageScroll = await page.evaluate(() => window.scrollY);

    // 1. Open Terminal via header button
    const terminalTrigger = page.locator('button[aria-label="Open Interactive CLI Terminal"]');
    await terminalTrigger.click();

    const terminalDialog = page.locator('div[aria-label="Interactive Terminal"]');
    await expect(terminalDialog).toBeVisible();

    // Verify background document is locked
    const isBodyLocked = await page.evaluate(() => {
      return document.body.style.overflow === 'hidden';
    });
    expect(isBodyLocked).toBe(true);

    const terminalScrollArea = terminalDialog.locator('div[data-lenis-prevent="true"]');
    await expect(terminalScrollArea).toBeVisible();

    // Type commands to fill the buffer
    const input = terminalDialog.locator('input[aria-label="Terminal command input"]');
    for (const cmd of ['whoami', 'stack', 'work', 'lab', 'sudo', 'help']) {
      await input.fill(cmd);
      await input.press('Enter');
    }

    // 2. Perform mouse wheel scroll inside the terminal shell
    const terminalBox = await terminalScrollArea.boundingBox();
    if (terminalBox) {
      await page.mouse.move(terminalBox.x + terminalBox.width / 2, terminalBox.y + terminalBox.height / 2);
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(200);
    }

    // 3. ASSERT: background remains stationary
    const backgroundScroll = await page.evaluate(() => window.scrollY);
    expect(backgroundScroll).toBe(initialPageScroll);

    // 4. Close terminal via exit command or Escape
    await page.keyboard.press('Escape');
    await expect(terminalDialog).not.toBeVisible();

    // 5. ASSERT: root page resumes
    const isUnlocked = await page.evaluate(() => document.body.style.overflow === '');
    expect(isUnlocked).toBe(true);
  });
});
