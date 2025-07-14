// --- CONFIGURAÇÃO DA API ---
// Importa a biblioteca Axios para fazer requisições HTTP.
import axios from 'axios';

// --- CRIAÇÃO DA INSTÂNCIA DO AXIOS ---
// Cria uma instância do Axios com uma URL base pré-configurada.
const api = axios.create({
    // Define o endereço base para todas as requisições feitas por esta instância.
    //Localmente: baseURL: 'http://localhost:3000'
    //Deploy: baseURL: '/'
    baseURL: 'http://localhost:3000'
});

// --- EXPORTAÇÃO ---
// Exporta a instância para ser usada em outros componentes.
export default api;