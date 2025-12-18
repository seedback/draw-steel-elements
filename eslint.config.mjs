import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import vuePlugin from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import preferSpecificAlias from "./eslint-rules/prefer-specific-alias.js";

export default [
  {
    ignores: [
      "node_modules/",
      "main.js",
      "src/drawSteelAdmonition",
      "src/views"
    ]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "custom": { rules: { "prefer-specific-alias": preferSpecificAlias } }
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module"
      }
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-empty-function": "off",
      "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "custom/prefer-specific-alias": "warn"
    }
  },
  eslintConfigPrettier,
  {
    files: ["**/*.vue"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "vue": vuePlugin,
      "custom": { rules: { "prefer-specific-alias": preferSpecificAlias } }
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-empty-function": "off",
      "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "custom/prefer-specific-alias": "warn"
    }
  }
];

