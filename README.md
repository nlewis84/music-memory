# 🎼 Music Memory

This project is a single page application for Texas 3rd Grade students to practice their UIL Music Memory. In Music Memory, students must listen to a random 30 second clip of a piece of music and correctly identify the name of the composition as well as the composer.

## 🎶 Website

- Give this app a try [here](https://texasmusicmemory.com/)

## AdSense

Site connection uses `public/ads.txt`, a `google-adsense-account` meta tag, and the
`adsbygoogle.js` script in `public/index.html`.

Ad units render only when `REACT_APP_ADSENSE_ENABLED=true` and slot ids are set:

| Variable | Purpose |
|---|---|
| `REACT_APP_ADSENSE_CLIENT` | Publisher id (`ca-pub-…`); falls back to the hardcoded id |
| `REACT_APP_ADSENSE_ENABLED` | Gates visible ad units |
| `REACT_APP_ADSENSE_SLOT_TOP` | Slot above the piece cards |
| `REACT_APP_ADSENSE_SLOT_BOTTOM` | Slot below the piece cards |

## 🎵 Installation

- Download or clone this project

## 🎹 Usage

- Run `yarn`
- Run `yarn start`
- Browser should open automatically, but if not navigate to the local url provided by the application

## 🧪 Testing

Comprehensive E2E testing with Playwright (345 tests across 5 browsers).

```bash
yarn test:e2e          # Run all tests
yarn test:e2e:ui       # Interactive UI mode
yarn test:e2e:headed   # Watch tests run
```

See `e2e/README.md` for full documentation.

## 🎧 Contributing

Bug reports and pull requests are welcome on GitHub [here](https://github.com/nlewis84/music-memory). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/nlewis84/music-memory/blob/main/CODE_OF_CONDUCT.md).

## 🎤 Code of Conduct

Everyone interacting in the Music Memory project's codebase, and issue trackers is expected to follow the [code of conduct](https://github.com/nlewis84/music-memory/blob/main/CODE_OF_CONDUCT.md).
