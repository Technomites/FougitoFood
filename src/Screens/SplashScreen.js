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
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import * as Animatable from 'react-native-animatable';
import {fontSize, scalableheight} from '../Utilities/fonts';
import LottieView from 'lottie-react-native';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import {storetoken, storetokenrefresh, refreshmytoken, isconnected, storecartdata, storerestrauntid, storecartprice} from '../Actions/actions';
// import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
const SplashScreen = props => {
  const {refreshtokendata, AuthToken} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content');
    // hideNavigationBar();
  }, []);

  async function navigatetogettingstarted() {
    const getgettingstartedvisited = await AsyncStorage.getItem('GettingStarted');
    if (getgettingstartedvisited != undefined && getgettingstartedvisited != '') {
      props.navigation.replace('Drawernavigator');
    }else{
      props.navigation.replace('GettingStarted');
    }

  }


  useEffect(() => {
    NetInfo.fetch().then(state => {
   
      if (state.isConnected == true && state.isInternetReachable == true) {
       dispatch(isconnected(true))
      } else {
        dispatch(isconnected(false))
      }
    });
    gettoken();
  }, []);

  
  async function gettoken() {
    const cartdatastore = await AsyncStorage.getItem('cartdata');
    if (cartdatastore != undefined && cartdatastore != '') {
    dispatch(storecartdata(JSON.parse(cartdatastore)));
    }
    
    const currentRestrauntidstore = await AsyncStorage.getItem('currentRestrauntid');
    if (currentRestrauntidstore != undefined && currentRestrauntidstore != '') {
      dispatch(storerestrauntid(JSON.parse(currentRestrauntidstore)));
      }
 
    const pricestore = await AsyncStorage.getItem('price');
    if (pricestore != undefined && pricestore != '') {
      dispatch(storecartprice(JSON.parse(pricestore)));
      }
   
    
    
    const value = await AsyncStorage.getItem('AccessToken');
     const refresh = await AsyncStorage.getItem('TokenInfo');
    console.log(value);
    if (value != undefined && value != '') {
      dispatch(storetoken(JSON.parse(value)));

      if (refresh != undefined && refresh != '') {
   
        dispatch(storetokenrefresh(JSON.parse(refresh)));
      }
    }
   
  }

  useEffect(() => {
    if(refreshtokendata != null){
      dispatch(refreshmytoken(refreshtokendata))
// console.log("yoooo1" + JSON.stringify(refreshtokendata))
    }

  }, [refreshtokendata]);
  return (
    <View style={styleSheet.BackgroundImage}>
        <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
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
        onAnimationFinish={() => 
          {navigatetogettingstarted()}}
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
