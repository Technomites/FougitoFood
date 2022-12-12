import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';

// import {request}  from './SavedAddresses';
//import Geolocation from '@react-native-community/geolocation';

import Geolocation from 'react-native-geolocation-service';

import Geocoder from 'react-native-geocoding';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import SavedAddresses from './SavedAddresses';
import MYButton from '../Components/MYButton';
import {
  getalladdresses,
  storecurrentaddress,
  getdistancevalidation,
  cleardistancevalidation,
} from '../../Actions/actions';
import Addresstile from '../../Shared/Components/Addresstile';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
export default function Custombottomsheet(props) {
  const {AuthToken, alladdresses, validdistance} = useSelector(
    state => state.userReducer,
  );
  // alert(props?.latitudepin, props?.longitudepin);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refMap = useRef(null);
  const ref = useRef();
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [showmap, setshowmap] = useState(false);
  const [pinlocation, setpinlocation] = useState('');
  const [center, setCenter] = useState();
  const [pinlatitude, SetPinLatitude] = useState(0);
  const [pinLongitude, SetPinLongitude] = useState(0);
  const [hidemarker, sethidemarker] = useState(false);
  const [showcurrent, setshowcurrent] = useState(false);
  const [temportystoreforselectedaddress, settemportystoreforselectedaddress] =
    useState(null);
  const [selectedaddress, setselectedaddress] = useState('');
  const [activatehideshow, setactivatehideshow] = useState(false);

  function toggleanimation() {
    if (animationtype == 'fadeInUpBig') {
      setanimationtype('fadeOutDownBig');
    } else {
      setanimationtype('fadeInUpBig');
    }
  }

  function getnewlocation() {
    Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
    Geolocation.getCurrentPosition(info => {
      SetPinLatitude(info?.coords?.latitude),
        SetPinLongitude(info?.coords?.longitude);

      Geocoder.from(info?.coords?.latitude, info?.coords?.longitude)
        .then(
          json => {
            var addressComponent = json.results[0].formatted_address;
            // console.log(addressComponent);
            // setpinlocation(addressComponent);
            ref.current?.clear();
            setshowcurrent(false);
            setselectedaddress(addressComponent);
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
        )
        .catch(error => {
          requestResolution();
          console.warn(error);
        });
    });

    /////////////////////////
  }

  useEffect(() => {
    if (props.state == true) {
      setanimationstate(true);
    }
  }, [props.state]);

  useEffect(() => {
    if (
      props?.longitude != null &&
      props?.latitude != null &&
      props?.longitude != 0 &&
      props?.latitude != 0
    ) {
      console.log(
        props?.latitude,
        'props?.latitude not null----------------------------',
      );
      console.log(
        props?.longitude,
        'props?.longitude not null---------------------------',
      );
      SetPinLatitude(props?.latitude);
      SetPinLongitude(props?.longitude);
    }
  }, [props?.longitude, props?.latitude]);

  function clearandclose() {
    toggleanimation();
    setanimationstate(true);
    setshowmap(false);
  }
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
    console.log('this part is working');
    console.log('validdistance' + validdistance);
    console.log('validdistance' + validdistance);
    if (validdistance == true && temportystoreforselectedaddress != null) {
      console.log('this part is alsoooo working');
      dispatch(storecurrentaddress(temportystoreforselectedaddress));
      props.onPressnewCoordinates(
        temportystoreforselectedaddress?.Latitude,
        temportystoreforselectedaddress?.Longitude,
      );
      settemportystoreforselectedaddress(null);
      dispatch(cleardistancevalidation());
    }
  }, [validdistance]);

  function showmaptoggle() {
    if (showmap == true) {
      setshowmap(false);
      // clearandclose();
      // props.onPress();
    } else {
      // props.onPress();
       clearandclose();
    }
  }

  function locationdata(data) {
    setpinlocation(data.description);
    Geocoder.from(data.description)
      .then(json => {
        var location = json.results[0].geometry.location;
        SetPinLatitude(location.lat), SetPinLongitude(location.lng);

        Geocoder.from(location.lat, location.lng)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            setshowcurrent(false);
            setselectedaddress(addressComponent);
            //ref.current?.setAddressText(addressComponent);
            ref.current?.clear();
          })
          .catch(error => {
            ref.current?.clear();
            console.warn(error);
          });
        ref.current?.clear();
      })
      .catch(error => console.warn(error));
  }

  function changeregion(region) {
    // console.log(region)

    if (
      region?.latitude?.toFixed(5) === pinlatitude?.toFixed(5) &&
      region?.longitude?.toFixed(5) === pinLongitude?.toFixed(5)
    ) {
      return;
    } else {
      sethidemarker(false);
      SetPinLatitude(region.latitude), SetPinLongitude(region.longitude);

      Geocoder.from(region.latitude, region.longitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          //ref.current?.setAddressText(addressComponent);
          ref.current?.clear();
          setshowcurrent(false);
          setselectedaddress(addressComponent);
        })
        .catch(error => {
          ref.current?.clear();
          console.warn(error);
        });
    }
  }

  function buttonpress() {
    if (showmap == true) {
      let currentaddress = [
        {
          Latitude: pinlatitude,
          Longitude: pinLongitude,
          icon: 'Others',
          place: 'Others',
          address: selectedaddress,
          note: '',
          Street: '',
          Floor: '',
        },
      ];

      if (props.withvalidation == false) {
        dispatch(storecurrentaddress(currentaddress));
        props.onPressnewCoordinates(pinlatitude, pinLongitude);
      } else {
        dispatch(
          getdistancevalidation(props.branchid, pinlatitude, pinLongitude),
        );
        settemportystoreforselectedaddress(currentaddress);
      }
      setshowmap(false);
      clearandclose();
      // props.onPress();
    } else {
      // setshowmap(false);
      clearandclose();
    }
  }
  return (
    <>
      {props.state && (
        <Animatable.View
          animation={animationstate ? animationtype : null}
          onAnimationEnd={() => {
            setanimationstate(false);
            if (animationtype == 'fadeOutDownBig') {
              setanimationtype('fadeInUpBig');
              props.onPress();
            }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            ...styleSheet.bottomsheetcontainer,
            height: showmap == true ? '100%' : null,
            padding: showmap == true ? null : scalableheight.two,
            // marginTop: showmap == true ? getStatusBarHeight() : null,
          }}
          >

        {/* <View
          style={{
            ...styleSheet.bottomsheetcontainer,
            height: showmap == true ? '100%' : null,
            padding: showmap == true ? null : scalableheight.two,
            // marginTop: showmap == true ? getStatusBarHeight() : null,
          }}> */}
          <TouchableOpacity
            onPress={() => showmaptoggle()}
            style={{
              top:
                showmap == true
                  ? getStatusBarHeight() + scalableheight.one
                  : scalableheight.one,
              ...styleSheet.maptoggle,
            }}>
            <Ionicons
              name="close-circle"
              color={showmap == true ? '#E14E4E' : 'rgba(211,211,211, 0.8)'}
              size={fontSize.thirtyseven}
              style={{}}
            />
          </TouchableOpacity>

          {showmap != true ? (
            <Text style={styleSheet.deliveraddress}>
              {/* Select A Delivery Address */}
            </Text>
          ) : null}
          {showmap != true ? (
            <>
              <TouchableOpacity
                // disabled={props.locationpin == '' ? false : true}
                onPress={props.onPressnewlocation}
                style={styleSheet.current}>
                <View style={{justifyContent: 'flex-start'}}>
                  <MaterialCommunityIcons
                    name={'crosshairs-gps'}
                    color={'#F55050'}
                    size={fontSize.twentyfour}
                  />
                </View>
                <View style={{marginLeft: scalableheight.two}}>
                  <Text style={styleSheet.detect}>Detect Current Location</Text>

                  <Text numberOfLines={2} style={styleSheet.gps}>
                    {props.locationpin == null ? 'Use GPS' : props.locationpin}
                  </Text>
                </View>
              </TouchableOpacity>
              {AuthToken != '' && alladdresses.length > 0 ? (
                // <View>
                //   <Text
                //     style={{
                //       color: 'black',
                //       opacity: 0.6,
                //       fontFamily: 'Inter-Regular',
                //       fontSize: fontSize.sixteen,
                //       paddingTop: scalableheight.one,
                //     }}>
                //     My Saved Addresses
                //   </Text>
                //   <SavedAddresses
                //     title={'Home'}
                //     address={'Mann Crossing 332 Ardith Highway'}
                //   />
                //   <SavedAddresses title={'Home'} address={'Clifton block 2'} />
                // </View>
                <>
                  <Text style={styleSheet.savedaddresses}>
                    My Saved Addresses
                  </Text>
                  <FlatList
                    data={alladdresses}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      //   paddingBottom: scalableheight.three,
                    }}
                    ListEmptyComponent={() => (
                      <Text
                        style={{
                          color: 'black',
                          opacity: 0.5,
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.eleven,
                        }}>
                        No addresses available
                      </Text>
                    )}
                    renderItem={({item, i}) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            let currentaddress = [
                              {
                                Latitude: item.Latitude,
                                Longitude: item.Longitude,
                                icon: item.Type,
                                place: item.Type,
                                address: item.Address,
                                note: item.NoteToRider,
                                Street: item.Street,
                                Floor: item.Floor,
                              },
                            ];
                            console.log(currentaddress);
                            if (props.withvalidation == false) {
                              dispatch(storecurrentaddress(currentaddress));
                              props.onPressnewCoordinates(
                                item.Latitude,
                                item.Longitude,
                              );
                            } else {
                              dispatch(
                                getdistancevalidation(
                                  props.branchid,
                                  item.Latitude,
                                  item.Longitude,
                                ),
                              );
                              settemportystoreforselectedaddress(
                                currentaddress,
                              );
                            }
                            clearandclose();
                            // props.onPress();

                            //navigation.goBack();
                          }}
                          //  disabled={screenname == 'checkout' ? false : true}
                        >
                          <SavedAddresses
                            Latitude={item.Latitude}
                            Longitude={item.Longitude}
                            icon={item.Type}
                            title={item.Type}
                            address={item.Address}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </>
              ) : null}
              {props.setlocation != false && (
                <TouchableOpacity
                  onPress={() => {
                    setshowmap(true);
                  }}
                  style={styleSheet.markermap}>
                  <View style={{justifyContent: 'flex-start'}}>
                    <FontAwesome5
                      name={'map-marked-alt'}
                      color={'#F55050'}
                      size={fontSize.twenty}
                    />
                  </View>
                  <View style={{marginLeft: scalableheight.two}}>
                    <Text style={styleSheet.location2}>Pin Your Location</Text>
                    <Text style={styleSheet.openmap2}>Open Map</Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={{height: '100%'}}>
              {/* <View style={{height: scalableheight.two}}></View> */}

              <View style={styleSheet.locationcontainer}>
                <View
                  style={{
                    ...styleSheet.shadow,
                    ...styleSheet.locationinnercontainer,
                  }}>
                  <Text style={styleSheet.locationtext}>My Location</Text>
                  <Text style={styleSheet.addresstext} numberOfLines={2}>
                    {showcurrent ? props.locationpin : selectedaddress}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  top: getStatusBarHeight() + scalableheight.seven,
                  ...styleSheet.googlecompleteview,
                }}>
                <GooglePlacesAutocomplete
                  //  suppressDefaultStyles={false}

                  //  autoFocus={true}
                  //  returnKeyType={'default'}
                  //  fetchDetails={true}
                  ref={ref}
                  styles={{
                    textInput: {
                      ...styleSheet.shadow,
                      ...styleSheet.googletext,
                    },
                  }}
                  placeholder="Search"
                  onPress={(data, details = null) => locationdata(data)}
                  query={{
                    key: 'AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8',
                    language: 'en',
                    components: 'country:ae',
                  }}
                />
              </View>

              <TouchableOpacity
                //  onPress={() => {props.onPressnewlocation}
                onPress={() => getnewlocation()}
                style={{
                  top: getStatusBarHeight() + scalableheight.eightpointfive,
                  ...styleSheet.gpspositioning,
                }}>
                <MaterialCommunityIcons
                  name={'crosshairs-gps'}
                  color={'#F55050'}
                  size={fontSize.twentyfour}
                />
              </TouchableOpacity>
              <View style={styleSheet.markerview}>
                {hidemarker == false ? (
                  <MaterialIcons
                    style={styleSheet.pinposition}
                    name="location-pin"
                    color={'#F55050'}
                    size={scalableheight.six}
                  />
                ) : (
                  <Entypo
                    style={styleSheet.pinposition}
                    name="dot-single"
                    color={'#F55050'}
                    size={scalableheight.six}
                  />
                )}

                <MapView
                  showsMyLocationButton={false}
                  // provider={PROVIDER_GOOGLE}
                  style={styleSheet.mapposition}
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
                      region?.latitude?.toFixed(5) ===
                        pinlatitude?.toFixed(5) &&
                      region?.longitude?.toFixed(5) === pinLongitude?.toFixed(5)
                    ) {
                      return;
                    } else {
                      sethidemarker(true);
                    }
                  }}
                  onRegionChangeComplete={region =>
                    changeregion(region)
                  }></MapView>
                {/* <View
                  style={{
                    width: scalableheight.eight,
                    height: scalableheight.four,
                    backgroundColor: 'white',
                    borderRadius: fontSize.borderradiusmedium,
                    shadowColor: '#470000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    elevation: 3,
                    position: 'absolute',
                    bottom: scalableheight.pointfive,
                    left: scalableheight.pointfive,
                    elevation: 5,
                    zIndex: 5,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // paddingHorizontal: scalableheight.two,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      alignSelf: 'center',
                      width: scalableheight.seven,
                      height: scalableheight.seven,
                    }}
                    source={require('../../Resources/images/logo-black.png')}
                  />
                </View> */}
              </View>
              <View style={styleSheet.buttonview}>
                {props?.locationpin != '' || selectedaddress != '' ? (
                  <MYButton
                    // disabled
                    onPress={() => buttonpress()}
                    title="CONFIRM PIN LOCATION"
                    color={'#E14E4E'}
                    textcolor={'white'}
                  />
                ) : null}
              </View>
            </View>
          )}
        {/* </View> */}
         </Animatable.View>
      )}
      {/* {props.state && props.OnPressPinLocation != true && (
        
      )} */}
    </>
  );
}

