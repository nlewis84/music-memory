# E2E Tests

Playwright tests covering UI, interactions, localStorage, mobile views, YouTube integration, and accessibility.

## Quick Start

```bash
yarn test:e2e          # Run all tests
yarn test:e2e:ui       # Interactive mode (recommended)
yarn test:e2e:headed   # Watch tests run
```

## Setup

```bash
yarn install
yarn playwright install --with-deps
```

## Test Files

- `app-loading.spec.js` - Initial UI and loading states
- `grade-toggle.spec.js` - Grade selection and filtering
- `game-interactions.spec.js` - Card clicks and game mechanics
- `local-storage.spec.js` - Data persistence
- `action-buttons.spec.js` - Navigation and buttons
- `mobile-view.spec.js` - Mobile/tablet responsive
- `youtube-integration.spec.js` - Video player
- `accessibility.spec.js` - A11y and edge cases
- `card-text-visibility.spec.js` - Card content visibility
- `card-accessibility-improvements.spec.js` - **NEW**: Keyboard navigation, ARIA labels, focus indicators, Poppins font
- `no-page-reload.spec.js` - **NEW**: Smooth transitions without page reloads, instant game load
- `overlay-interaction.spec.js` - **NEW**: Clickable overlay dismissal, auto-dismiss, score updates
- `piece-selection.spec.js` - **NEW**: No repeated pieces, piece cycling logic
- `cat-gif-updates.spec.js` - **NEW**: Cat API integration, async loading, graceful degradation
- `typography-improvements.spec.js` - **NEW**: Google Fonts (Poppins/Open Sans), font weights, contrast

## Test Reliability

- **Retries**: 1 attempt for all tests, 2 for Webkit (configured in `playwright.config.js`)
- **Workers**: 4 parallel workers (optimized for stability)
- **Webkit**: Known to be slower; tests include extra timeouts and `networkidle` waits

## Adding Tests

Use `example.spec.js.template` as a starting point. Tests auto-clear localStorage and include proper waits.

## Resources

- [Playwright Docs](https://playwright.dev)
- Config: `playwright.config.js`

