import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = ({ }) => {

    // const { users } = useContext(UserContext); Se cambia por el hook
    const { users } = useUsers();// se usa el hooks
    // const {login} = useContext(AuthContext);//Se va a requerirel contexto de login se reemplaza por el hook para el contexto del slice de redux
    const {login} = useAuth();//Se va a requerirel contexto de login


    return (

        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>UserName</th>
                    <th>Email</th>
                    {!login.isAdmin || <>
                        <th>Update</th>
                        <th>Update route</th>
                        <th>Remove</th>

                    </>
                    }
                </tr>
            </thead>
            <tbody>
                {

                    users.map(({ id, username, email, admin }) => (
                        <UserRow key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                        />

                    ))
                }

            </tbody>

        </table>
    )
}