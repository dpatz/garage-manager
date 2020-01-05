# Installing Tailwind CSS
Install dependencies:
- `npm install --save-dev tailwindcss postcss-preset-env`
- `npm install @zeit/next-css`
- `npx tailwind init`

Add the following to `next.config.js`:
```
const withCSS = require('@zeit/next-css')

module.exports = withCSS({})
```

Add the following to `postcss.config.js`:
```
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env'),
  ]
}
```

Add the following to `styles/index.css`:
```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Add `import '../styles/index.css';` to any page you want to use Tailwind
