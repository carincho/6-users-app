import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({ id, username, email, admin }) => {

    // const { handlerRemoveUser, handlerUserSelectedForm } = useContext(UserContext); Se usa el hooks useUsers
    const { handlerRemoveUser, handlerUserSelectedForm } = useUsers();
    // const {login} = useContext(AuthContext);//Se va a requerirel contexto de login Se reemplaza por el hook useAuth
    const {login} = useAuth();//Se va a requerirel contexto de login

    // onClick={() => onRemoveUser({id})}> Esto no se puede simplificar por que no pasamos nada

    return (

        <tr >
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>

            {!login.isAdmin ||
                <>
                    <td>
                        <button type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerUserSelectedForm({

                                id: id,//Esto se puede omitir por que se llaman igual el campo con el valor
                                username,
                                email,
                                admin,
                            })}>
                            Update
                        </button>
                    </td>
                    <td>
                        <NavLink to={'/users/edit/' + id} className="btn btn-secondary btn-sm">
                            Update route
                        </NavLink>
                    </td>
                    <td>
                        <button type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handlerRemoveUser(id)}>
                            Remove
                        </button></td>
                </>}

        </tr>
    )
}