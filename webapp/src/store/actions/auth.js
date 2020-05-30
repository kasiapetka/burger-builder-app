import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token,id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: id
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const checkAuthTimeout = expTime =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expTime*1000);
    }
};

export const logout=()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd1ii-5W7Nm5lO4hwC86XhaOSHG4_Xhm8';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAd1ii-5W7Nm5lO4hwC86XhaOSHG4_Xhm8';
        }

        axios.post(url,
            payload).then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
};