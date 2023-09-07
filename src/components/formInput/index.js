import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIcon from '../../../assets/svg';

const FormInput = ({
  title = '',
  password = false,
  value,
  onChangeText,
  onBlur,
  placeholder = '',
  valid,
}) => {
  const [showPw, setShowPw] = useState(password);

  console.log('register ', password ? 'password' : 'username', valid);

  return (
    <View
      style={[
        styles.viewInput,
        !password ? {paddingBottom: 10} : {paddingTop: 10},
      ]}>
      <Text style={styles.titleStyle}>{value?.length > 0 && title}</Text>
      <View style={styles.flexRow}>
        <TextInput
          value={value}
          keyboardAppearance="dark"
          onChangeText={txt => onChangeText(txt, password)}
          onBlur={onBlur}
          secureTextEntry={showPw}
          placeholder={placeholder}
          placeholderTextColor={'#FFFFFF80'}
          inputMode={password ? 'text' : 'email'}
          style={[styles.inputStyle, !password && styles.borderBottom]}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setShowPw(!showPw)}
            style={styles.pwIcon}>
            <AppIcon.IconShowPassword />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.validTxt}>
        {!valid && value ? `Field is require` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    width: '100%',
    paddingBottom: 5,
  },
  titleStyle: {
    fontSize: 12,
    color: '#FFFFFF80',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#647FFF',
  },
  inputStyle: {
    padding: 15,
    fontSize: 16,
    color: 'white',
  },
  pwIcon: {
    position: 'absolute',
    right: 0,
    top: 25,
  },
  validTxt: {
    color: 'red',
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 12,
  },
});

export default FormInput;
