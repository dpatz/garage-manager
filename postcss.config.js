const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./**/*.tsx", "./**/*.ts"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-preset-env"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
