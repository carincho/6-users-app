import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";





export const UsersPage = ({ }) => {

    const {
    users,
    visibleForm,
    handlerOpenForm,
    getUsers,

} = useContext(UserContext);

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

                        {visibleForm || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm} >
                            Nuevo Usuario
                        </button>
                        }

                        {users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema !</div>
                            : <UsersList users={users}/>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}