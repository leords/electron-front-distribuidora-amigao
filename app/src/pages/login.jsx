
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_amigao.png'
import React, { useState } from 'react';
import { login } from '../services/authService';

// Página de login
export function LoginPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);


// Nageva para a Home após o login
  async function handleLogin(event) {
    event.preventDefault();

  try {
    setLoading(true);
    const userData = await login({email, password});
    console.log('Usuário autenticado', userData);
    console.log('Name', userData.result.user.name)

      // Aqui você poderia salvar o token no localStorage, se retornar um
      // localStorage.setItem('token', userData.token);

    navigate('/home')
    
  } catch (error) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
} 
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Coluna Esquerda: Nome do Sistema */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-red-400 to-red-600 text-white">
        <h1 className="text-xl font-light tracking-wide mb-4">Bem-vindo ao sistema de vendas</h1>
        <h1 className="text-6xl font-light tracking-wide">SysNext</h1>
      </div>

      {/* Coluna Direita: Logo e Formulário */}
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo Amigão Distribuidora"
              className="h-44"
            />
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="login"
                className="block mb-1 text-sm text-gray-600"
              >
                Usuário
              </label>
              <input
                type="text"
                id="login"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
                placeholder="Digite seu login"
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-1 text-sm text-gray-600"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full mb-8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
                placeholder="Digite sua senha"
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              
              type="submit"
              className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              { loading ? 'Entrando...' : 'Entrar' }
            </button>
          </form>

          {/* Rodapé */}
          <footer className="mt-6 text-center text-sm text-gray-500">
            © 2025 Amigão Distribuidora. Todos os direitos reservados por leords
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
