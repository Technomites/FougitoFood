import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getalladdresses,
  savemyaddress,
  clearaddressresponse,
} from '../Actions/actions';
import Toast from 'react-native-toast-notifications';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Favourites from '../Shared/Components/Favourites';
import Addresstile from '../Shared/Components/Addresstile';
import MYButton from '../Shared/Components/MYButton';
import Addressplace from '../Shared/Components/Addressplace';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SuccessModal from '../Shared/Components/SuccessModal';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import SavedAddresses from '../Shared/Components/SavedAddresses';

const EditAddress = ({props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const [placeselected, SetPlaceSelected] = useState({"icon": "home", "title": "Home"});
  const [modelpopup, SetModelPopUP] = useState(false);
  const [address, setaddress] = useState('');
  const [pinlatitude, SetPinLatitude] = useState(0);
  const [pinLongitude, SetPinLongitude] = useState(0);
  const [hidemarker, sethidemarker] = useState(false);
  const [pinlocation, setpinlocation] = useState('');
  const [street, setstreet] = useState('');
  const [floor, setfloor] = useState('');
  const [note, setnote] = useState('');
  const [loader, setloader] = useState(false);
  const toast = useRef();

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
  const [place, Setplace] = useState([
    {
      icon: 'home',
      title: 'Home',
    },
    {
      icon: 'briefcase',
      title: 'Work',
    },
    {
      icon: 'building',
      title: 'Other',
    },
  ]);
  const refMap = useRef(null);
  const {
    notificationList,
    notificationCount,
    AuthToken,
    addresscreationresponse,
  } = useSelector(state => state.userReducer);

  useEffect(() => {
    Geocoder.init('AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso');
    Geolocation.getCurrentPosition(info => {
      SetPinLatitude(info?.coords?.latitude);
      SetPinLongitude(info?.coords?.longitude);
      // console.log(info?.coords?.latitude);
      // console.log(info?.coords?.longitude);
    });

    getLocation();
  }, []);

  useEffect(() => {
    if (addresscreationresponse != '') {
      setloader(false);
      if (addresscreationresponse == 'Success') {
        toast.current.show('New address created', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
        dispatch(getalladdresses(AuthToken));
        navigation.goBack();
      } else if (addresscreationresponse == 'Network Request Failed') {
        toast.current.show('Network Request Failed', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
        dispatch(clearaddressresponse());
        setloader(false);
      } else {
        toast.current.show(
          'There was an error saving your address. Please try again later',
          {
            type: 'normal',
            placement: 'bottom',
            duration: 4000,
            offset: 10,
            animationType: 'slide-in',
            zIndex: 2,
          },
        );
      }
      dispatch(clearaddressresponse());
    }
  }, [addresscreationresponse]);

  useEffect(() => {
    if (pinlatitude != null && pinLongitude != null) {
      Geocoder.from(pinlatitude, pinLongitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          // console.log(addressComponent);
          setpinlocation(addressComponent);
        })
        .catch(error => console.warn(error));
    }
  }, [pinlatitude, pinLongitude]);

  function getnewlocation() {
    Geocoder.from(pinlatitude, pinLongitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        // console.log(addressComponent);
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

  function addresssave() {
    if (placeselected == '') {
      toast.current.show('Label Your Address As Home/Work/Other', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (pinlocation == '') {
      toast.current.show('Enter Select A Location', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (street == '') {
      toast.current.show('Enter Building & Street', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else {
      console.log('placeselected ' + JSON.stringify(placeselected.title));
      console.log('pinlocation ' + pinlocation);
      console.log('street ' + street);
      console.log('floor ' + floor);
      console.log('pinlatitude ' + pinlatitude);
      console.log('pinLongitude ' + placeselected);
      let data = {
        id: 0,
        address: pinlocation,
        latitude: pinlatitude,
        longitude: pinLongitude,
        type: placeselected.title,
        Street: street,
        Floor: floor,
        NoteToRider: note,
      };
      setloader(true);
      dispatch(savemyaddress(data, AuthToken));
    }
  }
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'Create Address'} />
        <View style={{height: scalableheight.three}} />
        <ScrollView
        keyboardShouldPersistTaps={"always"}
          style={{width: '100%', paddingHorizontal: scalableheight.two}}>
          <View style={{height: scalableheight.one}} />

          <GooglePlacesAutocomplete
            suppressDefaultStyles={false}
            //  styles ={{

            //   ...styleSheet.shadow,
            //   width: '100%',
            //   height: scalableheight.six,
            //   fontSize: fontSize.fifteen,
            //   backgroundColor: '#F9F9F9',
            //   alignSelf: 'center',
            //   borderRadius: fontSize.borderradiusmedium,
            //   paddingHorizontal: '5%',
            //   marginHorizontal: '0.4%',
            // }}
            styles={{
              textInput: {
                ...styleSheet.shadow,
                width: '100%',
                height: scalableheight.six,
                fontSize: fontSize.fifteen,
                backgroundColor: '#F9F9F9',
                alignSelf: 'center',
                borderRadius: fontSize.borderradiusmedium,
                paddingHorizontal: '5%',
                marginHorizontal: '0.4%',
              },
            }}
            placeholder="Search"
            onPress={(data, details = null) => {
              setpinlocation(data.description);
              Geocoder.from(data.description)
                .then(json => {
                  var location = json.results[0].geometry.location;
                  SetPinLatitude(location.lat);
                  SetPinLongitude(location.lng);
                })
                .catch(error => console.warn(error));
            }}
            query={{
              key: 'AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso',
              language: 'en',
              components: "country:ae",
            }}
          />

          <View
            style={{
              marginTop: scalableheight.one,
              height: scalableheight.twentysix,
              borderRadius: fontSize.eight,
              overflow: 'hidden',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {hidemarker == false ? (
              <MaterialIcons
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  alignContent: 'center',
                  zIndex: 3,
                  elevation: 3,
                }}
                name="location-pin"
                color={'#F55050'}
                size={scalableheight.six}
              />
            ) : (
              <Entypo
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  alignContent: 'center',
                  zIndex: 3,
                  elevation: 3,
                }}
                name="dot-single"
                color={'#F55050'}
                size={scalableheight.six}
              />
            )}
            <MapView
              // provider={PROVIDER_GOOGLE}
              // customMapStyle={customStyle}
              ref={refMap}
              showsUserLocation
              style={{
                width: '100%',
                height: '100%',
                borderRadius: fontSize.fifteen,
              }}
              region={{
                latitude: pinlatitude,
                longitude: pinLongitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              initialRegion={{
                latitude: pinlatitude,
                longitude: pinLongitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              onRegionChange={region => {
                //  console.log(region)
                if (
                  region.latitude.toFixed(6) === pinlatitude.toFixed(6) &&
                  region.longitude.toFixed(6) === pinLongitude.toFixed(6)
                ) {
                  return;
                } else {
                  sethidemarker(true);
                }
              }}
              onRegionChangeComplete={region => {
                // console.log(region)

                if (
                  region.latitude.toFixed(6) === pinlatitude.toFixed(6) &&
                  region.longitude.toFixed(6) === pinLongitude.toFixed(6)
                ) {
                  return;
                } else {
                  sethidemarker(false);
                  SetPinLatitude(region.latitude),
                    SetPinLongitude(region.longitude);
                }
              }}></MapView>
          </View>

          <View
            style={{
              marginTop: scalableheight.two,
              ...styleSheet.shadow,
              width: '99%',
              height: scalableheight.eight,
              fontSize: fontSize.fifteen,
              backgroundColor: '#F9F9F9',
              alignSelf: 'center',
              borderRadius: fontSize.borderradiusmedium,
              paddingHorizontal: '5%',
              justifyContent: 'center',
            }}>
            <Text numberOfLines={2}>{pinlocation}</Text>
          </View>
          <View>
            <View
              style={{
                marginTop: scalableheight.two,
                marginBottom: scalableheight.one,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                  color: 'black',
                  opacity: 0.5,
                }}>
                Building & Street
              </Text>
            </View>
            <View style={{...styleSheet.container, ...styleSheet.shadow}}>
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  returnKeyType="next"
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  value={street}
                  onChangeText={text => setstreet(text)}
                  placeholderTextColor={'lightgray'}
                  placeholder={'Enter building & street here'}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}
                  style={{
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                marginTop: scalableheight.two,
                marginBottom: scalableheight.one,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                  color: 'black',
                  opacity: 0.5,
                }}>
                Flat No & Floor (Optional)
              </Text>
            </View>
            <View style={{...styleSheet.container, ...styleSheet.shadow}}>
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  returnKeyType="next"
                  value={floor}
                  onChangeText={text => setfloor(text)}
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  //value={props.value}
                  // onChangeText={props.onChangeText}
                  placeholderTextColor={'lightgray'}
                  placeholder={'Enter flat no & floor here '}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}
                  style={{
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                marginTop: scalableheight.two,
                marginBottom: scalableheight.one,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                  color: 'black',
                  opacity: 0.5,
                }}>
                Note To Rider (Optional)
              </Text>
            </View>
            <View
              style={{
                ...styleSheet.container,
                height: scalableheight.thirteen,
                ...styleSheet.shadow,
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  paddingVertical: scalableheight.one,
                }}>
                <TextInput
                  multiline
                  returnKeyType="next"
                  value={note}
                  onChangeText={text => setnote(text)}
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  //value={props.value}
                  // onChangeText={props.onChangeText}
                  placeholderTextColor={'lightgray'}
                  placeholder={'Enter note to rider'}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}

                  style={{
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    textAlignVertical: 'top',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',

              marginVertical: fontSize.nine,
            }}>
            {place.map((item, index) => {
              return (
                <Addressplace
                key={index.toString()}
                  onPress={() => {
                    // console.log(item)
                    SetPlaceSelected(item);
                  }}
                  data={item}
                  selection={placeselected}
                />
              );
            })}
          </View>

          <View style={{height: scalableheight.tweleve}}></View>
        </ScrollView>

        <View
          style={{
            marginVertical: fontSize.eight,
            position: 'absolute',
            bottom: scalableheight.two,
            width: '100%',
            paddingHorizontal: scalableheight.two,
          }}>
          {loader == true ? (
            <View
              style={{
                height: scalableheight.seven,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color="#E14E4E" />
            </View>
          ) : (
            <MYButton
              onPress={() => {
                addresssave();
              }}
              color={'rgba(225, 78, 78, 1)'}
              title={'SAVE NEW ADDRESS'}
              textcolor={'white'}
            />
          )}
        </View>
      </View>
      <SuccessModal
        successModalShown={modelpopup}
        onNoPress={() => {
          SetModelPopUP(false);
          navigation.navigate('Home');
        }}
      />
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    height: scalableheight.six,
    backgroundColor: '#F9F9F9',
    width: '99%',
    flexDirection: 'row',
    borderRadius: fontSize.eight,
    marginHorizontal: '0.5%',
  },
  textInput: {
    marginLeft: scalableheight.one,

    width: '100%',
    color: 'black',
  },
  textInput1: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    borderRadius: fontSize.eleven,
    padding: scalableheight.one,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)',

    backgroundColor: 'white',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000075',
    paddingHorizontal: 30,
  },
  modalView: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#29262A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
});
export default EditAddress;
