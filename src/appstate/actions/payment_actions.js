import firebase from "react-native-firebase";

export const startThreeDSPayment = (card, user, price) => (dispatch) => {
    console.log("3 D Secure payment with card", card + '\n user ' + user + '\n price ' + price);
    const { _user } = firebase.auth().currentUser;

    let { displayName, email, phoneNumber, metadata } = _user;
    const { creationTime, lastSignInTime } = metadata;

    const lastLoginDate = getFormattedDateTime(lastSignInTime);
    const registrationDate = getFormattedDateTime(creationTime);

    console.log('lastLoginDate', lastLoginDate);
    console.log('registrationDate', registrationDate);

    const tempName = displayName.split(' ');
    let name = tempName[0];
    let surname = tempName[1];
    const nameLength = tempName.length;

    if (nameLength === 3) {
        name = tempName[0] + ' ' + tempName[1];
        surname = tempName[nameLength - 1];
    } else if (nameLength === 1) {
        name = tempName[0];
        surname = tempName[0];
    }

    email = email || 'info@afacar.com';
    const gsmNumber = phoneNumber || '+905554443322';

    var conversationId = user.uid + "_" + (new Date().getTime());
    var buyerAddress = {
        contactName: card.name,
        city: user.city,
        country: 'Turkey',
        address: user.address,
        zipCode: user.zipCode
    };
    let data = {
        price: parseFloat(price),
        paidPrice: parseFloat(price),
        conversationId: conversationId,
        conversationData: _user.displayName + "-" + conversationId,
        paymentCard: {
            cardHolderName: card.name,
            cardNumber: card.number,
            expireMonth: card.month,
            expireYear: '20' + card.year,
            cvc: card.CVC,
            registerCard: '0'
        },
        callbackUrl: 'https://us-central1-consultme-cb5ad.cloudfunctions.net/threedsCallback',
        installment: '1',
        basketId: 'B67832',
        buyer: {
            id: _user.uid,
            name,
            surname: 'Haji-zada',
            gsmNumber,
            email,
            identityNumber: '74300864791',
            lastLoginDate,
            registrationDate,
            registrationAddress: user.address,
            ip: '85.34.78.112',
            city: user.city,
            country: 'Turkey',
            zipCode: user.zipCode
        },
        buyerAddress: {
            contactName: card.name,
            city: user.city,
            country: 'Turkey',
            address: user.address,
            zipCode: user.zipCode
        },
        shippingAddress: buyerAddress,
        billingAddress: buyerAddress,
    };
    console.log('data is ready for callable makePayment method');
    var makePayment = firebase.functions().httpsCallable('makeThreeDSPayment');

    return new Promise((resolve, reject) => {
        makePayment(data)
            .then((result) => {
                console.log('makeThreeDSPayment resolves =>', result);
                resolve(result);
            })
            .catch(err => {
                console.log('makeThreeDSPayment rejects =>', err);
                reject(err);
            });
    });
};

export const startPayment = (card, user, price) => (dispatch) => {
    console.log("Payment with card", card + '\n user ' + user + '\n price ' + price);
}

const getFormattedDateTime = (timestamp = new Date()) => {
    /** Take datetime object and return string representation of time as 09:30 */
    let datetime = new Date(timestamp);

    let dd = datetime.getDate();
    let mm = datetime.getMonth() + 1; //January is 0!
    let yyyy = datetime.getFullYear();

    if (dd < 10) { dd = '0' + dd; }

    if (mm < 10) { mm = '0' + mm; }

    let date = yyyy + '-' + mm + '-' + dd;

    let hr = datetime.getHours();
    let min = datetime.getMinutes();
    let sec = datetime.getSeconds();

    if (hr < 10) hr = '0' + hr
    if (min < 10) min = '0' + min
    if (sec < 10) sec = '0' + sec

    let time = hr + ':' + min + ':' + sec;

    return date + ' ' + time;
}

export const finalize_threeds_payment = ((paymentObject) => async (dispatch) => {
    var finalizePayment = firebase.functions().httpsCallable('finalizeThreeDSPayment');
    return new Promise((resolve, reject) => {
        finalizePayment(paymentObject)
            .then((result) => {
                console.log("RESULT", result)
                resolve(result)
            })
            .catch(err => {
                console.log('finalizepayment rejects =>', err);
                reject(err);
            });
    });
});

export const checkNewPayment = (callback) => async (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    console.log("Inside new payments", uid);
    firebase.database().ref(`payments/results/${uid}`).on('child_added', newPayment => {
        console.log("New payment", newPayment.val());
        callback(newPayment.val());
    })
}