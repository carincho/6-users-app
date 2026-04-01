import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteUser, findAllUsers, saveUser, update } from "../auth/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, loadingUsers, addUser, removeUser, updateUser, onUserSelectedForm, onOpenForm, onCloseForm, loadingError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

//const initialUsers = []; ya no se usa. por que se comento el reducer

// const initialUserForm = {
//     id: 0,
//     username: '',
//     password: '',  ESTO SE LLEVO AL SLICE
//     email: '',
//     admin: false,  
// };

// const initialErrors = { ESTO SE LLEVO AL SLICE
//     username: '',
//     password: '',
//     email: ''
// };

export const useUsers = () => {

    // const [users, dispatch] = useReducer(usersReducer, initialUsers);//El reducer propio y los valores iniciales

    const { users, userSelected, visibleForm, errors, isLoading} = useSelector(state => state.users);//Esto tambien es para redux para obtener usuarios
    const dispatch = useDispatch(); //Ahora se usa redux ya no el reducer

    // const [userSelected, setUserSe, lected] = useState(initialUserForm);//userSelected SE LLEVO AL SLICE
    // const [visibleForm, setVisibleForm] = useState(false);//visibleForm SE LLEVO AL SLICE


    // const [errors, setErrors] = useState({ initialErrors });//Guardamos los errores de validacion del formulario, ESTO SE LLEVO AL SLICE DE REDUX
    const navigate = useNavigate();

    // const { login, handlerLogout } = useContext(AuthContext);//Se va a requerirel contexto de loginse cambia por el hook
    const { login, handlerLogout } = useAuth();

    const getUsers = async () => {

        try {

            const result = await findAllUsers();


            dispatch(loadingUsers(result.data)) //Aqui se usa redux
            // {
            //     type: 'loadingUsers', esta es la forma reducer
            //     payload: result.data,
            // });

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
                dispatch(addUser(response.data))//ESTO YA ES CON REDUX es la parte sincrona

            } else {
                response = await update(user);
                dispatch(updateUser(response.data));//ESTO YA ES CON REDUX es la parte sincrona
            }

            // dispatch({
            //     type: (user.id === 0) ? 'addUser' : 'updateUser', ESTO ES CON REDUCER
            //     payload: response.data,

            // });

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
                // setErrors(error.response.data); Esto se paso a slice de redux
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {

                    // setErrors({ username: 'El username ya existe, por favor elija otro' });
                    dispatch(loadingError(error.response.data));
                }

                if (error.response.data?.message?.includes('UK_email')) {

                    // setErrors({ email: 'El email ya existe, por favor elija otro' });
                    dispatch(loadingError(error.response.data));
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
                    dispatch(removeUser(id)) //ESTO ES CON REDUX

                    // dispatch({
                    //     type: 'removeUser', ESTO ES CON REDUCER
                    //     payload: id,

                    // });

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

        dispatch(onUserSelectedForm({ ...user }));//Esto esta en el slice en el store de redux

        // setVisibleForm(true);TODO ESTO FUE LLEVADO AL SLICE
        // setUserSelected({ ...user });//Con esto creamos una nueva instancia con operador spread

    }

    const handlerOpenForm = () => {

        // setVisibleForm(true); todo esto se fue al slice
        dispatch(onOpenForm());//Esto ys esta en redux

    }

    const handlerCloseForm = () => {

        // setVisibleForm(false);Todo esto se paso al slice de redux
        // setUserSelected(initialUserForm);

        dispatch(onCloseForm());
        // setErrors({});
        dispatch(loadingError({}));
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,

    }
}