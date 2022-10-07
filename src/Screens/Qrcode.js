import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Dimensions,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getallrestrauntsbyid,
  storerestrauntbasicdata,
  storedistance,
  storecartprice,
  cleancart,
  storerestrauntid,
} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';

import TransparentHeader from '../Shared/Components/TransparentHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Favourites from '../Shared/Components/Favourites';

import {CameraScreen} from 'react-native-camera-kit';

const Qrcode = ({navigation, drawerAnimationStyle, route, params}) => {
  console.log(route?.params?.latitude, 'latitude');
  console.log(route?.params?.longitude, 'longitude');

  const [qrvalue, setQrvalue] = useState('');
  const [visible, setvisible] = useState(false);
  const [camscanner, setCamScanner] = useState(false);
  const [scanpermission, setScanPermission] = useState(true);
  const [animationstate, setanimationstate] = useState(false);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [kmaway, SetKmAway] = useState(0);

  const {AuthToken, restrauntdetails, currentRestrauntid} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCamScanner(false);
      setTimeout(async () => {
        setCamScanner(true);
      }, 500);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (restrauntdetails != null) {
      setanimationstate(true);
      calculateLoc();
    }
  }, [restrauntdetails]);
  const calculateLoc = () => {
    console.log(
      restrauntdetails.Latitude,
      restrauntdetails.Longitude,
      'Restaurant',
      route?.params?.latitude,
      route?.params?.longitude,
      'USER',
    );
    let rlat1 = (Math.PI * restrauntdetails.Latitude) / 180;
    // console.log('rlat1' + rlat1);
    let rlat2 = (Math.PI * route?.params?.latitude) / 180;
    // console.log('rlat2' + rlat2);
    let theta = restrauntdetails.Longitude - route?.params?.longitude;
    // console.log('theta' + theta);
    let rtheta = (Math.PI * theta) / 180;
    // console.log('rtheta' + rtheta);
    let dist =
      Math.sin(rlat1) * Math.sin(rlat2) +
      Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    SetKmAway(dist.toFixed(2));
    // console.log(dist, 'final dist');
  };
  return (
    <Animated.View style={{flex: 1, ...drawerAnimationStyle}}>
           <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#000',
        }}>
        <View style={{position: 'absolute', top: getStatusBarHeight()}}>
          <TransparentHeader
            title={'Scan QR Code'}
            refresh={qrvalue}
            onpressback={() => {
             
                // navigation.navigate("Home")
                navigation.goBack();
                setvisible(false)
                setScanPermission(true);
                setQrvalue('');
            }}
            onpress={() => {
              setvisible(false)
              setScanPermission(true);
              setQrvalue('');
            }}
          />
        </View>
        {camscanner && (
          <CameraScreen
            scanBarcode={scanpermission}
            onReadCode={event => {
              setQrvalue(event.nativeEvent.codeStringValue),
                setScanPermission(false);
              dispatch(
                getallrestrauntsbyid(
                  event.nativeEvent.codeStringValue,
                  AuthToken,
                ),
              );
              setvisible(true)
              // console.log(event.nativeEvent.codeStringValue, 'eventtt');
            }}
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="red" // (default red) optional, color of laser in scanner frame
            frameColor="#962E2B" // (default white) optional, color of border of scanner frame
          />
        )}
        {/* {animationstate && (
          <Animatable.View
            animation={
              animationstate && qrvalue != ''
                ? 'fadeInUpBig'
                : animationstate && qrvalue == ''
                ? 'fadeOutDownBig'
                : null
            }
            onAnimationEnd={() => {
              // setanimationstate(false);
              // if(animationtype == "fadeInUpBig"){
              //   setanimationtype("fadeOutDownBig")
              // //  setlogoutmodal(false)
              // }else{
              //   setanimationtype("fadeInUpBig")
              // }
            }}
            easing="ease"
            iterationCount={1}> */}
              {qrvalue != '' && visible == true && (
          <View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: scalableheight.three,

                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: scalableheight.three,
                elevation: 100000,
                zIndex: 1000000,
              }}>
              <Favourites
                image={restrauntdetails?.Logo}
                title={restrauntdetails?.BranchName}
                reviews={
                  restrauntdetails?.AvgRating +
                  ' (' +
                  restrauntdetails?.RatingCount +
                  ' reviews)'
                }
                time={
                  restrauntdetails?.OpeningTime +
                  ' - ' +
                  restrauntdetails?.ClosingTime
                }
                onPress={() => {
                  dispatch(storerestrauntbasicdata(restrauntdetails));
                  dispatch(storedistance(restrauntdetails?.Distance));

                  if (
                    currentRestrauntid != restrauntdetails?.RestaurantBranchId
                  ) {
                    dispatch(storecartprice(0));
                    dispatch(cleancart());
                    dispatch(
                      storerestrauntid(restrauntdetails?.RestaurantBranchId),
                    );
                  }

                  navigation.navigate('Restaurantpage', {
                    latitude: route?.params?.latitude,
                    longitude: route?.params?.longitude,
                  });
                  setQrvalue('');
                  setScanPermission(true);
                }}
                distance={ kmaway + ' KM AWAY'}
              />
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: '#e8e8e8',
  },

  textInput: {
    marginLeft: scalableheight.one,
    width: '100%',
    color: 'black',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
export default Qrcode;
