
import { FaShoppingCart, FaChartBar, FaMoneyCheck , FaCog, FaBoxOpen , FaUsers, FaTruckMoving, FaRegUserCircle} from "react-icons/fa";
import { IconButton } from "../components/IconButton";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";

export function Dashboard() {
  const navigate = useNavigate()
  // importante os dados de authContext = objeto, função, váriaveis...
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // passando o navigate por parametro para poder ser usado fora da arvore de elementos BrowserRouter.
    // apenas componentes dentro da arvore do BrowserRouter podem usar o navigate.
    logout(navigate);
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Título */}
      <div className="bg-gradient-to-br from-red-400 to-red-600 text-white py-4 w-full text-center flex flex-row">
          <div className="w-full"><h1 className="text-3xl font-semibold">Inicio SysNext</h1></div>
          <div className="w-full flex flex-row gap-2 items-center justify-start absolute px-10">
            <FaRegUserCircle className="text-xl"/>
            {
              // if ternário ? : 
              user ? user.name : 'Carregando...'
            }
          </div>
          <div className="w-full flex flex-row gap-2 items-center justify-end absolute px-10">
            <p>sair</p>
            <button
              onClick={handleLogout}
            >
              <IoMdExit className="text-2xl" /> 
            </button>
          </div>
      </div>

      {/* Ícones principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <IconButton
          className="bg-white"
          icon={FaShoppingCart}
          styleIcon="text-red-500"
          label="Vendas"
          onClick={() => (navigate('/sales'))}
        />
        <IconButton
          className="bg-white"
          icon={FaTruckMoving}
          styleIcon="text-blue-500"
          label="Cargas"
          onClick={() => ('')}
        />
        <IconButton
          className="bg-white"
          icon={FaMoneyCheck}
          styleIcon="text-yellow-500"
          label="Financeiro"
          onClick={() => ('')}
        />
        <IconButton
          className="bg-white"
          icon={FaBoxOpen}
          styleIcon="text-orange-500"
          label="Produtos"
          onClick={() => (navigate('/products'))}
        />
        <IconButton
          className="bg-white"
          icon={FaUsers}
          styleIcon="text-red-500"
          label="Clientes"
          onClick={() => ('')}
        />
        <IconButton
          className="bg-white"
          icon={FaChartBar}
          styleIcon="text-yellow-500"
          label="Resultados"
          onClick={() => ('')}
        />
        <IconButton
          className="bg-white"
          icon={FaCog}
          styleIcon="text-red-500"
          label="Outros"
          onClick={() => ('')}
        />
      </div>

      {/* Rodapé */}
      <footer className="mt-auto py-4 bg-gray-200 w-full text-center">
        <p className="text-gray-600">© 2025 SysNext - Todos os direitos reservados por leords</p>
      </footer>
    </div>
  );
}

export default Dashboard;
