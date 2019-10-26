import {
    CONSULTANTS
} from './action_types';
import firebase from 'react-native-firebase';

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

    var db = firebase.database();
    db.ref(consultationDetailsRef).child('subscriptionPrice').once('value', priceSnap => {
        var price = priceSnap.val();
        var product = {
            name: userId + '-' + consultantID
        }

        var paymentPlan = {
            productReferenceCode: product.name,
            name: product.name,
            price: parseFloat(price),
            currencyCode: 'TL',
            paymentInterval: "DAILY",
            paymentIntervalCount: 1,
            planPaymentType: 'RECURRING'
        }
        db.ref(consultationDetailsRef).child('type').update('subscription');
    })
}

export const cancelSubscription = (userId, consultantID) => async () => {
    let consultationDetailsRef = `consultations/${consultantID}/${userId}/consultationDetails/type`;

    var db = firebase.database();
    var product = {
        name: userId + '-' + consultantID
    }
    db.ref(consultationDetailsRef).update('session');
}