import {
    CONSULTANTS
} from './action_types';
import firebase from 'react-native-firebase';
import strings from '../../Constants/Strings';

export const fetchConsultants = (callback) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    let url = 'verifiedConsultants/';
    firebase.database().ref(url).limitToFirst(25).on('child_changed', consultantSnap => {
        if (user) {
            if (consultantSnap.val().uid !== user.uid)
                callback(consultantSnap.val());
        }
        else {
            callback(consultantSnap.val());
        }
    })
    firebase.database().ref(url).limitToFirst(25).on('child_added', consultantSnap => {
        if (user) {
            if (consultantSnap.val().uid !== user.uid)
                callback(consultantSnap.val());
        } else {
            callback(consultantSnap.val());
        }
    })
}

export const startConsultancy = (user, consultant, callback) => async (dispatch) => {
    console.log("user", user);
    console.log("consultant", consultant);

    const userId = user.uid;
    const cId = consultant.uid;
    let systemNewConsultationRef = `consultations/${cId}/${userId}/`;
    let userNewConsultationRef = `users/${userId}/consultationsFrom`;
    let consultantNewConsultationRef = `users/${cId}/consultationsTo/${userId}`;
    var consultationDetails = consultant.consultationDetails;
    consultationDetails.freeChars = 300;
    consultationDetails.counter = 0;
    consultationDetails.type = 'session';
    consultationDetails.startedAt = '' + new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();

    var db = firebase.database();
    db.ref(systemNewConsultationRef).once('value', async (consultationSnap) => {
        if (consultationSnap.exists()) {
            await db.ref(systemNewConsultationRef).update({
                firstTime: false,
                consultationDetails: consultationDetails
            })
            callback('continue')
        } else {
            await db.ref(systemNewConsultationRef).update({
                firstTime: true,
                consultationDetails: consultationDetails
            })
            callback('new')
        };
    })
    db.ref(userNewConsultationRef).child(`${cId}`).set(true);
    db.ref(consultantNewConsultationRef).set(true);
}

export const startSubscription = (userId, consultantID) => async () => {
    let consultationDetailsRef = `consultations/${consultantID}/${userId}/consultationDetails`;
    console.log("Start subscription consultant id ", consultantID)
    console.log("Start subscription user id ", userId)
    var db = firebase.database();
    var price = '';
    await db.ref(consultationDetailsRef).child('subscriptionPrice').once('value', priceSnap => {
        price = priceSnap.val();
        console.log("Start subscription price ", price)
    })
    db.ref(consultationDetailsRef).update({
        type: 'subscription',
        status: 'ongoing',
        subscriptionStarted: '' + new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
    });
    db.ref(`moneyTransfer/${consultantID}-${userId}/`).push({
        from: userId,
        to: consultantID,
        value: price
    })
}

export const cancelSubscription = (userId, consultantID) => async () => {
    let consultationDetailsRef = `consultations/${consultantID}/${userId}/consultationDetails`;

    var db = firebase.database();
    db.ref(consultationDetailsRef).update({
        type: 'session'
    });
}

export const updateConsultationDetails = (user, consultationDetails) => async () => {
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
}