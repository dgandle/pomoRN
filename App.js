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
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import styles from './Styles';

import Timer from './Timer.component';

const App = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.main}>
        <Text style={styles.titleText}>Pomo.</Text>
        <Timer />
      </View>
    </SafeAreaView>
  );
};

export default App;
