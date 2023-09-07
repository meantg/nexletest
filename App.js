import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import MainStack from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

StatusBar.setBarStyle('light-content', true);

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainStack />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
