import {
    CONSULTANT_CHAT, USER_CHAT
} from '../actions/action_types';

const INITIAL_STATE = {
    consultant_chats: [],
    user_chats: [],
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
                    consultants[i] = action.payload;
                }
            }
            console.log("ALl consults", consultant_chats)
            if (!exists)
                return { ...state, consultant_chats: [...state.consultant_chats, action.payload] };
            return { ...state, consultant_chats: consultant_chats };
        }
        case USER_CHAT: {
            const { user_chats } = state;
            var exists = false
            var i = 0
            for (var i = 0; i < user_chats.length; i++) {
                if (user_chats[i].user.uid == action.payload.user.uid) {
                    exists = true
                    consultants[i] = action.payload;
                }
            }
            console.log("ALl consults", user_chats)
            if (!exists)
                return { ...state, user_chats: [...state.user_chats, action.payload] };
            return { ...state, user_chats: user_chats };
        }
        default:
            return state;
    }
}