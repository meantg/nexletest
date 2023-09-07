// store.js
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers'; // You need to create this reducer
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
