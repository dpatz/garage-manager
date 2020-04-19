# Install TypeScript

Install dependencies:

- `npm install --save-dev typescript @types/react @types/node`

Change your index page from `index.js` to `index.tsx` and `npm run dev`. This will generate a `tsconfig.json` file. Update open up `tsconfig.json` and change `strict` to `true`.

## Note

There was some weirdness when setting up Cypress with TypeScript. I had to create a `tsconfig.base.json` file that did not have the `isolatedModules` value set in `compilerOptions`. Then in my main `tsconfig.json` file, I set it and ignored the `cypress` directory. Inside the `cypress` directory, I created a tsconfig.json file and inherited from the `tsconfig.base.json` file in the root. The reason I had to do this was because when running `tsc`, it would fail on the Cypress test files complaining that "all files must be modules".
