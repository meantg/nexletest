import {create} from 'apisauce';
import {getAccessToken} from '../constants/utils';

const api = create({
  baseURL: 'http://streaming.nexlesoft.com:3001/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  get: async (endpoint, params = {}) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      api.setHeader('Authorization', `Bearer ${accessToken}`);
    }
    return api.get(endpoint, params);
  },
  post: async (endpoint, data = {}) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      api.setHeader('Authorization', `Bearer ${accessToken}`);
    }
    return api.post(endpoint, data);
  },
};

export default apiService;
