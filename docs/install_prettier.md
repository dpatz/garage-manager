# Install Prettier

Install dependencies:

- `npm install --save-dev --save-exact prettier`
- `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`

Create `.prettierignore` file

- `echo ".next/" > .prettierignore`

Update ESLint
Add to the bottom of `extends`

```
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
```

Add `prettier` to `plugins` list
Add `"prettier/prettier": "error",` to `rules

Run Prettier

- `npx prettier --check '*/**/*.{js,ts,tsx}'`
- `npx prettier --write '*/**/*.{js,ts,tsx}'`

## Links

- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
