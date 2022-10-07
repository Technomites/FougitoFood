import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TextInput,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Vibration,
  ActivityIndicator,
  Keyboard,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  ActivityIndicatorBase,
  LayoutAnimation
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-notifications';

import renderIf from 'render-if';
// import Modal from "react-native-modal";
import {
  seticonfocus,
  getallrestraunts,
  updaterestraunts,
  getallrestrauntsbyid,
  storecartprice,
  storerestrauntid,
  cleancart,
  storedistance,
  storerestrauntbasicdata,
  GetProfile,
  storelatlong,
  isconnected,
  getalladdresses
} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';

import RBSheet from 'react-native-raw-bottom-sheet';
// import {BottomSheetModalProvider, BottomSheet} from '@gorhom/bottom-sheet';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {SliderBox} from 'react-native-image-slider-box';
import ImagesSwiper from 'react-native-image-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import BookingHeader from '../Shared/Components/BookingHeader';
import HeaderComponent from '../Shared/Components/HeaderComponent';
import Infobar from '../Shared/Components/Infobar';
import Animated from 'react-native-reanimated';
import Transparentinfobar from '../Shared/Components/Transparentinfobar';
import Transparentsearch from '../Shared/Components/Transparentsearch';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import SavedAddresses from '../Shared/Components/SavedAddresses';
import Starters from '../Shared/Components/Starters';
import Favourites from '../Shared/Components/Favourites';
import MYButton from '../Shared/Components/MYButton';
import Custombottomsheet from '../Shared/Components/Custombottomsheet';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import listeners from '../Listener/Listener';
import {createConfigItem} from '@babel/core';
import {fontSize, scalableheight} from '../Utilities/fonts';
import moment from 'moment';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import LocationEnabler from 'react-native-location-enabler';




// // Adds a listener to be invoked when location settings checked using
// // [checkSettings] or changed using [requestResolutionSettings]




// // Define configuration
// const config = {
//   priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
//   alwaysShow: true, // default false
//   needBle: false, // default false
// };

// // Check if location is enabled or not
// checkSettings(config);

// // If location is disabled, prompt the user to turn on device location
// requestResolutionSettings(config);


const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings,
} = LocationEnabler;


