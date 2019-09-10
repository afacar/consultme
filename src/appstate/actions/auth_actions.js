import {
    AUTH,
    LOGIN
} from './action_types';
import firebase from 'react-native-firebase';
import strings from '../../Constants/Strings';

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
    const { name, path, photoURL } = profile;
    console.log("Profile", profile)
    // save image to firebase
    if (path) {
        await firebase.storage().ref('profilePics').child(_user.uid).putFile(path)
        profile.photoURL = await firebase.storage().ref().child("profilePics").child(_user.uid).getDownloadURL();
    } else {
        if (!photoURL)
            profile.photoURL = strings.DEFAULT_PROFILE_PIC
    }
    delete profile.path;
    // set new firebase user
    await firebase.auth().currentUser.updateProfile({ displayName: name, photoURL: profile.photoURL })

    // save new user
    let url = `users/${_user.uid}`
    await firebase.database().ref(url).update(profile);

};

export const saveUser = (user) => (dispatch) => {
    console.log("Saving user to redux state", user)
    return dispatch({ type: AUTH, payload: user })
}

export const createNewConsultant = (user, consultationDetails) => async () => {
    console.log("User", user)
    // create consultant profile
    var consultantProfile = {
        name: user.name,
        photoURL: user.photoURL,
        number: user.number,
        uid: user.uid,
        consultationDetails
    }
    if (!consultantProfile.photoURL) {
        consultantProfile.photoURL = strings.DEFAULT_PROFILE_PIC
    }
    // save into verifiedConsultants
    let url = `verifiedConsultants/${user.uid}`
    firebase.database().ref(url).update(consultantProfile);
    firebase.database().ref('users').child(`${user.uid}/isProvider`).set(true);
}

export const saveProfile = (user, callback) => async () => {
    console.log("Save profile\n", user)
    try {
        // TODO change below lines to if firebaseUser.isProvider
        if (user.path) {
            await firebase.storage().ref('profilePics').child(user.uid).putFile(user.path)
            user.photoURL = await firebase.storage().ref().child("profilePics").child(user.uid).getDownloadURL();
            delete user.path;
        }
        await firebase.auth().currentUser.updateProfile({ displayName: user.name, photoURL: user.photoURL })

        // update user profile
        let url = `users/${user.uid}`
        await firebase.database().ref(url).update(user);

        // update consultant 
        if (user.isProvider) {
            delete user.isProvider;
            let url = `verifiedConsultants/${user.uid}`

            firebase.database().ref(`users/${user.uid}/consultationTo`).once('child_added', patientSnap => {
                const patientID = patientSnap.key();
                firebase.database().ref(`consultations/${user.uid}/${patientID}/consultant`).update(user);
            })

            firebase.database().ref(`users/${user.uid}/consultationFrom`).once('child_added', consultantSnap => {
                const consultantId = consultantSnap.key();
                firebase.database().ref(`consultations/${consultantId}/${user.uid}/user`).update(user);
            })

            await firebase.database().ref('verifiedConsultants').child(user.uid).update(user)
            await firebase.database().ref(url).update(user);
        }
        callback('Successfull')
    } catch (error) {
        callback(error)
    }
}