import { UserRow } from "./UserRow";

export const UsersList = ({users = [], handlerRemoveUser, handlerUserSelectedForm}) => {


    return (

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Update route</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        users.map(({id, username, email}) => (
                           <UserRow key={id} 
                           id = {id} 
                           username={username}
                            email={email}
                            handlerRemoveUser = {handlerRemoveUser}
                            handlerUserSelectedForm = {handlerUserSelectedForm}/> 

                        ))
                    }

                </tbody>

            </table>
    )
}