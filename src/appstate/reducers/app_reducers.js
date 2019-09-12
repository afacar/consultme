import {
  APP, SELECTED_CHAT, NEW_MESSAGE, SAVE_IMAGES
} from '../actions/action_types';

const INITIAL_STATE = {
  consultants: [],
  selectedChat: {
    chatId: '',
    userMode: true,
    images: [],
  }
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
      return {...state, selectedChat: {...state.selectedChat, images: action.payload.images}}
    }
    default:
      return state;
  }
}