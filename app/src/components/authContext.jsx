import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // verificar o token ao carregar o componente
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token) {
      setUser({ nome: userName });
    }
  }, []);

  const login = (userData) => {
    // Armazenando os dados do usuário e token no localStorage
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userName", userData.user.name);
    setUser(userData.user);
  };

  const logout = (navigate) => {
    // Remover do localStorage e limpar o estado
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
