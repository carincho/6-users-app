import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginform = {
    username: '',
    password: '',
}

export const LoginPages = ({}) => {

    const {handlerLogin} = useContext(AuthContext);



    const [loginForm, setLoginForm] = useState(initialLoginform);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {// en realidad se recibe la propiedad event pero se destructura para obttener target de event
        const { name, value } = target;

        setLoginForm({
            ...loginForm,
            [name]: value,

        });

    }

    const onSubmit = (event) => {
        event.preventDefault();// para que no se actualice la pagina
        if (!username || !password) {

            Swal.fire('Error de validacion', 'username y password requeridos', 'error');
        }

        handlerLogin({username, password});
        //aqui implementamos el login
       
        setLoginForm(initialLoginform);//reiniciamos formulario

    }

    return (

        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input className="form-control my-3 w-75"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />

                            <input className="form-control my-3 w-75"
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onInputChange}
                            />



                        </div>
                        <div className="modal-footer">
                            <button type="submit"
                                className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}