import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useSelector } from "react-redux";

export const UserRoutes = ({ }) => {


    // const { login } = useContext(AuthContext);//Se va a requerirel contexto de login Se reemplaza por el hook useAuth
    // const { login } = useAuth();//Se va a requerirel contexto de login
    const {isAdmin} = useSelector(state => state.auth); //Lo obtenemos con el selector por que solo usamos is admin

    //    Los hijos son todos los que esta anidado dentro del provider, es decir todos los componentes que van a consumir el contexto sin necesidad del hook

    return (
        <>
            {/* <UserProvider> Esto va a estar en el store de redux*/}
            <NavBar />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                <Route path="/" element={<Navigate to={"/users"} />} />

                {!isAdmin ||
                    <>
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />

                    </>
                }

            </Routes>
            {/* </UserProvider> */}

        </>
    );

}