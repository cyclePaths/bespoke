module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};

//old .eslintrc file?
// {
//     "root": true,
//     "parser": "@typescript-eslint/parser",
//     "plugins": ["@typescript-eslint"],
//     "extends": [
//       "eslint:recommended",
//       "plugin:@typescript-eslint/eslint-recommended",
//       "plugin:@typescript-eslint/recommended"
//     ],
//     "rules": {

//     }
//   }
