# API testing Framework using Playwright

This repository contains a **Playwright-based testing framework** designed for automating **API** testing. It uses Javascript. The framework is built to provide a robust, flexible, and easy-to-use solution for testing modern web applications and APIs.

## Features

- **API Automation**: Perform tests for RESTful APIs, handle request/response validation, and automate HTTP requests with Playwright.
- **Data-driven Testing**: Easily integrate CSV/JSON data sources to run the same tests with different inputs.
- **Extensible**: Easily extendable to integrate with other tools and frameworks as needed.
- **CI/CD Integration**: Integrate seamlessly with CI/CD pipelines like Jenkins, GitHub Actions, GitLab CI, etc.

---

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Writing Tests](#writing-tests)
  - [API Tests](#api-tests)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Reports & Logs](#reports--logs)
- [Extending the Framework](#extending-the-framework)
- [Future Enhancements](#future-enhancements)
---

## Installation

To set up the testing framework locally, follow the steps below.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tkandolkar/api-testing-framework.git
   cd api-testing-framework
   ```

2. **Install dependencies**:

    Use npm to install the required dependencies:
    ```
    npm install
    ```
3. **Install Playwright browsers**:

    Run the following command to install the required browser binaries (Chromium, Firefox and, WebKit):
    
    ```
    npx playwright install
    ```
## Project Structure

```
└── 📁api-testing-framework
    └── 📁api                                       
        └── apiClient.js                        # Utility functions to build HTTP requests                                     
        └── requestBuilder.js                   # Utility functions to build HTTP request                                     
    └── 📁testData                              # Data needed for data-driven tests                                    
        └── currencies.csv                                       
    └── 📁tests                                 # Main location for all API tests                                       
        └── 📁valetApiTests                                       
            └── 📁listsApi                      # Tests for lists API                                     
            └── 📁observationsApi                                        
                └── observationsApiSchema.json   # Schema of observations API                                      
                └── observationsApiTests.spec.js # Tests for observations API testing                                 
                └── observationsApiUtils.js      # Utility functions needed for observations API testing
                └── observationsSchema.js        # Functions for validating schema                              
            ├── seriesApi                       # Tests for series API                                     
    └── 📁utils                                       
        └── dataUtils.js                         # Helper functions for data manipulation                                    
        └── testUtils.js                         # Helper functions for API testing                                    
    └── package.json                                       
    └── playwright.config.js                     # Main Playwright configuration file                                    
    └── README.md                                # Project documentation

```

## Writing Tests

### API Tests
To write API tests, you can create test files in the tests/ directory under the appropriate folder. Playwright provides the request API to interact with RESTful services and perform assertions on the responses.

### Data-Driven Testing

You can also use external data sources like CSV or JSON to run the same tests with different inputs. This is helpful for testing a variety of scenarios.

## Running Tests
To run your tests, simply execute the following command:
```
npx playwright test
```
By default, this command will run all tests in the tests/ directory on all supported browsers (Chromium, Firefox, WebKit).

You can also specify which tests or browsers to run with additional flags:

- Run tests on a specific browser:
```
npx playwright test --project=firefox
```
 - Run tests in a specific directory:

```
npx playwright test tests/valetApiTests/observationsApi/observationsApiTests.spec.js
```

- Run tests with a specific tag (if using tags):
```
npx playwright test --grep @smoke
```

## Configuration
You can configure different settings like test directory location, timeouts, retry count, and other parameters in the playwright.config.js file.

## Reports & Logs

### Logging
Logging has not been implemented and at the moment logs are printed to the console.

### Reporting
A third-party reporting tool named "Allure" has been integrated into this framework. Allure Report is a popular open source tool for visualizing the results of a test run. It produces reports that can be opened anywhere and can be read by anyone, no deep technical knowledge required.

Follow below steps to generate test reports using Allure:

1. Run the test using below command
```
npx playwright test --reporter=allure-playwright
```

2. Generate the reports
```
npx allure generate ./allure-results
```
3. Open the reports for viewing
```
allure open
```

## Extending the Framework
The framework is designed to be extensible and allows you to:

- Add UI automation tests and helpers
- Create reusable API functions
- Integrate with other tools like Allure for enhanced reporting.
- Integrate with CI/CD

## Future Enhancements
1. Incorporate better logging mechanism (add more logs, redirect logs to files etc) preferably by using a third-party tool like Winston
2. Add better exception handling
3. Better test data organization (in csv files) for running parameterized tests
4. Add performance and security tests


