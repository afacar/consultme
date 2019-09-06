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

export const startConsultancy = (user, consultant, callback) => async (dispatch) => {
    const userId = user.uid;
    const cId = consultant.uid;
    let consultationID = userId + '-' + cId;
    let systemNewConsultationRef = `consultations/${cId}/${userId}/`;
    let userNewConsultationRef = `users/${userId}/consultations`;

    var db = firebase.database();
    db.ref(systemNewConsultationRef).once('value', async (consultationSnap) => {
        if (consultationSnap.exists()) {
            await db.ref(systemNewConsultationRef).update({
                consultant,
                user,
                firstTime: false,
            })
            callback('continue')
        } else {
            await db.ref(systemNewConsultationRef).update({
                consultant,
                user,
                firstTime: true,
            })
            callback('new')
        };
    })
    db.ref(userNewConsultationRef).child(`${cId}`).set(true);
}