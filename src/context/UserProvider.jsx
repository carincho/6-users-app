// Crear un proveedor de contexto  es donde se va a guarda la data y se va a compartir la informacion
// 

import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

//Tiene que recibir todos los componentes hijos que van a consumir el contexto, por eso se recibe como children
// los hijos son todos los que esta anidado dentro del provider, es decir todos los componentes que van a consumir el contexto
export const UserProvider = ({ children }) => {
    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,

    } = useUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm,
            }
        }>
            {children}
        </UserContext.Provider>
    );
}