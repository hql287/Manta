import prettier from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import' // Added import for import-plugin
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ),
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    plugins: {
      prettier,
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      import: importPlugin,
    },

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        alias: {
          map: [
            ['@eMain', './electron/main'],
            ['@eWindows', './electron/windows'],
            ['@eUtils', './electron/utils'],
            ['@uiConstants', './src/constants'],
            ['@uiTypes', './src/types'],
            ['@uiHelpers', './src/helpers'],
            ['@uiLibs', './src/libs'],
            ['@uiStatic', './src/static'],
            ['@uiWindows', './src/windows'],
            ['@uiSharedComponents', './src/windows/main/components/shared'],
            ['@uiMainStore', 'src/windows/main/store'],
            ['@uiMainComponents', 'src/windows/main/components'],
            ['@uiMainPages', 'src/windows/main/pages'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'avoid',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'warn',
    },
  },
]