const styleSheet = StyleSheet.create({
  buttonview: {
    width: '100%',
    position: 'absolute',
    bottom: scalableheight.five,
    paddingHorizontal: scalableheight.two,
  },
  mapposition: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.fifteen,
    position: 'absolute',
    bottom: 0,
  },

  pinposition: {
    position: 'absolute',
    alignSelf: 'center',
    alignContent: 'center',
    zIndex: 3,
    elevation: 3,
  },
  markerview: {
    width: '100%',
    height: '100%',
    // marginVertical: scalableheight.two,
    borderRadius: fontSize.fifteen,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpspositioning: {
    position: 'absolute',

    right: Platform.OS == 'ios' ? scalableheight.six : scalableheight.four,
    elevation: 120,
    zIndex: 120,
  },
  googletext: {
    width: '100%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: scalableheight.two,
    paddingRight: scalableheight.six,

    zIndex: 10,
    elevation: 10,
  },
  googlecompleteview: {
    position: 'absolute',

    zIndex: 115,

    width: '100%',
    paddingHorizontal: scalableheight.two,
    justifyContent: 'center',
  },
  addresstext: {
    color: 'grey',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.twelve,
  },
  locationtext: {
    color: '#F55050',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
    paddingBottom: scalableheight.pointfive,
  },
  locationinnercontainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: fontSize.borderradiusmedium,
    padding: scalableheight.one,
  },
  locationcontainer: {
    position: 'absolute',

    // left: scalableheight.two,
    elevation: 112,
    zIndex: 112,
    width: '100%',
    paddingHorizontal: scalableheight.two,
    top: getStatusBarHeight() + scalableheight.fourteen,
  },
  openmap2: {
    color: 'black',
    opacity: 0.5,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.eleven,
  },
  location2: {
    color: '#F55050',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
  },
  markermap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(211,211,211, 0.5)',
    paddingVertical: scalableheight.one,
  },
  savedaddresses: {
    // color: 'black',
    opacity: 0.6,
    // fontFamily: 'Inter-Regular',
    // fontSize: fontSize.fifteen,
    paddingVertical: scalableheight.one,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
  },
  gps: {
    color: 'black',
    opacity: 0.5,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.eleven,
  },
  detect: {
    color: '#F55050',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
  },
  current: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(211,211,211, 0.5)',
    paddingVertical: scalableheight.one,
  },
  bottomsheetcontainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: fontSize.twenty,
    borderTopRightRadius: fontSize.twenty,

    zIndex: 3,
    elevation: 3,
  },
  Text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: 'black',
  },
  Text2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.ten,
    color: '#29262A',
    opacity: 0.4,
  },
  Text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'black',
  },
  Text4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color: '#E14E4E',
  },
  Text4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
    color: '#E14E4E',
  },
  Text5: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.thirteen,
    color: 'black',
    opacity: 0.4,
  },

  Text6: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color: 'black',
    opacity: 0.8,
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twenty,
    color: '#000000',
    borderRadius: fontSize.eleven,

    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: scalableheight.one,
    borderWidth: scalableheight.borderTopWidth,
    borderColor: 'rgba(211,211,211, 0.6)',
    padding: scalableheight.onepointfive,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twelve,
  },

  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
  },
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: scalableheight.two,
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
  },
  scrollcontainer: {flexGrow: 1, paddingVertical: scalableheight.two},
  // TextInput: {
  //   width: '95%',
  //   backgroundColor: '#F5F5F5',
  //   fontSize: fontSize.fifteen,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: fontSize.eleven,
  //   height: scalableheight.seven,
  //   color: '#8c8c8c',

  //   paddingHorizontal: scalableheight.two,
  //   alignSelf: 'center',
  //   marginTop: '4%',
  // },
  TextInput: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    fontSize: fontSize.fifteen,
    color: '#8c8c8c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,
    height: scalableheight.seven,

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: scalableheight.one,
  },
  shadow: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
  maptoggle: {
    position: 'absolute',

    right: scalableheight.onepointfive,
    elevation: 10,
    zIndex: 10,
  },
  deliveraddress: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    alignSelf: 'center',
  },
});
