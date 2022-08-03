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

import RBSheet from 'react-native-raw-bottom-sheet';
import {BottomSheetModalProvider, BottomSheet} from '@gorhom/bottom-sheet';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {SliderBox} from 'react-native-image-slider-box';
import ImagesSwiper from 'react-native-image-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const Home = ({navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [inlat, setinlat] = useState();
  const [inlong, setinlong] = useState();
  const [pinlocation, setpinlocation] = useState('');
  const [specialinstructions, setspecialinstructions] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [search, setsearch] = useState('');
  const [count, setcount] = useState(0);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
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

  const rendernearby = ({item, index}) => (
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
        onPress={() => {
          navigation.navigate('Restaurantpage');
        }}
        distance={'2.5KM AWAY'}
      />
    </View>

    //  onPress={()=>{activaterestaurant(index, 24.8475, 67.0330 )}}
  );

  function activaterestaurant(key, lat, long) {
    setinlat(lat);
    setinlong(long);
    console.log('selected');
    let arr = [...pin];
    for (const index in arr) {
      arr[index].expanded = false;
    }
    arr[key].expanded = true;
    setpin(arr);

    ref.current?.scrollToIndex({
      index: key,
      animated: true,
    });
  }
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
              height: scalableheight.twentytwo,
              zIndex: 1,
            }}
            imageStyle={{
              borderBottomLeftRadius: fontSize.twenty,
              borderBottomRightRadius: fontSize.twenty,
            }}
            source={require('../Resources/images/homebackground.png')}>
            <View style={{marginTop: getStatusBarHeight()}}></View>
            <HeaderComponent newNotificationCount={newNotificationCount} />
            <View style={{paddingHorizontal: scalableheight.one}}>
              {/* <Transparentinfobar Heading ={"Home"} Details ={"Clifton block 2, plot no 245, near bilawal house"}/>
             <View style={{marginTop: scalableheight.one}}></View> */}
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

              height:
                Dimensions.get('window').height / 1 -
                scalableheight.twentythree -
                getStatusBarHeight(),
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: fontSize.fifteen,
              overflow: 'hidden',
            }}>
            {lat != null && long != null ? (
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
                  latitude: inlat,
                  longitude: inlong,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {pin.map((item, key) => {
                  return (
                    <Marker
                      position={center}
                      coordinate={{latitude: item.lat, longitude: item.long}}
                      // draggable

                      //  onDragEnd={(e) => {

                      //   console.log('longitude', e?.nativeEvent?.coordinate?.longitude )
                      //    console.log('latitude', e?.nativeEvent?.coordinate?.latitude )
                      //   setlat(e?.nativeEvent?.coordinate?.latitude)
                      //   setlong(e?.nativeEvent?.coordinate?.longitude)

                      //   }}
                      //  pinColor = {"red"} // any color
                      key={key}
                      title={'Location'}
                      description={item.location}
                      onPress={() =>
                        activaterestaurant(key, item.lat, item.long)
                      }>
                      {item.expanded ? (
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
                  <Image
                    source={require('../Resources/images/blackmarker.png')}
                    style={{
                      height: scalableheight.six,
                      width: scalableheight.six,
                    }}
                    resizeMode="contain"
                  />
                </Marker>
              </MapView>
            ) : null}
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
              key={'1'}
              showsHorizontalScrollIndicator={false}
              ref={ref}
              style={{zIndex: 200, elevation: 200}}
              contentContainerStyle={{}}
              initialScrollIndex={0}
              onScrollToIndexFailed={({index, averageItemLength}) => {
                ref.current?.scrollToOffset({
                  offset: index * averageItemLength,
                  animated: true,
                });
              }}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              data={popularservicedatahome}
              renderItem={rendernearby}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      </View>
      {showbottomsheet ? (
        <Animatable.View
          animation={'fadeInUpBig'}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: fontSize.twenty,
            borderTopRightRadius: fontSize.twenty,
            padding: scalableheight.two,
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowbottomsheet(false);
            }}
            style={{
              position: 'absolute',
              top: scalableheight.one,
              right: scalableheight.one,
            }}>
            <Ionicons
              name="close-circle"
              color={'rgba(211,211,211, 0.8)'}
              size={fontSize.thirtyseven}
              style={{}}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.fifteen,
              alignSelf: 'center',
            }}>
            Select A Delivery Address
          </Text>
          <TouchableOpacity
            disabled={pinlocation == '' ? false : true}
            onPress={() => {
              getnewlocation();
            }}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: 'rgba(211,211,211, 0.5)',
              paddingVertical: scalableheight.one,
            }}>
            <View style={{justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name={'crosshairs-gps'}
                color={'#F55050'}
                size={fontSize.twenty}
              />
            </View>
            <View style={{marginLeft: scalableheight.two}}>
              <Text
                style={{
                  color: '#F55050',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.sixteen,
                }}>
                Detect current Location
              </Text>
              <Text
                style={{
                  color: 'black',
                  opacity: 0.5,
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.eleven,
                }}>
                Use GPS
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  color: 'black',
                  opacity: 0.5,
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.eleven,
                }}>
                {pinlocation == '' ? 'Use GPS' : pinlocation}
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              opacity: 0.6,
              fontFamily: 'Inter-Regular',
              fontSize: fontSize.sixteen,
              paddingTop: scalableheight.one,
            }}>
            My Saved Addresses
          </Text>
          <SavedAddresses
            title={'Home'}
            address={'Mann Crossing 332 Ardith Highway'}
          />
          <SavedAddresses title={'Home'} address={'Clifton block 2'} />

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: 'rgba(211,211,211, 0.5)',
              paddingVertical: scalableheight.one,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FontAwesome5
                name={'map-marked-alt'}
                color={'#F55050'}
                size={fontSize.twenty}
              />
            </View>
            <View style={{marginLeft: scalableheight.two}}>
              <Text
                style={{
                  color: '#F55050',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.sixteen,
                }}>
                Pin your Location
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Inter-Regular',
                  opacity: 0.5,
                  fontSize: fontSize.fourteen,
                }}>
                Open Map
              </Text>
            </View>
          </View>
        </Animatable.View>
      ) : null}
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
