module.exports = {
  root: true,
  env: {
    node: true,
    es2017: true,
  },
  ignorePatterns: ["node_modules/*", "build/*", ".out/*", "!.prettierrc.js"], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es2017: true,
        jest: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript rules
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "prettier/@typescript-eslint", // Prettier plugin
        "plugin:prettier/recommended", // Prettier recommended rules
      ],
      rules: {
        "react/prop-types": "off", // We will use TypeScript's types for component props instead
        "react/react-in-jsx-scope": "off", // No need to import React when using Next.js
        "jsx-a11y/anchor-is-valid": "off", // This rule is not compatible with Next.js's <Link /> components
        "@typescript-eslint/no-unused-vars": ["error"], // Why would you want unused vars?
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "prettier/prettier": [
          "error",
          { endOfLine: "auto" },
          { usePrettierrc: true },
        ], // Includes .prettierrc.js rules
      },
    },
  ],
};
