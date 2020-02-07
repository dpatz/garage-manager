# Install Sentry

`npm install @zeit/next-source-maps @sentry/node @sentry/browser`
`npm install --save-dev @sentry/webpack-plugin`

Update [next.config.js](../next.config.js) to use source maps.
Ensure we switch which Sentry we use when running on the server vs client:

```
if (!isServer) {
  config.resolve.alias["@sentry/node"] = "@sentry/browser";
}
```

Add the [SentryWebpackPlugin](https://github.com/getsentry/sentry-webpack-plugin) to the Webpack config

Add Sentry env vars: `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` and `SENTRY_PROJECT` to both (maybe) env and build env in [now.json](../now.json)

Add a new [\_app.tsx page](/pages/_app.tsx) and [\_error.tsx page](/pages/_error.tsx). These are very similar to the [example app](https://github.com/zeit/next.js/tree/canary/examples/with-sentry-simple/pages)
