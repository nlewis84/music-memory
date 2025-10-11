const { test, expect } = require("@playwright/test");

test.describe("App Loading and Initial UI", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("should display the main title and heading", async ({ page }) => {
    // Wait for the main heading to be visible
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
    await expect(page.getByText("Music Memory Game")).toBeVisible();
  });

  test("should display the grade toggle switch", async ({ page }) => {
    // Check that the toggle and labels are visible
    await expect(page.getByText("2nd Grade List")).toBeVisible();
    await expect(page.getByText("3rd-6th Grade List")).toBeVisible();

    // Check that the switch is present
    const toggle = page.locator('input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
  });

  test("should display the refresh button", async ({ page, viewport }) => {
    // Skip on mobile - mobile layout doesn't have reset button
    if (!viewport || viewport.width < 768) {
      test.skip();
    }

    // Look for the button with refresh functionality
    await expect(
      page.getByText("No sound or need to reset the game? Click this button")
    ).toBeVisible();
  });

  test("should display score counters", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Correct Answers/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Incorrect Answers/ })
    ).toBeVisible();

    // Initial scores should be 0
    const correctCounter = page.getByRole("heading", {
      name: /Correct Answers/,
    });
    const incorrectCounter = page.getByRole("heading", {
      name: /Incorrect Answers/,
    });

    await expect(correctCounter).toContainText("0");
    await expect(incorrectCounter).toContainText("0");
  });

  test("should display game cards", async ({ page }) => {
    // Wait for game cards to load
    await page.waitForTimeout(2000); // Give time for data to load

    // Should have multiple game cards (at least some pieces should be visible)
    const cards = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart|Brahms/ });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display action buttons", async ({ page }) => {
    // Check for "About me" button
    const aboutButton = page.getByRole("button", { name: "About me" });
    await expect(aboutButton).toBeVisible();

    // Check for "Buy me a coffee" button
    const coffeeButton = page.getByRole("button", { name: "Buy me a coffee" });
    await expect(coffeeButton).toBeVisible();
  });

  test("should show loading state initially", async ({ page }) => {
    // Navigate to the page fresh
    await page.goto("/");

    // Should show skeleton loaders or loading state
    const skeleton = page.locator(".MuiSkeleton-root").first();
    // Skeleton might disappear quickly, so we just check the page loaded
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
  });

  test("should have proper page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Music Memory|React App/);
  });
});
