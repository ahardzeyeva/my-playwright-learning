# Playwright CLI Commands

| Command | Description |
|---|---|
| `npx playwright test` | Runs all tests across all configured browsers in headless mode. |
| `npx playwright test --ui` | Opens Playwright UI Mode, which is best for local development and debugging. |
| `npx playwright test --headed` | Shows the browser window while tests are running. |
| `npx playwright test --project=chromium` | Runs tests only in Chromium, skipping Firefox and WebKit, which makes the run faster. |
| `npx playwright test login.spec.ts` | Runs only the tests from the `login.spec.ts` file. |
| `npx playwright test -g "login"` | Runs only tests whose name matches `login`. |
| `npx playwright show-report` | Opens the last HTML test report in a browser. |
| `npx playwright install` | Downloads the required browsers: Chromium, Firefox, and WebKit. Usually needed only once. |