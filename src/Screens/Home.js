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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
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
} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

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
import Categoriescard from '../Shared/Components/Categoriescard';
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

const Home = ({props, navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [inlat, setinlat] = useState();
  const [inlong, setinlong] = useState();
  const [pinlocation, setpinlocation] = useState('');
  const [specialinstructions, setspecialinstructions] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [search, setsearch] = useState('');
  const [showmap, setshowmap] = useState(false);
  const [count, setcount] = useState(0);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [showpinmap, setshowpinmap] = useState(false);
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
  const {newNotificationCount, allrestraunts, currentRestrauntid, AuthToken} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [pin, setpin] = useState([
    {
      lat: 24.8491,
      long: 67.0281,
      expanded: false,
      location: 'Gymkhana',
    },
    {
      lat: 24.8475,
      long: 67.0254,
      expanded: false,
      location: 'PC',
    },
    {
      lat: 24.8475,
      long: 67.033,
      expanded: false,
      location: 'frere hall',
    },
  ]);

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

  const [dished, setdisdhed] = useState([
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

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     StatusBar.setBarStyle('light-content');
  //   });

  //   //  Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    StatusBar.setHidden(false);
    //  StatusBar.setBackgroundColor('transparent');
    // StatusBar.setBarStyle('light-content');
  }, []);
  useEffect(() => {
    listeners();
  }, []);
  useEffect(() => {
    if (lat != null && long != null) {
      dispatch(getallrestraunts(lat, long));
    }
  }, [lat, long]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideNavigationBar();
        console.log('Keyboard is open');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideNavigationBar();
        console.log('Keyboard is closed');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    // console.log(
    //   AuthToken,
    //   'UpdateProfile UpdateProfile UpdateProfile UpdateProfile',
    // );
    dispatch(GetProfile(AuthToken));
  }, [AuthToken]);
  useEffect(() => {
    Geocoder.init('AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso');
    Geolocation.getCurrentPosition(info => {
      setlat(info?.coords?.latitude);
      setlong(info?.coords?.longitude);
      setinlat(info?.coords?.latitude);
      setinlong(info?.coords?.longitude);
      console.log('hello' + info?.coords?.latitude);
      console.log('hello' + info?.coords?.longitude);
    });
    console.log('hello');
    getLocation();
  }, []);

  useEffect(() => {
    if (lat != null && long != null) {
      Geocoder.from(lat, long)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          setpinlocation(addressComponent);
        })
        .catch(error => console.warn(error));
    }
  }, [lat, long]);

  function getnewlocation() {
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setpinlocation(addressComponent);
      })
      .catch(error => console.warn(error));
  }
  const getLocation = async () => {
    const hasLocationPermission = await hasLocationPermissions();
    if (!hasLocationPermission) {
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
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      // ToastAndroid.show(
      //   'Location permission denied by user.',
      //   ToastAndroid.LONG,
      // );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
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

  const renderItem = ({item, index}) => (
    
    item?.NameAsPerTradeLicense.includes(search.trim()) ? 
    <Animatable.View
      animation="zoomInLeft"
      easing="ease"
      iterationCount={1}
      style={{}}>
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
          dispatch(getallrestrauntsbyid(item?.Id));
          navigation.navigate('Restaurantpage', {
            latitude: lat,
            longitude: long,
          });
        }}
        distance={item?.Distance + ' AWAY'}
      />
    </Animatable.View>
    : null
  );
  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
      } else {
        showToast('No Internet Connection', {
          duration: 500,
        });
      }
    });
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(seticonfocus('home'));
      StatusBar.setHidden(false);
      //  StatusBar.setBackgroundColor('transparent');
      //   StatusBar.setBarStyle('light-content');
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const rendernearby = ({item, index}) => (
    item?.NameAsPerTradeLicense.includes(search.trim()) ? 
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
          dispatch(getallrestrauntsbyid(item?.Id));

          navigation.navigate('Restaurantpage', {
            latitude: lat,
            longitude: long,
          });
        }}
        distance={item?.Distance + ' AWAY'}
      />
    </View>
: null
    //  onPress={()=>{activaterestaurant(index, 24.8475, 67.0330 )}}
  );

  function activaterestaurant(key, lat, long) {
    console.log('hello');
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

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, overflow: 'hidden'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
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
                  navigation.navigate('Qrcode');
                }}
              />
            </View>
          </ImageBackground>
          {showmap && (
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
                {lat != null && long != null ? (
                  <MapView
                    // provider={PROVIDER_GOOGLE}
                    customMapStyle={customStyle}
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
                      longitudeDelta: 0.08,
                      latitudeDelta: 0.08,
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
                          key={key}
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
                    refMap.current.animateToRegion({
                      latitude: inlat,
                      longitude: inlong,
                      longitudeDelta: 0.08,
                      latitudeDelta: 0.08,
                    });
                  }}>
                  <MaterialIcons
                    name="my-location"
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
                  Heading={'Home'}
                  Details={'Clifton block 2, plot no 245, near bilawal house'}
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
                {dished?.length > 0 ? (
                  <Animatable.View
                    animation="bounceInRight"
                    easing="ease"
                    iterationCount={1}
                    style={{
                      paddingTop: scalableheight.one,
                      paddingBottom: scalableheight.pointfive,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: fontSize.sixteen,
                        color: '#29262A',
                      }}>
                      RESTAURANTS NEARBY
                    </Text>
                  </Animatable.View>
                ) : null}
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
          {showmap != true && (
            // <View
            //   style={{
            //     width: '100%',
            //     paddingHorizontal: scalableheight.one,
            //     marginTop: scalableheight.two,

            // //  height: Dimensions.get('window').height + scalableheight.five -  scalableheight.fifteen - getStatusBarHeight()
            //   }}>
            <FlatList
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
            // {/* </View> */}
          )}
        </View>
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
      </View>
      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPress={() => {
          setshowbottomsheet(false);
        }}
        onPressnewlocation={() => {
          getnewlocation();
        }}
        // OnPressPinLocation={() => {
        //   setshowpinmap(!showpinmap);
        // }}
        latitude={lat}
        longitude={long}
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
