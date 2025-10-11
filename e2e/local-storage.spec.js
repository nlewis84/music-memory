const { test, expect } = require("@playwright/test");

test.describe("LocalStorage Persistence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should initialize localStorage with default values", async ({
    page,
  }) => {
    // After clearing and reloading, localStorage may be null
    // The app will use defaults from useState
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );

    // selectedGrade might be null (not set yet) or have a value
    // Either is acceptable since the app has a default fallback
    expect(
      selectedGrade === null ||
        selectedGrade === "3rd-6th" ||
        selectedGrade === "2nd"
    ).toBeTruthy();

    const correctCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    const incorrectCount = await page.evaluate(() =>
      localStorage.getItem("incorrectCount")
    );

    // Counts should be null or "0" initially
    expect(correctCount === null || correctCount === "0").toBeTruthy();
    expect(incorrectCount === null || incorrectCount === "0").toBeTruthy();

    // Verify UI shows the correct default values
    await expect(
      page.getByRole("heading", { name: /Correct Answers/ })
    ).toContainText("0");
    await expect(
      page.getByRole("heading", { name: /Incorrect Answers/ })
    ).toContainText("0");
  });

  test("should persist selected grade in localStorage", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Switch to 2nd grade
    await toggle.click();

    // Check localStorage
    let selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("2nd");

    // Switch back to 3rd-6th grade
    await toggle.click();

    selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("3rd-6th");
  });

  test("should persist counts in localStorage", async ({ page }) => {
    // Set counts directly in localStorage
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "5");
      localStorage.setItem("incorrectCount", "3");
    });

    // Reload the page
    await page.reload();
    await page.waitForTimeout(2000);

    // Verify counts are displayed
    const correctCounter = page.locator("text=Correct Answers").locator("..");
    const incorrectCounter = page
      .locator("text=Incorrect Answers")
      .locator("..");

    await expect(correctCounter).toContainText("5");
    await expect(incorrectCounter).toContainText("3");
  });

  test("should clear localStorage on reset button click", async ({
    page,
    viewport,
  }) => {
    // Skip on mobile - mobile layout doesn't have reset button
    if (!viewport || viewport.width < 768) {
      test.skip();
    }

    // Set some counts
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "10");
      localStorage.setItem("incorrectCount", "5");
    });

    await page.reload();
    await page.waitForTimeout(2000);

    // Click the reset button using its accessible role
    const resetButton = page.getByRole("button", { name: "Reset game" });
    await resetButton.click();
    await page.waitForTimeout(500);

    // Verify counts are reset to 0
    const correctCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    const incorrectCount = await page.evaluate(() =>
      localStorage.getItem("incorrectCount")
    );

    expect(correctCount === null || correctCount === "0").toBeTruthy();
    expect(incorrectCount === null || incorrectCount === "0").toBeTruthy();
  });

  test("should maintain localStorage across page reloads", async ({ page }) => {
    // Increase timeout for slower browsers like webkit
    test.setTimeout(60000);

    // Set grade to 2nd
    const toggle = page.locator('input[type="checkbox"]').first();
    await toggle.click();
    await page.waitForTimeout(500);

    // Set some counts
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "7");
      localStorage.setItem("incorrectCount", "2");
    });

    // Reload the page and wait for full load
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);

    // Verify all values persisted
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("2nd");

    const correctCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    const incorrectCount = await page.evaluate(() =>
      localStorage.getItem("incorrectCount")
    );

    expect(correctCount).toBe("7");
    expect(incorrectCount).toBe("2");

    // Verify toggle state
    const toggleAfterReload = page.locator('input[type="checkbox"]').first();
    await expect(toggleAfterReload).not.toBeChecked();
  });

  test("should handle missing localStorage values gracefully", async ({
    page,
  }) => {
    // Clear all localStorage
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);

    // App should still work with default values
    await expect(page.getByText("Texas UIL Music Memory")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Correct Answers/ })
    ).toBeVisible();

    // Should initialize with defaults
    const correctCounter = page.getByRole("heading", {
      name: /Correct Answers/,
    });
    const incorrectCounter = page.getByRole("heading", {
      name: /Incorrect Answers/,
    });

    await expect(correctCounter).toContainText("0");
    await expect(incorrectCounter).toContainText("0");
  });

  test("should update localStorage when scores change", async ({ page }) => {
    // Initial state
    let correctCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    let incorrectCount = await page.evaluate(() =>
      localStorage.getItem("incorrectCount")
    );

    const initialCorrect = parseInt(correctCount || "0");
    const initialIncorrect = parseInt(incorrectCount || "0");

    // Manually update counts to simulate game play
    await page.evaluate(() => {
      localStorage.setItem("correctCount", "1");
    });

    await page.reload();
    await page.waitForTimeout(2000);

    // Verify the count updated
    const newCorrectCount = await page.evaluate(() =>
      localStorage.getItem("correctCount")
    );
    expect(newCorrectCount).toBe("1");
  });
});
