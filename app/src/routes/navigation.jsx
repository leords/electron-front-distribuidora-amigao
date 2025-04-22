
import { BrowserRouter, Route, Routes} from "react-router-dom";
import  {Dashboard}  from "../pages/home"
import { LoginPage } from "../pages/login"
import { VendasPage } from "../pages/sales";
import { AuthProvider } from "../components/authContext";


export function Navigation() {
    return(
        <BrowserRouter>
            {/*Provendo o context aos elementos da arvore */}
            <AuthProvider >
            {/* Rotas */}
                <Routes>
                    {/*Dentro do elemento é adicionado o requique */}
                    <Route
                        path="/"
                        element={ <LoginPage /> }
                    />
                    <Route 
                        path="/home"
                        element={ <Dashboard /> }
                    />
                    <Route 
                        path="/sales"
                        element={ <VendasPage /> }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}