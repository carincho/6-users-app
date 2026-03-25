import usersApi from "../../apis/usersApi";


const BASE_URL = '';//al dejar el string vacio va a tomar la url por defecto de usersApi

//Se configura el Header para pasar el token
// const config = () => {
//     return {

//         headers: {
//             "Authorization": sessionStorage.getItem('token'),
//             "Content-Type": 'application/json',
//         }
//     }
// }

export const findAllUsers = async () => {

    try {
        // const response = await axios.get(BASE_URL); Se reemplaza por el usersAPi ya no se usa axios
        const response = await usersApi.get(BASE_URL);
        return response

    } catch (error) {
       throw error;
    }

}

export const saveUser = async ({ username, email, password, admin }) => {
    try {
        //return await axios.post(BASE_URL, { Se reemplaza por el usersAPi ya no se usa axios
            return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            admin,
       // }, config());Esto se reemplazo por el interceptor en usersApi
        });

    } catch (error) {
        throw error;
    }




}

export const updateUser = async ({ id, username, email, admin }) => {
    try {
        // return await axios.put(`${BASE_URL}/${id}`, { Se reemplaza por el usersAPi ya no se usa axios
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
        //}, config());// Esto se reemplazo por el interceptor en usersApi
        });

    } catch (error) {
        throw error;
    }


}

export const deleteUser = async (id) => {
    try {

        // await axios.delete(`${BASE_URL}/${id}`, config()); Se reemplaza por el usersAPi ya no se usa axios ya no se usa el config() de reemplaza por usersApi
        await usersApi.delete(`${BASE_URL}/${id}`);

    } catch (error) {

        throw error;
    }

    return undefined;
}

