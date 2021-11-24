import {authAPI} from "../Api/Api";
import {stopSubmit} from "redux-form";

const AUTH_KEY = 'AUTH';
const SET_AUTH_USER_DATA = AUTH_KEY + 'SET_AUTH_USER_DATA';

let initialState = {
    authUserData: {
        id: null,
        login: null,
        email: null,
        isAuth: false
    }
};

const auth_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                authUserData: {
                    ...state.authUserData,
                    id: action.authUserData.id,
                    login: action.authUserData.login,
                    email: action.authUserData.email,
                    isAuth: action.isAuth
                }
            }
        }
        default:
            return state;
    }
};

const setAuthUserDataSuccess = (authUserData, isAuth) => ({ type: SET_AUTH_USER_DATA, authUserData: authUserData, isAuth});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === 0)
        dispatch(setAuthUserDataSuccess(response.data, true));
};

export const login = (email, password, rememberMe) => async  (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0)
        dispatch(getAuthUserData())
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("Login", {_error: message}));
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if(response.data.resultCode === 0)
        dispatch(setAuthUserDataSuccess({}, false));
};

export default auth_reducer;