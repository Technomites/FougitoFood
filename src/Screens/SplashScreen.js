import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  Button,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import * as Animatable from 'react-native-animatable';
import {fontSize, scalableheight} from '../Utilities/fonts';
import LottieView from 'lottie-react-native';
// import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
const SplashScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content');
    hideNavigationBar();
  }, []);

  async function navigatetogettingstarted() {
    props.navigation.replace('GettingStarted');
  }
  return (
    <View style={styleSheet.BackgroundImage}>
      {/* 
      <Animatable.View
        animation="slideInDown"
        duration={3000}
        style={{
          
     

          justifyContent: 'center',
          alignItems: 'center',
        }}>
     <Image
    resizeMode= "contain"
      style={styleSheet.Image}
      source={require('../Resources/images/LogoBig.png')}/>
      </Animatable.View> */}
      <LottieView
        source={require('../Resources/images/lootie.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigatetogettingstarted()}
      />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Image: {
    width: scalableheight.thirtysix,
    height: scalableheight.thirtytwo,
    marginBottom: '30%',
  },
});
export default SplashScreen;
