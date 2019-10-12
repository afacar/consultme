import {
  APP, SELECTED_CHAT, SAVE_IMAGES, CALL_IN_PROGRESS_CONDITION
} from '../actions/action_types';

const INITIAL_STATE = {
  consultants: [],
  selectedChat: {
    chatId: '',
    userMode: true,
    images: [],
  },
  callInProgress: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP: {
      const { consultants } = state;
      var exists = false
      var i = 0
      for (var i = 0; i < consultants.length; i++) {
        if (consultants[i].uid == action.payload.uid) {
          exists = true
          consultants[i] = action.payload;
        }
      }
      if (!exists)
        return { ...state, consultants: [...state.consultants, action.payload] };
      return { ...state, consultants: consultants };
    }
    case SELECTED_CHAT: {
      return { ...state, selectedChat: action.payload }
    }
    case SAVE_IMAGES: {
      return { ...state, selectedChat: { ...state.selectedChat, images: action.payload.images } }
    }
    case CALL_IN_PROGRESS_CONDITION: {
      return { ...state, callInProgress: action.payload }
    }
    default:
      return state;
  }
}