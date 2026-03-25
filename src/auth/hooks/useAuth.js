
import { useReducer } from "react";
import { LoginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) ||
{
    isAuth: false,
    isAdmin: false,// se agrega en los datos iniciales
    user: undefined,

};

export const useAuth = () => {

    const [login, dispatch] = useReducer(LoginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async({ username, password }) => {
        
        
        try {
            
            const response = await loginUser({ username, password });

            const token = response.data.token;//Se obtiene de la promesa en el authservice
            const claims = JSON.parse(window.atob (token.split('.')[1])) ;// se obtienen los claims para saber si es admin, el indice uno es el payload, window atob decodifica base 64

            console.log(claims);


            const user = { username: response.data.username};// SE PUEDE OBTENER COMO claims.username y claims.sub por como lo seteamos en el backend

            dispatch({
                type: 'login',
                payload: {user, isAdmin: claims.isAdmin},//se pasa en el dispatch ya es un objeto

            });
            sessionStorage.setItem('login', JSON.stringify({

                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));

            sessionStorage.setItem('token', `Bearer ${token}`); // se almacena el token al sessionstorage

            // redirigir a la pagina de usuarios
            navigate('/users');

        } catch(error) {

            if(error.response?.status == 401) {
                
                Swal.fire('Error de validacion', 'username y password invalidos', 'error');
                
            } else if(error.response?.status == 403){
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos', 'error');

            } else {

                throw error;

            }

        }

    }

    const handlerLogout = () => {

        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');//Se remueve el token

        sessionStorage.clear();//Se remueve todo
        

    }


    return {
        login, 
        handlerLogin, 
        handlerLogout,

    }

}