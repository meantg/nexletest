import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN_IMG} from '../../../assets/image';
import AppIcon from '../../../assets/svg';
import {debounce} from '../../constants/utils';
import {signIn, signUp} from '../../redux/reducer/auth/thunkAction';
import RegisterForm from './components/registerForm';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const [is16, setIs16] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: 'Tester',
    lastName: 'Mr',
  });

  useEffect(() => {
    checkToken();
  }, [token]);

  const checkToken = async () => {
    const storageToken = await AsyncStorage.getItem('access_token');
    storageToken && navigation.navigate('Category', {token: storageToken});
  };

  const handleSignUp = () => {
    dispatch(signUp(user));
  };

  const handleFormInput = debounce((txt, isPassword) => {
    if (isPassword) {
      setUser({...user, password: txt});
    } else {
      setUser({...user, email: txt});
    }
  }, 500);

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RegisterForm
            handleFormInput={handleFormInput}
            onChangeIs16={() => {
              setIs16(!is16);
              handleSignUp();
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.container}>
      <View style={[styles.container]}>
        <ImageBackground
          style={styles.imageViewStyle}
          imageStyle={styles.imageBackgroundStyle}
          source={LOGIN_IMG}
          resizeMode="cover">
          <LinearGradient
            colors={['transparent', 'black', 'black']}
            style={styles.linearGradient}>
            {renderContent()}
          </LinearGradient>
        </ImageBackground>
        <TouchableOpacity style={styles.backBtn}>
          <AppIcon.IconBack />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '10%',
    padding: 25,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    padding: 20,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageViewStyle: {
    flex: 1,
  },
  imageBackgroundStyle: {
    height: '55%',
  },
});

export default RegisterScreen;
