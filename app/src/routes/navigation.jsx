import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TelaInicial } from "../pages/inicio";
import { LoginPage } from "../pages/login";
import { VendasPage } from "../pages/sales";
import { Product } from "../pages/products";
import { AuthProvider } from "../components/authContext";
import { Clientes } from "../pages/clientes";
import { ListSales } from "../pages/listSales";
import { Pedido } from "../pages/pedido";
import { Carga } from "../pages/carga";

export function Navigation() {
  return (
    <BrowserRouter>
      {/*Provendo o context aos elementos da arvore */}
      <AuthProvider>
        {/* Rotas */}
        <Routes>
          {/*Dentro do elemento é adicionado o requique */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/inicio" element={<TelaInicial />} />
          <Route path="/sales" element={<VendasPage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/clients" element={<Clientes />} />
          <Route path="/listSales" element={<ListSales />} />
          <Route path="/pedido/:id" element={<Pedido />} />
          <Route path="/carga" element={<Carga />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
