import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import AppIcon from '../../../../assets/svg';
import FormInput from '../../../components/formInput';
import {isValidEmail} from '../../../constants/utils';

const screenWidth = Dimensions.get('window').width;

const getPasswordStrengthLevel = password => {
  let strength = 0;
  if (password.length > 5 && password.length < 19) {
    if (/[a-z]/.test(password)) {
      strength++;
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    }
    if (/\d/.test(password)) {
      strength++;
    }
    if (/[!@#$%^&*]/.test(password)) {
      strength++;
    }
  }
  return strength;
};

const RegisterForm = ({handleFormInput, onChangeIs16}) => {
  const term =
    'By clicking Sign Up, you are indicating that you have read and agree to the';
  const termOfService = 'Terms of Service';
  const privacy = 'Privacy Policy';

  const [is16, setIs16] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });
  const [valid, setValid] = useState({userName: false, password: false});

  const handleChange = (type, value) => {
    if (type === 'password') {
      setUser({...user, password: value});
      setValid({...valid, password: getPasswordStrengthLevel(value) === 4});
    } else {
      setUser({...user, userName: value});
      setValid({...valid, userName: isValidEmail(value)});
    }
    handleFormInput(value, type === 'password');
  };

  const progressProps = level => {
    switch (level) {
      case 0:
        return {color: '#FFFFFF6B', title: 'Too short'};
      case 1:
        return {color: '#E05151', title: 'Weak'};
      case 2:
        return {color: '#E3A063', title: 'Fair'};
      case 3:
        return {color: '#647FFF', title: 'Good'};
      case 4:
        return {color: '#91E2B7', title: 'Strong'};
      default:
        break;
    }
  };

  const renderSignUp = () => {
    return (
      <View style={[styles.flexRowCenter, styles.signUpContainer]}>
        <Text style={[{fontSize: 16}, styles.whiteTxt]}>Sign Up</Text>
        <TouchableOpacity
          disabled={!is16 || !valid.userName || !valid.password}
          onPress={() => {
            setIs16(!is16);
            onChangeIs16();
          }}>
          <AppIcon.IconNext />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Let’s get you started!</Text>
      <View>
        <FormInput
          title="Your email"
          onChangeText={txt => handleChange('email', txt)}
          value={user.userName}
          placeholder="Your email"
          valid={valid.userName}
        />
        <FormInput
          title="Your password"
          onChangeText={txt => handleChange('password', txt)}
          value={user.password}
          placeholder="Your password"
          password={true}
          valid={valid.password}
        />
        <View>
          <Progress.Bar
            color={progressProps(getPasswordStrengthLevel(user.password)).color}
            progress={0.25 * getPasswordStrengthLevel(user.password)}
            width={screenWidth - 40}
          />
          <Text style={styles.status}>
            {progressProps(getPasswordStrengthLevel(user.password)).title}
          </Text>
        </View>
        <View style={styles.flexRowCenter}>
          <TouchableOpacity onPress={() => setIs16(!is16)}>
            {is16 ? <AppIcon.IconCheckedBox /> : <AppIcon.IconCheckBox />}
          </TouchableOpacity>
          <Text style={styles.whiteTxt}> {'  '}I am over 16 years of age</Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={[styles.whiteTxt, styles.smallTxt]}>
            {term}{' '}
            <TouchableOpacity>
              <Text style={[styles.smallTxt, styles.specialTxt]}>
                {termOfService}
              </Text>
            </TouchableOpacity>{' '}
            and{' '}
            <TouchableOpacity>
              <Text style={[styles.smallTxt, styles.specialTxt]}>
                {privacy}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        {renderSignUp()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    paddingBottom: 25,
    color: 'white',
  },
  status: {
    color: '#FFFFFF80',
    textAlign: 'right',
    fontSize: 12,
    paddingTop: 10,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteTxt: {
    color: 'white',
  },
  termContainer: {
    paddingTop: 25,
  },
  smallTxt: {
    color: '#FFFFFF80',
    fontSize: 12,
  },
  specialTxt: {
    color: '#647FFF',
    top: 2.5,
  },
  signUpContainer: {
    justifyContent: 'space-between',
    paddingTop: 35,
  },
});

export default RegisterForm;
