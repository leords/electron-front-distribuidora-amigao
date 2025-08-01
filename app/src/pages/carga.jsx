import { useState, useEffect } from "react";
import axios from "axios";
import { BuscarCargas } from "../services/API/carga/buscarCargas";
import { useImprimirPedidos } from "../services/Print/useImprimirPedidosPorCargaTermica";

export function Carga() {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    vehicle: "",
    status: "",
  });

  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [error, setError] = useState(null);

  const { imprimirPedidos } = useImprimirPedidos();

  const fetchLoads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BuscarCargas({
        createdFrom: filters.from || undefined,
        createdUntil: filters.to || undefined,
        vehiclesId: filters.vehicle ? Number(filters.vehicle) : undefined,
        status: filters.status || undefined,
      });
      console.log("Data: ", data);
      setLoads(data);
      console.log("Loads: ", loads.result.carts);
      setSelectedLoad(null);
      setSelectedCart(null);
    } catch (err) {
      setError("Erro ao carregar cargas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="ID Veículo"
          value={filters.vehicle}
          onChange={(e) => setFilters({ ...filters, vehicle: e.target.value })}
          className="border p-2"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border p-2"
        >
          <option value="">Todos</option>
          <option value="aberta">Aberta</option>
          <option value="fechada">Fechada</option>
          {/* ajuste conforme seus status */}
        </select>
        <button
          onClick={fetchLoads}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Buscar"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Lista de cargas */}
      <div className="space-y-2 mb-6">
        {loads.length === 0 && !loading && <p>Nenhuma carga encontrada.</p>}
        {loads.map((load) => (
          <div
            key={load.id}
            className={`p-4 border rounded cursor-pointer ${
              selectedLoad?.id === load.id ? "bg-blue-100" : ""
            }`}
            onClick={() => {
              setSelectedLoad(load);
              setSelectedCart(null);
            }}
          >
            <div>
              <strong>Carga #{load.id}</strong> - {load.name}
            </div>
            <div>
              Veículo: {load.vehicle?.model} - Placa:{" "}
              {load.vehicle?.licensePlate}
            </div>
            <div>Status: {load.status}</div>
            <div>Data: {new Date(load.createdAt).toLocaleDateString()}</div>
            <div>Total: R$ {Number(load.total).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Lista de pedidos da carga selecionada */}
      {selectedLoad && (
        <div className="mb-6">
          <div onClick={() => imprimirPedidos(loads[0].carts)}>
            <text>Imprimir</text>
          </div>
          <h2 className="text-lg font-semibold">
            Pedidos da Carga #{selectedLoad.id}
          </h2>
          <div className="space-y-2 mt-2">
            {selectedLoad.carts.map((cart) => (
              <div
                key={cart.id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedCart?.id === cart.id ? "bg-green-100" : ""
                }`}
                onClick={() => setSelectedCart(cart)}
              >
                Pedido #{cart.id} - Cliente: {cart.client?.name} - Status:{" "}
                {cart.statusDelivery}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Itens do pedido selecionado */}
      {selectedCart && (
        <div>
          <h2 className="text-lg font-semibold">
            Itens do Pedido #{selectedCart.id}
          </h2>
          <ul className="list-disc pl-5 mt-2">
            {selectedCart.cartItems.map((item) => (
              <li key={item.id}>
                {item.productName} - {item.quantity}x - R${" "}
                {Number(item.price).toFixed(2)} (Total: R${" "}
                {Number(item.total).toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Carga;
