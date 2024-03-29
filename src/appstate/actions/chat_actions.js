import firebase from 'react-native-firebase';
import { CHATS_AUDIO, NEW_MESSAGE } from './action_types';

const db = firebase.database();

export const fetchUserChats = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsFrom`;
    firebase.database().ref(consultantChatsUrl).on('child_added', chatsSnap => {
        var consultantId = chatsSnap.key;
        let consultantProfileUrl = `users/${consultantId}`;
        db.ref(consultantProfileUrl).on('value', consultantProfileSnap => {
            const snapValue = consultantProfileSnap.val();
            const profile = {
                name: snapValue.name,
                number: snapValue.number,
                photoURL: snapValue.photoURL,
                uid: snapValue.uid
            }
            callback(profile);
        });
    })
}

export const fetchUserUnreadMessages = (user, callback) => async () => {
    let unreadURL = `chats/${user.uid}/`;
    var db = firebase.database();
    db.ref(unreadURL).on('child_added', unreadSnap => {
        console.log("UnreadSnap", unreadSnap.val())
        if (unreadSnap.val()[user.uid]) {
            var consultantId = unreadSnap.key;
            var unread = unreadSnap.val()[user.uid].unread;
            var unreadObj = {
                id: consultantId,
                unread
            }
            console.log("UnreadObj in chat actions", unreadObj)
            callback(unreadObj);
        }
    })
    db.ref(unreadURL).on('child_changed', unreadSnap => {
        console.log("UnreadSnap", unreadSnap.val())
        if (unreadSnap.val()[user.uid]) {
            var consultantId = unreadSnap.key;
            var unread = unreadSnap.val()[user.uid].unread;
            var unreadObj = {
                id: consultantId,
                unread
            }
            console.log("UnreadObj in chat actions", unreadObj)
            callback(unreadObj);
        }
    })
}

export const fetchConsultantUnreadMessages = (user, callback) => async () => {
    let unreadURL = `chats/${user.uid}/${user.uid}`;
    var db = firebase.database();
    db.ref(unreadURL).on('child_added', unreadSnap => {
        var userID = unreadSnap.key;
        var unread = unreadSnap.child('unread').val();
        var unreadObj = {
            id: userID,
            unread
        }
        callback(unreadObj);
    })
    db.ref(unreadURL).on('child_changed', unreadSnap => {
        var userID = unreadSnap.key;
        var unread = unreadSnap.child('unread').val();
        var unreadObj = {
            id: userID,
            unread
        }
        callback(unreadObj);
    })
}

export const resetUnread = (userMode, userID, chatId) => () => {
    let unreadURL = '';
    if (userMode)
        unreadURL = `chats/${userID}/${chatId}/${userID}`
    else
        unreadURL = `chats/${userID}/${userID}/${chatId}`
    var db = firebase.database();
    db.ref(unreadURL).set({
        unread: 0
    });
}

export const fetchUserLastMessages = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsFrom`;
    firebase.database().ref(consultantChatsUrl).on('child_added', chatsSnap => {
        var chatId = chatsSnap.key;
        let lastMessageUrl = `consultations/${chatId}/${user.uid}/lastMessage`;
        firebase.database().ref(lastMessageUrl).on('value', lastMessageSnap => {
            callback({ lastMessage: lastMessageSnap.val(), chatId: chatId })
        })
    })
}

export const fetchUserMessages = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsFrom`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let chatUrl = `consultations/${chatId}/${user.uid}/messages`;
            firebase.database().ref(chatUrl).orderByChild('createdAt').on('child_added', newMessage => {
                callback({ message: newMessage.val(), chatId: chatId })
            })
        })
    })
}

export const fetchChatConsultationDetails = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsFrom`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let consultationDetailsUrl = `consultations/${chatId}/${user.uid}/consultationDetails`;
            firebase.database().ref(consultationDetailsUrl).on('value', consultationDetailsSnap => {
                callback({ consultationDetails: consultationDetailsSnap.val(), chatId: chatId })
            })
        })
    })
}

export const fetchConsultantChats = (user, callback) => async (dispatch) => {
    let userChatsUrl = `users/${user.uid}/consultationsTo`;
    firebase.database().ref(userChatsUrl).on('child_added', chatsSnap => {
        var userId = chatsSnap.key;
        let userProfileUrl = `users/${userId}`;
        db.ref(userProfileUrl).on('value', userProfileSnap => {
            const snapValue = userProfileSnap.val();
            const profile = {
                name: snapValue.name,
                number: snapValue.number,
                photoURL: snapValue.photoURL,
                uid: snapValue.uid
            }
            callback(profile);
        });
    })
}

