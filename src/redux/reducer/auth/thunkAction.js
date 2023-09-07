import apiService from '../../../api/request';
import {handleError, login, signup} from './action';

export function signUp(user) {
  return async dispatch => {
    await apiService.post('auth/signup', user).then(res => {
      if (res.ok) {
        dispatch(signup(res.data));
        dispatch(signIn({email: user.email, password: user.password}));
      } else {
        dispatch(handleError(res.data));
        console.log('SignUp Failed: ', res);
      }
    });
  };
}

export function signIn({email, password}) {
  return async dispatch => {
    await apiService
      .post('auth/signin', {email: email, password: password})
      .then(res => {
        if (res.ok) {
          dispatch(login(res.data));
        } else {
          dispatch(handleError(res.data));
          console.log('SignIn Failed: ', res);
        }
      });
  };
}
