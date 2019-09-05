import {
    CONSULTANTS
} from './action_types';
import firebase from 'react-native-firebase';

export const fetchConsultants = (callback) => async (dispatch) => {
    let url = 'pendingConsultants/';
    console.log("Fetching consultants...")
    firebase.database().ref(url).limitToFirst(25).on('child_changed', consultantSnap => {
        console.log("New consultant ", consultantSnap.val());
        callback(consultantSnap.val());
    })
    firebase.database().ref(url).limitToFirst(25).on('child_added', consultantSnap => {
        console.log("New consultant ", consultantSnap.val());
        callback(consultantSnap.val());
    })
}