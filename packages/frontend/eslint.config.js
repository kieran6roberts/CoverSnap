import globals from 'globals';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  {
    ignores: ['node_modules/**', 'build/**', '.react-router/**']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  // React config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      cypress: cypressPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' }
      ]
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/no-unescaped-entities': 'off'
    }
  },
  // TypeScript config
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin
    },
    languageOptions: {
      parser: tsParser
    },
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx']
        },
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-use-before-define': ['error'],
      'no-console': ['warn'],
      'import/prefer-default-export': 'off'
    }
  },
  // Node environment for config file
  {
    files: ['eslint.config.cjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
