import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersList = ({ }) => {

    const { users } = useContext(UserContext);
    const {login} = useContext(AuthContext);//Se va a requerirel contexto de login


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