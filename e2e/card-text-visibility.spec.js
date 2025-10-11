const { test, expect } = require("@playwright/test");
const { MUSIC_MEMORY_PIECES } = require("../src/helpers/musicSetup");

test.describe("Game Card Text Visibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(2000);
  });

  test("should display all card text without truncation", async ({ page }) => {
    // Wait for cards to load
    await page.waitForSelector(".MuiCard-root", { state: "attached" });

    // Get all game cards
    const cards = page.locator(".MuiCard-root");
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThan(0);

    // Check the first few cards for text truncation
    for (let i = 0; i < Math.min(3, cardCount); i++) {
      const card = cards.nth(i);

      // Get the card's text content
      const cardText = await card.textContent();

      // Check if the card has ellipsis (text-overflow indicator)
      const hasEllipsis = await card.evaluate((el) => {
        // Check all text elements within the card
        const textElements = el.querySelectorAll("*");
        for (const element of textElements) {
          const styles = window.getComputedStyle(element);

          // Check if text-overflow: ellipsis is applied
          if (styles.textOverflow === "ellipsis") {
            return true;
          }

          // Check if text is actually overflowing
          if (element.scrollWidth > element.clientWidth) {
            return true;
          }

          // Check if overflow is hidden
          if (
            styles.overflow === "hidden" &&
            element.scrollHeight > element.clientHeight
          ) {
            return true;
          }
        }
        return false;
      });

      // This assertion should FAIL if text is truncated
      expect(hasEllipsis).toBe(false);

      // Also check that long titles from the data are actually visible
      // Find pieces with long major works or selections
      const longPieces = MUSIC_MEMORY_PIECES.filter(
        (piece) => piece.majorWork.length > 40 || piece.selection.length > 30
      );

      if (longPieces.length > 0) {
        // Check if at least one long piece is fully displayed
        const longPiece = longPieces[0];

        if (longPiece.majorWork) {
          const majorWorkCard = page
            .locator(".MuiCard-root")
            .filter({ hasText: longPiece.majorWork.substring(0, 20) });

          if ((await majorWorkCard.count()) > 0) {
            const fullText = await majorWorkCard.first().textContent();

            // Check that the full major work title is present (not truncated)
            // This will FAIL if the text is cut off with ellipsis
            expect(fullText).toContain(longPiece.majorWork);
          }
        }
      }
    }
  });

  test("should display full text for 'Missa Hodie Christus natus est' card", async ({
    page,
  }) => {
    // Specifically test the card from the screenshot
    const palestrinaPiece = MUSIC_MEMORY_PIECES.find(
      (piece) => piece.composer === "Palestrina"
    );

    if (palestrinaPiece) {
      const card = page
        .locator(".MuiCard-root")
        .filter({ hasText: "Palestrina" });

      await expect(card.first()).toBeVisible();

      // Get the actual text content
      const cardText = await card.first().textContent();

      // These assertions should FAIL if text is truncated
      expect(cardText).toContain(palestrinaPiece.majorWork);
      expect(cardText).toContain(palestrinaPiece.selection);
      expect(cardText).toContain(palestrinaPiece.composer);

      // Check for text overflow on this specific card
      const hasOverflow = await card.first().evaluate((el) => {
        const allTextElements = el.querySelectorAll("*");
        for (const element of allTextElements) {
          if (
            element.scrollWidth > element.clientWidth ||
            element.scrollHeight > element.clientHeight
          ) {
            const styles = window.getComputedStyle(element);
            if (
              styles.overflow === "hidden" ||
              styles.textOverflow === "ellipsis"
            ) {
              return true;
            }
          }
        }
        return false;
      });

      // This should FAIL - text is currently truncated
      expect(hasOverflow).toBe(false);
    }
  });

  test("should not use text-overflow ellipsis on any card text", async ({
    page,
  }) => {
    await page.waitForSelector(".MuiCard-root", { state: "attached" });

    // Check all cards for ellipsis styling
    const cardsWithEllipsis = await page.evaluate(() => {
      const cards = document.querySelectorAll(".MuiCard-root");
      const results = [];

      cards.forEach((card, index) => {
        const allElements = card.querySelectorAll("*");
        allElements.forEach((el) => {
          const styles = window.getComputedStyle(el);
          if (
            styles.textOverflow === "ellipsis" ||
            styles.overflow === "hidden"
          ) {
            // Check if element has text content
            if (el.textContent && el.textContent.trim().length > 0) {
              results.push({
                cardIndex: index,
                text: el.textContent.substring(0, 50),
                hasEllipsis: styles.textOverflow === "ellipsis",
                hasOverflowHidden: styles.overflow === "hidden",
              });
            }
          }
        });
      });

      return results;
    });

    // This should FAIL - there are currently cards with ellipsis
    expect(cardsWithEllipsis.length).toBe(0);
  });

  test("should ensure card height is sufficient to show all text content", async ({
    page,
  }) => {
    await page.waitForSelector(".MuiCard-root", { state: "attached" });

    // Find the Palestrina card specifically (from the screenshot)
    const palestrinaCard = page
      .locator(".MuiCard-root")
      .filter({ hasText: "Palestrina" });

    if ((await palestrinaCard.count()) > 0) {
      const card = palestrinaCard.first();

      // Get card and content dimensions
      const dimensions = await card.evaluate((el) => {
        const cardBox = el.getBoundingClientRect();
        const textElements = Array.from(el.querySelectorAll("*")).filter(
          (e) => e.textContent && e.textContent.trim().length > 0
        );

        let maxContentBottom = 0;
        const clippedElements = [];

        textElements.forEach((element) => {
          const elementBox = element.getBoundingClientRect();
          const styles = window.getComputedStyle(element);

          // Check if element extends beyond card boundaries
          if (elementBox.bottom > cardBox.bottom) {
            clippedElements.push({
              text: element.textContent.substring(0, 50),
              elementBottom: elementBox.bottom,
              cardBottom: cardBox.bottom,
              clippedBy: elementBox.bottom - cardBox.bottom,
            });
          }

          // Check if element is cut off horizontally
          if (elementBox.right > cardBox.right) {
            clippedElements.push({
              text: element.textContent.substring(0, 50),
              elementRight: elementBox.right,
              cardRight: cardBox.right,
              clippedBy: elementBox.right - cardBox.right,
              direction: "horizontal",
            });
          }

          maxContentBottom = Math.max(maxContentBottom, elementBox.bottom);
        });

        return {
          cardHeight: cardBox.height,
          cardWidth: cardBox.width,
          contentExtendsTo: maxContentBottom,
          isClipped: maxContentBottom > cardBox.bottom,
          clippedElements,
        };
      });

      console.log("Card dimensions:", dimensions);

      // This should FAIL - content extends beyond card boundaries
      expect(dimensions.isClipped).toBe(false);
      expect(dimensions.clippedElements.length).toBe(0);
    }
  });

  test("should display complete text for all long titles without clipping", async ({
    page,
  }) => {
    await page.waitForSelector(".MuiCard-root", { state: "attached" });

    // Get all cards and check for clipped content
    const clippingIssues = await page.evaluate(() => {
      const cards = document.querySelectorAll(".MuiCard-root");
      const issues = [];

      cards.forEach((card, index) => {
        const cardBox = card.getBoundingClientRect();
        const cardStyles = window.getComputedStyle(card);

        // Check if card has overflow hidden
        if (cardStyles.overflow === "hidden") {
          // Check all child elements
          const children = card.querySelectorAll("*");
          children.forEach((child) => {
            const childBox = child.getBoundingClientRect();

            // Check if content is clipped
            if (
              childBox.bottom > cardBox.bottom ||
              childBox.right > cardBox.right ||
              childBox.top < cardBox.top ||
              childBox.left < cardBox.left
            ) {
              issues.push({
                cardIndex: index,
                cardText: card.textContent.substring(0, 60),
                cardHeight: cardBox.height,
                contentHeight:
                  Math.max(
                    ...Array.from(children).map(
                      (c) => c.getBoundingClientRect().bottom
                    )
                  ) - cardBox.top,
                overflowType: cardStyles.overflow,
              });
            }
          });
        }
      });

      return issues;
    });

    console.log("Clipping issues found:", clippingIssues);

    // This should FAIL if cards are clipping content
    expect(clippingIssues.length).toBe(0);
  });
});
