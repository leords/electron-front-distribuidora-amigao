import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/home";
import { LoginPage } from "../pages/login";
import { VendasPage } from "../pages/sales";
import { Product } from "../pages/products";
import { AuthProvider } from "../components/authContext";
import { Client } from "../pages/clients";
import { ListSales } from "../pages/listSales";
import { ListCarts } from "../pages/listCarts";

export function Navigation() {
  return (
    <BrowserRouter>
      {/*Provendo o context aos elementos da arvore */}
      <AuthProvider>
        {/* Rotas */}
        <Routes>
          {/*Dentro do elemento é adicionado o requique */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/sales" element={<VendasPage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/listSales" element={<ListSales />} />
          <Route path="/listCarts/:id" element={<ListCarts />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
