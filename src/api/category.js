import {getCategories, handleError} from '../redux/reducer/auth/action';
import apiService from './request';

export const apiGetListCategory = () => {
  return async dispatch => {
    await apiService.get('categories').then(res => {
      if (res.ok) {
        console.log('getListCategories Done: ', res);
        dispatch(getCategories(res.data));
        return res;
      } else {
        dispatch(handleError(res.data));
        console.log('getListCategories Failed: ', res);
        return res;
      }
    });
  };
};
