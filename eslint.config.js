import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
      "indent":[ "warn",  2],
      "comma-spacing": "warn",
      "no-multiple-empty-lines": ["warn", { max: 1 }],
      "no-trailing-spaces": "warn",
      "operator-linebreak": "warn",
      "block-spacing": "warn",
      "camelcase": "warn",
      "comma-dangle": "warn",
      "func-call-spacing": "warn"
    }
  }
]
