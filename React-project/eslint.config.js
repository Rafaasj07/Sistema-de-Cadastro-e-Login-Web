// Importa configurações e plugins do ESLint.
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Exporta a configuração do ESLint.
export default [
  // Ignora o diretório de build.
  { ignores: ['dist'] },
  {
    // Aplica as regras a arquivos .js e .jsx.
    files: ['**/*.{js,jsx}'],
    // Define as opções de linguagem.
    languageOptions: {
      globals: globals.browser, // Define globais de ambiente de navegador.
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Habilita o parsing de JSX.
        sourceType: 'module',
      },
    },
    // Adiciona os plugins.
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // Define as regras de linting.
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
  },
]