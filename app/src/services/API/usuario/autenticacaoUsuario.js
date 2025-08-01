import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // se a resposta demorar mais que 5 segundos, dá erro
});

export const loginAPI = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Erro ao fazer login");
    } else {
      throw new Error("Erro de conexão com o servidor");
    }
  }
};
