import axios from 'axios'

import * as actionTypes from './actionTypes'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    } 
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    } 
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    } 
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_bdcM7oCCAbL__UHW3sIJQf3lO91636I'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_bdcM7oCCAbL__UHW3sIJQf3lO91636I'
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(resp => {
                const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
                console.log('expDate ', expirationDate)
                localStorage.setItem('token', resp.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(resp.data.idToken, resp.data.localId))
                dispatch(checkAuthTimeout(resp.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

