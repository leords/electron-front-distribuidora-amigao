import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { cartItensAPI } from "../services/cartItems";
import { clientsAPI } from "../services/clients";
import { HeaderEmpresa } from "../components/headerEmpresa";
import dayjs from "dayjs";

export function ListCarts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [infoClient, setInfoClient] = useState([]);
  const location = useLocation();
  const { total, formaPagamento, data, load, user, client, city, clientId } =
    location.state || {};

  // criando a data do pedido + 1 dia para ser referencia de data de entrega
  const dateObj = new Date(data);
  dateObj.setDate(dateObj.getDate() + 1);

  useEffect(() => {
    async function fetchCartItem() {
      try {
        const data = await cartItensAPI({ id: id });
        setItens(data);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho", error);
      }
    }
    fetchCartItem();
  }, [id]);

  useEffect(() => {
    async function fetchClient() {
      try {
        const clientSelect = await clientsAPI({ id: clientId });
        setInfoClient(clientSelect);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho", error);
      }
    }
    fetchClient();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-800 flex justify-center flex-col items-center border">
      <div className="w-full md:w-[80%]">
        {/* Botão de voltar */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="transition flex items-center gap-2 py-2 px-2 rounded-sm hover:bg-red-300"
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>

        <div className="w-ful">
          <HeaderEmpresa />
        </div>

        {/* Informações do pedido */}
        <div className="flex flex-col justify-between mb-10">
          <div className="flex flex-row justify-between mb-4 border px-4 py-1">
            <span className="flex text-xs text-gray-700 uppercase mb-1">
              data do pedido: {dayjs(data).format("DD/MM/YYYY")}
            </span>
            <span className="flex text-xs text-gray-700 uppercase mb-1">
              data da entrega:{" "}
              {dayjs(dateObj.toISOString()).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="flex flex-row justify-between border px-4 py-1">
            <div className="flex flex-col justify-start">
              <span className="flex text-xs text-gray-700 uppercase mb-1 font-semibold">
                Cliente: {client}
              </span>
              <span className="flex text-xs text-gray-700 uppercase mb-1">
                CNPJ: {infoClient[0]?.cnpj}
              </span>
              <span className="flex text-xs text-gray-700 uppercase mb-1">
                Endereço: {infoClient[0]?.address}
              </span>
              <span className="flex text-xs text-gray-700 uppercase mb-1">
                Cidade: {city}
              </span>
            </div>
            <div className="flex flex-col justify-start items-end">
              <span className="flex text-xs text-gray-700 uppercase mb-1">
                Vendedor: {user}
              </span>
              <span
                className={`flex text-xs uppercase mb-1 ${
                  load == null ? "text-red-600" : "text-gray-700"
                }`}
              >
                Status: {load == null ? "Sem carga" : load}
              </span>
              <span className="flex text-xs text-gray-700 uppercase mt-6 font-semibold">
                Pedido Número: {id}
              </span>
            </div>
          </div>
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
        <div className="divide-y mt-2 border px-4 py-1">
          {itens.length > 0 ? (
            itens.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-4 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
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

        {/* Footer do pedido */}
        <div className="flex flex-row justify-between mt-40 border px-4 py-1">
          <span className="flex justify-end text-xs text-gray-700 uppercase">
            Forma de pagamento: {formaPagamento}
          </span>
          <span className="flex justify-end text-xs text-gray-700 uppercase">
            Total do pedido: R${parseFloat(total).toFixed(2)}
          </span>
        </div>
        <span className="flex justify-center text-xs text-gray-700 text-center mt-6">
          ** Este ticket não é documento fiscal **
        </span>

        <div className="w-full flex h-16 mt-12 text-xs border text-gray-700 ">
          {/* PARTE 1 */}
          <div className="flex w-[80%] flex-col justify-center">
            <div className="flex pl-2 items-center pb-1">
              <span className="uppercase">
                Recebemos da Distribuidora de bebidas Amigão os produtos
                contantes da nota fiscal
              </span>
            </div>
            <div className="flex flex-row items-start border-t px-2">
              <div className="uppercase w-[19%] border-r pr-3 pb-6 pt-1">
                Data de recebimento
              </div>
              <div className="uppercase w-[81%] pl-3 pt-1">
                Identificação e Assinatura do Recebedor
              </div>
            </div>
          </div>
          {/* PARTE 2 */}
          <div className="flex flex-col justify-center w-[20%] items-center h-16 text-sm font-semibold border-l ">
            <span>Número do pedido: {id}</span>
            <span className="mt-1">R$ {parseFloat(total).toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col border text-xs text-gray-700 mt-4 w-full h-20  p-1">
          <span className="uppercase">Observação do cliente:</span>
        </div>
      </div>
    </div>
  );
}
