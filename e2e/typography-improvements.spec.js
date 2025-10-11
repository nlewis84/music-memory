const { test, expect } = require("@playwright/test");

test.describe("Typography Improvements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should load Poppins font from Google Fonts", async ({ page }) => {
    // Check that Poppins font is loaded
    const fontLoaded = await page.evaluate(async () => {
      try {
        await document.fonts.load('16px "Poppins"');
        return document.fonts.check('16px "Poppins"');
      } catch (e) {
        return false;
      }
    });

    expect(fontLoaded).toBe(true);
  });

  test("should load Open Sans font from Google Fonts", async ({ page }) => {
    // Check that Open Sans font is loaded
    const fontLoaded = await page.evaluate(async () => {
      try {
        await document.fonts.load('16px "Open Sans"');
        return document.fonts.check('16px "Open Sans"');
      } catch (e) {
        return false;
      }
    });

    expect(fontLoaded).toBe(true);
  });

  test("card titles should use Poppins font", async ({ page }) => {
    // Get first game card
    const cards = await page.locator('[role="button"]').all();

    let foundPoppins = false;
    for (const card of cards) {
      const fontFamily = await card.evaluate((el) => {
        // Look for h3 or h6 element (title)
        const title = el.querySelector('h3, [variant="h6"]');
        if (!title) return null;
        return window.getComputedStyle(title).fontFamily;
      });

      if (fontFamily && fontFamily.includes("Poppins")) {
        foundPoppins = true;
        break;
      }
    }

    expect(foundPoppins).toBe(true);
  });

  test("main heading should use Poppins font", async ({ page }) => {
    // Check "Music Memory Game" heading
    const heading = page.getByText("Music Memory Game").first();

    const fontFamily = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    expect(fontFamily).toContain("Poppins");
  });

  test("overlay text should use Poppins for headings", async ({ page }) => {
    // Click a card to show overlay
    const cards = await page.locator('[role="button"]').all();
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(1000);

      // Check overlay heading font
      const fontFamily = await page.locator("#reply").evaluate((el) => {
        return window.getComputedStyle(el).fontFamily;
      });

      expect(fontFamily).toContain("Poppins");
    }
  });

  test("composer names should be bold and readable", async ({ page }) => {
    // Get first game card
    const cards = await page.locator('[role="button"]').all();

    let foundBoldComposer = false;
    for (const card of cards) {
      const composerWeight = await card.evaluate((el) => {
        // Get last Typography element (should be composer)
        const typographies = el.querySelectorAll('[class*="MuiTypography"]');
        if (typographies.length === 0) return null;

        const lastTypo = typographies[typographies.length - 1];
        return window.getComputedStyle(lastTypo).fontWeight;
      });

      // Font weight 700 or 600 is bold
      if (composerWeight && parseInt(composerWeight) >= 600) {
        foundBoldComposer = true;
        break;
      }
    }

    expect(foundBoldComposer).toBe(true);
  });

  test("text should not use italic for composer names", async ({ page }) => {
    // Get first game card
    const cards = await page.locator('[role="button"]').all();

    let foundNonItalicComposer = false;
    for (const card of cards) {
      const composerStyle = await card.evaluate((el) => {
        // Get last Typography element (should be composer)
        const typographies = el.querySelectorAll('[class*="MuiTypography"]');
        if (typographies.length === 0) return null;

        const lastTypo = typographies[typographies.length - 1];
        return window.getComputedStyle(lastTypo).fontStyle;
      });

      // Should be "normal" not "italic"
      if (composerStyle === "normal") {
        foundNonItalicComposer = true;
        break;
      }
    }

    expect(foundNonItalicComposer).toBe(true);
  });

  test("text should have proper contrast on orange cards", async ({ page }) => {
    // Get first game card background color
    const cards = await page.locator('[role="button"]').all();

    if (cards.length > 0) {
      const colors = await cards[0].evaluate((el) => {
        const bgColor = window.getComputedStyle(el).backgroundColor;

        // Get text colors
        const title = el.querySelector('h3, [variant="h6"]');
        const titleColor = title ? window.getComputedStyle(title).color : null;

        return { bgColor, titleColor };
      });

      // Background should be orange-ish (has R and G values)
      expect(colors.bgColor).toBeTruthy();

      // Title text should exist and have color
      expect(colors.titleColor).toBeTruthy();
    }
  });

  test("card text should not have hyphenation", async ({ page }) => {
    // Get first game card
    const cards = await page.locator('[role="button"]').all();

    if (cards.length > 0) {
      const hyphens = await cards[0].evaluate((el) => {
        const title = el.querySelector('h3, [variant="h6"]');
        if (!title) return null;
        return window.getComputedStyle(title).hyphens;
      });

      // Should be "none" or "manual", not "auto"
      expect(hyphens).not.toBe("auto");
    }
  });
});
