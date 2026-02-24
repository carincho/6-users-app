import { useEffect, useState } from "react";
import Swal from "sweetalert2";



export const UserForm = ({ handlerAddUser, initialUserForm, userSelected, handlerCloseForm }) => {

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

        if (!username || (!password && id === 0) || !email) {

            Swal.fire({
                title: "Error de validacion",
                text: "Debe completar los campos del formulario",
                icon: "error"
            });


            return;
        }
        handlerAddUser(userForm);
        setUserForm(initialUserForm);

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

            {/* Esto se simplifica si mayor que 0 nada de lo contrario aparece el campo para el password */}
            {id > 0 || <input className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />
            }


            <input className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />

            <input type="hidden"
                name="id"
                value={id} />

            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            <button
                className="btn btn-primary mx-2"
                type="button"
                 onClick={() => onCloseForm()}>
                Cerrar
            </button>

        </form>
    )

} 