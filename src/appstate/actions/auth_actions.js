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

export const createNewUserProfile = (profile) => async (dispatch) => {
    const { _user } = firebase.auth().currentUser;
    const { name, path } = profile;
    // save image to firebase
    if (path) {
        await firebase.storage().ref('profilePics').child(_user.uid).putFile(path)
        profile.photoURL = await firebase.storage().ref().child("profilePics").child(_user.uid).getDownloadURL();
    }
    delete profile.path;
    // set new firebase user
    await firebase.auth().currentUser.updateProfile({ displayName: name, photoURL: profile.photoURL })

    // save new user
    await firebase.database().ref(url).update(profile);

};
export const saveUser = (user) => (dispatch) => {
    return dispatch({ type: AUTH, payload: user })
}
