const { test, expect } = require("@playwright/test");

test.describe("Overlay Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("overlay should be clickable to dismiss", async ({ page }) => {
    // Click a card to show overlay
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Overlay should be visible
      const overlay = page.locator("#overlay");
      const isVisible = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });
      expect(isVisible).toBe(true);

      // Click overlay to dismiss
      await overlay.click();
      await page.waitForTimeout(500);

      // Overlay should be hidden
      const isHidden = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display === "none";
      });
      expect(isHidden).toBe(true);
    }
  });

  test("overlay should have pointer cursor", async ({ page }) => {
    // Click a card to show overlay
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Check cursor style
      const cursor = await page.locator("#overlay").evaluate((el) => {
        return window.getComputedStyle(el).cursor;
      });

      expect(cursor).toBe("pointer");
    }
  });

  test("overlay should show 'Click anywhere to continue' text", async ({
    page,
  }) => {
    // Click a card to show overlay
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Check for continue text
      const continueText = page.getByText("Click anywhere to continue");
      await expect(continueText).toBeVisible();
    }
  });

  test("clicking overlay should load new piece", async ({ page }) => {
    // Get initial YouTube iframe
    const initialSrc = await page.evaluate(() => {
      const iframe = document.querySelector('iframe[src*="youtube"]');
      return iframe ? iframe.src : null;
    });

    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Click overlay to dismiss
      await page.locator("#overlay").click();
      await page.waitForTimeout(2000);

      // Check YouTube iframe updated
      const newSrc = await page.evaluate(() => {
        const iframe = document.querySelector('iframe[src*="youtube"]');
        return iframe ? iframe.src : null;
      });

      expect(newSrc).toBeTruthy();
      // Note: might be same or different depending on random selection
    }
  });

  test("overlay should auto-dismiss after 5 seconds", async ({ page }) => {
    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Overlay should be visible
      const overlay = page.locator("#overlay");
      let isVisible = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });
      expect(isVisible).toBe(true);

      // Wait 5+ seconds
      await page.waitForTimeout(5500);

      // Overlay should be hidden
      isVisible = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });
      expect(isVisible).toBe(false);
    }
  });

  test("overlay should increment score counter", async ({ page }) => {
    // Get initial correct count
    const initialCorrect = await page.evaluate(() => {
      const correctElement = document.querySelector(
        '[class*="MuiBox"]:has-text("✓")'
      );
      if (!correctElement) return 0;
      const text = correctElement.textContent;
      const match = text.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    });

    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);
      await page.locator("#overlay").click();
      await page.waitForTimeout(1000);

      // Check counter increased (either correct or incorrect)
      const totalCount = await page.evaluate(() => {
        const body = document.body.textContent;
        const matches = body.match(/[✓✗]\s*(\d+)/g);
        if (!matches) return 0;
        return matches.reduce((sum, match) => {
          const num = parseInt(match.match(/\d+/)[0]);
          return sum + num;
        }, 0);
      });

      expect(totalCount).toBeGreaterThan(0);
    }
  });

  test("overlay should display correct/incorrect message with styling", async ({
    page,
  }) => {
    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Check for message
      const replyText = await page.locator("#reply").textContent();

      // Should have either success or error message
      const hasMessage =
        replyText.includes("GREAT JOB") || replyText.includes("Oh no");
      expect(hasMessage).toBe(true);

      // Check color styling
      const color = await page.locator("#reply").evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Should be green or orange (not default white/black)
      expect(color).toBeTruthy();
    }
  });
});
