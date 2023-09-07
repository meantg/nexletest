// reducers/index.js
import {combineReducers} from 'redux';
import authReducer from './reducer/auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
