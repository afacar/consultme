import {
    APP
} from './action_types';

export const saveConsultant = (consultant) => (dispatch) => {
    console.log("New consultant is being saved", consultant)
    return dispatch({type: APP, payload: consultant})
}