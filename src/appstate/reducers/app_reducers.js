import {
  APP
} from '../actions/action_types';

const INITIAL_STATE = {
  consultants: [],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP: {
      const { consultants } = state;
      var exists = false
      var i = 0
      for (var i = 0; i < consultants.length; i++) {
        console.log("Consultant at ", i + "\n" + consultants[i])
        if (consultants[i].uid == action.payload.uid) {
          exists = true
          console.log("Same uid found " + "\n" + "consultant " + '\n' + consultants[i]);
          consultants[i] = action.payload;
          console.log("Same uid changed into " + "\n" + "consultant " + '\n' + consultants[i]);
        }
      }
      console.log("ALl consults", consultants)
      if (!exists)
        return { ...state, consultants: [...state.consultants, action.payload] };
      return { ...state, consultants: consultants };
    }
    default:
      return state;
  }
}