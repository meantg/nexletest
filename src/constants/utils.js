import AsyncStorage from '@react-native-async-storage/async-storage';

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const isValidEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};
