import { createSlice } from "@reduxjs/toolkit";
import { usersSlice } from "../users/usersSlice";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) ||
{
    isAuth: false,
    isAdmin: false,// se agrega en los datos iniciales
    user: undefined,

};

export const authSlice = createSlice({

    name: 'auth',
    initialState: initialLogin,
    reducers: {

        onLogin: (state, action) => {

            state.isAuth = true;
            state.isAdmin =  action.payload.isAdmin;
            state.user = action.payload.user;
        },

        onLogout: (state, action) => {

            state.isAuth = false;
            state.isAdmin = false;
            state.user = undefined;
        }
    }
});

export const{

    onLogin,
    onLogout
} = authSlice.actions;