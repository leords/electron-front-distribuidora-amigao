
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000, // se a resposta demorar mais que 5 segundos, dá erro
})

export const clientsAPI = async (params = {}) => {

    try {
        const response = await api.get('/read-clients', { params });
        return response.data.result;
        
    } catch (error) {
        if(error.response) {
            throw new Error(error.response.data.message || 'Erro ao buscar clientes');
        } else {
            throw new Error('Erro de conexão com o servidor')
        }
    }
}