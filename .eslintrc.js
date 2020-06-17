// module.exports = {
//   root: true,
//   extends: '@react-native-community',
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
// };
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    // "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  rules: {
    "prettier/prettier": "warn",
    "linebreak-style": ["warn", "unix"],
    "linebreak-style": ["error", "windows"],
    "semi": ["warn", "never"],
    "no-console": "off",
    "quotes": [2, "single"],
    "@typescript-eslint/explicit-function-return-type": 2,
    "no-undef": "off",
    "@typescript-eslint/no-use-before-define": "off"
  }
}
