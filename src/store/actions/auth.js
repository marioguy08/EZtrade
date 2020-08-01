import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, currentUsername) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        currentUsername: currentUsername
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password, props) => {
    return dispatch => {
        dispatch(authStart());
        // Send your request
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios.defaults.withCredentials = false
        axios.post('https://eztrade.herokuapp.com/rest-auth/login/', {
            username: username,
            password: password
        })
            .then(res => {
                props.history.push('/');
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(3600));//sets timer for logout after login
            })
            .catch(error => {

                dispatch(authFail(error))
            })
    }
}

export const authsignup = (username, email, password1, password2, city) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://eztrade.herokuapp.com/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(3600));//sets timer for logout after login
                axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                }
                axios.post('https://eztrade.herokuapp.com/api/users/', {
                    username: username,
                    city: city
                }).then(res => {
                })

            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const currentUsername = localStorage.getItem('currentUsername');
        var newuser = ""
        if (currentUsername) {
            newuser = currentUsername.replace(/"/g, "");
        }

        console.log(currentUsername);
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, newuser));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}