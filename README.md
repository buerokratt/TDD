# Automated Playwright E2E Testing Framework
This repository demonstrates large-scale, automated end-to-end testing using Playwright. Tests are generated from high-level Domain-Specific Language (DSL) definitions for each URL resource, facilitating scalable testing across complex web applications. The repository also includes automation for creating bug report issues in GitHub Projects.

## Features
- **High-Level DSL Definitions:** Define test requirements for each resource (URL) at a high level using simple DSL.
- **Automated Test Generation:** Generate Playwright tests automatically based on DSL definitions.
- **Bug Reporting Integration:** Automate bug report creation in GitHub Projects for failed tests.
- **Local Automation Framework:** The initial version leverages ChatGPT for DSL-to-test translation; the repository includes a local script to enable this process without ChatGPT.

## Folder Structure

```
├── dsl/
│   ├── example_resource.dsl      # High-level DSL definitions for each URL (resource)
├── src/
│   ├── test_generator.py         # Core script for translating DSL to Playwright tests
│   ├── bug_report.py             # Script to automate GitHub issue creation for failed tests
│   ├── playwright_tests/         # Folder containing generated Playwright test scripts
│       └── example_test.spec.js  # Example Playwright test file generated from DSL
├── .github/
│   ├── workflows/
│       └── run_tests.yml         # GitHub Actions workflow for running tests and reporting bugs
├── README.md                     # Project documentation
├── config.yml                    # Configurations for test generation, GitHub API keys, etc.
└── requirements.txt              # Python dependencies
```

## Getting Started

1. **Install Requirements:** Run `pip install -r requirements.txt` to install dependencies.
2. Define DSLs: Add DSL files for each URL in the `/DSL` folder.
3. Generate Tests: Run `python src/test_generator.py` to generate Playwright tests.
4. Run Tests: Execute generated tests using Playwright via `npx playwright test src/playwright_tests`.
5. Bug Reporting: For failed tests, `bug_report.py` will automatically log issues in GitHub Projects.

## Configuration

All configurations, including GitHub API keys and test generation settings, are managed in `config.yml`.

## Contributors
[Playwright-specific developments](https://github.com/buerokratt/TDD-Playwright/graphs/contributors)
[TDD-related developments in general](https://github.com/buerokratt/TDD/graphs/contributors)

| Name         | GitHub Username | Role                     | Contributions                        |
|--------------|-----------------|--------------------------|--------------------------------------|
| Rainer Türner     | [@turnerrainer](https://github.com/turnerrainer) | Project Lead              | Architecture |
| Markus Müüripeal   | [@T4NKER](https://github.com/T4NKER) | Developer, R&D               | Playwright tests, DSL developer, ChatGPT prompting |
| Danyil Kurbatov   | [@Danwerk](https://github.com/Danwerk) | Developer, R&D                  | Playwright tests, DSL developer, ChatGPT prompting |
| Jakob Tulve  | [@jaX10bt](https://github.com/jaX10bt) | Developer, R&D | Automating GitHub Actions |
| Mati Kljukin  | [@matKlju](https://github.com/matKlju) | Developer | Initial Playwright tests |

Feel free to contribute by extending DSL capabilities, improving test generation logic, or enhancing GitHub integration!
