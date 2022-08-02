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
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import renderIf from 'render-if';
// import Modal from "react-native-modal";
import {
  getblogshome,
  getnewsfeedshome,
  getpopularserviceshome,
  changelang,
  seticonfocus,
  getProfileInformation,
  getbanner,
  getcategories,
  getcategoriesbyid,
  getNewNotificationCount,
} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {SliderBox} from 'react-native-image-slider-box';
import ImagesSwiper from 'react-native-image-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import BookingHeader from '../Shared/Components/BookingHeader';
import HeaderComponent from '../Shared/Components/HeaderComponent';
import Reviewscontainer from '../Shared/Components/Reviewscontainer';
import Categoriescard from '../Shared/Components/Categoriescard';
import Animated from 'react-native-reanimated';
import Transparentinfobar from '../Shared/Components/Transparentinfobar';
import Transparentsearch from '../Shared/Components/Transparentsearch';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import SearchBar from '../Shared/Components/SearchBar';
import Starters from '../Shared/Components/Starters';
import Favourites from '../Shared/Components/Favourites';
import MYButton from '../Shared/Components/MYButton';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const Home = ({navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const [pinlocation, setpinlocation] = useState('');
  const [specialinstructions, setspecialinstructions] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [search, setsearch] = useState('');
  const [count, setcount] = useState(0);
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
  ]);
  const refMap = useRef(null);
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
    blogsdatahome,
    newsfeedshomedata,
    Lang,
    ProfileInfo,
    profileimage,
    bannerarray,
    categories,
    newNotificationCount,
    popularservicedatahome,
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
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    dispatch(seticonfocus('home'));
    // listeners()
  }, []);
  useEffect(() => {
    listeners();
  }, []);

  useEffect(() => {
    dispatch(getNewNotificationCount());
  }, [newNotificationCount]);

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
    dispatch(getProfileInformation());
    dispatch(getbanner());
  }, []);

  useEffect(() => {
    dispatch(getcategories(Lang));
    dispatch(getpopularserviceshome(Lang));
    dispatch(getnewsfeedshome(Lang));
    dispatch(getblogshome(Lang));
  }, [Lang]);

  // useEffect(() => {
  //   Geocoder.init("AIzaSyD0yqMcrlEZUYylJJhmbrweCD-W9lALgzI")
  // Geolocation.getCurrentPosition((info) => {
  //   setlat(info?.coords?.latitude)
  //   setlong(info?.coords?.longitude)

  //   console.log(info?.coords?.latitude);
  //   console.log(info?.coords?.longitude);})
  //   getLocation()
  // }, []);

  // useEffect(() => {
  //   Geocoder.from(lat, long)
  // 	.then(json => {
  //       		var addressComponent = json.results[0].formatted_address;
  // 		console.log(addressComponent);
  //     setpinlocation(addressComponent)

  // 	})
  // 	.catch(error => console.warn(error));

  // }, [lat, long]);
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
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const rendernearby = ({item}) => (
    <View
      style={{
        width: Dimensions.get('window').width / 1.2,
        marginRight: scalableheight.two,
      }}>
      <Favourites
        image={require('../Resources/images/food.png')}
        title={'Mexican Enchiladas'}
        reviews={'8.9 (350 reviews)'}
        time={'9:00 AM - 10:00PM'}
        onPress={() => {}}
        distance={'2.5KM AWAY'}
      />
    </View>
  );
  const starters = ({item}) => (
    <Starters
      image={require('../Resources/images/food.png')}
      title={'Mexican Enchiladas'}
      description={
        'The original French toast! Thick slices of our signature jumbo...'
      }
      price={9.4}
      onPress={() => {
        setmodalVisible(true);
      }}
    />
  );

  function updateservingstate(index) {
    let arr = [...serving];
    for (const key in arr) {
      if (key == index) {
        if (arr[key].selected == true) {
          arr[key].selected = false;
        } else {
          arr[key].selected = true;
        }
      } else {
        arr[key].selected = false;
      }
    }
    setserving(arr);
    console.log('arr' + JSON.stringify(arr));
  }

  function updateflavourstate(index) {
    let arr = [...flavours];
    for (const key in arr) {
      if (key == index) {
        if (arr[key].selected == true) {
          arr[key].selected = false;
        } else {
          arr[key].selected = true;
        }
      } else {
        arr[key].selected = false;
      }
    }
    setflavours(arr);
    console.log('arr' + JSON.stringify(arr));
  }
  return (
    <Animated.View style={{flex: 1, ...drawerAnimationStyle}}>
      <StatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
      />

      <View style={{flex: 1, borderRadius: 10}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ImageBackground
            resizeMode="cover"
            style={{
              width: '100%',
              height: scalableheight.thirtyfive,
              zIndex: 1,
            }}
            imageStyle={{
              borderBottomLeftRadius: fontSize.borderradiuslarge,
              borderBottomRightRadius: fontSize.borderradiuslarge,
            }}
            source={require('../Resources/images/homebackground.png')}>
            <View style={{marginTop: getStatusBarHeight()}}></View>
            <HeaderComponent newNotificationCount={newNotificationCount} />
            <View style={{paddingHorizontal: scalableheight.one}}>
              <Transparentinfobar
                Heading={'Home'}
                Details={'Clifton block 2, plot no 245, near bilawal house'}
              />
              <View style={{marginTop: scalableheight.one}}></View>
              <Transparentsearch
                search={search}
                onchange={val => {
                  setsearch(val);
                }}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              ...styleSheet.shadow,
              height: scalableheight.fifty,
              width: '100%',
              backgroundColor: '#F5F5F5',

              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: fontSize.fifteen,

              color: '#8c8c8c',

              alignSelf: 'center',
              marginTop: '-2%',
              overflow: 'hidden',
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              customMapStyle={customStyle}
              ref={refMap}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: fontSize.fifteen,
              }}
              showsUserLocation
              region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {/* 
      <Marker 
      position={center} 
      coordinate = {{latitude: lat,longitude: long}}
      draggable
     onDragEnd={(e) => {

      console.log('longitude', e?.nativeEvent?.coordinate?.longitude )
       console.log('latitude', e?.nativeEvent?.coordinate?.latitude )
      setlat(e?.nativeEvent?.coordinate?.latitude)
      setlong(e?.nativeEvent?.coordinate?.longitude)

      }}
         pinColor = {"red"} // any color
         title={"Location"}
         description={pinlocation}/> */}
            </MapView>
          </View>
          <View
            style={{
              paddingHorizontal: scalableheight.one,
              position: 'absolute',
              bottom: scalableheight.eight,
            }}>
            <Animatable.View
              animation="zoomIn"
              easing="ease"
              //  iterationCount="infinite"
              iterationCount={1}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: scalableheight.pointfive,
                paddingBottom: scalableheight.one,
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-ExtraBold',
                  fontSize: fontSize.sixteen,
                  color: '#29262A',
                }}>
                RESTAURANTS NEARBY
              </Text>
            </Animatable.View>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={{}}
              data={popularservicedatahome}
              renderItem={rendernearby}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      </View>
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
