// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


/**
 * @format
 */
 import React, {
    Component,
  } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import PushNotification from 'react-native-push-notification';   //firebase
 import messaging from '@react-native-firebase/messaging';   //firebase
import { Store } from './src/store';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const FougitoFood = () => (
    <Provider store={Store}>
    
   
  
      <App />
    </Provider>
  );

  PushNotification.createChannel(
    {
      channelId: 'products', // (required)
      channelName: 'Orders', // (required)
      channelDescription: 'Order related Notification', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 5, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  
  messaging().setBackgroundMessageHandler(async remoteMessage => {console.log('Message handled in the background!', remoteMessage);});
 
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(FougitoFood));
