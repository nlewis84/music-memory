const { test, expect } = require("@playwright/test");

test.describe("Action Buttons and Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should display About Me button", async ({ page }) => {
    const aboutButton = page.getByRole("button", { name: /about me/i });
    await expect(aboutButton).toBeVisible();
  });

  test("should display Buy Me a Coffee button", async ({ page }) => {
    const coffeeButton = page.getByRole("button", { name: /buy me a coffee/i });
    await expect(coffeeButton).toBeVisible();
  });

  test("should open About Me link in new tab when clicked", async ({
    page,
    context,
  }) => {
    // Listen for new page (tab) to open
    const pagePromise = context.waitForEvent("page");

    const aboutButton = page.getByRole("button", { name: /about me/i });
    await aboutButton.click();

    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Verify the URL
    expect(newPage.url()).toContain("nathanlewis.dev/about");

    // Close the new tab
    await newPage.close();
  });

  test("should open Buy Me a Coffee link in new tab when clicked", async ({
    page,
    context,
  }) => {
    // Listen for new page (tab) to open
    const pagePromise = context.waitForEvent("page");

    const coffeeButton = page.getByRole("button", { name: /buy me a coffee/i });
    await coffeeButton.click();

    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Verify the URL
    expect(newPage.url()).toContain("venmo.com");

    // Close the new tab
    await newPage.close();
  });

  test("should display refresh/reset button", async ({ page, viewport }) => {
    // Skip on mobile - mobile layout doesn't have reset button
    if (!viewport || viewport.width < 768) {
      test.skip();
    }

    // Look for the refresh button text and container
    await expect(
      page.getByText("No sound or need to reset the game? Click this button")
    ).toBeVisible();

    // The refresh button should be accessible by its aria-label
    const refreshButton = page.getByRole("button", { name: "Reset game" });
    await expect(refreshButton).toBeVisible();
  });

  test("should have working refresh button that resets scores", async ({
    page,
    viewport,
  }) => {
    // Skip on mobile - mobile layout doesn't have reset button
    if (!viewport || viewport.width < 768) {
      test.skip();
    }

    // Set some scores
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "8");
      localStorage.setItem("incorrectCount", "4");
    });

    await page.reload();
    await page.waitForTimeout(2000);

    // Verify scores are displayed
    let correctCounter = page.getByRole("heading", { name: /Correct Answers/ });
    let incorrectCounter = page.getByRole("heading", {
      name: /Incorrect Answers/,
    });

    await expect(correctCounter).toContainText("8");
    await expect(incorrectCounter).toContainText("4");

    // Find and click the refresh button
    const refreshButton = page.getByRole("button", { name: "Reset game" });
    await refreshButton.click();
    await page.waitForTimeout(500);

    // Verify scores are reset
    const correctCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    const incorrectCount = await page.evaluate(() =>
      localStorage.getItem("incorrectCount")
    );

    expect(correctCount === null || correctCount === "0").toBeTruthy();
    expect(incorrectCount === null || incorrectCount === "0").toBeTruthy();
  });

  test("should position action buttons in fixed locations", async ({
    page,
  }) => {
    // About button should be in bottom left
    const aboutButton = page.getByRole("button", { name: /about me/i });
    const aboutBox = await aboutButton.boundingBox();

    // Coffee button should be in bottom right
    const coffeeButton = page.getByRole("button", { name: /buy me a coffee/i });
    const coffeeBox = await coffeeButton.boundingBox();

    // Both should be visible and positioned
    expect(aboutBox).not.toBeNull();
    expect(coffeeBox).not.toBeNull();

    if (aboutBox && coffeeBox) {
      // About button should be on the left side
      expect(aboutBox.x).toBeLessThan(coffeeBox.x);
    }
  });

  test("should show tooltips on action buttons hover", async ({ page }) => {
    // Hover over About button
    const aboutButton = page.getByRole("button", { name: /about me/i });
    await aboutButton.hover();
    await page.waitForTimeout(500);

    // Tooltip should appear
    await expect(page.getByText("About me")).toBeVisible();

    // Move away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);

    // Hover over Coffee button
    const coffeeButton = page.getByRole("button", { name: /buy me a coffee/i });
    await coffeeButton.hover();
    await page.waitForTimeout(500);

    // Tooltip should appear
    await expect(page.getByText("Buy me a coffee!")).toBeVisible();
  });

  test("should have interactive button states", async ({ page }) => {
    const aboutButton = page.getByRole("button", { name: /about me/i });

    // Button should be enabled
    await expect(aboutButton).toBeEnabled();

    // Should respond to hover
    await aboutButton.hover();
    await page.waitForTimeout(200);

    // Button should still be clickable after hover
    await expect(aboutButton).toBeEnabled();
  });
});
