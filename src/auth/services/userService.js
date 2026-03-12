import axios from "axios"


const BASE_URL = 'http://localhost:8080/users';

export const findAllUsers = async () => {

    try {
        const response = await axios.get(BASE_URL);
        return response

    } catch (error) {
        console.error('Error consulta todos los usuarios users:', error);
    }
    return null;

}

export const saveUser = async ({ username, email, password }) => {
    try {
        return await axios.post(BASE_URL, {
            username,
            email,
            password
        });

    } catch (error) {
        throw error;
    }




}

export const updateUser = async ({ id, username, email }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            username,
            email,
            // password: "defaultPassword"
        });

    } catch (error) {
        throw error;
    }


}

export const deleteUser = async (id) => {
    try {

        await axios.delete(`${BASE_URL}/${id}`);

    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }

    return undefined;
}

