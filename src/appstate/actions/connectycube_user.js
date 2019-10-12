import { USER_LOGIN, USER_LOGOUT, VIDEO_CALL_OPPONENTS, USER_IS_LOGGING } from "./action_types"

export const userLogin = user => ({ type: USER_LOGIN, user: user })
export const userLogout = () => ({ type: USER_LOGOUT })
export const videoCallOpponentsIds = opponentsIds => ({ type: VIDEO_CALL_OPPONENTS, opponentsIds: opponentsIds })
export const userIsLogging = userIsLogging => ({ type: USER_IS_LOGGING, userIsLogging: userIsLogging })