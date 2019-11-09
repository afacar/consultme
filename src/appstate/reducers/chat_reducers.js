import {
    CONSULTANT_CHAT, USER_CHAT, CHATS_AUDIO, NEW_MESSAGE, CONSULTATION_DETAILS, CHAT_CONSULTANT_PROFILE, CHAT_USER_PROFILE, CHAT_CONSULTANT_LAST_MESSAGE, CHAT_USER_LAST_MESSAGE, CHAT_CONSULTANT_UNREAD, CHAT_USER_UNREAD
} from '../actions/action_types';

const INITIAL_STATE = {
    consultant_chats: {

    },
    user_chats: {

    },
    consultation_details: {},
    consultant_profiles: {

    },
    user_profiles: {

    },
    user_last_messages: {

    },
    consultant_last_messages: {

    },
    user_unread_count: {

    },
    consultant_unread_count: {

    },
    currentAudio: {
        id: "",
    }
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSULTATION_DETAILS: {
            const { consultation_details } = state;
            const consultation = action.payload;
            consultation_details[consultation.chatId] = consultation.consultationDetails;
            return { ...state, consultation_details }
        }
        case CHAT_CONSULTANT_PROFILE: {
            const { consultant_profiles } = state;
            const profile = action.payload;
            consultant_profiles[profile.uid] = profile;
            return { ...state, consultant_profiles }
        }

        case CHAT_USER_PROFILE: {
            const { user_profiles } = state;
            const profile = action.payload;
            user_profiles[profile.uid] = profile;
            return { ...state, user_profiles }
        }

        case CHAT_CONSULTANT_LAST_MESSAGE: {
            const { user_last_messages } = state;
            const lastMessage = action.payload.lastMessage;
            user_last_messages[action.payload.chatId] = lastMessage
            return { ...state, user_last_messages };
        }

        case CHAT_USER_LAST_MESSAGE: {
            const { consultant_last_messages } = state;
            const lastMessage = action.payload.lastMessage;
            consultant_last_messages[action.payload.chatId] = lastMessage
            return { ...state, consultant_last_messages };
        }

        case CHAT_USER_UNREAD: {
            const { user_unread_count } = state;
            const unreadObj = action.payload
            if (unreadObj)
                user_unread_count[unreadObj.id] = unreadObj.unread;
            return { ...state, user_unread_count }
        }

        case CHAT_CONSULTANT_UNREAD: {
            const { consultant_unread_count } = state;
            const unreadObj = action.payload
            if (unreadObj)
                consultant_unread_count[unreadObj.id] = unreadObj.unread;
            return { ...state, consultant_unread_count }
        }

        case CHATS_AUDIO:
            return { ...state, currentAudio: action.payload };
        case NEW_MESSAGE: {
            const { message, chatId, userMode } = action.payload;
            const { user_chats, consultant_chats } = state;
            console.log("New MESSAGE IN REDUCERS", action.payload)
            if (userMode) {
                var currentChat = [];
                if (user_chats[chatId])
                    currentChat = user_chats[chatId].messages;
                var exists = false;
                if (currentChat) {
                    currentChat.forEach(messageItem => {
                        if (messageItem._id === message._id)
                            exists = true;
                    })
                }
                if (!exists)
                    currentChat.unshift(message);
                if (user_chats[chatId])
                    user_chats[chatId].messages = currentChat;
                else {
                    user_chats[chatId] = {};
                    user_chats[chatId].messages = currentChat
                }
                return { ...state, user_chats };
            } else {
                var currentChat = [];
                if (consultant_chats[chatId])
                    currentChat = consultant_chats[chatId].messages;
                var exists = false;
                if (currentChat) {
                    currentChat.forEach(messageItem => {
                        if (messageItem._id === message._id)
                            exists = true;
                    })
                }
                if (!exists) {
                    currentChat.unshift(message);
                }
                if (consultant_chats[chatId])
                    consultant_chats[chatId].messages = currentChat;
                else {
                    consultant_chats[chatId] = {};
                    consultant_chats[chatId].messages = currentChat
                }
                return { ...state, consultant_chats };
            }
        }
        default:
            return state;
    }
}

function binarySearch(arr, chat) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid].id === chat.id) {
            return mid;
        }
        if (arr[mid].id < chat.id) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}