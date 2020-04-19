# Setup CircleCI/Cypress Reporting

[Good example](https://github.com/cypress-io/cypress-example-circleci-orb)

## Install dependencies

`npm install --save-dev mocha mocha-junit-reporter cypress-multi-reporters`

## Add new `reporter-config.json` file with the following content

```
{
  "reporterEnabled": "spec, mocha-junit-reporter",
  "reporterOptions": {
    "mochaFile": "cypress/results/results-[hash].xml"
  }
}
```

## Update `circleci/config.yml` under `cypress/run` adding two new directives

```
command: npm run test_with_reporting
post-steps:
  - store_test_results:
      path: cypress/results
```
