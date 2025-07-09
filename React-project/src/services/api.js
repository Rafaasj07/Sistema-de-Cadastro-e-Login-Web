// --- CONFIGURAÇÃO DA API ---
import axios from 'axios'; // Importa a biblioteca Axios para fazer requisições HTTP.

// --- CRIAÇÃO DA INSTÂNCIA DO AXIOS ---
// Cria uma instância do Axios com uma configuração base.
const api = axios.create({
    // Caminho relativo
    baseURL: '/'
});

// --- EXPORTAÇÃO ---
// Exporta a instância configurada para ser usada em outras partes da aplicação.
export default api;