const Home = ({props, navigation, drawerAnimationStyle}) => {
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */
  );
  
  // console.log(`Location are ${enabled ? 'enabled' : 'disabled'}`);
  
  // ...
 
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  // const [lat, setlat] = useState(25.2048);
  // const [long, setlong] = useState(55.2708);
  // const [inlat, setinlat] = useState(25.2048);
  // const [inlong, setinlong] = useState(55.2708);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [inlat, setinlat] = useState(0);
  const [inlong, setinlong] = useState(0);
  const [pinlocation, setpinlocation] = useState('');
  const [specialinstructions, setspecialinstructions] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [loader, setloader] = useState(false);
  const [search, setsearch] = useState('');
  const [showmap, setshowmap] = useState(true);
  const [count, setcount] = useState(0);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [showpinmap, setshowpinmap] = useState(false);
  const [locationenabled, setlocationenabled] = useState(false);
  const [center, setCenter] = useState();
  const [serving, setserving] = useState([
    {
      selected: false,
      serving: 'Single Plate',
      price: 'AED 159.00',
    },
    {
      selected: false,
      serving: 'Double Plate',
      price: 'AED 129.00',
    },
    {
      selected: false,
      serving: 'Triple Plate',
      price: 'AED 59.00',
    },
    {
      selected: false,
      serving: 'Double Plate',
      price: 'AED 129.00',
    },
    {
      selected: false,
      serving: 'Triple Plate',
      price: 'AED 59.00',
    },
    {
      selected: false,
      serving: 'Single Plate',
      price: 'AED 159.00',
    },
    {
      selected: false,
      serving: 'Double Plate',
      price: 'AED 129.00',
    },
    {
      selected: false,
      serving: 'Triple Plate',
      price: 'AED 59.00',
    },
  ]);
  const refMap = useRef(null);
  const ref = useRef();
  const refRBSheet = useRef();
  const toast = useRef();


  const [flavours, setflavours] = useState([
    {
      selected: false,
      serving: 'Hummus',
    },
    {
      selected: false,
      serving: 'Chicken Munchurian',
    },
    {
      selected: false,
      serving: 'Pasta',
    },
  ]);
  const {
    newNotificationCount,
    allrestraunts,
    currentRestrauntid,
    AuthToken,
    internetconnectionstate,
    Selectedcurrentaddress
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();




  const customStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },

    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffb606',
        },
      ],
    },
    //   {
    //     elementType: 'labels.text.stroke',
    //     stylers: [
    //       {
    //         color: '#242f3e',
    //       },
    //     ],
    //   },
    //   {
    //     featureType: 'administrative.locality',
    //     elementType: 'labels.text.fill',
    //     stylers: [
    //       {
    //         color: '#fffff',
    //       },
    //     ],
    //   },

    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#b6b4b4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ];

  const DarkStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      requestResolution()
      dispatch(seticonfocus('home'));
      StatusBar.setHidden(false);
      NetInfo.fetch().then(state => {
        if (state.isConnected == true && state.isInternetReachable == true) {
          dispatch(isconnected(true));
        } else {
          dispatch(isconnected(false));
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       // hideNavigationBar();
  //       console.log('Keyboard is open');
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       // hideNavigationBar();
  //       console.log('Keyboard is closed');
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    if (!enabled) {
      requestResolution();
    }
  }, [])

  useEffect(() => {
    if (enabled) {
     
      getnewlocation()
    }
  }, [enabled])


  useEffect(() => {
    StatusBar.setHidden(false);
    listeners();
 
  }, []);

  useEffect(() => {
    console.log(AuthToken + "-----------------------")
    if (internetconnectionstate == true && AuthToken != "") {
      dispatch(GetProfile(AuthToken));
      dispatch(getalladdresses(AuthToken));
    }
  }, [AuthToken, internetconnectionstate]);


  useEffect(() => {
    if (internetconnectionstate == true) {
      Geocoder.init('AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso');
      Geolocation.getCurrentPosition(info => {
        setlat(info?.coords?.latitude);
        setlong(info?.coords?.longitude);
        setinlat(info?.coords?.latitude);
        setinlong(info?.coords?.longitude);
      });
      getLocation();
    }
  }, [internetconnectionstate]);

  useEffect(() => {
    setloader(false);
  }, [allrestraunts]);

  useEffect(() => {
    if (internetconnectionstate == true) {
      if (lat != null && long != null && lat != 0 && long != 0) {

        setloader(true);
        dispatch(getallrestraunts(lat, long));
        dispatch(storelatlong(lat, long));

        Geocoder.from(lat, long)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            setpinlocation(addressComponent);
          })
          .catch(error => console.warn(error));
      }
    }
  }, [lat, long]);

  function onRefresh() {
 
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(GetProfile(AuthToken));
        getnewlocation();
      } else {
        toast.current.show('No Internet Connection', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
      }
    });
  }

  function updatecoordinates(lat, long) {
    setlat(lat);
    setlong(long);
    setinlat(lat);
    setinlong(long);
    getLocation();
  }

  const rendernearby = ({item, index}) =>

    item?.NameAsPerTradeLicense.includes(search.trim()) ? (
      <View
        style={{
          width: Dimensions.get('window').width / 1.2,
          marginRight: scalableheight.two,
        }}>
        <Favourites
          image={item?.Logo}
          title={item?.NameAsPerTradeLicense}
          reviews={item?.AvgRating + ' (' + item?.RatingCount + ' reviews)'}
          time={item?.OpeningTime + ' - ' + item?.ClosingTime}
          onPress={() => {
            dispatch(storerestrauntbasicdata(item));
            dispatch(storedistance(item?.Distance));
            if (currentRestrauntid != item?.Id) {
              dispatch(storecartprice(0));
              dispatch(cleancart());
              dispatch(storerestrauntid(item?.Id));
            }

            dispatch(getallrestrauntsbyid(item?.Id, AuthToken));

            navigation.navigate('Restaurantpage', {
              latitude: lat,
              longitude: long,
            });
            // navigation.navigate('Restaurantpage');
          }}
          distance={item?.Distance + ' AWAY'}
        />
      </View>
    ) : null;
 
  const renderItem = ({item, index}) =>
    item?.NameAsPerTradeLicense.includes(search.trim()) ? (
      // <Animatable.View
      //   animation="zoomInLeft"
      //   easing="ease"
      //   iterationCount={1}
      //   style={{}}>
        <Favourites
          image={item?.Logo}
          title={item?.NameAsPerTradeLicense}
          reviews={item?.AvgRating + ' (' + item?.RatingCount + ' reviews)'}
          time={item?.OpeningTime + ' - ' + item?.ClosingTime}
          onPress={() => {
            dispatch(storerestrauntbasicdata(item));
            dispatch(storedistance(item?.Distance));
            if (currentRestrauntid != item?.Id) {
              dispatch(storecartprice(0));
              dispatch(cleancart());
              dispatch(storerestrauntid(item?.Id));
            }
            dispatch(getallrestrauntsbyid(item?.Id, AuthToken));
            navigation.navigate('Restaurantpage', {
              latitude: lat,
              longitude: long,
            });
          }}
          distance={item?.Distance + ' AWAY'}
        />
      //</Animatable.View> 
    ) : null;
  
  
  
    function activaterestaurant(key, lat, long) {
    setinlat(lat);
    setinlong(long);
    console.log('selected');
    let arr = [...allrestraunts];
    for (const index in arr) {
      arr[index].expanded = false;
    }
    arr[key].expanded = true;
    // setpin(arr);
    dispatch(updaterestraunts(arr));

    ref.current?.scrollToIndex({
      index: key,
      animated: true,
    });
  }

  function getnewlocation() {
    Geocoder.init('AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso');
    Geolocation.getCurrentPosition(info => {
      setlat(info?.coords?.latitude);
      setlong(info?.coords?.longitude);
      setinlat(info?.coords?.latitude);
      setinlong(info?.coords?.longitude);
    });
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setpinlocation(addressComponent);
      })
      .catch(error =>{
    
        requestResolution()
        console.warn(error)});
  }


  
  const getLocation = async () => {
    const hasLocationPermission = await hasLocationPermissions();
    if (!hasLocationPermission) {
      console.log("you will never have  have permission")
      return;
    }
  };

  const hasLocationPermissions = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("you  have permission")
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log("you dont have permission")

   
      // ToastAndroid.show(
      //   'Location permission denied by user.',
      //   ToastAndroid.LONG,
      // );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log("you will never have  have permission")
 

      // ToastAndroid.show(
      //   'Location permission revoked by user.',
      //   ToastAndroid.LONG,
      // );
    }
 
    return false;
  };
  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        ToastMessage('success', 'Success', 'Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      ToastMessage('error', 'Error', 'Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow Bakery App to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }
    return false;
  };




  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, overflow: 'hidden',}}>
      <FocusAwareStatusBar
        barStyle={showbottomsheet ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
      />
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={{height: '100%', width: '100%', alignSelf: 'center'}}>
        <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
          <ImageBackground
            resizeMode="cover"
            style={{
              width: '100%',
              height: scalableheight.fifteen + getStatusBarHeight(),
              zIndex: 10,
              elevation: 10,
            }}
            imageStyle={{
              borderBottomLeftRadius: fontSize.twenty,
              borderBottomRightRadius: fontSize.twenty,
            }}
            source={require('../Resources/images/homebackground.png')}>
            <View style={{marginTop: getStatusBarHeight()}}></View>
            <HeaderComponent />
            <View style={{paddingHorizontal: scalableheight.one}}>
              {/* <Transparentinfobar Heading ={"Home"} Details ={"Clifton block 2, plot no 245, near bilawal house"}/>
             <View style={{marginTop: scalableheight.one}}></View> */}
              <Transparentsearch
                search={search}
                onchange={val => {
                  setsearch(val);
                }}
                OnPress={() => {
                  navigation.navigate('Qrcode', {
                    latitude: lat,
                    longitude: long,
                  });
                }}
              />
            </View>
          </ImageBackground>
          {showmap &&  (
            <>
              <View
                style={{
                  ...styleSheet.shadow,
                  height: scalableheight.eighty,
                  width: '100%',
                  backgroundColor: '#F5F5F5',
                  borderRadius: fontSize.fifteen,
                  overflow: 'hidden',
                  position: 'absolute',
                  bottom: scalableheight.twentythree,
                  zIndex: 1,
                }}>
                {lat != null && long != null && inlat != null && inlong != null? (
                  <MapView
                    // provider={PROVIDER_GOOGLE}
                    // customMapStyle={customStyle}
                    // userInterfaceStyle={"dark"}
                    ref={refMap}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: fontSize.fifteen,
                    }}
                    showsUserLocation
                    region={{
                      latitude: inlat,
                      longitude: inlong,
                      // latitude: lat,
                      // longitude: long,
                      longitudeDelta: 0.01,
                      latitudeDelta: 0.01,
                    }}
                    initialRegion={{
                      latitude: lat,
                      longitude: long,

                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    {allrestraunts.map((item, key) => {
                      return (
                        <Marker
                        key={key.toString()}
                          position={center}
                          coordinate={{
                            latitude: item?.Latitude,
                            longitude: item?.Longitude,
                          }}
                          // draggable

                          //  onDragEnd={(e) => {

                          //   console.log('longitude', e?.nativeEvent?.coordinate?.longitude )
                          //    console.log('latitude', e?.nativeEvent?.coordinate?.latitude )
                          //   setlat(e?.nativeEvent?.coordinate?.latitude)
                          //   setlong(e?.nativeEvent?.coordinate?.longitude)

                          //   }}
                          //  pinColor = {"red"} // any color
                       
                          title={'Restaurant'}
                          description={item?.NameAsPerTradeLicense}
                          onPress={() =>
                            activaterestaurant(
                              key,
                              item?.Latitude,
                              item?.Longitude,
                            )
                          }>
                          {item?.expanded ? (
                            <View
                              style={{
                                height: scalableheight.six,
                                width: scalableheight.six,
                              }}>
                              <Image
                                source={require('../Resources/images/redmarker.png')}
                                style={{
                                  height: scalableheight.six,
                                  width: scalableheight.six,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                height: scalableheight.six,
                                width: scalableheight.six,
                              }}>
                              <Image
                                source={require('../Resources/images/redmarker.png')}
                                style={{
                                  height: scalableheight.four,
                                  width: scalableheight.four,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                        </Marker>
                      );
                    })}
                    <Marker
                      position={center}
                      coordinate={{latitude: lat, longitude: long}}
                      // draggable

                      //  onDragEnd={(e) => {

                      //   console.log('longitude', e?.nativeEvent?.coordinate?.longitude )
                      //    console.log('latitude', e?.nativeEvent?.coordinate?.latitude )
                      //   setlat(e?.nativeEvent?.coordinate?.latitude)
                      //   setlong(e?.nativeEvent?.coordinate?.longitude)

                      //   }}
                      //  pinColor = {"red"} // any color
                      key={1}
                      title={'Location'}
                      description={pinlocation}
                      onPress={() => console.log('hello')}>
                      <MaterialIcons
                        name="location-pin"
                        color={'#F55050'}
                        size={scalableheight.six}
                      />
                    </Marker>
                  </MapView>
                ) : null}
              </View>
              <View
                style={{
                  width: scalableheight.six,
                  height: scalableheight.six,
                  backgroundColor: 'white',
                  borderRadius: fontSize.borderradiusmedium,
                  shadowColor: '#470000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  elevation: 3,
                  position: 'absolute',
                  bottom: scalableheight.thirtyfour,
                  right: scalableheight.one,
                  elevation: 5,
                  zIndex: 5,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: scalableheight.one,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // getnewlocation();
                    refMap.current.animateToRegion({
                      latitude: inlat,
                      longitude: inlong,
                      longitudeDelta: 0.01,
                      latitudeDelta: 0.01,
                    });
                  }}>
                  <Ionicons
                    name="compass-outline"
                    color={'#F55050'}
                    size={fontSize.twentyeight}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',

                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',

                  paddingHorizontal: scalableheight.one,
                  position: 'absolute',
                  bottom: scalableheight.twentyfour,
                  elevation: 5,
                  zIndex: 5,
                }}>
                <Infobar
                  onPress={() => {
               
                    setshowbottomsheet(true);
                  }}
                  Heading={Selectedcurrentaddress?.length > 0 ? Selectedcurrentaddress[0].place : 'Current Location'}
                  Details={Selectedcurrentaddress?.length > 0 ? Selectedcurrentaddress[0].address :  pinlocation}
                />
                        
              </View>
              <View
                style={{
                  paddingHorizontal: scalableheight.one,
                  position: 'absolute',
                  bottom: scalableheight.two,
                  zIndex: 200,
                  elevation: 200,
                }}>
                {allrestraunts?.length > 0 &&
                allrestraunts?.find(data =>
                  data?.NameAsPerTradeLicense.includes(search.trim()),
                ) != undefined ? (
                  // <Animatable.View
                  //   animation="bounceInRight"
                  //   easing="ease"
                  //   iterationCount={1}
                  //   style={{
                  //     paddingTop: scalableheight.one,
                  //     paddingBottom: scalableheight.pointfive,

                  //     justifyContent: 'center',
                  //   }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: fontSize.sixteen,
                        color: '#29262A',
                        paddingBottom:scalableheight.one
                      }}>
                      RESTAURANTS NEARBY
                    </Text>
             //     </Animatable.View>
                ) : (
                  <View
                    style={{
                      width: Dimensions.get('window').width / 1,
                      height: scalableheight.twenty,
                      justifyContent: 'center',
                      alignItems: 'center',
                    
                      // borderWidth:1, borderColor:"red"
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: fontSize.fifteen,
                        color: '#29262A',
                        opacity: 0.4,
                        marginTop:scalableheight.two
                      }}>
                      {/* No Restaurants NearBy */}
                      No Restaurants
                    </Text>
                  </View>
                )}

                <FlatList
                  key={'1'}
                  showsHorizontalScrollIndicator={false}
                  ref={ref}
                  style={{zIndex: 200, elevation: 200}}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  data={allrestraunts}
                  renderItem={rendernearby}
                  // onEndReached={() => LoadFeaturedProjectPagination()}
                  // onEndReachedThreshold={0.1}
                />
              </View>
            </>
          )}
          {
            showmap != true &&
              (internetconnectionstate == false ? (
                <>
                  {/* <Text
                    style={{
                      width: '100%',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.twenty,
                      color: '#E14E4E',
                      position: 'absolute',
                      textAlign: 'center',
                      top: scalableheight.fourty,
                    }}>
                    Tap to Retry
                  </Text> */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      NetInfo.fetch().then(state => {
                        if (
                          state.isConnected == true &&
                          state.isInternetReachable == true
                        ) {
                          dispatch(isconnected(true));
                          console.log('true');
                        } else {
                          dispatch(isconnected(false));
                          console.log('false' + state.isConnected);
                        }
                      });
                    }}>
                    <Image
                      style={{
                        // marginVertical: scalableheight.five,
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                      }}
                      resizeMode={'contain'}
                      source={require('../Resources/images/Skeleton/Retry.gif')}
                    />
                  </TouchableOpacity>
                </>
              ) : loader == true ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                  }}
                  resizeMode={'cover'}
                  source={require('../Resources/images/Skeleton/4.gif')}
                />
              ) : allrestraunts?.length > 0 &&
                allrestraunts?.find(data =>
                  data?.NameAsPerTradeLicense.includes(search.trim()),
                ) != undefined ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  key="1"
                  data={allrestraunts}
                  renderItem={renderItem}
                  // ListFooterComponent={renderFooter}
                  // onEndReached={loadMoreNotifications}
                  style={{
                    width: '100%',
                    paddingHorizontal: scalableheight.one,
                    marginTop: scalableheight.two,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}
                  // contentContainerStyle={{paddingBottom: 54}}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View
                  style={{
                    width: Dimensions.get('window').width / 1,
                    height: Dimensions.get('window').height / 1.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                      opacity: 0.4,
                    
                    }}>
                    {/* No Restraunts NearBy */}
                    No Restauraunts
                  </Text>
                </View>
              ))
            // {/* </View> */}
          }
        </View>
        {internetconnectionstate == true && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
            
           
                setshowmap(!showmap);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: fontSize.circle,
              position: 'absolute',
              right: scalableheight.two,
              bottom: scalableheight.five,
              height: scalableheight.seven,
              width: scalableheight.seven,
            }}>
            <Image
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
                zIndex: 201,
                elevation: 201,
              }}
              source={
                showmap
                  ? require('../Resources/images/listicon.png')
                  : require('../Resources/images/mapicon.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPressnewCoordinates={(a, b) => {
          updatecoordinates(a, b);
        }}
        onPress={() => {
          setshowbottomsheet(false);
        }}
        onPressnewlocation={() => {
          getnewlocation();
        }}
        latitude={lat}
        longitude={long}
      />
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: 'Rubik-Regular',
    width: '90%',
    color: 'black',
  },
  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  newsshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 3,
  },
});
export default Home;
