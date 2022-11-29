/*

  Author: Tyler

  Search Bar for main screen

*/
import React from 'react';
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); 
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
      );
    }
    
    export default App;