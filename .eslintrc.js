module.exports = {
  env: {
    browser: true,
    es6: true,
    "cypress/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  globals: {
    // Atomics: "readonly",
    // SharedArrayBuffer: "readonly",
    process: true,
    require: true,
    module: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "cypress", "prettier"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off"
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-var-requires": ["error"]
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
};
