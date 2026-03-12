import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";



export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email } = userForm;

    //Esto cuando cambia userSelected se gatilla el cambio para el formulario para actualizar los datos mostrados
    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });

    }, [userSelected]);

    const onInputChange = ({ target }) => {
        // console.log(target.value);
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,//esto es propiedad computada del objeto que es variable segun el campo o input del formulario

        })

    }

    const onSubmit = (event) => {

        event.preventDefault();//este se usa para que cuando se envie el formulario no se actualice la pagina y no perder los datos
        // console.log(userForm);

        //Guardar el user form en el listado de usuarios

        // if (!username || (!password && id === 0) || !email) {

        //     Swal.fire({
        //         title: "Error de validacion",
        //         text: "Debe completar los campos del formulario",
        //         icon: "error"
        //     });


        //     return;
        // }
        // if (!email.includes('@')) {
        //     Swal.fire({
        //         title: "Error de validacion email",
        //         text: "El email debe contener el simbolo @",
        //         icon: "error"
        //     });


        //     return;

        // }
        handlerAddUser(userForm);
        // setUserForm(initialUserForm);ya no se limpia el estado del formulario porque se hace desde el contexto para que se limpie al cerrar el formulario y no solo al agregar un usuario nuevo sino tambien al editar un usuario existente

    }

    const onCloseForm = () => {

        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (

        <form onSubmit={onSubmit}>
            <input className="form-control my-3 w-75"
                placeholder="UserName"
                name="username"
                value={username}
                onChange={onInputChange} />

                <p className="text-danger">{errors?.username}</p>

            {/* Esto se simplifica si mayor que 0 nada de lo contrario aparece el campo para el password */}
            {id > 0 || <input className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />
            }
            <p className="text-danger">{errors?.password}</p>


            <input className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
                <p className="text-danger">{errors?.email}</p>

            <input type="hidden"
                name="id"
                value={id} />

            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
            {!handlerCloseForm ||
                <button
                    className="btn btn-primary mx-2"
                    type="button"
                    onClick={() => onCloseForm()}>
                    Cerrar
                </button>}


        </form>
    )

} 