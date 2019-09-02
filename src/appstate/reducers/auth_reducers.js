import {
    LOGIN,
    AUTH
} from '../actions/action_types';

const INITIAL_STATE = {
    user: null,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH:
            return { ...state, user: action.payload };
        case LOGIN:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}