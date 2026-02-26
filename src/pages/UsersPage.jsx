import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";

export const UsersPage = ({
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm

}) => {

    return (
        <>
            {!visibleForm ||

                <UserModalForm
                    userSelected={userSelected}
                    initialUserForm={initialUserForm}
                    handlerAddUser={handlerAddUser}
                    handlerCloseForm={handlerCloseForm}
                />

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
                            : <UsersList users={users}
                                handlerRemoveUser={handlerRemoveUser}
                                handlerUserSelectedForm={handlerUserSelectedForm} />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}