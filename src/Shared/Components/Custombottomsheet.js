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

import Geocoder from 'react-native-geocoding';
import renderIf from 'render-if';
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
import {getalladdresses, storecurrentaddress} from '../../Actions/actions';
import Addresstile from '../../Shared/Components/Addresstile';

import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
export default function Custombottomsheet(props) {
  const {AuthToken, alladdresses} = useSelector(state => state.userReducer);
  // alert(props?.latitudepin, props?.longitudepin);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refMap = useRef(null);

  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [showmap, setshowmap] = useState(false);
  // const [lat, setlat] = useState();
  // const [long, setlong] = useState();
  // const [inlat, setinlat] = useState();
  // const [inlong, setinlong] = useState();
  const [pinlocation, setpinlocation] = useState('');
  const [center, setCenter] = useState();
  // const [pinlatitude, SetPinLatitude] = useState(
  //   props?.latitudepin != null ? props?.latitudepin : 0.88888,
  // );
  // const [pinLongitude, SetPinLongitude] = useState(
  //   props?.longitudepin != null ? props?.longitudepin : 0.88888,
  // );
  // != null ? props?.latitudepin : 25.2048
  const [pinlatitude, SetPinLatitude] = useState(0);
  const [pinLongitude, SetPinLongitude] = useState(0);
  const [hidemarker, sethidemarker] = useState(false);
  const [activatehideshow, setactivatehideshow] = useState(false);
  // != null ? props?.longitude : 55.2708

  function toggleanimation() {
    if (animationtype == 'fadeInUpBig') {
      setanimationtype('fadeOutDownBig');
    } else {
      setanimationtype('fadeInUpBig');
    }
  }

  useEffect(() => {
    if (props.state == true) {
      setanimationstate(true);
    }
  }, [props.state]);
  useEffect(() => {
    dispatch(getalladdresses(AuthToken));
  }, []);

  useEffect(() => {
    if (props?.longitude != null && props?.latitude != null) {
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
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: fontSize.twenty,
            borderTopRightRadius: fontSize.twenty,
            padding: scalableheight.two,
            zIndex: 3,
            elevation: 3,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (showmap == true) {
                setshowmap(false);
              } else {
                clearandclose();
              }
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
          {showmap != true ? (
            <>
              <TouchableOpacity
                // disabled={props.locationpin == '' ? false : true}
                onPress={props.onPressnewlocation}
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
                    size={fontSize.twentyfour}
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
                    numberOfLines={2}
                    style={{
                      color: 'black',
                      opacity: 0.5,
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.eleven,
                    }}>
                    {props.locationpin == null ? 'Use GPS' : props.locationpin}
                  </Text>
                </View>
              </TouchableOpacity>
              {AuthToken != '' ? (
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
                  <Text
                    style={{
                      color: 'black',
                      opacity: 0.6,
                      fontFamily: 'Inter-Regular',
                      fontSize: fontSize.sixteen,
                      paddingVertical: scalableheight.one,
                    }}>
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
                            dispatch(storecurrentaddress(currentaddress));
                            props.onPressnewCoordinates(
                              item.Latitude,
                              item.Longitude,
                            );
                            clearandclose();
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
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View>
              <View style={{height: scalableheight.two}}></View>
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
                      SetPinLatitude(location.lat),
                        SetPinLongitude(location.lng);
                    })
                    .catch(error => console.warn(error));
                }}
                query={{
                  key: 'AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso',
                  language: 'en',
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: scalableheight.thirty,
                  marginVertical: scalableheight.two,
                  borderRadius: fontSize.fifteen,
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
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: fontSize.fifteen,
                  }}
                  region={{
                    latitude: pinlatitude,
                    longitude: pinLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  initialRegion={{
                    latitude: pinlatitude,
                    longitude: pinLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onRegionChange={region => {
                    //  console.log(region)
                    if (
                      region.latitude.toFixed(5) === pinlatitude.toFixed(5) &&
                      region.longitude.toFixed(5) === pinLongitude.toFixed(5)
                    ) {
                      return;
                    } else {
                      sethidemarker(true);
                    }
                  }}
                  onRegionChangeComplete={region => {
                    // console.log(region)

                    if (
                      region.latitude.toFixed(5) === pinlatitude.toFixed(5) &&
                      region.longitude.toFixed(5) === pinLongitude.toFixed(5)
                    ) {
                      return;
                    } else {
                      sethidemarker(false);
                      SetPinLatitude(region.latitude),
                        SetPinLongitude(region.longitude);
                    }
                  }}></MapView>
                <View
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
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <MYButton
                  // disabled
                  onPress={() => {
                    if (showmap == true) {
                      setshowmap(false);
                      props.onPressnewCoordinates(pinlatitude, pinLongitude);
                    } else {
                      clearandclose();
                    }
                  }}
                  title="CONFIRM PIN LOCATION"
                  color={'#E14E4E'}
                  textcolor={'white'}
                />
              </View>
            </View>
          )}
        </Animatable.View>
      )}
      {/* {props.state && props.OnPressPinLocation != true && (
        
      )} */}
    </>
  );
}

const styleSheet = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
});
