import {
    APP,
    USER_CHAT,
    CONSULTANT_CHAT,
    SELECTED_CHAT,
    SAVE_IMAGES,
} from './action_types';

export const saveConsultant = (consultant) => (dispatch) => {
    return dispatch({ type: APP, payload: consultant })
}

export const saveConsultantChat = (chat) => (dispatch) => {
    return dispatch({ type: CONSULTANT_CHAT, payload: chat })
}

export const saveUserChat = (chat) => (dispatch) => {
    return dispatch({ type: USER_CHAT, payload: chat })
}

export const setSelectedChatId = ( chatId, userMode ) => (dispatch) => {
    return dispatch({type: SELECTED_CHAT, payload: {chatId, userMode}})
}

export const saveImages = (chatId, userMode, images) => (dispatch) => {
    return dispatch({type: SAVE_IMAGES, payload: {chatId, userMode, images}})
}