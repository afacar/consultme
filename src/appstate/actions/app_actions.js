import {
    APP,
    USER_CHAT,
    CONSULTANT_CHAT,
    SELECTED_CHAT,
    SAVE_IMAGES,
    CONSULTATION_DETAILS,
    CHAT_CONSULTANT_PROFILE,
    CHAT_USER_PROFILE,
    CHAT_CONSULTANT_LAST_MESSAGE,
    NEW_MESSAGE,
    CHAT_USER_LAST_MESSAGE,
    CALL_IN_PROGRESS_CONDITION,
    CHAT_CONSULTANT_UNREAD,
    CHAT_USER_UNREAD,
} from './action_types';

export const saveConsultant = (consultant) => (dispatch) => {
    return dispatch({ type: APP, payload: consultant })
}

export const saveUserChat = (profile) => (dispatch) => {
    return dispatch({ type: CHAT_CONSULTANT_PROFILE, payload: profile })
}

export const saveUserLastMessage = (lastMessageObj) => (dispatch) => {
    return dispatch({ type: CHAT_CONSULTANT_LAST_MESSAGE, payload: lastMessageObj })
}

export const saveUserMessages = (message) => (dispatch) => {
    console.log("SUM called")
    return dispatch({ type: NEW_MESSAGE, payload: message })
}

export const saveConsultationDetails = (consultation) => (dispatch) => {
    return dispatch({ type: CONSULTATION_DETAILS, payload: consultation })
}

export const saveConsultantChat = (profile) => (dispatch) => {
    return dispatch({ type: CHAT_USER_PROFILE, payload: profile })
}

export const saveConsultantLastMessage = (lastMessageObj) => (dispatch) => {
    return dispatch({ type: CHAT_USER_LAST_MESSAGE, payload: lastMessageObj })
}

export const saveUserUnreadMessageCount = (unreadObj) => (dispatch) => {
    return dispatch({ type: CHAT_USER_UNREAD, payload: unreadObj })
}

export const saveConsultantUnreadMessageCount = (unreadObj) => (dispatch) => {
    return dispatch({ type: CHAT_CONSULTANT_UNREAD, payload: unreadObj })
}

export const saveConsultantMessages = (message) => (dispatch) => {
    console.log("SCM called")
    return dispatch({ type: NEW_MESSAGE, payload: message })
}

export const setSelectedChatId = (chatId, userMode) => (dispatch) => {
    return dispatch({ type: SELECTED_CHAT, payload: { chatId, userMode } })
}

export const saveImages = (chatId, userMode, images) => (dispatch) => {
    return dispatch({ type: SAVE_IMAGES, payload: { chatId, userMode, images } })
}

export const setCallInProgress = (condition) => (dispatch) => {
    return dispatch({ type: CALL_IN_PROGRESS_CONDITION, payload: condition })
};
