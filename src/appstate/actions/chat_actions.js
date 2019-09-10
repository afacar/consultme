import firebase from 'react-native-firebase';

export const fetchUserChats = (user, callback) => async (dispatch) => {
    console.log("FETCHING U CHATS");

    let consultantChatsUrl = `users/${user.uid}/consultationsFrom/`;
    firebase.database().ref(consultantChatsUrl).on('value', chatsSnap => {
        console.log("ChatsSnap", chatsSnap.val())
        chatsSnap.forEach(chatIdSnap => {
            var chatId = chatIdSnap.key;
            console.log("ChatID", chatId)
            let chatUrl = `consultations/${chatId}/${user.uid}`;
            firebase.database().ref(chatUrl).child('chat').on('value', chatSnap => {
                firebase.database().ref(chatUrl).child('consultant').on('value', consultantSnap => {
                    console.log("Chat and user", chatSnap.val() + "\n" + consultantSnap.val())
                    callback({ chat: chatSnap.val(), user: consultantSnap.val() });
                })
            })
        })
    })
}

export const fetchConsultantChats = (user, callback) => async (dispatch) => {
    console.log("FETCHING C CHATS");

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