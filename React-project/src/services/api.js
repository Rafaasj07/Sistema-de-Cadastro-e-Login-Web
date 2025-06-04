import axios from 'axios' // Coneção com o back usando a biblioteca axios

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api //Exporto para as minhas páginas acessarem o back