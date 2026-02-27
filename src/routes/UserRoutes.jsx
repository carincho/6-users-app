import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserProvider";

export const UserRoutes = ({}) => {

//    Los hijos son todos los que esta anidado dentro del provider, es decir todos los componentes que van a consumir el contexto

    return (
        <>
            <UserProvider>
                <NavBar />
                <Routes>
                    <Route path="users" element={<UsersPage/>} />
                    <Route path="/" element={<Navigate to={"/users"} />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage/>} />

                </Routes>
            </UserProvider>

        </>
    );

}