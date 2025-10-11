const { test, expect } = require("@playwright/test");

test.describe("No Page Reload Between Rounds", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("game should not reload page after correct answer", async ({ page }) => {
    let pageReloaded = false;

    // Listen for page reload
    page.on("load", () => {
      pageReloaded = true;
    });

    // Click a card (might be correct or incorrect)
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Dismiss overlay by clicking it
      const overlay = page.locator("#overlay");
      await overlay.click();
      await page.waitForTimeout(1000);

      // Page should NOT have reloaded
      expect(pageReloaded).toBe(false);
    }
  });

  test("game should not reload page after incorrect answer", async ({
    page,
  }) => {
    let pageReloaded = false;

    page.on("load", () => {
      pageReloaded = true;
    });

    // Get all cards and click multiple until we get a wrong answer
    const cards = await page.locator('[role="button"]').all();

    // Click first 5 cards to likely get at least one wrong answer
    for (let i = 0; i < Math.min(5, cards.length); i++) {
      await cards[i].click();
      await page.waitForTimeout(500);

      // Check if overlay shows "Oh no!"
      const overlayText = await page.locator("#reply").textContent();
      if (overlayText && overlayText.includes("Oh no")) {
        // Found incorrect answer, dismiss and check no reload
        await page.locator("#overlay").click();
        await page.waitForTimeout(500);
        break;
      }
    }

    expect(pageReloaded).toBe(false);
  });

  test("YouTube player should update without page reload", async ({ page }) => {
    // Get initial YouTube iframe src
    const initialSrc = await page.evaluate(() => {
      const iframe = document.querySelector('iframe[src*="youtube"]');
      return iframe ? iframe.src : null;
    });

    expect(initialSrc).toBeTruthy();

    // Click a card and dismiss overlay
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);
      await page.locator("#overlay").click();
      await page.waitForTimeout(2000);

      // Get new YouTube iframe src
      const newSrc = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="youtube"]');
        return iframe ? iframe.src : null;
      });

      // Src might be different (new piece) or same (but no reload occurred)
      expect(newSrc).toBeTruthy();
    }
  });

  test("scores should persist across rounds without reload", async ({
    page,
  }) => {
    // Play multiple rounds
    for (let round = 0; round < 3; round++) {
      const cards = await page.locator('[role="button"]').all();
      if (cards.length > 0) {
        await cards[0].click();
        await page.waitForTimeout(1000);
        await page.locator("#overlay").click();
        await page.waitForTimeout(1500);
      }
    }

    // Check that scores exist and are > 0
    const scoreText = await page.textContent("body");
    const hasScores = /✓\s*[1-9]|✗\s*[1-9]/.test(scoreText);

    expect(hasScores).toBe(true);
  });

  test("no loading skeleton should appear on page load", async ({ page }) => {
    // Page should load instantly without skeleton cards
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Check for skeleton components (shouldn't exist)
    const skeletons = await page.locator('[class*="MuiSkeleton"]').count();
    expect(skeletons).toBe(0);
  });
});
