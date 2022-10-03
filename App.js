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

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested",
  `useNativeDriver`,
  `Accessing the 'state' property of the 'route' object`,
  `Sending...`,
  `Found screens with the same name nested inside one another. Check:`,
  "Warning: Encountered two children with the same key, `1`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
  `Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  in AnimationScreenTaskComplete (at SceneView.tsx:126)`,
  `Invariant Violation: requireNativeComponent: "RNSVGTSpan" was not found in the UIManager.`,
  "`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead",
  `Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.
  Arguments`,
  `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
]);


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
