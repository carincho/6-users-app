import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUsers = [

    {
        id: 1,
        username: 'Carincho',
        password: '12345',
        email: 'carincho@mail.com'
    },
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
};

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);//El reducer propio y los valores iniciales
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {

        // console.log('handlerAddUser');
        // console.log(user);




        dispatch({
            type : (user.id === 0)  ? 'addUser' : 'updateUser',
            payload: user,

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
    }

    const handlerRemoveUser = (id) => {

        // console.log(id);


        Swal.fire({
            title: "Estas seguro que desea eliminar?",
            text: "Cuidado el usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                
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
    }
    return {
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
}