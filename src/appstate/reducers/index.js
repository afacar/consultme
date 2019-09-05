import { combineReducers } from 'redux';
import auth from './auth_reducers';
import app from './app_reducers';
import consultancy from './consultancy_reducers';
export default combineReducers({
    auth,
    app,
    consultancy,
});