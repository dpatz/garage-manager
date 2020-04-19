const withCSS = require("@zeit/next-css");
const withSourceMaps = require("@zeit/next-source-maps")();

module.exports = withCSS(
  withSourceMaps({
    env: {
      SENTRY_DSN: process.env.SENTRY_DSN,
    },
    webpack: (config, { isServer, buildId }) => {
      // In `pages/_app.js`, Sentry is imported from @sentry/node. While
      // @sentry/browser will run in a Node.js environment, @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs#customizing-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle

      // if (isServer) {
      //   // Implementation detail of next.js, externals is an array of one function if isServer is true
      //   // This avoid a error when building the app to production ¯\_(ツ)_/¯
      //   const [externals] = config.externals;
      //   config.externals = (context, request, callback) => {
      //     if (path.isAbsolute(request)) {
      //       return callback();
      //     }
      //     return externals(context, request, callback);
      //   };
      // }

      if (!isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      const isProduction = process.env.NODE_ENV === "production";

      if (isProduction) {
        const SentryWebpackPlugin = require("@sentry/webpack-plugin");
        config.plugins.push(
          new SentryWebpackPlugin({
            release: buildId,
            include: ".next",
            // configFile: ".sentryclirc"
            urlPrefix: "/_next",
            stripPrefix: ["/.next"],
          })
        );
      }

      return config;
    },
  })
);
