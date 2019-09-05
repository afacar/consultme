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
    console.log("Profile", profile)
    // save image to firebase
    if (path) {
        await firebase.storage().ref('profilePics').child(_user.uid).putFile(path)
        profile.photoURL = await firebase.storage().ref().child("profilePics").child(_user.uid).getDownloadURL();
    } else {
        profile.photoURL = 'https://firebasestorage.googleapis.com/v0/b/consultme-cb5ad.appspot.com/o/profilePics%2Fdefault_profile_pic.png?alt=media&token=d333eb8d-5e18-48ca-962c-6a2f538bd654'
    }
    delete profile.path;
    // set new firebase user
    await firebase.auth().currentUser.updateProfile({ displayName: name, photoURL: profile.photoURL })

    // save new user
    let url = `users/${_user.uid}`
    await firebase.database().ref(url).update(profile);

};

export const saveUser = (user) => (dispatch) => {
    console.log("Saving user", user)
    return dispatch({ type: AUTH, payload: user })
}

export const createNewConsultant = (user, consultationDetails) => async () => {
    console.log("User", user)
    // create consultant profile
    var consultantProfile = {
        name: user.name,
        photo: user.photo,
        number: user.number,
        uid: user.uid,
        consultationDetails
    }
    if (!consultantProfile.photo) {
        consultantProfile.photoURL = 'https://firebasestorage.googleapis.com/v0/b/consultme-cb5ad.appspot.com/o/profilePics%2Fdefault_profile_pic.png?alt=media&token=d333eb8d-5e18-48ca-962c-6a2f538bd654'
    }
    // save into pendingConsultants
    let url = `pendingConsultants/${user.uid}`
    firebase.database().ref(url).update(consultantProfile);
}