import { useEffect, useState } from "react";
import { productsAPI } from "../services/products.js"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export function Product() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    supplier: "",
    segment: "",
    status: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const params = {
        name: filters.name,
        segment: filters.segment,
        supplier: filters.supplier,
        status: filters.status
      };
      const data = await productsAPI(params);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFilters((prev) => ({
      ...prev,
      [name]: name === "status"
          ? value === ""
            ? undefined
            : value === "true"
          ? true
          : false
        : value

    }));
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
            className="transition flex items-center gap-2 py-2 px-2 rounded-md "
          >
           <FaArrowLeft />
          </button>
        </div>

        {/* Painel de Filtros */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Buscar por nome"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="supplier"
            value={filters.supplier}
            onChange={handleChange}
            placeholder="Buscar por fornecedor"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="segment"
            value={filters.segment}
            onChange={handleChange}
            placeholder="Buscar por segmento"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Todos</option>
            <option value="true">Ativos</option>
            <option value="false">Inativos</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </div>

        {/* Títulos */}
        <div className="grid grid-cols-7 gap-4 px-2 text-sm font-semibold text-gray-600 border-b pb-2">
          <span>ID</span>
          <span>Nome</span>
          <span>Preço</span>
          <span>Segmento</span>
          <span>Fornecedor</span>
          <span>Peso</span>
          <span>Status</span>
        </div>

        {/* Lista de produtos */}
        <div className="divide-y mt-2">
          {products.length > 0 ? (

            products.map((prod) => (
              <div
                key={prod.id}
                className="grid grid-cols-7 gap-4 px-2 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                <span>{prod.id}</span>
                <span>{prod.name}</span>
                <span>R$ {parseFloat(prod.price).toFixed(2)}</span>
                <span>{prod.segment}</span>
                <span>{prod.supplier}</span>
                <span>{prod.weight}kg</span>
                <span className=
                    {prod.status === true ? "text-green-600" : "text-red-600"}>
                    {prod.status === true ? "Ativo" : "Inativo"}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">Nenhum produto encontrado</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;