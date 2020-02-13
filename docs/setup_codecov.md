# Setup CodeCov

`npm install --save-dev @cypress/code-coverage nyc istanbul-lib-coverage codecov babel-plugin-istanbul @zeit/next-typescript`

Add .babelrc file:

```
{
  "presets": ["next/babel", "@zeit/next-typescript/babel"],
  "plugins": ["istanbul"]
}
```

Update CircleCI config.yml file:
New job:

```
  store_coverage:
    executor: cypress/base-10
    steps:
      - attach_workspace:
          at: ~/
      - run: npx codecov
```

Follow instructions [here](https://github.com/cypress-io/code-coverage)
