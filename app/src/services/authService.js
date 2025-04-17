import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000, // se a resposta demorar mais que 5 segundos, dá erro

})

export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro de conexão com o servidor')
        }
    }
};
