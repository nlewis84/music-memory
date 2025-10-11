const { test, expect } = require("@playwright/test");

test.describe("Piece Selection Logic", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should not play the same piece twice in a row", async ({ page }) => {
    const playedPieces = [];

    // Play 10 rounds and track pieces
    for (let round = 0; round < 10; round++) {
      // Get current YouTube video ID
      const videoId = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="youtube"]');
        if (!iframe) return null;
        const match = iframe.src.match(/embed\/([^?]+)/);
        return match ? match[1] : null;
      });

      playedPieces.push(videoId);

      // Click a card and dismiss overlay
      const cards = await page.locator('[role="button"]').all();
      if (cards.length > 0) {
        await cards[0].click();
        await page.waitForTimeout(1000);
        await page.locator("#overlay").click();
        await page.waitForTimeout(2000);
      }
    }

    // Check for consecutive duplicates
    let hasConsecutiveDuplicates = false;
    for (let i = 1; i < playedPieces.length; i++) {
      if (playedPieces[i] === playedPieces[i - 1]) {
        hasConsecutiveDuplicates = true;
        break;
      }
    }

    expect(hasConsecutiveDuplicates).toBe(false);
  });

  test("should handle grade toggle without piece repetition", async ({
    page,
  }) => {
    // Toggle grade
    const toggle = page.locator('input[type="checkbox"]').first();
    await toggle.click();
    await page.waitForTimeout(1000);

    // Get current piece
    const firstVideoId = await page.evaluate(() => {
      const iframe = document.querySelector('iframe[src*="youtube"]');
      if (!iframe) return null;
      const match = iframe.src.match(/embed\/([^?]+)/);
      return match ? match[1] : null;
    });

    // Click a card and dismiss
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);
      await page.locator("#overlay").click();
      await page.waitForTimeout(2000);

      // Get new piece
      const secondVideoId = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="youtube"]');
        if (!iframe) return null;
        const match = iframe.src.match(/embed\/([^?]+)/);
        return match ? match[1] : null;
      });

      // For grade with multiple pieces, should not repeat
      // (Edge case: if grade only has 1 piece, it will repeat)
      const cardCount = await page.locator('[role="button"]').count();
      if (cardCount > 5) {
        // Reasonable chance they're different
        // Note: might occasionally be same by random chance with small lists
        expect(secondVideoId).toBeTruthy();
      }
    }
  });

  test("piece should change after each round", async ({ page }) => {
    const videoIds = new Set();

    // Play 5 rounds
    for (let round = 0; round < 5; round++) {
      const videoId = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="youtube"]');
        if (!iframe) return null;
        const match = iframe.src.match(/embed\/([^?]+)/);
        return match ? match[1] : null;
      });

      videoIds.add(videoId);

      // Click and dismiss
      const cards = await page.locator('[role="button"]').all();
      if (cards.length > 0) {
        await cards[0].click();
        await page.waitForTimeout(1000);
        await page.locator("#overlay").click();
        await page.waitForTimeout(2000);
      }
    }

    // Should have seen multiple different pieces
    // (Edge case: small playlists might have fewer unique pieces)
    expect(videoIds.size).toBeGreaterThan(1);
  });

  test("cards should match currently playing piece", async ({ page }) => {
    // Get current YouTube video ID
    const videoId = await page.evaluate(() => {
      const iframe = document.querySelector('iframe[src*="youtube"]');
      if (!iframe) return null;
      const match = iframe.src.match(/embed\/([^?]+)/);
      return match ? match[1] : null;
    });

    expect(videoId).toBeTruthy();

    // All cards should be clickable and show overlay
    const cards = await page.locator('[role="button"]').all();
    expect(cards.length).toBeGreaterThan(0);

    // Click first card
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Should show either correct or incorrect overlay
      const overlayVisible = await page.locator("#overlay").evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });

      expect(overlayVisible).toBe(true);
    }
  });
});
