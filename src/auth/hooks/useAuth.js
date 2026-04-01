import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout, onInitLogin } from "../../store/slices/auth/authSlice";

// const initialLogin = JSON.parse(sessionStorage.getItem('login')) || el estado inicial se paso al slice authSlice
// {
//     isAuth: false,
//     isAdmin: false,// se agrega en los datos iniciales
//     user: undefined,

// };

export const useAuth = () => {

    const dispatch = useDispatch();// Se crea el dispatch
    const {user, isAdmin, isAuth} = useSelector(state => state.auth);
    // const [login, dispatch] = useReducer(LoginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {


        try {

            dispatch(onInitLogin());// se llama al initLogin para poner el isLoginLoading en true

            const response = await loginUser({ username, password });

            const token = response.data.token;//Se obtiene de la promesa en el authservice
            const claims = JSON.parse(window.atob(token.split('.')[1]));// se obtienen los claims para saber si es admin, el indice uno es el payload, window atob decodifica base 64

            console.log(claims);


            const user = { username: response.data.username };// SE PUEDE OBTENER COMO claims.username y claims.sub por como lo seteamos en el backend

            dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

            //     {


            //     type: 'login', Esto se reemplazo por el slice authSlice
            //     payload: {user, isAdmin: claims.isAdmin},//se pasa en el dispatch ya es un objeto

            // });
            sessionStorage.setItem('login', JSON.stringify({

                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));

            sessionStorage.setItem('token', `Bearer ${token}`); // se almacena el token al sessionstorage

            // redirigir a la pagina de usuarios
            navigate('/users');

        } catch (error) {
             dispatch(onLogout())

            if (error.response?.status == 401) {

                Swal.fire('Error de validacion', 'username y password invalidos', 'error');

            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos', 'error');

            } else {

                throw error;

            }

        }

    }

    const handlerLogout = () => {

        dispatch(onLogout());

        //     {
        //     type: 'logout', Esto se quito para reducer se cambio por el authSlice de redux
        // });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');//Se remueve el token

        sessionStorage.clear();//Se remueve todo


    }


    return {
        // login, Ya no se devuelve el login 
        login: {
            user,
            isAdmin, 
            isAuth

        },
        handlerLogin,
        handlerLogout,

    }

}