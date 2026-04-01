import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
};

const initialErrors = {
    username: '',
    password: '',
    email: ''
};



export const usersSlice = createSlice({

    name: 'users',//Nombre del slice
    initialState: {
        users: [],
        userSelected: initialUserForm,//Son valores por defecto
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,

    },
    reducers: {
        addUser: (state, action) => {

            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ];

            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },

        removeUser: (state, action) => {

            state.users = state.users.filter(user => user.id !== action.payload);
        },

        updateUser: (state, action) => {

            state.users = state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                }
                return u;
            });// map devuelve una nueva instancia del arreglo con los cambios es inmutable
            state.userSelected = initialUserForm;//Se reiniciarn los valores
            state.visibleForm = false;//Se reiniciarn los valores
        },

        loadingUsers: (state, {payload}) => {

            state.users = payload; //Aqui el payload es la lista de usuarios que se obtiene de la consulta a la base de datos
            state.isLoading = false;
        },

        onUserSelectedForm: (state, {payload}) => {
            state.userSelected = payload;
            state.visibleForm = true
        },

        onOpenForm: (state) => {//No se pasa el action por que no pasamos datos

            state.visibleForm = true;
            
        },
        onCloseForm: (state) => {
            
            state.visibleForm = false;
            state.userSelected = initialUserForm;

        },
        loadingError: (state, {payload}) => {

            state.errors = payload;
        }

    }
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,

} = usersSlice.actions;//actions son las funciones dentro del reducer