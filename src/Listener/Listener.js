import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export default listeners = () => {
  if (global.notifListener) {
    return;
  }

  global.notifListener = messaging().onMessage(async remoteMessage => {
    console.log('on screen messages' + JSON.stringify(remoteMessage));

 
    
    PushNotification.localNotification({
      // Android Only Properties /
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: remoteMessage.notification?.body, // (optional) default: "message" prop
      subText: remoteMessage.notification?.body, // (optional) default: none
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      group: 'products', // (optional) add group to message
      channelId: 'products',
      groupSummary: true, // (optional) set this notification to be the group summary for a group of Messages, default: false
      priority: 'max', // (optional) set notification priority, default: high
      visibility: 'public', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS Messages appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting

      //   / iOS only properties /

      //   / iOS and Android properties /
      title: remoteMessage.notification?.title, // (optional)
      message: remoteMessage.notification?.body, // (required)
      userInfo: {...remoteMessage.data}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    });
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:' +
        remoteMessage.notification,
    );
   

  });

  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:' + remoteMessage,
        );
       
      }
    })
    .catch(() => {});

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // (required) Called when a remote is received or opened, or local notification is opened
    onRegister: () => {
      console.log('REGISTRED');
    },
    popInitialNotification: async notification => {
      console.log('popInitialNotification:', notification);
    },
    onNotification: async notification => {
      console.log('NOTIFICATION:', notification);
      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    //default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushMessagesHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};


