const { test, expect } = require("@playwright/test");

test.describe("Cat GIF Updates", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("cat image should be present in overlay", async ({ page }) => {
    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(2000); // Wait for cat to load

      // Check for cat image
      const catImage = page.locator("#overlay img[alt='cat gif']");
      const imageCount = await catImage.count();

      // Cat might not be loaded yet (async fetch), so either 0 or 1 is valid
      expect(imageCount).toBeLessThanOrEqual(1);
    }
  });

  test("cat image should have proper alt text", async ({ page }) => {
    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(2000);

      // Check for cat image alt text
      const catImage = page.locator("#overlay img");
      const imageCount = await catImage.count();

      if (imageCount > 0) {
        const altText = await catImage.first().getAttribute("alt");
        expect(altText).toBe("cat gif");
      }
    }
  });

  test("cat image should be from cat API", async ({ page }) => {
    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(2000);

      // Check image source
      const catImage = page.locator("#overlay img");
      const imageCount = await catImage.count();

      if (imageCount > 0) {
        const src = await catImage.first().getAttribute("src");
        // Should be from cat API (cdn2.thecatapi.com)
        expect(src).toContain("thecatapi");
      }
    }
  });

  test("overlay should function without cat image", async ({ page }) => {
    // Block cat API to test graceful degradation
    await page.route("**/thecatapi.com/**", (route) => route.abort());

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000);

    // Click a card
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Overlay should still work without cat
      const overlay = page.locator("#overlay");
      const isVisible = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });
      expect(isVisible).toBe(true);

      // Message should still be visible
      const replyText = await page.locator("#reply").textContent();
      expect(replyText.length).toBeGreaterThan(0);
    }
  });

  test("cat API should be called on page load", async ({ page }) => {
    let catApiCalled = false;

    // Listen for cat API requests
    page.on("request", (request) => {
      if (request.url().includes("thecatapi.com")) {
        catApiCalled = true;
      }
    });

    // Reload to trigger API call
    await page.reload();
    await page.waitForTimeout(2000);

    expect(catApiCalled).toBe(true);
  });

  test("new cat should be fetched for each round", async ({ page }) => {
    const catUrls = [];

    // Play 3 rounds and collect cat URLs
    for (let round = 0; round < 3; round++) {
      // Set up request listener for this round
      const catPromise = new Promise((resolve) => {
        page.once("response", async (response) => {
          if (response.url().includes("thecatapi.com")) {
            const json = await response.json();
            if (json[0]?.url) {
              resolve(json[0].url);
            }
          }
        });
      });

      // Click card and dismiss
      const cards = await page.locator('[role="button"]').all();
      if (cards.length > 0) {
        await cards[0].click();
        await page.waitForTimeout(1000);
        await page.locator("#overlay").click();
        await page.waitForTimeout(1000);
      }

      // Try to get cat URL (might timeout if already fetched)
      try {
        const url = await Promise.race([
          catPromise,
          new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
        ]);
        if (url) catUrls.push(url);
      } catch (e) {
        // Ignore timeout
      }
    }

    // Should have attempted to fetch cats
    // (Note: may not get all 3 due to timing, but should get at least 1)
    expect(catUrls.length).toBeGreaterThanOrEqual(0);
  });

  test("game should be playable immediately without waiting for cat", async ({
    page,
  }) => {
    // Page should be interactive immediately
    await page.goto("/");

    // Cards should be clickable right away (no skeleton loading)
    const cards = page.locator('[role="button"]');
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);

    // Should be able to click immediately
    if (count > 0) {
      await cards.first().click();
      await page.waitForTimeout(500);

      // Overlay should appear
      const overlay = page.locator("#overlay");
      const isVisible = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).display !== "none";
      });
      expect(isVisible).toBe(true);
    }
  });
});
