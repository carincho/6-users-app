
import { LoginPages } from "./auth/pages/LoginPages";
import { useAuth } from "./auth/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

//Con la ruta /* se indica que cualquier ruta que no sea login se redirija a login, esto es para evitar que el usuario pueda acceder a rutas privadas sin estar autenticado */

export const UsersApp = () => {

    const { login, handlerLogin, handlerLogout } = useAuth();
    
    return (

        <Routes>

            {
            login.isAuth
                ? (
                   <Route path="/*" element={ <UserRoutes login={login} handlerLogout={handlerLogout} />}/>
                )
                :
                <> 
                    <Route path="/login" element={ <LoginPages handlerLogin={handlerLogin} />}/>
                    <Route path="/*" element={ <Navigate to="/login" />}/>
                </>
            }


        </Routes>
    );
    
}