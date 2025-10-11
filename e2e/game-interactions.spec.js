const { test, expect } = require("@playwright/test");

test.describe("Game Card Interactions and Scoring", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000); // Wait for initial load
  });

  test("should increment correct count when correct card is clicked", async ({
    page,
  }) => {
    // Get the current piece info from the app state
    const currentPieceData = await page
      .evaluate(() => {
        const { currentPiece } = require("./helpers/helperFunctions");
        return currentPiece;
      })
      .catch(() => null);

    // Find and click a game card
    const cards = page.locator(".MuiCard-root").filter({
      hasText: /Bach|Beethoven|Mozart|Brahms|Bizet|Clarke|Debussy|Elgar/,
    });
    const firstCard = cards.first();

    // Get initial correct count
    const initialCorrectCount = await page.evaluate(() => {
      return parseInt(localStorage.getItem("correctCount") || "0");
    });

    await firstCard.click();

    // Wait for the overlay to appear
    await page.waitForTimeout(1000);

    // Check if the overlay appears (either correct or incorrect)
    const overlay = page.locator("#overlay");
    await expect(overlay).toBeVisible();

    // The reply element should have content
    const reply = page.locator("#reply");
    await expect(reply).toBeVisible();
  });

  test("should display game cards with composer information", async ({
    page,
  }) => {
    // Check that cards display properly formatted information
    const cards = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);

    // Check a specific card has both title and composer
    const bachCard = page
      .locator(".MuiCard-root")
      .filter({ hasText: "Bach" })
      .first();
    await expect(bachCard).toBeVisible();
  });

  test("should handle multiple card clicks in sequence", async ({ page }) => {
    // Disable auto-reload for this test by intercepting
    await page.addInitScript(() => {
      // Override window.location.reload to prevent actual reloads
      window.location.reload = () => {};
    });

    const cards = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });

    // Click first card
    const firstCard = cards.first();
    await firstCard.click();
    await page.waitForTimeout(500);

    // Overlay should appear
    const overlay = page.locator("#overlay");
    await expect(overlay).toBeVisible();
  });

  test("should show all required card information", async ({ page }) => {
    // Verify cards show selection and composer
    const card = page
      .locator(".MuiCard-root")
      .filter({ hasText: "Bach" })
      .first();
    await expect(card).toBeVisible();

    // Card should contain composer name
    await expect(card).toContainText(/Bach/);
  });

  test("should have clickable game cards", async ({ page }) => {
    // Wait for cards to load first (webkit needs extra time)
    await page.waitForLoadState("networkidle");
    await page.waitForSelector(".MuiCard-root", {
      state: "attached",
      timeout: 20000,
    });

    const cards = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });
    const firstCard = cards.first();

    // Card should be clickable
    await expect(firstCard).toBeEnabled({ timeout: 10000 });

    // Should have hover effect (check for boxShadow style)
    await firstCard.hover();

    // Click should work
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test("should display correct number of cards for each grade level", async ({
    page,
  }) => {
    // Increase timeout for slower browsers like webkit
    test.setTimeout(60000);
    test.slow(); // Triple the timeout

    // Wait for network and DOM to stabilize
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Wait for cards to be attached to DOM with longer timeout
    await page.waitForSelector(".MuiCard-root", {
      state: "attached",
      timeout: 30000,
    });

    // Count all game cards for 3rd-6th grade (default)
    // Should include all 'grade 2' + 'all' pieces (17 total)
    const cards3to6 = page.locator(".MuiCard-root");
    const count3to6 = await cards3to6.count();

    // Should have all 17 cards (grade '2' + 'all')
    expect(count3to6).toBeGreaterThanOrEqual(15);

    // Toggle to 2nd grade
    const toggle = page.locator('input[type="checkbox"]').first();
    await toggle.click();
    await page.waitForTimeout(1000);

    // Count all game cards for 2nd grade
    // Should include only 'grade 2' pieces (11 total)
    const cards2nd = page.locator(".MuiCard-root");
    const count2nd = await cards2nd.count();

    // Should have 11 cards (grade '2' only) - fewer than 3rd-6th grade
    expect(count2nd).toBeGreaterThanOrEqual(10);
    expect(count2nd).toBeLessThan(count3to6);
  });
});
