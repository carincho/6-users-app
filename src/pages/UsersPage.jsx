import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";





export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,

        // } = useContext(UserContext); YA no se usa UseContext para obtener la data
    } = useUsers();//Ahora se usa el slice

    // const {login} = useContext(AuthContext);//Se va a requerirel contexto de login⁄ Se reemplaza por el hook useAuth
    const { login } = useAuth();//Se va a requerirel contexto de login

    //Se invoca cuando se crea el componente userList por unica vez, es decir cuando se monta el componente, se hace la consulta a la base de datos para obtener los usuarios y se actualiza el estado con la lista de usuarios obtenida
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            {!visibleForm ||

                <UserModalForm />

            }

            <div className="container my-4">
                <h2>Users App</h2>

                <div className="row">


                    {/* {!visibleForm || <div className="col">
                    <UserForm handlerAddUser={handlerAddUser}
                        initialUserForm={initialUserForm}
                        userSelected={userSelected}
                        handlerCloseForm={handlerCloseForm} />
                </div>
                } */}


                    <div className="col">

                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm} >
                            Nuevo Usuario
                        </button>
                        }

                        {users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema !</div>
                            : <UsersList users={users} />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}