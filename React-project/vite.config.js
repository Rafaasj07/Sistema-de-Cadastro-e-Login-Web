// Importa as dependências do Vite.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Exporta a configuração do Vite.
export default defineConfig({
  // Adiciona o plugin do React para habilitar JSX e Fast Refresh.
  plugins: [react()],
})