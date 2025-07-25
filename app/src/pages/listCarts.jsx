import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { cartItensAPI } from "../services/cartItems";

 
 export function ListCarts() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [itens, setItens] = useState([]);

    useEffect(() => {
        async function fetchCartItem() {
            try {
                const data = await cartItensAPI();
                setItens(data)   
            } catch (error) {
                console.error("Erro ao buscar itens do carrinho", error)
            }
        }
        fetchCartItem();

    },[id])

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
    
            {/* Títulos */}
            <div className="grid grid-cols-5 gap-4 px-2 text-sm font-semibold text-gray-600 border-b pb-2">
              <span>ID</span>
              <span>Produto</span>
              <span>Preço</span>
              <span>Quantidade</span>
              <span>Total</span>
            </div>
    
            {/* Lista de Itens */}
            <div className="divide-y mt-2">
              {itens.length > 0 ? (
                itens.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 gap-4 px-2 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <span>{item.id}</span>
                    <span>{item.productName}</span>
                    <span>R$ {parseFloat(item.price).toFixed(2)}</span>
                    <span>{item.quantity}</span>
                    <span>R$ {(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Nenhum item encontrado
                </div>
              )}
            </div>
          </div>
        </div>
      );
}
 