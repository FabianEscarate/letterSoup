import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import globals from "globals"

export default [
  { files: ["src/**/*.ts", "__tests__/**/*.ts"], ...js.configs.recommended },
  {
    files: ["src/**/*.ts", "__tests__/**/*.ts"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: { ...tsPlugin.configs.recommended.rules },
  },
  {
    files: ["__tests__/**/*.ts"],
    languageOptions: { globals: { ...globals.jest } },
  },
]