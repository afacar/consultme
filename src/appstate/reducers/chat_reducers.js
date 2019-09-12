import {
    CONSULTANT_CHAT, USER_CHAT, CHATS_AUDIO, NEW_MESSAGE
} from '../actions/action_types';

const INITIAL_STATE = {
    consultant_chats: [],
    user_chats: [],
    currentAudio: {
        id: "",
    }
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSULTANT_CHAT: {
            const { consultant_chats } = state;
            var exists = false
            var i = 0
            for (var i = 0; i < consultant_chats.length; i++) {
                if (consultant_chats[i].user.uid == action.payload.user.uid) {
                    exists = true
                    consultant_chats[i] = action.payload;
                }
            }
            console.log("All consultant chats", consultant_chats)
            if (!exists) {
                return { ...state, consultant_chats: [...state.consultant_chats, action.payload] };
            }
            return { ...state, consultant_chats: consultant_chats };
        }
        case USER_CHAT: {
            const { user_chats } = state;
            var exists = false
            var i = 0
            for (var i = 0; i < user_chats.length; i++) {
                if (user_chats[i].user.uid == action.payload.user.uid) {
                    exists = true
                    user_chats[i] = action.payload;
                }
            }
            if (!exists)
                return { ...state, user_chats: [...state.user_chats, action.payload] };
            return { ...state, user_chats: user_chats };
        }
        case CHATS_AUDIO:
            return { ...state, currentAudio: action.payload };
        case NEW_MESSAGE: {
            const { newMessage, chatId, userMode } = action.payload;
            const { user_chats, consultant_chats } = state;
            if (userMode) {
                for (var i = 0; i < user_chats.length; i++) {
                    const { chat, user } = user_chats[i];
                    if (user === chatId) {
                        chat[newMessage.id] = newMessage;
                        user_chats[i] = chat;
                        break;
                    }
                }
                return { ...state, user_chats: user_chats }
            } else {
                for (var i = 0; i < consultant_chats.length; i++) {
                    const { chat, user } = consultant_chats[i];
                    if (user === chatId) {
                        chat[newMessage.id] = newMessage;
                        consultant_chats[i] = chat;
                        break;
                    }
                }
                return { ...state, consultant_chats: consultant_chats }
            }
        }
        default:
            return state;
    }
}