export const ACTION_TYPE = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  LOADING: 'LOADING',
  GET_CATEGORY: 'GET_CATEGORY',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
};

export const login = token => {
  //calAPI
  return {type: ACTION_TYPE.LOGIN, token: {accessToken: token.accessToken}};
};

export const signup = userData => {
  return {type: ACTION_TYPE.SIGNUP, userData: userData};
};

export const getCategories = data => {
  return {type: ACTION_TYPE.GET_CATEGORY, data};
};

export const handleError = error => {
  return {type: ACTION_TYPE.FETCH_DATA_ERROR, error: error};
};