export const fetchConsultantLastMessages = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsTo`;
    firebase.database().ref(consultantChatsUrl).on('child_added', chatsSnap => {
        var chatId = chatsSnap.key;
        let lastMessageUrl = `consultations/${user.uid}/${chatId}/lastMessage`;
        firebase.database().ref(lastMessageUrl).on('value', lastMessageSnap => {
            callback({ lastMessage: lastMessageSnap.val(), chatId: chatId })
        })
    })
}

export const fetchConsultantMessages = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsTo`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let chatUrl = `consultations/${user.uid}/${chatId}/messages`;
            firebase.database().ref(chatUrl).orderByChild('createdAt').on('child_added', newMessage => {
                callback({ message: newMessage.val(), chatId: chatId })
            })
        })
    })
}
export const fetchConsultantChatUserProfile = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsTo/`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let userProfileUrl = `users/${chatId}`;
            firebase.database().ref(userProfileUrl).on('value', userProfileSnap => {
                callback({ userProfile: userProfileSnap.val() })
            })
        })
    })
}
export const sendMessage = (messages, chatId, user, userMode, callback) => async (dispatch) => {
    const uid = user.uid;
    let unreadURL = '';
    var downloadUrl = '';
    var uploadUrl = '';
    var audioUrl = '';
    let messageURL = '';
    let theMessage = {};

    if (userMode) {
        unreadURL = `chats/${uid}/${chatId}/${uid}/unread`;
    } else {
        unreadURL = `chats/${uid}/${uid}/${chatId}/unread`;
    }
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];

        // set message url
        if (userMode) {
            messageURL = `consultations/${chatId}/${uid}/messages/${message._id}`;
        } else {
            messageURL = `consultations/${uid}/${chatId}/messages/${message._id}`;
        }

        // image url
        if (message.image) {
            if (userMode) {
                uploadUrl = `chatFiles/${chatId}/${uid}/image/${message._id}`
            } else {
                uploadUrl = `chatFiles/${uid}/${chatId}/image/${message._id}`
            }
        } else if (message.audio) {
            if (userMode) {
                uploadUrl = `chatFiles/${chatId}/${uid}/audio/${message._id}`
            } else {
                uploadUrl = `chatFiles/${uid}/${chatId}/audio/${message._id}`
            }
        }

        if (uploadUrl) {
            if (message.image) {
                await firebase.storage().ref(uploadUrl).putFile(message.path)
            }
            else if (message.audio) {
                var metadata = {
                    contentType: 'audio/mp3',
                };
                await firebase.storage().ref(uploadUrl).putFile(message.audioPath, metadata)
            }
            downloadUrl = await firebase.storage().ref(uploadUrl).getDownloadURL();
        }

        var messageData = {
            user: message.user,
            createdAt: message.createdAt,
            image: message.image ? downloadUrl : '',
            text: message.text,
            audio: message.audio ? downloadUrl : '',
            _id: message._id
        };
        let unread = await readFromFirebase(unreadURL);
        theMessage[unreadURL] = (unread || 0) + 1;
        theMessage[messageURL] = messageData;

        let lastMessageUrl = ''
        if (userMode) {
            lastMessageUrl = `consultations/${chatId}/${uid}/lastMessage`;
        } else {
            lastMessageUrl = `consultations/${uid}/${chatId}/lastMessage`;
        }
        let ref = firebase.database().ref();
        firebase.database().ref(lastMessageUrl).set(messageData)
        ref.update(theMessage);
    }
}

const readFromFirebase = (url) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(url).on('value', snap => {
            resolve(snap.val());
        }, error => {
            reject('readFromFirebase Error:' + error.message)
        })
    })
}

export const onIncomingCallListener = (userId, callback) => async () => {
    firebase.database().ref(`calls/${userId}`).on('value', incomingCallSnap => {
        var incomingCall = incomingCallSnap.val();
        if (incomingCall) {
            callback({ callerId: incomingCall.callerId, type: incomingCall.type, userMode: incomingCall.peerMode, remaining: incomingCall.remaining, price: incomingCall.price })
        } else {
            callback({ callerId: -1, type: undefined });
        }
    })
}

export const sendCall = (userId, userMode, peerId, type, callback) => async () => {
    console.log(peerId)
    try {
        firebase.database().ref(`calls/${peerId}`).once('value', async (incomingCallSnap) => {
            if (incomingCallSnap.exists()) {
                callback({ code: -1 })
            } else {
                var walletRef = userMode ? `wallets/${userId}` : `wallets/${peerId}`
                var priceRef = userMode ? `consultations/${peerId}/${userId}/consultationDetails/${type}Price` : `consultations/${userId}/${peerId}/consultationDetails/${type}Price`;
                var wallet = -1;
                var price = -1;
                await firebase.database().ref(walletRef).once('value', userWalletSnap => {
                    wallet = userWalletSnap.val();
                })
                await firebase.database().ref(priceRef).once('value', consultationDetailsSnap => {
                    price = consultationDetailsSnap.val()
                })
                var remaining = wallet * 60 / price
                await firebase.database().ref(`calls/${peerId}`).set({
                    callerId: userId,
                    type,
                    peerMode: !userMode,
                    remaining,
                    price
                })
                callback({ code: 1, remaining, price })
            }
        })
    } catch (e) {
        callback(0);
    }
}

export const endCall = (userId, peerId, callback) => async () => {
    try {
        firebase.database().ref(`calls/${peerId}`).remove();
        firebase.database().ref(`calls/${userId}`).remove();
        callback(1)
    } catch (e) {
        callback(0);
    }
}

export const setAudio = (id) => async (dispatch) => {
    return dispatch({ type: CHATS_AUDIO, payload: { id } })
}

export const updateMessages = (message, chatId, userMode) => (dispatch) => {
    return dispatch({ type: NEW_MESSAGE, payload: { message, chatId, userMode } })
}

export const incrementCharCounter = (length, chatId) => async (dispatch) => {
    firebase.database().ref(`consultations/${chatId}/${firebase.auth().currentUser.uid}/consultationDetails/counter`).transaction((charCounter) => {
        return (charCounter || 0) + length
    })
}