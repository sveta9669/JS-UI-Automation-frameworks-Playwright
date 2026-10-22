# JS UI Automation — Playwright

End-to-end tests for [Practice Software Testing](https://practicesoftwaretesting.com/) using [Playwright](https://playwright.dev/). Four BDD scenarios from Module 2 are automated and run in Chromium, Firefox, and WebKit (Safari engine).

## What is covered

| Spec | Scenario |
|------|----------|
| Successful item search | Search for a product and check that results appear |
| Verify product information before adding it to the cart | Open a product and check name, price, and Add to cart |
| Add a product to favorites | Log in, open a product, add it to favorites |
| Filter and sort products by price | Filter Hand Tools and sort by price ascending |

Specs live in `tests/tests.spec.js`. Config lives in `playwright.config.js`.

## Setup

Requirements: Node.js (LTS) and npm.

```bash
npm install
npx playwright install
```

On CI, browsers are installed with system dependencies:

```bash
npx playwright install --with-deps
```

## How tests run

From `playwright.config.js`:

- **Headless:** `true`
- **Browsers:** Chromium (Chrome), Firefox, WebKit (Safari)
- **Parallel workers:** `2`
- **Retries:** `2` (a failed test is retried twice before it is marked failed)
- **Reporter:** HTML (`playwright-report/`)

## Run tests (CLI)

All tests, all browsers, headless:

```bash
npx playwright test
```

One browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Override workers or retries from the CLI if needed:

```bash
npx playwright test --workers=2
npx playwright test --retries=2
```

Open the last HTML report:

```bash
npx playwright show-report
```

## Project layout

```
.
├── playwright.config.js
├── tests/
│   └── tests.spec.js
└── .github/workflows/playwright.yml
```

GitHub Actions runs `npx playwright test` on push and pull requests to `main` / `master`, then uploads the HTML report as an artifact.
