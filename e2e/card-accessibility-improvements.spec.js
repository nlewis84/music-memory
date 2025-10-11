const { test, expect } = require("@playwright/test");

test.describe("Card Accessibility Improvements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("cards should be keyboard navigable", async ({ page }) => {
    // Tab to first card
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Check if a card is focused
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      return {
        role: active?.getAttribute("role"),
        tagName: active?.tagName,
      };
    });

    // Should focus on a card with role="button"
    expect(focusedElement.role).toBe("button");
  });

  test("cards should activate with Enter key", async ({ page }) => {
    // Tab to first card
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Tab");
    }

    // Press Enter to activate card
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    // Overlay should appear
    const overlay = page.locator("#overlay");
    const isVisible = await overlay.evaluate((el) => {
      return window.getComputedStyle(el).display !== "none";
    });
    expect(isVisible).toBe(true);
  });

  test("cards should activate with Space key", async ({ page }) => {
    // Tab to first card
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Tab");
    }

    // Press Space to activate card
    await page.keyboard.press("Space");
    await page.waitForTimeout(500);

    // Overlay should appear
    const overlay = page.locator("#overlay");
    const isVisible = await overlay.evaluate((el) => {
      return window.getComputedStyle(el).display !== "none";
    });
    expect(isVisible).toBe(true);
  });

  test("cards should have ARIA labels", async ({ page }) => {
    // Get all cards with role="button"
    const cards = await page.locator('[role="button"]').all();

    // Filter to only game cards (exclude action buttons)
    const gameCards = [];
    for (const card of cards) {
      const ariaLabel = await card.getAttribute("aria-label");
      if (ariaLabel && ariaLabel.includes("by")) {
        gameCards.push(card);
      }
    }

    expect(gameCards.length).toBeGreaterThan(0);

    // Check first card has proper ARIA label format
    const firstCard = gameCards[0];
    const ariaLabel = await firstCard.getAttribute("aria-label");

    // Should contain composer name format: "... by [Composer]"
    expect(ariaLabel).toContain("by");
  });

  test("cards should have visible focus indicators", async ({ page }) => {
    // Tab to first card
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Tab");
    }

    await page.waitForTimeout(300);

    // Check for focus-visible styles
    const hasFocusStyles = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;

      const styles = window.getComputedStyle(active);
      // Check for border or box-shadow (focus indicator)
      return (
        styles.borderColor !== "rgba(0, 0, 0, 0)" || styles.boxShadow !== "none"
      );
    });

    expect(hasFocusStyles).toBe(true);
  });

  test("cards should use Poppins font for titles", async ({ page }) => {
    // Get first card
    const firstCard = page.locator('[role="button"]').first();

    // Check font family of title text
    const fontFamily = await firstCard.evaluate((card) => {
      const title = card.querySelector('[variant="h6"], h3');
      if (!title) return null;
      return window.getComputedStyle(title).fontFamily;
    });

    // Should contain Poppins
    expect(fontFamily).toContain("Poppins");
  });

  test("composer names should be in bottom right", async ({ page }) => {
    // Get first card
    const cards = await page.locator('[role="button"]').all();

    let composerFound = false;
    for (const card of cards) {
      const hasComposerBottomRight = await card.evaluate((el) => {
        // Find the composer text (last Typography in card)
        const typographies = el.querySelectorAll('[class*="MuiTypography"]');
        if (typographies.length === 0) return false;

        const lastTypo = typographies[typographies.length - 1];
        const parent = lastTypo.parentElement;

        // Check if parent has flex justifyContent: flex-end
        const styles = window.getComputedStyle(parent);
        return styles.justifyContent === "flex-end";
      });

      if (hasComposerBottomRight) {
        composerFound = true;
        break;
      }
    }

    expect(composerFound).toBe(true);
  });
});
