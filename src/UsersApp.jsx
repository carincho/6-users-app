import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"
import { store } from "./store/store"


//provider de redux todo la aplicacion puede acceder al store
//La variable store esta configurado ya en store.js
export const UsersApp = () => {

    return (
        <Provider store={store}>

            <AppRoutes />

        </Provider>
    )

}