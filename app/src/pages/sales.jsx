import React from "react";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {ActionButton} from '../components/actionButton'


export function VendasPage() {

  const navigate = useNavigate();

  const handleButtonClick = (action) => {
    alert(`Ação selecionada: ${action}`);
  };

  const handleBackClick = () => {
    navigate(-1) ;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Botão de Voltar */}
      <div className="w-full flex items-center mt-6 ml-20">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-700 transition text-lg hover:text-red-500"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </button>
      </div>

      {/* Título da Página */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Gerenciamento de Vendas</h1>

      {/* Grid de Opções */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <ActionButton
          label="Nova Venda"
          icon={FaPlus}
          onClick={() => handleButtonClick("Nova Venda")}
          className="bg-green-500 text-white"
        />
        <ActionButton
          label="Lista de Vendas"
          icon={FaTrash}
          onClick={() => navigate("/listSales")}
          className="bg-blue-500 text-white"
        />

      </div>
    </div>
  );
}

