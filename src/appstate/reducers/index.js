import { combineReducers } from 'redux';
import auth from './auth_reducers';
import app from './app_reducers';
import consultancy from './consultancy_reducers';
import chat from './chat_reducers';
import payment from './payment_reducers';
import connectycube_user from './connectycube_user_reducers';
import connectycube_videosession from './connectycube_videosession_reducers';


export default combineReducers({
    auth,
    app,
    consultancy,
    chat,
    payment,
    connectycube_user,
    connectycube_videosession
});