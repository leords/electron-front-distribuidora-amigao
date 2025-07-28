import logo from "../assets/logo_amigao.png";

export function HeaderEmpresa() {
  return (
    <div className="flex w-full pb-2 mb-4">
      {/* Logo - 50% da largura */}
      <div className="w-1/2 flex items-start justify-center">
        <img
          src={logo}
          alt="Logo Distribuidora Amigão"
          className="h-32 object-contain"
        />
      </div>

      {/* Informações da empresa - 50% da largura */}
      <div className="w-1/2 flex flex-col justify-center text-sm text-gray-800 px-4">
        <span className="font-semibold mb-2">
          Distribuidora de Bebidas Amigão
        </span>
        <span className="">CNPJ: 41.836.758/0001-41</span>
        <span className="">R: Pastor George Weger, 707 - Centro</span>
        <span className="">89460-144 - Canoinhas - SC</span>
        <span className="">Fone: (47) 3622-4126</span>
      </div>
    </div>
  );
}
