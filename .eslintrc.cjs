module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': ['error', 2], // Indentación de 2 espacios (ajusta según prefieras)
    'eol-last': ['error', 'always'], // Línea en blanco al final de archivos
    'semi': ['error', 'always'], // Punto y coma al final de declaraciones
    'quotes': ['error', 'single'], // Comillas simples en strings
    'space-before-function-paren': ['error', 'always'], // Espacios en blanco en funciones
    'no-unused-vars': 'error', // Variables no utilizadas
    'max-len': [
      'error',
      {
        code: 100
      },
    ],
  },
}
