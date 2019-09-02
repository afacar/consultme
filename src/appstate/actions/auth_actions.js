import {
    AUTH,
    LOGIN
} from './action_types';
import firebase from 'react-native-firebase';

export const checkAuthState = () => (dispatch) => {
    var loggedIn = false;
    var user = firebase.auth().currentUser
    if (user)
        loggedIn = true;
    if (loggedIn)
        return dispatch({ type: AUTH, payload: user })
    return dispatch({ type: AUTH, payload: null })
}

export const saveUser = (user) => (dispatch) => {
    return dispatch({ type: AUTH, payload: user })
}
