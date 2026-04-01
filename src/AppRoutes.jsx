import { LoginPages } from "./auth/pages/LoginPages";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";

//Con la ruta /* se indica que cualquier ruta que no sea login se redirija a login, esto es para evitar que el usuario pueda acceder a rutas privadas sin estar autenticado */

export const AppRoutes = () => {


    // const { login } = useContext(AuthContext); Se reemplaza por el selector por que solo se usa el isAuth
    const { isAuth, isLoginLoading } = useSelector(state => state.auth);

    if (isLoginLoading) {

        return (

            <div className="container my-4 text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (

        <Routes>

            {
                // login.isAuth
                isAuth//Ahora solo se obtiene del selector ya no del login
                    ? (
                        <Route path="/*" element={<UserRoutes />} />
                    )
                    :
                    <>
                        <Route path="/login" element={<LoginPages />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>
            }


        </Routes>
    );
}