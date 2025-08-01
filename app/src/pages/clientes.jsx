import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { buscarClientesAPI } from "../services/API/cliente/buscarClientes.js";

export function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    cidade: "",
    vendedor: "",
    diaAtendimento: "",
    status: "",
  });

  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = async () => {
    try {
      const params = {
        name: filtros.nome,
        city: filtros.cidade,
        salesman: filtros.vendedor,
        serviceDay: filtros.diaAtendimento,
        status: filtros.status,
      };
      const data = await buscarClientesAPI(params);
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const tratarEventos = (e) => {
    const { name, value } = e.target;

    setFiltros((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === ""
            ? undefined
            : value === "true"
            ? true
            : false
          : value,
    }));
  };

  const buscar = () => {
    buscarClientes();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800 flex justify-center">
      <div className="w-full md:w-[80%]">
        {/* Botão de voltar */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="transition flex items-center gap-2 py-2 px-2 rounded-md"
          >
            <FaArrowLeft />
          </button>
        </div>

        {/* Painel de Filtros */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <input
            type="text"
            name="name"
            value={filtros.nome}
            onChange={tratarEventos}
            placeholder="Buscar por nome"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="city"
            value={filtros.cidade}
            onChange={tratarEventos}
            placeholder="Buscar por cidade"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="salesman"
            value={filtros.vendedor}
            onChange={tratarEventos}
            placeholder="Buscar por vendedor"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="serviceDay"
            value={filtros.diaAtendimento}
            onChange={tratarEventos}
            placeholder="Buscar por dia de visita"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            name="status"
            value={filtros.status}
            onChange={tratarEventos}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Todos</option>
            <option value="true">Ativos</option>
            <option value="false">Inativos</option>
          </select>
          <button
            onClick={buscar}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </div>

        {/* Títulos */}
        <div className="grid grid-cols-8 gap-4 px-2 text-sm font-semibold text-gray-600 border-b pb-2">
          <span>ID</span>
          <span>Nome</span>
          <span>Telefone</span>
          <span>Endereço</span>
          <span>Cidade</span>
          <span>Vendedor</span>
          <span>Atendimento</span>
          <span>Status</span>
        </div>

        {/* Lista de clientes */}
        <div className="divide-y mt-2">
          {clientes.length > 0 ? (
            clientes.map((client) => (
              <div
                key={client.id}
                className="grid grid-cols-8 gap-4 px-2 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                <span>{client.id}</span>
                <span>{client.name}</span>
                <span>{client.phone}</span>
                <span>{client.address}</span>
                <span>{client.city}</span>
                <span>{client.salesman}</span>
                <span>{client.serviceDay}</span>
                <span
                  className={
                    client.status === true ? "text-green-600" : "text-red-600"
                  }
                >
                  {client.status === true ? "Ativo" : "Inativo"}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Nenhum cliente encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clientes;
