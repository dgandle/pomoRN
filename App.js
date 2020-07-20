/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import styles from './Styles';

import Timer from './Timer.component';

const App = () => {

  return (
    <SafeAreaView style={styles.background}>
        <Timer />
    </SafeAreaView>
  );
};

export default App;
