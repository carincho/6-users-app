import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, findAllUsers, saveUser, updateUser } from "../auth/services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
};

const initialErrors = {
    username: '',
    password: '',
    email: ''
};

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);//El reducer propio y los valores iniciales
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({ initialErrors });//Guardamos los errores de validacion del formulario
    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);//Se va a requerirel contexto de login

    const getUsers = async () => {

        try {

            const result = await findAllUsers();

            console.log(result);

            dispatch({
                type: 'loadingUsers',
                payload: result.data,
            });

        } catch (error) {

            if (error.response?.status == 401) {
                handlerLogout();

            }
        }

    }

    const handlerAddUser = async (user) => {

        // console.log('handlerAddUser');
        // console.log(user);

        if (!login.isAdmin) return;

        let response;

        try {

            if (user.id === 0) {

                response = await saveUser(user);
            } else {
                response = await updateUser(user);
            }

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data,

            });

            Swal.fire({
                title: (user.id === 0) ?
                    "Usuario Creado" :
                    "Usuario Actualizado",
                text: (user.id === 0) ?
                    "El usuario ha sido creado con exito" :
                    "El usuario ha sido actualizado con exito",
                icon: "success"
            });
            handlerCloseForm();
            navigate('/users');

        } catch (error) {

            if (error.response && error.response.status == 400) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {

                    setErrors({ username: 'El username ya existe, por favor elija otro' });
                }

                if (error.response.data?.message?.includes('UK_email')) {

                    setErrors({ email: 'El email ya existe, por favor elija otro' });
                }

            } else if (error.response?.status == 401) {
                handlerLogout();

            } else {

                throw error;
            }

        }
    }

    const handlerRemoveUser = (id) => {

        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: "Estas seguro que desea eliminar?",
            text: "Cuidado el usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => { //Esta funcion tiene que ser async por que la llamada a deleteUser cambio a async
            if (result.isConfirmed) {

                try {

                    await deleteUser(id); // se cambio a await por que apesar de ser void si existe un error lo lanza y ahi si lo regresa
                    //Aqui se elimina si se confirma
                    dispatch({
                        type: 'removeUser',
                        payload: id,

                    });

                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: "El usuario ha sido eliminado con exito.",
                        icon: "success"
                    });
                } catch (error) {

                    if (error.response?.status == 401) {
                        handlerLogout();

                    }

                }



            }
        });

        handlerCloseForm();

    }

    const handlerUserSelectedForm = (user) => {

        setVisibleForm(true);
        setUserSelected({ ...user });//Con esto creamos una nueva instancia con operador spread

    }

    const handlerOpenForm = () => {

        setVisibleForm(true);
    }

    const handlerCloseForm = () => {

        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,

    }
}