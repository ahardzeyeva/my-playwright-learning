# Project Structure Notes

| File / Folder | Description |
|---|---|
| `playwright.config.ts` | Contains Playwright settings, such as browsers, base URL, timeouts, and reporters. |
| `package.json` | Project manifest that contains the project name, scripts, and dependencies. |
| `package-lock.json` | Auto-generated file that stores the exact versions of all installed packages. |
| `node_modules/` | Contains downloaded library code and project dependencies. |
| `tests/` | Contains your Playwright test files, usually with the `.spec.ts` extension. |
| `tests-examples/` | Contains sample tests from Playwright. |
| `.gitignore` | Lists files and folders that Git should ignore, such as `node_modules/` and test reports. |
| `.github/` | Contains GitHub-related configuration, such as workflows or repository settings. |