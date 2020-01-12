# Install Prettier
Install dependencies:
- `npm install --save-dev --save-exact prettier`

Create `.prettierignore` file
- `echo ".next/" > .prettierignore`

Run Prettier
- `npx prettier --check "**/*.js"`
- `npx prettier --write "**/*.js"`
