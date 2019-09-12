import firebase from 'react-native-firebase';
import { CHATS_AUDIO, NEW_MESSAGE } from './action_types';

export const fetchUserChats = (user, callback) => async (dispatch) => {

    let consultantChatsUrl = `users/${user.uid}/consultationsFrom/`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let chatUrl = `consultations/${chatId}/${user.uid}`;
            firebase.database().ref(chatUrl).child('chat').on('value', chatSnap => {
                firebase.database().ref(chatUrl).child('consultant').on('value', consultantSnap => {
                    callback({ chat: chatSnap.val(), user: consultantSnap.val() });
                })
            })
        })
    })
}

export const fetchConsultantChats = (user, callback) => async (dispatch) => {
    let consultantChatsUrl = `users/${user.uid}/consultationsTo/`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            let chatUrl = `consultations/${user.uid}/${chatId}`;
            firebase.database().ref(chatUrl).child('chat').on('value', chatSnap => {
                firebase.database().ref(chatUrl).child('user').on('value', userSnap => {
                    callback({ chat: chatSnap.val(), user: userSnap.val() });
                })
            })
        })
    })
}
export const sendMessage = (messages, chatId, user, userMode, uploadPercentage) => async (dispatch) => {
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
            messageURL = `consultations/${chatId}/${uid}/chat/${message._id}`;
        } else {
            messageURL = `consultations/${uid}/${chatId}/chat/${message._id}`;
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

        console.log("passed here?")
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
            lastMessageUrl = `consultations/${chatId}/${uid}/chat/lastMessage`;
        } else {
            lastMessageUrl = `consultations/${uid}/${chatId}/chat/lastMessage`;
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

export const updateMessages = (newMessage, chatId, userMode) => (dispatch) => {
    console.log("new message", JSON.stringify(newMessage) + '\n id ' + chatId)
    return dispatch({ type: NEW_MESSAGE, payload: { newMessage, chatId, userMode } })
}