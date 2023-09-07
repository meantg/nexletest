import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACTION_TYPE} from './action';

const initialState = {
  user: {},
  token: null,
  error: null,
  lsCategory: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOADING:
      return {...state, loading: action.loading};
    case ACTION_TYPE.LOGIN: {
      AsyncStorage.setItem('access_token', action.token.accessToken);
      return {...state, token: action.token};
    }
    case ACTION_TYPE.SIGNUP:
      return {...state, user: action.userData};
    case ACTION_TYPE.GET_CATEGORY:
      return {...state, lsCategory: action.data};
    case ACTION_TYPE.FETCH_DATA_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default authReducer;
