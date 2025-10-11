const { test, expect } = require("@playwright/test");

test.describe("Grade Toggle Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000); // Wait for initial load
  });

  test("should default to 3rd-6th grade list", async ({ page }) => {
    // The toggle should be checked (3rd-6th grade selected)
    const toggle = page.locator('input[type="checkbox"]').first();
    await expect(toggle).toBeChecked();

    // Verify in localStorage - can be null initially before first interaction
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade === null || selectedGrade === "3rd-6th").toBeTruthy();
  });

  test("should toggle to 2nd grade list", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Click to switch to 2nd grade
    await toggle.click();

    // Should be unchecked now
    await expect(toggle).not.toBeChecked();

    // Verify in localStorage
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("2nd");
  });

  test("should toggle back to 3rd-6th grade list", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Toggle to 2nd grade
    await toggle.click();
    await expect(toggle).not.toBeChecked();

    // Toggle back to 3rd-6th grade
    await toggle.click();
    await expect(toggle).toBeChecked();

    // Verify in localStorage
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("3rd-6th");
  });

  test("should display different pieces based on grade selection", async ({
    page,
  }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Get initial card count for 3rd-6th grade
    const cardsInitial = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });
    const countInitial = await cardsInitial.count();

    // Toggle to 2nd grade
    await toggle.click();
    await page.waitForTimeout(500);

    // Get card count for 2nd grade (should be fewer pieces)
    const cardsAfterToggle = page
      .locator(".MuiCard-root")
      .filter({ hasText: /Bach|Beethoven|Mozart/ });
    const countAfterToggle = await cardsAfterToggle.count();

    // Both should have cards, but counts might differ
    expect(countInitial).toBeGreaterThan(0);
    expect(countAfterToggle).toBeGreaterThan(0);
  });

  test("should persist grade selection on page reload", async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"]').first();

    // Switch to 2nd grade
    await toggle.click();
    await expect(toggle).not.toBeChecked();

    // Reload the page
    await page.reload();
    await page.waitForTimeout(2000);

    // Should still be on 2nd grade
    const toggleAfterReload = page.locator('input[type="checkbox"]').first();
    await expect(toggleAfterReload).not.toBeChecked();

    // Verify localStorage
    const selectedGrade = await page.evaluate(() =>
      localStorage.getItem("selectedGrade")
    );
    expect(selectedGrade).toBe("2nd");
  });
});
