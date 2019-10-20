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
            firebase.database().ref(consultationDetailsUrl).once('value', consultationDetailsSnap => {
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