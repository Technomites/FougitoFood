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
  PermissionsAndroid
} from 'react-native';
import Geolocation from "react-native-geolocation-service";
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
import {storetoken, storetokenrefresh, refreshmytoken, isconnected, storecartdata, storerestrauntid, storecartprice, storecurrentaddress} from '../Actions/actions';

// import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
const SplashScreen = props => {
  const [locationenabled, setlocationenabled] = useState(true);
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

    const address = await AsyncStorage.getItem('currentaddress');
    if (address != undefined && address != '') {
dispatch(storecurrentaddress(JSON.parse(address)))
    }
   
  }

  useEffect(() => {
    if(refreshtokendata != null){
      dispatch(refreshmytoken(refreshtokendata))
// console.log("yoooo1" + JSON.stringify(refreshtokendata))
    }

  }, [refreshtokendata]);


//   const getLocation = async () => {
//     const hasLocationPermission = await hasLocationPermissions();
//     if (!hasLocationPermission) {
//       console.log("you will never have  have permission")
//       return;
//     }
//   //   Geolocation.getCurrentPosition(
//   //     (position) => {
//   //         setLoader(false);
//   //         const { coords } = position;
//   //         console.log("CORDINATES =====> ", coords);
          
//   //         getLocationName(coords?.latitude, coords?.longitude);
//   //     },
//   //     (error) => {
//   //         setLoader(false);
//   //         ToastMessage(error?.message);
//   //     },
//   //     {
//   //         timeout: 15000,
//   //         maximumAge: 10000,
//   //         distanceFilter: 0,
//   //         enableHighAccuracy: highAccuracy,
//   //         forceRequestLocation: forceLocation,
//   //         showLocationDialog: showLocationDialog,
//   //         accuracy: {android: 'high',ios: 'best'},
//   //     },
//   // );

//   Geolocation.getCurrentPosition(info => {
//     // setlat(info?.coords?.latitude);
//     // setlong(info?.coords?.longitude);
//     // setinlat(info?.coords?.latitude);
//     // setinlong(info?.coords?.longitude);
//   },
//   (error) => {
//     setlocationenabled(false)
//   console.log("hellooo" + JSON.stringify(error))
// },
// {
//   accuracy: {
//     android: 'high',
//     ios: 'best'
//   },
//   enableHighAccuracy: true,
//   timeout: 15000,
//   maximumAge: 10000,
//   distanceFilter: 0,
//   forceRequestLocation: true,
//   showLocationDialog: true,
// },
  
//   );
//   };

//   const hasLocationPermissions = async () => {
   
//     // if (Platform.OS === 'ios') {
//     //   const hasPermission = await hasLocationPermissionIOS();
//     //   return hasPermission;
//     // }
// console.log(Platform.Version)
//     if (Platform.OS === 'android' && Platform.Version < 23) {
//       return true;
//     }

//     console.log("next step")
//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     console.log(hasPermission + "this is the permission splash")
//     if (hasPermission) {
//       return true;
//     }else{
//       console.log("Not Allowed")
//       setlocationenabled(false)
//     }

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("you  have permission splash screen")
//     setlocationenabled(true)
//       return true;
//     }

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       console.log("you dont have permission")
//       setlocationenabled(false)
   
//       // ToastAndroid.show(
//       //   'Location permission denied by user.',
//       //   ToastAndroid.LONG,
//       // );
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       console.log("you will never have  have permission")
//       setlocationenabled(false)

//       // ToastAndroid.show(
//       //   'Location permission revoked by user.',
//       //   ToastAndroid.LONG,
//       // );
//     }

  
 
//     return false;
//   };
//   const hasLocationPermissionIOS = async () => {
//     const openSetting = () => {
//       Linking.openSettings().catch(() => {
//         ToastMessage('success', 'Success', 'Unable to open settings');
//       });
//     };
//     const status = await Geolocation.requestAuthorization('whenInUse');

//     if (status === 'granted') {
//       return true;
//     }

//     if (status === 'denied') {
//       ToastMessage('error', 'Error', 'Location permission denied');
//     }

//     if (status === 'disabled') {
//       Alert.alert(
//         `Turn on Location Services to allow Bakery App to determine your location.`,
//         '',
//         [
//           {text: 'Go to Settings', onPress: openSetting},
//           {text: "Don't Use Location", onPress: () => {}},
//         ],
//       );
//     }
//     return false;
//   };
 
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
