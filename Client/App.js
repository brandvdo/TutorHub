/*

  Author: Tyler

  Search Bar for main screen

*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05998c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <AppNavigator/>
  );
}
