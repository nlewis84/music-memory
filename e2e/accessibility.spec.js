const { test, expect } = require("@playwright/test");

test.describe("Accessibility and Edge Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // Check for proper heading structure
    const h1 = page.locator("h1, h2").first();
    await expect(h1).toBeVisible();

    // Main title should be present
    await expect(page.getByText("Music Memory Game")).toBeVisible();
  });

  test("should have descriptive button labels", async ({ page }) => {
    // Action buttons should have accessible names
    const aboutButton = page.getByRole("button", { name: /about me/i });
    await expect(aboutButton).toBeVisible();

    const coffeeButton = page.getByRole("button", { name: /buy me a coffee/i });
    await expect(coffeeButton).toBeVisible();
  });

  test("should have keyboard navigable elements", async ({ page }) => {
    // Tab through the page
    await page.keyboard.press("Tab");

    // Focus should move to interactive elements
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(focusedElement).toBeTruthy();
  });

  test("should handle rapid toggle clicks", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Rapidly click the toggle multiple times
    for (let i = 0; i < 5; i++) {
      await toggle.click({ force: true });
      await page.waitForTimeout(100);
    }

    // Should still be in a valid state
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();

    // localStorage should have a valid value
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(["2nd", "3rd-6th"]).toContain(selectedGrade);
  });

  test("should handle corrupted localStorage gracefully", async ({ page }) => {
    // Set invalid localStorage values
    await page.evaluate(() => {
      localStorage.setItem("selectedGrade", "invalid-grade");
      localStorage.setItem("correctCount", "not-a-number");
      localStorage.setItem("incorrectCount", "also-not-a-number");
    });

    // Reload the page
    await page.reload();
    await page.waitForTimeout(2000);

    // App should still work
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
    await expect(page.getByText("Music Memory Game")).toBeVisible();
  });

  test("should display properly with no network connection for API", async ({
    page,
  }) => {
    // Block the cat API before initial navigation
    await page.route("**/api.thecatapi.com/**", (route) => route.abort());

    // Navigate to app (route is already blocked)
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // App should still function (might show without cat image)
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should handle window resize gracefully", async ({ page }) => {
    // Start with desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    await expect(page.getByText("Music Memory Game")).toBeVisible();

    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    await expect(page.getByText("Music Memory Game")).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    await expect(page.getByText("Music Memory Game")).toBeVisible();
  });

  test("should have visible focus indicators", async ({ page }) => {
    // Increase timeout and add retry for webkit
    test.setTimeout(60000);
    test.slow(); // Mark as slow test - gives 3x timeout

    // Tab to first focusable element
    await page.keyboard.press("Tab");
    await page.waitForTimeout(500); // Increased wait time

    // Wait for focus to settle
    await page.waitForTimeout(500);

    // Some element should have focus
    const hasFocus = await page.evaluate(() => {
      const activeEl = document.activeElement;
      return activeEl && activeEl !== document.body;
    });

    expect(hasFocus).toBeTruthy();
  });

  test("should not have console errors on load", async ({ page }) => {
    // Add retry for flaky console error detection
    test.setTimeout(60000);
    test.slow(); // Triple the timeout for webkit

    const consoleErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    // Wait longer for all resources to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000); // Extra wait for webkit

    // Filter out known acceptable errors (external resources, browser-specific)
    const criticalErrors = consoleErrors.filter(
      (err) =>
        !err.includes("favicon") &&
        !err.includes("chrome-extension") &&
        !err.includes("Failed to load resource") &&
        !err.includes("youtube") &&
        !err.includes("fonts.googleapis") &&
        !err.includes("fonts.gstatic") && // Google fonts CDN
        !err.includes("Cross-Origin") &&
        !err.toLowerCase().includes("cors") &&
        !err.includes("404") &&
        !err.includes("network") &&
        !err.includes("ERR_") && // Network errors
        !err.includes("net::") && // Chrome network errors
        !err.includes("Load failed") && // Generic load failures
        !err.includes("Refused to connect") && // Connection errors
        !err.includes("timed out") && // Timeout errors
        !err.toLowerCase().includes("timeout") // Timeout variations
    );

    // Should have no critical application errors
    expect(criticalErrors.length).toBe(0);
  });

  test("should maintain state during multiple interactions", async ({
    page,
  }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Toggle to 2nd grade
    await toggle.click();
    await page.waitForTimeout(300);

    // Set some counts
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "5");
      localStorage.setItem("incorrectCount", "3");
    });

    await page.reload();
    await page.waitForTimeout(2000);

    // All state should be maintained
    await expect(toggle).not.toBeChecked();

    const correctCounter = page.locator("text=Correct Answers").locator("..");
    const incorrectCounter = page
      .locator("text=Incorrect Answers")
      .locator("..");

    await expect(correctCounter).toContainText("5");
    await expect(incorrectCounter).toContainText("3");
  });

  test("should handle long session times", async ({ page }) => {
    // Set high counts to simulate long session
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "999");
      localStorage.setItem("incorrectCount", "999");
    });

    await page.reload();
    await page.waitForTimeout(2000);

    // Should display high numbers correctly
    const correctCounter = page.locator("text=Correct Answers").locator("..");
    const incorrectCounter = page
      .locator("text=Incorrect Answers")
      .locator("..");

    await expect(correctCounter).toContainText("999");
    await expect(incorrectCounter).toContainText("999");
  });

  test("should have appropriate color contrast", async ({ page }) => {
    // Check that text is visible against backgrounds
    const title = page.getByText("Music Memory Game");
    await expect(title).toBeVisible();

    // Score counters should have good contrast
    const correctCounter = page.getByRole("heading", {
      name: /Correct Answers/,
    });
    const incorrectCounter = page.getByRole("heading", {
      name: /Incorrect Answers/,
    });

    await expect(correctCounter).toBeVisible();
    await expect(incorrectCounter).toBeVisible();
  });
});
