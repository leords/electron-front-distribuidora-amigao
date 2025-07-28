import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cartsAPI } from "../services/sales";
import { clientsAPI } from "../services/clients";
import { paymentsAPI } from "../services/payments";
import { usersAPI } from "../services/user";
import dayjs from "dayjs";

export function ListSales() {
  const navigate = useNavigate();

  const [cart, setCarts] = useState([]);
  const [client, setClient] = useState([]);
  const [user, setUser] = useState([]);
  const [payment, setPayment] = useState([]);

  const [filters, setFilters] = useState({
    client: "",
    user: "",
    payment: "",
    status: "",
    filterType: "orders",
  });

  useEffect(() => {
    async function fetchOptionsFilters() {
      try {
        const [clientsData, usersData, paymentsData] = await Promise.all([
          clientsAPI(),
          usersAPI(),
          paymentsAPI(),
        ]);

        setClient(clientsData);
        setUser(usersData);
        setPayment(paymentsData);
      } catch (error) {
        console.error("Erro ao carregar filtros:", error);
      }
    }

    fetchOptionsFilters();
  }, []);

  const fetchProducts = async () => {
    try {
      const params = {
        client: filters.client,
        payment: filters.payment,
        salesman: filters.user,
        status: filters.status,
        filterType: filters.filterType,
      };

      const data = await cartsAPI(params);
      setCarts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // ele captura o valor do input que dispatou o evento, ou seja teve alteração
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchProducts();
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
            Voltar
          </button>
        </div>

        {/* Painel de Filtros */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <select
            name="client"
            value={filters.client}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Clientes</option>
            {client.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="user"
            value={filters.user}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Vendedores</option>
            {user.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <select
            name="payment"
            value={filters.payment}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Formas de pagamento</option>
            {payment.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          >
            <option value="">Todos os status</option>
            <option value="carregado">Carregado</option>
            <option value="entregue">Entregue</option>
            <option value="devolvido">Devolvido</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </div>

        {/* Títulos */}
        <div className="grid grid-cols-6 gap-4 px-2 text-sm font-semibold text-gray-600 border-b pb-2 mt-20">
          <span>Data</span>
          <span>Nome</span>
          <span>Total</span>
          <span>Pagamento</span>
          <span>Status</span>
          <span>Vendedor</span>
        </div>

        {/* Lista de carrinhos */}
        <div className="divide-y mt-2">
          {cart.length > 0 ? (
            cart.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-6 gap-4 px-2 py-2 text-xs text-gray-700 hover:bg-gray-100"
                onClick={() =>
                  navigate(`/listCarts/${c.id}`, {
                    state: {
                      total: c.total,
                      formaPagamento: c.payment.name,
                      data: c.createdAt,
                      load: c.load,
                      user: c.user.name,
                      client: c.client.name,
                      city: c.client.city,
                      clientId: c.clientId,
                    },
                  })
                }
              >
                <span>{dayjs(c.createdAt).format("DD/MM/YYYY")}</span>
                <span>{c.client.name}</span>
                <span>R$ {parseFloat(c.total).toFixed(2)}</span>
                <span>{c.payment.name.toUpperCase()}</span>
                <span
                  className={
                    c.statusDelivery === "entregue"
                      ? "text-green-600"
                      : c.statusDelivery === "carregado"
                      ? "text-blue-600"
                      : "text-red-600"
                  }
                >
                  {c.statusDelivery.toUpperCase()}
                </span>
                <span>{c.user.name.toUpperCase()}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Nenhum carrinho encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
