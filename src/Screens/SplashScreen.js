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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
import {
  storetoken,
  storetokenrefresh,
  refreshmytoken,
  isconnected,
  storecartdata,
  storerestrauntid,
  storecartprice,
  storecurrentaddress,
} from '../Actions/actions';

// import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
const SplashScreen = props => {
  const [locationenabled, setlocationenabled] = useState(true);
  const {refreshtokendata, AuthToken, refreshcomplete} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content');
    // hideNavigationBar();
  }, []);

  async function navigatetogettingstarted() {
    const getgettingstartedvisited = await AsyncStorage.getItem(
      'GettingStarted',
    );

    if (
      getgettingstartedvisited != undefined &&
      getgettingstartedvisited != ''
    ) {
      props.navigation.replace('Drawernavigator');
    } else {
      props.navigation.replace('GettingStarted');
    }
  }

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log('state.isConnected' + state.isConnected);
      console.log('state.isInternetReachable' + state.isInternetReachable);
      if (state.isConnected == true) {
        dispatch(isconnected(true));
        console.log('connected');
      } else {
        dispatch(isconnected(false));
        // navigatetogettingstarted()
        console.log('disconnected');
      }
      gettoken();
    });
  }, []);

  // useEffect(() => {
  //  if(locationenabled == false){
  //   getLocation()
  //  }else{

  //   navigatetogettingstarted()
  //  }
  // }, [locationenabled]);

  async function gettoken() {
    const cartdatastore = await AsyncStorage.getItem('cartdata');
    if (cartdatastore != undefined && cartdatastore != '') {
      dispatch(storecartdata(JSON.parse(cartdatastore)));
    }

    const currentRestrauntidstore = await AsyncStorage.getItem(
      'currentRestrauntid',
    );
    if (currentRestrauntidstore != undefined && currentRestrauntidstore != '') {
      dispatch(storerestrauntid(JSON.parse(currentRestrauntidstore)));
    }

    const pricestore = await AsyncStorage.getItem('price');
    if (pricestore != undefined && pricestore != '') {
      dispatch(storecartprice(JSON.parse(pricestore)));
    }

    const value = await AsyncStorage.getItem('AccessToken');
    const refresh = await AsyncStorage.getItem('TokenInfo');

    console.log('previous token' + value);
    console.log('refresh info' + refresh);
    if (value != undefined && value != '') {
      dispatch(storetoken(JSON.parse(value)));

      if (refresh != undefined && refresh != '') {
        dispatch(storetokenrefresh(JSON.parse(refresh)));
        // if(JSON.parse(refresh) != null){
        //   console.log("i am in")
        //   dispatch(refreshmytoken(JSON.parse(refresh)))

        // }
      }
    }

    //     const address = await AsyncStorage.getItem('currentaddress');
    //     if (address != undefined && address != '') {
    // dispatch(storecurrentaddress(JSON.parse(address)))
    //     }
  }

  useEffect(() => {
    if (refreshtokendata != null) {
      dispatch(refreshmytoken(refreshtokendata));
    }
  }, [refreshtokendata]);

  // useEffect(() => {
  //   if(refreshcomplete == true){
  //     navigatetogettingstarted()

  //   }

  // }, [refreshcomplete]);

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
        onAnimationFinish={() => {
          navigatetogettingstarted();
        }}
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
