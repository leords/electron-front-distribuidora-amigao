
import { BrowserRouter, Route, Routes} from "react-router-dom";
import  {Dashboard}  from "../pages/home"
import { LoginPage } from "../pages/login"
import { VendasPage } from "../pages/sales";
export function Navigation() {
    return(
        <BrowserRouter>
        {/* Rotas */}
            <Routes>
                {/* dentro do element é adicionado o requique */}
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
        </BrowserRouter>
    )
}