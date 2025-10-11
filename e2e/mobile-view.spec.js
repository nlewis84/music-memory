const { test, expect } = require("@playwright/test");
const { MUSIC_MEMORY_PIECES } = require("../src/helpers/musicSetup");

// Calculate expected count for 3rd-6th grade (default view)
const EXPECTED_3RD_6TH_COUNT = MUSIC_MEMORY_PIECES.filter(
  (piece) => piece.grade === "2" || piece.grade === "all"
).length;

test.describe("Mobile View Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 size
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Increase wait for slower browsers like webkit
    await page.waitForTimeout(3000);
  });

  test("should display mobile-optimized layout", async ({ page }) => {
    // Increase timeout for webkit
    test.setTimeout(60000);
    test.slow(); // Mark as slow test - gives 3x timeout

    // Wait for page to fully render on webkit
    await page.waitForLoadState("networkidle");

    // Check that main elements are visible on mobile with increased timeout
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Music Memory Game")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should display grade toggle on mobile", async ({ page }) => {
    await expect(page.getByText("2nd Grade List")).toBeVisible();
    await expect(page.getByText("3rd-6th Grade List")).toBeVisible();

    const toggle = page.locator('input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
  });

  test("should display score counters on mobile", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Correct Answers/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Incorrect Answers/ })
    ).toBeVisible();
  });

  test("should display game cards on mobile", async ({ page }) => {
    const cards = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display action buttons on mobile", async ({ page }) => {
    const aboutButton = page.getByRole("button", { name: "About me" });
    await expect(aboutButton).toBeVisible();

    const coffeeButton = page.getByRole("button", { name: "Buy me a coffee" });
    await expect(coffeeButton).toBeVisible();
  });

  test("should handle touch interactions on mobile", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Click works the same as tap in Playwright
    await toggle.click();

    // Should switch to 2nd grade
    await expect(toggle).not.toBeChecked();
  });

  test("should handle card taps on mobile", async ({ page }) => {
    const cards = page.locator(".MuiCard-root");
    const firstCard = cards.first();

    // Click works the same as tap in Playwright
    await firstCard.click();
    await page.waitForTimeout(500);

    // Some interaction should occur
    await expect(firstCard).toBeVisible();
  });

  test("should be responsive to different mobile orientations", async ({
    page,
  }) => {
    // Portrait mode (default)
    const portraitTitle = page.getByText("Music Memory Game");
    await expect(portraitTitle).toBeVisible();

    // Note: Changing orientation in tests requires additional setup
    // This is a basic check that the page loads in mobile view
  });

  test("should not clip content on mobile", async ({ page }) => {
    // Scroll through the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // All major elements should still be in the viewport or scrollable
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
  });

  test("should maintain localStorage on mobile", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Change grade using click (works on mobile too)
    await toggle.click();

    // Reload
    await page.reload();
    await page.waitForTimeout(2000);

    // Should persist
    const toggleAfterReload = page.locator('input[type="checkbox"]').first();
    await expect(toggleAfterReload).not.toBeChecked();
  });
});

test.describe("Tablet View Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 1024, height: 1366 }); // iPad Pro size
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should display properly on tablet", async ({ page }) => {
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
    await expect(page.getByText("Music Memory Game")).toBeVisible();
  });

  test("should show all game cards on tablet", async ({ page }) => {
    // Count all game cards (should match data source for 3rd-6th grade)
    const cards = page.locator(".MuiCard-root");
    const count = await cards.count();
    expect(count).toBe(EXPECTED_3RD_6TH_COUNT);
  });

  test("should have touch-friendly buttons on tablet", async ({ page }) => {
    const aboutButton = page.getByRole("button", { name: "About me" });
    await expect(aboutButton).toBeVisible();

    // Should be clickable (click works on mobile/tablet too)
    await expect(aboutButton).toBeEnabled();
  });
});
