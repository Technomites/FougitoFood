import 'react-native-gesture-handler';
import React, {useState, useEffect, Component} from 'react';
//import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  LogBox,
} from 'react-native';
import {Provider} from 'react-redux';
// import Navigator from './src/Routes/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


import MainNavigator from './src/Navigation/MainNavigator';
//import MainNavigator from './src/Navigation/MainNavigator';
const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

function App() {
  return <MainNavigator />;
}

const styles = StyleSheet.create({});

// export default connect( mapStateToProps, mapDispatchToProps) (App);
// export default codePush(codePushOptions)(App);
export default App;
