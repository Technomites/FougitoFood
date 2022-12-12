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
  LayoutAnimation,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-notifications';



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
  getalladdresses,
  storecurrentaddress,
  getnotificationcount,
  clearmenu,
  toggledinein
} from '../Actions/actions';


// 
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import HeaderComponent from '../Shared/Components/HeaderComponent';
import Infobar from '../Shared/Components/Infobar';
import Animated from 'react-native-reanimated';
import Transparentinfobar from '../Shared/Components/Transparentinfobar';
import Transparentsearch from '../Shared/Components/Transparentsearch';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
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
import Homescreendinein from '../Shared/Components/Homescreendinein';


// const {
//   PRIORITIES: { HIGH_ACCURACY },
//   useLocationSettings,
// } = LocationEnabler;

const Home = ({props, navigation, drawerAnimationStyle}) => {


  //   const [enabled, requestResolution] = useLocationSettings(
  //   {
  //     priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
  //     alwaysShow: true, // default false
  //     needBle: true, // default false
  //   },
  //   false /* optional: default undefined */
  // );

  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [restrauntwithindinindistancedata, setrestrauntwithindinindistancedata] = useState([]);
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
  const [Enabled, setEnabled] = useState(false);
  const [showmap, setshowmap] = useState(true);
  const [closest, setclosest] = useState(0.01);
  const [count, setcount] = useState(0);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [showpinmap, setshowpinmap] = useState(false);
  const [locationenabled, setlocationenabled] = useState(false);
  const [center, setCenter] = useState();
  const [Dineinpopup, setDineinpopup] = useState(false);
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

  const {
    newNotificationCount,
    allrestraunts,
    currentRestrauntid,
    AuthToken,
    internetconnectionstate,
    Selectedcurrentaddress,
    alladdresses,
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
      // requestResolution()
      if (AuthToken != '') {
        dispatch(getnotificationcount(AuthToken));
      }

      dispatch(seticonfocus('home'));
      StatusBar.setHidden(false);
      NetInfo.fetch().then(state => {
        if (state.isConnected == true && state.isInternetReachable == true) {
          dispatch(isconnected(true));
        } else {
          dispatch(isconnected(false));
          setshowmap(false);
        }
      });
    });
    return unsubscribe;
  }, [navigation, AuthToken]);

  useEffect(() => {
    StatusBar.setHidden(false);
    listeners();
  }, []);

  useEffect(() => {
    console.log(AuthToken + '-----------------------');
    if (internetconnectionstate == true && AuthToken != '') {
      dispatch(getnotificationcount(AuthToken));
      dispatch(GetProfile(AuthToken));
      dispatch(getalladdresses(AuthToken));
    }
  }, [AuthToken, internetconnectionstate]);

  useEffect(() => {
    if (internetconnectionstate == true) {
      if (Selectedcurrentaddress.length > 0) {
        setlat(Selectedcurrentaddress[0].Latitude);
        setlong(Selectedcurrentaddress[0].Longitude);
        setinlat(Selectedcurrentaddress[0].Latitude);
        setinlong(Selectedcurrentaddress[0].Longitude);
        setpinlocation(Selectedcurrentaddress[0].address);
      } else {
        Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
        Geolocation.getCurrentPosition(
          info => {
            setlat(info?.coords?.latitude);
            setlong(info?.coords?.longitude);
            setinlat(info?.coords?.latitude);
            setinlong(info?.coords?.longitude);
          },
          error => {
            console.log('hellooo' + JSON.stringify(error));
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      }
    }
  }, [internetconnectionstate]);

  useEffect(() => {
    if (internetconnectionstate == true) {
      if (lat != null && long != null && lat != 0 && long != 0) {
        setloader(true);
        dispatch(getallrestraunts(lat, long));
        dispatch(storelatlong(lat, long));

        Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
        Geocoder.from(lat, long)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            setpinlocation(addressComponent);
            let currentaddress = [
              {
                Latitude: lat,
                Longitude: long,
                icon: 'Others',
                place: 'Others',
                address: addressComponent,
                note: '',
                Street: '',
                Floor: '',
              },
            ];
            if (
              alladdresses?.find(
                data => data?.Latitude == lat && data?.Longitude == long,
              ) == undefined
            ) {
              dispatch(storecurrentaddress(currentaddress));
            }
          })
          .catch(error => console.warn(error));
      }
    }
  }, [lat, long]);

  useEffect(() => {
    let smallest = 100000;
    for (const index in allrestraunts) {
      if (
        smallest > parseFloat(allrestraunts[index].Distance.replace(' Km', ''))
      ) {
        smallest = parseFloat(allrestraunts[index].Distance.replace(' Km', ''));
      }

      console.log(allrestraunts[index].Distance.replace(' Km', ''));
    }
    console.log('smallest' + smallest);
    if (smallest == 100000) {
      setclosest(undefined);
    } else {
      setclosest(smallest);
    }

    setloader(false);

let smallestdistanceavailable = 1000
let data = []
    for(const item in allrestraunts){
  
      if(parseFloat(allrestraunts[item].Distance.replace(' Km', '')) * 1000 < 1000){
        if(parseFloat(allrestraunts[item].Distance.replace(' Km', '')) * 1000 < smallestdistanceavailable)
        smallestdistanceavailable = parseFloat(allrestraunts[item].Distance.replace(' Km', '')) * 1000
      data = allrestraunts[item]
      }
    
    }

    if(smallestdistanceavailable < 500){
      console.log("smallest distance" + smallestdistanceavailable)
      console.log("smallest distance data" + JSON.stringify(data))
      setrestrauntwithindinindistancedata(data)
         setDineinpopup(true)
    }
 
    
 
  }, [allrestraunts]);

  useEffect(() => {
    if (!Enabled) {
      setTimeout(() => {
        getLocation();
      }, 1500);
    } else {
      getnewlocation();
    }
  }, [Enabled]);

  function refreshselectedlocation() {
    if (internetconnectionstate == true) {
      if (lat != null && long != null && lat != 0 && long != 0) {
        setloader(true);
        dispatch(getallrestraunts(lat, long));
        dispatch(storelatlong(lat, long));

        Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
        Geocoder.from(lat, long)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            setpinlocation(addressComponent);
            let currentaddress = [
              {
                Latitude: lat,
                Longitude: long,
                icon: 'Others',
                place: 'Others',
                address: addressComponent,
                note: '',
                Street: '',
                Floor: '',
              },
            ];
            if (
              alladdresses?.find(
                data => data?.Latitude == lat && data?.Longitude == long,
              ) == undefined
            ) {
              dispatch(storecurrentaddress(currentaddress));
            }
          })
          .catch(error => console.warn(error));
      }
    }
  }

  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(GetProfile(AuthToken));
        // getnewlocation();
        refreshselectedlocation();
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

  function closedinein(){
    setDineinpopup(false)
  }

  function updatecoordinates(lat, long) {
    setlat(lat);
    setlong(long);
    setinlat(lat);
    setinlong(long);
    // setTimeout(() => {
    //   getLocation();
    // }, 1500);
  }

  const rendernearby = ({item, index}) =>
    item?.NameAsPerTradeLicense.includes(search.trim()) ? (
      <View
        style={{
          width: Dimensions.get('window').width / 1.05,
          marginRight: scalableheight.two,
        }}>
        <Favourites
          image={item?.Logo}
          title={item?.NameAsPerTradeLicense}
          reviews={
            item?.AvgRating.toFixed(2) + ' (' + item?.RatingCount + ' Reviews)'
          }
          time={item?.OpeningTime + ' - ' + item?.ClosingTime}
          onPress={() => {
            dispatch(storerestrauntbasicdata(item));
            dispatch(storedistance(item?.Distance));
            if (currentRestrauntid != item?.Id) {
              dispatch(clearmenu());
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
          distance={item?.Distance + ' away'}
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
        reviews={
          item?.AvgRating.toFixed(2) + ' (' + item?.RatingCount + ' Reviews)'
        }
        time={item?.OpeningTime + ' - ' + item?.ClosingTime}
        onPress={() => {
          dispatch(storerestrauntbasicdata(item));
          dispatch(storedistance(item?.Distance));
          if (currentRestrauntid != item?.Id) {
            dispatch(clearmenu());
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
        distance={item?.Distance + ' away'}
      />
    ) : //</Animatable.View>
    null;

  function activaterestaurant(key, lat, long) {
    // setinlat(lat);
    // setinlong(long);
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
    Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
    let lat = 0;
    let long = 0;
    Geolocation.getCurrentPosition(info => {
      setlat(info?.coords?.latitude);
      setlong(info?.coords?.longitude);
      setinlat(info?.coords?.latitude);
      setinlong(info?.coords?.longitude);
      lat = info?.coords?.latitude;
      long = info?.coords?.longitude;
    });

    // Geocoder.from(lat, long)
    //   .then(json => {
    //     var addressComponent = json.results[0].formatted_address;

    //     setpinlocation(addressComponent);

    //   })
    //   .catch(error =>{
    //     // if (Platform.OS != 'ios') {
    //     //   requestResolution()
    //     // }

    //     console.warn(error)});
  }

  const getLocation = async () => {
    if (Platform.OS != 'ios') {
      const hasLocationPermission = await hasLocationPermissions();
      if (!hasLocationPermission) {
        console.log('you will never have  have permission');
        return;
      } else {
        Geolocation.getCurrentPosition(
          info => {
            setlat(info?.coords?.latitude);
            setlong(info?.coords?.longitude);
            setinlat(info?.coords?.latitude);
            setinlong(info?.coords?.longitude);
          },
          error => {
            console.log('getCurrentPosition error' + JSON.stringify(error));
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      }
    } else {
      const hasLocationPermission = await hasLocationPermissionIOS();

      if (!hasLocationPermission) {
        console.log('you will never have  have permission');
        return;
      } else {
        console.log('refetching location');
        Geolocation.getCurrentPosition(
          info => {
            setlat(info?.coords?.latitude);
            setlong(info?.coords?.longitude);
            setinlat(info?.coords?.latitude);
            setinlong(info?.coords?.longitude);
          },
          error => {
            console.log('hellooo' + JSON.stringify(error));
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      }
    }

    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //         setLoader(false);
    //         const { coords } = position;
    //         console.log("CORDINATES =====> ", coords);

    //         getLocationName(coords?.latitude, coords?.longitude);
    //     },
    //     (error) => {
    //         setLoader(false);
    //         ToastMessage(error?.message);
    //     },
    //     {
    //         timeout: 15000,
    //         maximumAge: 10000,
    //         distanceFilter: 0,
    //         enableHighAccuracy: highAccuracy,
    //         forceRequestLocation: forceLocation,
    //         showLocationDialog: showLocationDialog,
    //         accuracy: {android: 'high',ios: 'best'},
    //     },
    // );

    Geolocation.getCurrentPosition(
      info => {
        // setlat(info?.coords?.latitude);
        // setlong(info?.coords?.longitude);
        // setinlat(info?.coords?.latitude);
        // setinlong(info?.coords?.longitude);
      },
      error => {
        console.log('hellooo' + JSON.stringify(error));
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  const hasLocationPermissions = async () => {
    // if (Platform.OS === 'ios') {
    //   const hasPermission = await hasLocationPermissionIOS();
    //   return hasPermission;
    // }
    console.log(Platform.Version);
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    console.log('next step');
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(hasPermission + 'this is the permission home');
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('you  have permission home screen');
      setEnabled(true);
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('you dont have permission');
      setEnabled(false);

      // ToastAndroid.show(
      //   'Location permission denied by user.',
      //   ToastAndroid.LONG,
      // );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('you will never have  have permission');
      setEnabled(false);

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
        `Turn on Location Services to allow Fougito Food to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }
    return false;
  };

  function navigatetoQR() {
    navigation.navigate('Qrcode', {
      latitude: lat,
      longitude: long,
    });
  }

  function infobarpress() {
    setshowbottomsheet(!showbottomsheet);
  }

  function openmap() {
    if (Platform.OS == 'ios') {
      LayoutAnimation.easeInEaseOut();
    }

    setshowmap(true);
  }
  function closemap() {
    if (Platform.OS == 'ios') {
      LayoutAnimation.easeInEaseOut();
    }

    setshowmap(false);
  }

  function closebottomsheet() {
    setshowbottomsheet(false);
  }

  function reloaddata() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(isconnected(true));
        console.log('true');
      } else {
        dispatch(isconnected(false));
        console.log('false' + state.isConnected);
      }
    });
  }
  return (
    <Animated.View
      style={{
        flex: 1,
        ...drawerAnimationStyle,
        overflow: 'hidden',
        backgroundColor: '#F6F6F6',
      }}>
      <FocusAwareStatusBar
        barStyle={showbottomsheet ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
      />
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={styleSheet.container}>
        <View style={styleSheet.innercontainer}>
          <ImageBackground
            resizeMode="cover"
            style={{
              ...styleSheet.imagebackgroundcontainer,
              height: scalableheight.fifteen + getStatusBarHeight(),
            }}
            imageStyle={styleSheet.imageStyle}
            source={require('../Resources/images/homebackground.png')}>
            <View style={{marginTop: getStatusBarHeight()}}></View>
            <HeaderComponent />
            <View style={styleSheet.innercontainer2}>
              {/* <Transparentinfobar Heading ={"Home"} Details ={"Clifton block 2, plot no 245, near bilawal house"}/>
             <View style={{marginTop: scalableheight.one}}></View> */}
              <Transparentsearch
                search={search}
                onchange={val => {
                  setsearch(val);
                }}
                OnPress={() => navigatetoQR()}
              />
            </View>
          </ImageBackground>

          {showmap != true && internetconnectionstate == true && (
            <View style={styleSheet.infobarview}>
              <Infobar
                onPress={() => infobarpress()}
                Heading={
                  Selectedcurrentaddress?.length > 0
                    ? Selectedcurrentaddress[0].place
                    : 'Current Location'
                }
                Details={
                  Selectedcurrentaddress?.length > 0
                    ? Selectedcurrentaddress[0].address
                    : pinlocation
                }
              />
            </View>
          )}
          {showmap != true && internetconnectionstate == true && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: scalableheight.two,
                paddingTop: scalableheight.two,
              }}>
              <Text style={styleSheet.nearby}>RESTAURANTS NEARBY</Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => openmap()}
                style={styleSheet.openmapstyle}>
                <Image
                  resizeMode="stretch"
                  style={styleSheet.openmapimagestyle}
                  source={
                    showmap
                      ? require('../Resources/images/listicon.png')
                      : require('../Resources/images/mapicon.png')
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          {showmap && (
            <>
              <View
                style={{
                  ...styleSheet.shadow,
                  ...styleSheet.mapvisible,
                }}>
                {lat != null &&
                long != null &&
                inlat != null &&
                inlong != null ? (
                  <MapView
                    // provider={PROVIDER_GOOGLE}
                    // customMapStyle={customStyle}
                    // userInterfaceStyle={"dark"}
                    ref={refMap}
                    showsMyLocationButton={false}
                    style={styleSheet.locationicon}
                    showsUserLocation
                    region={{
                      latitude: inlat,
                      longitude: inlong,
                      longitudeDelta:
                     closest == undefined
                          ? 0.01
                          : closest < 3 
                          ? 0.1
                          : closest < 10
                          ? 0.4
                          : closest < 20
                          ? 0.5
                          : 0.6,
                      latitudeDelta:
                      closest == undefined
                      ? 0.01
                      : closest < 3 
                      ? 0.1
                          : closest < 10
                          ? 0.4
                          : closest < 20
                          ? 0.5
                          : 0.6,
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
                            <View style={styleSheet.expandedicon}>
                              <Image
                                source={require('../Resources/images/redmarker.png')}
                                style={styleSheet.marker}
                                resizeMode="contain"
                              />
                            </View>
                          ) : (
                            <View style={styleSheet.marker}>
                              <Image
                                source={require('../Resources/images/redmarker.png')}
                                style={styleSheet.smallmarker}
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
              <View style={styleSheet.mapview2}>
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

              <View style={styleSheet.infobar2}>
                <Infobar
                  onPress={() => infobarpress()}
                  Heading={
                    Selectedcurrentaddress?.length > 0
                      ? Selectedcurrentaddress[0].place
                      : 'Current Location'
                  }
                  Details={
                    Selectedcurrentaddress?.length > 0
                      ? Selectedcurrentaddress[0].address
                      : pinlocation
                  }
                />
              </View>
              <View style={styleSheet.search}>
                {allrestraunts?.length > 0 &&
                allrestraunts?.find(data =>
                  data?.NameAsPerTradeLicense.includes(search.trim()),
                ) != undefined ? (
                  <>
                    {/* // <Animatable.View
                  //   animation="bounceInRight"
                  //   easing="ease"
                  //   iterationCount={1}
                  //   style={{
                  //     paddingTop: scalableheight.one,
                  //     paddingBottom: scalableheight.pointfive,

                  //     justifyContent: 'center',
                  //   }}> */}
                    <View style={styleSheet.nearby2}>
                      <Text style={styleSheet.nearby}>RESTAURANTS NEARBY</Text>

                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => closemap()}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: fontSize.circle,

                          height: scalableheight.four,
                          width: scalableheight.four,
                        }}>
                        <Image
                          resizeMode="stretch"
                          style={styleSheet.listimage}
                          source={
                            showmap
                              ? require('../Resources/images/listicon.png')
                              : require('../Resources/images/mapicon.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
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
                    {/* //     </Animatable.View> */}
                  </>
                ) : (
                  <View style={styleSheet.restaurantstyle}>
                    <Text style={styleSheet.norestaurant}>
                      {/* No Restaurants NearBy */}
                      No Restaurants
                    </Text>
                  </View>
                )}
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
                    onPress={() => reloaddata()}>
                    <Image
                      style={styleSheet.skeletonstyle}
                      resizeMode={'contain'}
                      source={require('../Resources/images/Skeleton/Retry.gif')}
                    />
                  </TouchableOpacity>
                </>
              ) : loader == true ? (
                <Image
                  style={styleSheet.skeletonstyle}
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
                  style={styleSheet.flatlistrefresh}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}
                  // contentContainerStyle={{paddingBottom: 54}}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View style={styleSheet.norestaurantview2}>
                  <Text style={styleSheet.norestaurant3}>
                    {/* No Restraunts NearBy */}
                    No Restauraunts
                  </Text>
                </View>
              ))
            // {/* </View> */}
          }
        </View>
      </View>
      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPressnewCoordinates={(a, b) => updatecoordinates(a, b)}
        onPress={() => closebottomsheet()}
        onPressnewlocation={() => getnewlocation()}
        latitude={lat}
        longitude={long}
        withvalidation={false}
        branchid={0}
      />

<Homescreendinein
        state={Dineinpopup}
        data = {() => {

        }}
        proceed = {()=>{
           closedinein()
           dispatch(storerestrauntbasicdata(restrauntwithindinindistancedata));
           dispatch(storedistance(restrauntwithindinindistancedata.Distance));
  
         
           if (currentRestrauntid != restrauntwithindinindistancedata.Id) {
             dispatch(clearmenu());
             dispatch(storecartprice(0));
             dispatch(cleancart());
             dispatch(storerestrauntid(restrauntwithindinindistancedata.Id));
           }
           dispatch(toggledinein(true))
           dispatch(getallrestrauntsbyid(restrauntwithindinindistancedata.Id, AuthToken));

           navigation.navigate('Restaurantpage', {
             latitude: lat,
             longitude: long,
           });
           // navigation.navigate('Restaurantpage');
        }}
        togglemodel={closedinein}
        name= {restrauntwithindinindistancedata?.NameAsPerTradeLicense}
      
      />
   
      <Toast ref={toast} style={styleSheet.toastmessage} />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  toastmessage: {
    marginBottom: scalableheight.ten,
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  innercontainer: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  imagebackgroundcontainer: {
    width: '100%',

    zIndex: 10,
    elevation: 10,
  },
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
  imageStyle: {
    borderBottomLeftRadius: fontSize.twenty,
    borderBottomRightRadius: fontSize.twenty,
  },
  innercontainer2: {
    paddingHorizontal: scalableheight.one,
  },

  nearby: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: '#29262A',
    // paddingBottom:scalableheight.one
  },
  nearby2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scalableheight.one,
  },
  openmapstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fontSize.circle,

    height: scalableheight.four,
    width: scalableheight.four,
  },
  openmapimagestyle: {
    width: '100%',
    height: '100%',
    zIndex: 201,
    elevation: 201,
  },
  mapvisible: {
    height: scalableheight.fiftyfive,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: fontSize.fifteen,
    overflow: 'hidden',
    position: 'absolute',
    bottom: scalableheight.thirtythree,
    zIndex: 1,
  },
  locationicon: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.fifteen,
  },
  expandedicon: {
    height: scalableheight.six,
    width: scalableheight.six,
  },
  marker: {
    height: scalableheight.six,
    width: scalableheight.six,
  },
  smallmarker: {
    height: scalableheight.four,
    width: scalableheight.four,
  },
  mapview2: {
    width: scalableheight.six,
    height: scalableheight.six,
    backgroundColor: '#F6F6F6',
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
  },
  infobar2: {
    width: '100%',
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: scalableheight.two,

    elevation: 5,
    zIndex: 5,
    position: 'absolute',
    bottom: scalableheight.twentythree,
  },
  infobarview: {
    width: '100%',
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: scalableheight.one,
    marginTop: scalableheight.two,
    elevation: 5,
    zIndex: 5,
  },
  search: {
    paddingHorizontal: scalableheight.one,
    position: 'absolute',
    bottom: scalableheight.one,
    zIndex: 200,
    elevation: 200,
    backgroundColor: '#F6F6F6',
    width: '100%',
  },
  listimage: {
    width: '100%',
    height: '100%',
    zIndex: 201,
    elevation: 201,
  },
  restaurantstyle: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width / 1,
    height: scalableheight.twentytwo,
    justifyContent: 'center',
    alignItems: 'center',

    // borderWidth:1, borderColor:"red"
  },
  norestaurant: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: '#29262A',
    opacity: 0.4,
    marginTop: scalableheight.two,
  },
  skeletonstyle: {
    // marginVertical: scalableheight.five,
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  flatlistrefresh: {
    width: '100%',
    paddingHorizontal: scalableheight.one,
  },
  norestaurantview2: {
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').height / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  norestaurant3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: '#29262A',
    opacity: 0.4,
  },
});
export default Home;
