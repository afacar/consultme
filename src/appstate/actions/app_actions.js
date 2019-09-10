import {
    APP,
    USER_CHAT,
    CONSULTANT_CHAT
} from './action_types';

export const saveConsultant = (consultant) => (dispatch) => {
    return dispatch({ type: APP, payload: consultant })
}

export const saveConsultantChat = (chat) => (dispatch) => {
    console.log("Saving consultant chat", chat)
    return dispatch({ type: CONSULTANT_CHAT, payload: chat })
}

export const saveUserChat = (chat) => (dispatch) => {
    console.log("Saving consultant chat", chat)
    return dispatch({ type: USER_CHAT, payload: chat })
}