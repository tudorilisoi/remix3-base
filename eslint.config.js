import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  // ignore RR types because no-empty-object-type
  globalIgnores([".data", "build", '\\./\\+*']),
  // pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["app/**/*.{ts,tsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],

  },

  { languageOptions: { globals: globals.browser } },
  eslintConfigPrettier,
  {
    "rules": {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/prop-types": "off",
      "no-unused-vars": "warn",

    }
  },

])

