import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    authRedirectPath: '/'
};

const setAuthRedirectPath= (state, action) => {
    return updateObject(state,{authRedirectPath:action.path});
};

const authSuccess = (state, action) => {
    const authData = {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    };
    return updateObject(state,authData);
};

const authFail = (state, action) => {
    const data = {
        error: action.error,
        loading: false
    };
    return updateObject(state,data);
};

const authLogout = (state, action) => {
    const authData = {
        token: null,
        userId: null,
    };
    return updateObject(state,authData);
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action);
        default:
            return state;
    }

};

export default authReducer;