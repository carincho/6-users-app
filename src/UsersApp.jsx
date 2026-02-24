
import { LoginPages } from "./auth/pages/LoginPages";
import { UsersPage } from "./pages/UsersPage";
import { NavBar } from "./components/layout/NavBar";
import { useAuth } from "./auth/hooks/useAuth";

export const UsersApp = () => {

    const { login, handlerLogin, handlerLogout } = useAuth();
    
    return (

        <>

            {
            login.isAuth
                ? (
                    <>
                        <NavBar login={login} handlerLogout={handlerLogout} className="navbar navbar-light bg-light" />
                        <UsersPage />
                    </>
                )
                : <LoginPages handlerLogin={handlerLogin} />
            }


        </>
    );
    
}