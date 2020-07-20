/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView } from 'react-native';

import Timer from './src/Timer.component';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#F3F6EF', flex: 1}}>
        <Timer />
    </SafeAreaView>
  );
};

export default App;
