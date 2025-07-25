export function DashboardHome() {
  const buttons = [
    { label: "Vendas", icon: FaShoppingCart, color: "text-rose-500" },
    { label: "Cargas", icon: FaTruck, color: "text-sky-500" },
    { label: "Financeiro", icon: FaCreditCard, color: "text-yellow-500" },
    { label: "Produtos", icon: FaBoxOpen, color: "text-orange-500" },
    { label: "Clientes", icon: FaUsers, color: "text-pink-500" },
    { label: "Resultados", icon: FaChartBar, color: "text-yellow-500" },
    { label: "Outros", icon: FaCog, color: "text-rose-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
        <span className="text-gray-600 text-sm">👤 admin</span>
        <h1 className="text-xl font-bold text-gray-800">Início SysNext</h1>
        <button className="text-red-500 hover:text-red-600">
          <FaSignOutAlt className="text-xl" />
        </button>
      </header>

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {buttons.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition"
          >
            <Icon className={`text-4xl mb-3 ${color}`} />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
