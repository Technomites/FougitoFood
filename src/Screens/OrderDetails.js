import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  FlatList,
  ScrollView,
  Linking,
  StatusBar,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  OrderStatus,
  RestaurantReview,
  RestaurantReviewNull,
  storeorderid,
} from '../Actions/actions';
import ItemDetailsStatus from '../Shared/Components/ItemDetailsStatus';
import PlainHeader from '../Shared/Components/PlainHeader';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MYButton from '../Shared/Components/MYButton';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Bll from '../Shared/Components/Bll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
import ItemDetailsModel from '../Shared/Components/ItemDetailsModel';
import ItemsDetailsModel2 from '../Shared/Components/ItemsDetailsModel2';
import Toast from 'react-native-toast-notifications';
import MapViewDirections from 'react-native-maps-directions';

const OrderDetails = ({route, props, navigation, drawerAnimationStyle}) => {
  const {AuthToken, orderdetails, orderResult, ReviewStatus, orderstatus} =
    useSelector(state => state.userReducer);
  const [screenloader, setscreenloader] = useState(true);
  const [reviews, setReviews] = useState('');
  const [itemmodalVisible, setitemmodalVisible] = useState(false);
  const [itemmodaldata, setitemmodaldata] = useState([]);
  const [MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [DefaultRating, setDefaultRating] = useState(0);
  const [indexstate, setindexstate] = useState(0);
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const [loader, setLoader] = useState(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso';
  const refMap = useRef(null);
  const toast = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);
  var blueOceanStyles = [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#a7a7a7',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#737373',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#efefef',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#696969',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
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
          visibility: 'on',
        },
        {
          color: '#b3b3b3',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#d6d6d6',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          weight: 1.8,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#d7d7d7',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          color: '#808080',
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#d3d3d3',
        },
      ],
    },
  ];
  useEffect(() => {
    if (orderResult[0]?.RestaurantRatings[0]?.Rating > -1) {
      setDefaultRating(orderResult[0]?.RestaurantRatings[0]?.Rating);
    }
  }, [orderResult]);

  useEffect(() => {
    if (orderResult.length > 0) {
      console.log('hahah');
      // alert(screenloader);
      // console.log(screenloader);
      //setLoader(false);
      setscreenloader(false);
    }
  }, [orderResult]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('this is the placement order id ' + orderdetails);
      if (orderdetails != 0) dispatch(OrderStatus(AuthToken, orderdetails));
      // if (orderstatus == 'Success') {
      //   setscreenloader(false);
      // }
    });

    return unsubscribe;
  }, [navigation, orderdetails]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setscreenloader(true);
    });
    return unsubscribe;
  }, [navigation]);

  const Review = () => {
    Keyboard.dismiss();
    if (DefaultRating == 0) {
      toast.current.show('Rate The Restaurant', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (reviews == '') {
      toast.current.show('Enter Review', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      dispatch(
        RestaurantReview(
          AuthToken,
          orderResult[0]?.Id,
          DefaultRating,
          orderResult[0]?.RestaurantId,
          reviews,
        ),
      );
      setDefaultRating(0), setReviews(''), setLoader(true);
    }
  };

  useEffect(() => {
    console.log(ReviewStatus, 'AuthTokenAuthToken');
    if (ReviewStatus === 'Success') {
      toast.current.show('Review Submitted', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      dispatch(RestaurantReviewNull());
      setDefaultRating(0);
      setReviews('');
      setLoader(false);
      if (orderdetails != 0) dispatch(OrderStatus(AuthToken, orderdetails));
    } else if (ReviewStatus === 'Error') {
      toast.current.show('Something went wrong', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(RestaurantReviewNull());
      setLoader(false);
    } else if (ReviewStatus === 'Network request failed') {
      toast.current.show('Network request failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(RestaurantReviewNull());
      setLoader(false);
    }
  }, [ReviewStatus, AuthToken]);

  //console.log(route?.params.completedetails[0].OrderStatus,'Order Details')
  // const [menuitems, SetMenuItems] = useState([
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  // ]);
  // const [address, Setaddress] = useState([
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Enchiladas',
  //     price: '20',
  //   },
  //   {
  //     qty: '1',
  //     itemname: 'Burrito',
  //     price: '20',
  //   },
  // ]);
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <Modal
        transparent
        style={{
          width: '100%',
          height: '100%',
          // zIndex: 1,
          // elevation: 1,
          // position: 'absolute',
        }}
        statusBarTranslucent
        animationType="slide"
        visible={screenloader}
        onRequestClose={() => setscreenloader(false)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <ActivityIndicator size="small" color={'red'} />
        </View>
      </Modal>
      <View
        style={{
          //height: '100%',
          width: '100%',
          alignSelf: 'center',
          marginTop: getStatusBarHeight(),
          padding: scalableheight.one,
        }}>
        <PlainHeader title={orderResult[0]?.OrderNo} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: scalableheight.fifteen}}>
          <View
            style={{
              padding: scalableheight.one,
            }}>
            <View style={{...styles.shadow, ...styles.MainContainer}}>
              {orderResult != undefined && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    height: scalableheight.twenty,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginTop: scalableheight.five,
                        // backgroundColor:'yellow'
                      }}>
                      {orderResult[0]?.Status == 'Pending' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Pending.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Confirmed' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Confirmed.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Preparing' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/FoodPreperainggif.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'FoodReady' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/FoodReady.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'OnTheWay' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Ontheway.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Delivered' && (
                        <Image
                          style={{
                            height: scalableheight.fifteen,
                            width: scalableheight.fifteen,

                            alignSelf: 'center',
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Delivered.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Canceled' && (
                        <Image
                          style={{
                            height: scalableheight.twenty,
                            width: scalableheight.twenty,
                            marginTop: -scalableheight.three,
                          }}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Cancelled.gif')}
                        />
                      )}
                    </View>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#F55050',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.twelve,
                      }}>
                      Order Type
                    </Text>
                    <Text
                      style={{
                        color: '#29262A',
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.twelve,
                        paddingBottom: scalableheight.pointeightfive,
                      }}>
                      {orderResult[0]?.DeliveryType}
                    </Text>
                    <Text
                      style={{
                        color: '#F55050',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.twelve,
                      }}>
                      Status
                    </Text>
                    <Text
                      style={{
                        color: '#29262A',
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.twelve,
                        paddingBottom: scalableheight.pointeightfive,
                      }}>
                      {orderResult[0]?.Status == 'Confirmed'
                        ? 'Order Confirmed'
                        : orderResult[0]?.Status == 'Preparing'
                        ? 'Preparing..'
                        : orderResult[0]?.Status == 'FoodReady'
                        ? 'Your food is ready'
                        : orderResult[0]?.Status == 'OnTheWay'
                        ? 'Yummy! Food on the way'
                        : orderResult[0]?.Status == 'Delivered'
                        ? 'Food is delivered, Enjoy your meal!'
                        : orderResult[0]?.Status == 'Pending'
                        ? 'Pending'
                        : orderResult[0]?.Status == 'Canceled'
                        ? 'Order Canceled'
                        : ''}
                    </Text>
                    {/* <Text
                      style={{
                        color: '#F55050',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.twelve,
                      }}>
                      ETA
                    </Text>
                    <Text
                      style={{
                        color: '#29262A',
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.thirteen,
                      }}>
                      {orderResult[0]?.EstimatedDeliveryMinutes + ' Minutes'}
                    </Text> */}
                    {/* {orderResult[0]?.EstimatedDeliveryMinutes > 0 && (
                      <>
                        <Text
                          style={{
                            fontSize: fontSize.fourteen,
                            fontFamily: 'Inter-Bold',
                            color: '#29262A',
                          }}>
                          Estimated Delivery Time
                        </Text>

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Inter-SemiBold',
                              fontSize: fontSize.sixteen,
                              color: '#E14E4E',
                            }}>
                            {orderResult[0]?.Status + ' '}
                          </Text>

                          <Text
                            style={{
                              color: '#000',
                              fontSize: fontSize.twelve,
                              fontFamily: 'Inter-Bold',
                              textAlign: 'center',
                            }}>
                            {orderResult[0]?.EstimatedDeliveryMinutes} Min
                          </Text>
                        </View>
                      </>
                    )} */}
                    <Text
                      style={{
                        color: '#F55050',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.twelve,
                      }}>
                      ETA
                    </Text>
                    <Text
                      style={{
                        color: '#29262A',
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.twelve,
                      }}>
                      {orderResult[0]?.EstimatedDeliveryMinutes < 0
                        ? 0
                        : orderResult[0]?.EstimatedDeliveryMinutes}{' '}
                      Minutes
                    </Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  height: scalableheight.twentytwo,
                  borderRadius: fontSize.eight,

                  overflow: 'hidden',
                }}>
                <MapView
                  // provider={PROVIDER_GOOGLE}
                  customMapStyle={blueOceanStyles}
                  ref={refMap}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  // showsUserLocation
                  region={{
                    latitude:
                      orderResult[0]?.Latitude != undefined
                        ? orderResult[0]?.Latitude
                        : 0,
                    longitude:
                      orderResult[0]?.Longitude != undefined
                        ? orderResult[0]?.Longitude
                        : 0,
                    latitudeDelta: 0.19,
                    longitudeDelta: 0.19,
                  }}
                  initialRegion={{
                    latitude:
                      orderResult[0]?.Latitude != undefined
                        ? orderResult[0]?.Latitude
                        : 0,
                    longitude:
                      orderResult[0]?.Longitude != undefined
                        ? orderResult[0]?.Longitude
                        : 0,
                    latitudeDelta: 0.19,
                    longitudeDelta: 0.19,
                  }}>
                  <Marker
                    // position={center}
                    coordinate={{
                      latitude:
                        orderResult[0]?.Latitude != undefined
                          ? orderResult[0]?.Latitude
                          : 0,
                      longitude:
                        orderResult[0]?.Longitude != undefined
                          ? orderResult[0]?.Longitude
                          : 0,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: scalableheight.three,
                        height: scalableheight.three,
                      }}
                      source={require('../Resources/images/Userlocationicon.png')}
                    />
                  </Marker>
                  {orderResult[0]?.DeliveryType != 'TakeAway' ? (
                    <Marker
                      // position={center}
                      coordinate={{
                        latitude:
                          orderResult[0]?.RestaurantBranch?.Latitude !=
                          undefined
                            ? orderResult[0]?.RestaurantBranch?.Latitude
                            : 0,
                        longitude:
                          orderResult[0]?.RestaurantBranch?.Longitude !=
                          undefined
                            ? orderResult[0]?.RestaurantBranch?.Longitude
                            : 0,
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: scalableheight.three,
                          height: scalableheight.three,
                        }}
                        source={require('../Resources/images/RestaurantLocationicon.png')}
                      />
                    </Marker>
                  ) : null}

                  {orderResult[0]?.DeliveryType != 'TakeAway' ? (
                    <MapViewDirections
                      origin={{
                        latitude: orderResult[0]?.Latitude,
                        longitude: orderResult[0]?.Longitude,
                      }}
                      destination={{
                        latitude: orderResult[0]?.RestaurantBranch?.Latitude,
                        longitude: orderResult[0]?.RestaurantBranch?.Longitude,
                      }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      mode="DRIVING"
                      strokeWidth={3}
                      strokeColor="#000"
                    />
                  ) : null}

                  {/* <Polyline
                    coordinates={[
                      {
                        latitude: orderResult[0]?.Latitude,
                        longitude: orderResult[0]?.Longitude,
                      },
                      {
                        latitude: orderResult[0]?.RestaurantBranch?.Latitude,
                        longitude: orderResult[0]?.RestaurantBranch?.Longitude,
                      },
                    ]}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={3}
                  /> */}
                </MapView>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scalableheight.two,
              }}>
              <View style={{width: '15%'}}>
                <Text
                  style={{
                    color: 'rgba(73, 69, 75, 0.4)',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.fourteen,
                    // justifyContent: 'center',
                    //  textAlign: 'center',
                  }}>
                  QTY
                </Text>
              </View>
              <View style={{width: '65%'}}>
                <Text
                  style={{
                    color: 'rgba(73, 69, 75, 0.4)',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.fourteen,
                    //   textAlign: 'center',
                  }}>
                  ITEM
                </Text>
              </View>
              <View style={{width: '20%'}}>
                <Text
                  style={{
                    color: 'rgba(73, 69, 75, 0.4)',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.fourteen,
                    textAlign: 'right',
                    position: 'relative',
                    right: scalableheight.pointfive,
                  }}>
                  PRICE
                </Text>
              </View>
            </View> */}

            {/* <View>
              {menuitems?.map((item, index) => {
                return (
                  <View
                  key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                      height: scalableheight.four,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '15%'}}>
                      <Text
                        style={{
                          color: 'rgba(73, 69, 75, 0.4)',
                          fontFamily: 'Inter-SemiBold',
                          //  backgroundColor:'red',
                          fontSize: fontSize.fifteen,
                          width: '50%',
                          textAlign: 'center',
                        }}>
                        {item.qty}
                      </Text>
                    </View>
                    <View style={{width: '65%'}}>
                      <Text
                        style={{
                          color: 'rgba(73, 69, 75, 0.4)',
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.fifteen,
                        }}>
                        {item.itemname}
                      </Text>
                    </View>
                    <View style={{width: '20%'}}>
                      <Text
                        style={{
                          color: '#29262A',
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.fifteen,
                          textAlign: 'right',
                          //  marginLeft:fontSize.eight
                        }}>
                        {'AED ' + item.price}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View> */}
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                marginTop: scalableheight.one,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.sixteen,
                  color: '#29262A',
                }}>
                Items
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                style={
                  {
                    // width: '50%',
                    //paddingHorizontal: scalableheight.one,
                    // marginTop: scalableheight.two,
                  }
                }
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: scalableheight.one,
                }}
                data={orderResult[0]?.OrderDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data, index) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        marginVertical: scalableheight.pointfive,
                      }}>
                      <ItemDetailsStatus
                        qty={data.item.Quantity}
                        title={data.item.MenuItems.Name}
                        price={data.item.TotalPrice}
                        image={data.item.MenuItems.Image}
                        // discountPer={data.item.DiscountPercentage}
                        // discountAmount={data.item.DiscountAmount}
                        onPress={() => {
                          setitemmodaldata(data?.item);
                          setitemmodalVisible(true);
                          // console.log(data?.item);
                          // alert(data?.item.MenuItems.MenuItemOptions)
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={
                {
                  // marginTop: scalableheight.two,
                }
              }>
              <Text
                style={{
                  color: '#29262A',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                {orderResult[0]?.DeliveryType != 'TakeAway'
                  ? 'Delivery Info'
                  : 'PickUp Info'}
              </Text>
              <View style={{marginTop: scalableheight.one}}></View>
              <View style={{...styles.shadow, ...styles.MainContainer}}>
                <View
                  style={{
                    ...styles.topViewContainer,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: scalableheight.two,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        width: '10%',
                        alignSelf: 'flex-start',
                      }}>
                      <View>
                        <FontAwesome
                          style={{
                            alignSelf: 'center',
                          }}
                          name="user"
                          size={fontSize.twenty}
                          color="#F55050"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        paddingLeft: scalableheight.one,
                        width: '90%',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.thirteen,
                            color: '#29262A',
                          }}>
                          Name
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.CustomerName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: scalableheight.two,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        width: '10%',
                        alignSelf: 'flex-start',
                      }}>
                      <View>
                        <Entypo
                          style={{
                            alignSelf: 'center',
                          }}
                          name="phone"
                          size={fontSize.twenty}
                          color="#F55050"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        paddingLeft: scalableheight.one,
                        width: '90%',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.thirteen,
                            color: '#29262A',
                          }}>
                          Phone Number
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.CustomerContact}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: scalableheight.two,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        width: '10%',
                        alignSelf: 'flex-start',
                      }}>
                      <View>
                        <FontAwesome5
                          style={{
                            alignSelf: 'center',
                          }}
                          name="map-marker-alt"
                          size={fontSize.twenty}
                          color="#F55050"
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        orderResult[0]?.DeliveryType != 'TakeAway'
                          ? Linking.openURL(
                              `http://www.google.com/maps/place/${orderResult[0]?.Latitude},${orderResult[0]?.Longitude}`,
                            )
                          : Linking.openURL(
                              `http://www.google.com/maps/place/${orderResult[0]?.RestaurantBranch?.Latitude},${orderResult[0]?.RestaurantBranch?.Longitude}`,
                            );
                      }}
                      style={{
                        paddingLeft: scalableheight.one,
                        width: '90%',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.thirteen,
                            color: '#29262A',
                          }}>
                          {orderResult[0]?.DeliveryType != 'TakeAway'
                            ? 'Delivery Address'
                            : 'PickUp Address'}
                        </Text>
                      </View>
                      <Text
                        // numberOfLines={2}
                        // ellipsizeMode="tail"
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.DeliveryType != 'TakeAway'
                          ? orderResult[0]?.Address + ' '
                          : orderResult[0]?.RestaurantBranch?.Address + ' '}
                        <Text
                          style={{
                            color: '#F55050',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.nine,
                            justifyContent: 'flex-end',
                          }}>
                          - View Location
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {orderResult[0]?.DeliveryType != 'TakeAway' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: scalableheight.two,
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: '10%',
                          alignSelf: 'flex-start',
                        }}>
                        <View>
                          <FontAwesome5
                            style={{alignSelf: 'center'}}
                            name={'building'}
                            color={'#F55050'}
                            size={fontSize.twenty}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          paddingLeft: scalableheight.one,
                          width: '90%',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'Inter-SemiBold',
                              fontSize: fontSize.thirteen,
                              color: '#29262A',
                            }}>
                            Building And Street
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: 'Inter-Medium',
                            fontSize: fontSize.eleven,
                            color: '#636363',
                          }}>
                          {orderResult[0]?.Street != '' &&
                          orderResult[0]?.Street != null
                            ? orderResult[0]?.Street
                            : '-'}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {orderResult[0]?.DeliveryType != 'TakeAway' ? (
                    orderResult[0]?.Floor == null ? null : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginBottom: scalableheight.two,
                        }}>
                        <View
                          style={{
                            width: '10%',
                            alignSelf: 'flex-start',
                          }}>
                          <View>
                            <MaterialCommunityIcons
                              style={{alignSelf: 'center'}}
                              name={'office-building'}
                              color={'#F55050'}
                              size={fontSize.twenty}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            paddingLeft: scalableheight.one,
                            width: '90%',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'Inter-SemiBold',
                                fontSize: fontSize.thirteen,
                                color: '#29262A',
                              }}>
                              Flat No. & Floor
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'Inter-Medium',
                              fontSize: fontSize.eleven,
                              color: '#636363',
                            }}>
                            {orderResult[0]?.Floor != ''
                              ? orderResult[0]?.Floor
                              : 'No Details'}
                          </Text>
                        </View>
                      </View>
                    )
                  ) : null}

                  {orderResult[0]?.DeliveryType != 'TakeAway' ? (
                    orderResult[0]?.NoteToRider == null ? null : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: '10%',
                            alignSelf: 'flex-start',
                          }}>
                          <View>
                            <Icon
                              style={{alignSelf: 'center'}}
                              name={'chatbubble-sharp'}
                              color={'#F55050'}
                              size={fontSize.twenty}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            paddingLeft: scalableheight.one,
                            width: '90%',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'Inter-SemiBold',
                                fontSize: fontSize.thirteen,
                                color: '#29262A',
                              }}>
                              Note to rider
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'Inter-Medium',
                              fontSize: fontSize.eleven,
                              color: '#636363',
                            }}>
                            {orderResult[0]?.NoteToRider != ''
                              ? orderResult[0]?.NoteToRider
                              : 'No Note'}
                          </Text>
                        </View>
                      </View>
                    )
                  ) : null}
                </View>
              </View>
            </View>
            {orderResult[0]?.DeliveryType != 'TakeAway' ? (
              orderResult[0]?.Status != 'Canceled' ||
              (orderResult[0]?.DeliveryType != 'TakeAway' &&
                orderResult[0]?.Status == 'Delivered') ? (
                <View
                  style={{
                    marginTop: scalableheight.two,
                  }}>
                  <Text
                    style={{
                      color: '#29262A',
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.fifteen,
                    }}>
                    Rider Info
                  </Text>
                  <View style={{marginTop: scalableheight.one}}></View>
                  <View style={{...styles.shadow, ...styles.MainContainer}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                      }}>
                      <View style={{width: '78%'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: scalableheight.two,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              width: '10%',
                              alignSelf: 'flex-start',
                            }}>
                            <View>
                              <FontAwesome
                                style={{
                                  alignSelf: 'center',
                                }}
                                name="user"
                                size={fontSize.twenty}
                                color="#F55050"
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              paddingLeft: scalableheight.one,
                              width: '90%',
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Inter-SemiBold',
                                  fontSize: fontSize.thirteen,
                                  color: '#29262A',
                                }}>
                                Name
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontFamily: 'Inter-Medium',
                                fontSize: fontSize.eleven,
                                color: '#636363',
                              }}>
                              {orderResult[0]?.DeliveryStaff?.FirstName}{' '}
                              {orderResult[0]?.DeliveryStaff?.LastName}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: scalableheight.two,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              width: '10%',
                              alignSelf: 'flex-start',
                            }}>
                            <View>
                              <Entypo
                                style={{
                                  alignSelf: 'center',
                                }}
                                name="phone"
                                size={fontSize.twenty}
                                color="#F55050"
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              paddingLeft: scalableheight.one,
                              width: '90%',
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Inter-SemiBold',
                                  fontSize: fontSize.thirteen,
                                  color: '#29262A',
                                }}>
                                Phone Number
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontFamily: 'Inter-Medium',
                                fontSize: fontSize.eleven,
                                color: '#636363',
                              }}>
                              {orderResult[0]?.DeliveryStaff?.PhoneNumber}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            Linking.openURL(
                              `tel:${orderResult[0]?.DeliveryStaff?.PhoneNumber}`,
                            );
                            // navigation.navigate('ContactUs');
                          }}
                          style={{
                            backgroundColor: '#E14E4E',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: scalableheight.five,
                            width: scalableheight.ten,
                            borderRadius: fontSize.borderradiusmedium,
                            // paddingHorizontal: scalableheight.pointfive,
                            //  flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontSize: fontSize.twelve,
                              color: 'white',
                              fontFamily: 'Inter-SemiBold',
                              textAlign: 'center',
                            }}>
                            CALL
                          </Text>
                          {/* <Text style={{width: '25%'}}>
                          <Entypo
                            name="phone"
                            size={scalableheight.three}
                            color={'white'}
                          />
                        </Text> */}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            ) : null}

            <View
              style={{
                marginVertical: scalableheight.two,
              }}>
              <Text
                style={{
                  color: '#29262A',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Payment Details
              </Text>
              <View style={{marginTop: scalableheight.one}}></View>
              <View
                style={{
                  ...styles.shadow,
                  ...styles.MainContainer,
                  paddingVertical: scalableheight.two,
                }}>
                <View
                  style={{
                    ...styles.topViewContainer,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '10%', alignItems: 'center'}}>
                      {orderResult[0]?.PaymentMethod == 'Card' ? (
                        <FontAwesome5
                          name="credit-card"
                          color={'#F55050'}
                          size={fontSize.twentyfive}
                        />
                      ) : (
                        <Ionicons
                          name="wallet-sharp"
                          color={'#F55050'}
                          size={fontSize.twentyfive}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        paddingHorizontal: scalableheight.two,
                        justifyContent: 'flex-start',
                        width: '70%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.thirteen,
                          color: '#29262A',
                        }}>
                        {'Payment Method'}
                        {/* {'Credit/Debit Card'} */}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.PaymentMethod == 'Card'
                          ? 'Card'
                          : 'Cash'}
                      </Text>
                    </View>
                    <View
                      style={{
                        // paddingHorizontal: scalableheight.five,
                        justifyContent: 'flex-end',
                        width: '20%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Bold',
                          fontSize: fontSize.thirteen,
                          color: '#E14E4E',
                          textAlign: 'right',
                        }}>
                        {orderResult[0]?.Status == 'Canceled'
                          ? 'Un Paid'
                          : orderResult[0]?.PaymentMethod == 'Card'
                          ? 'Paid'
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {orderResult[0]?.Status != 'Canceled' ? (
              orderResult[0]?.DeliveryType != 'TakeAway' &&
              orderResult[0]?.RestaurantRatings.length > 0 ? (
                <View>
                  <Text
                    style={{
                      color: '#29262A',
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.fifteen,
                      marginBottom: scalableheight.onepointfive,
                    }}>
                    My Review
                  </Text>
                  {/* <View style={{marginTop: scalableheight.one}}></View> */}
                  <View
                    style={{
                      ...styles.MainContainer,
                      // paddingVertical: scalableheight.two,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        //  height: scalableheight.ten,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      {MaxRating.map((item, key) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            {/* <Image
                resizeMode={'contain'}
                  style={{height: 35, width: 35}}
                  source={
                    item <= DefaultRating
                      ? starimagefilled
                      : starimageempty
                  }
                /> */}
                            <FontAwesome
                              style={{marginRight: scalableheight.pointeight}}
                              name="star"
                              size={fontSize.twenty}
                              color={
                                item <= DefaultRating ? '#E6C24D' : '#F5F5F5'
                              }
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.thirteen,
                        color: '#29262A',
                        marginTop: scalableheight.one,
                      }}>
                      {'Review'}
                    </Text>
                    {
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                          textAlign: 'justify',
                        }}>
                        {orderResult[0]?.RestaurantRatings[0]?.Review}
                      </Text>
                    }
                  </View>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      color: '#29262A',
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.fifteen,
                      marginBottom: scalableheight.onepointfive,
                    }}>
                    My Review
                  </Text>
                  {/* <View style={{marginTop: scalableheight.one}}></View> */}
                  <View
                    style={{
                      ...styles.MainContainer,
                      // paddingVertical: scalableheight.two,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        //  height: scalableheight.ten,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      {MaxRating.map((item, key) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            {/* <Image
              resizeMode={'contain'}
                style={{height: 35, width: 35}}
                source={
                  item <= DefaultRating
                    ? starimagefilled
                    : starimageempty
                }
              /> */}
                            <FontAwesome
                              style={{marginRight: scalableheight.pointeight}}
                              name="star"
                              size={fontSize.twenty}
                              color={
                                item <= DefaultRating ? '#E6C24D' : '#F5F5F5'
                              }
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {/* <Text
                      style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.thirteen,
                        color: '#29262A',
                        marginTop: scalableheight.one,
                      }}>
                      {'Review'}
                    </Text> */}
                    <View
                      style={{
                        marginVertical: scalableheight.one,
                        backgroundColor: '#F9F9F9',
                        height: scalableheight.ten,
                        borderRadius: scalableheight.one,
                        paddingHorizontal: scalableheight.one,
                        width: '100%',

                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 1,
                        // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
                      }}>
                      <TextInput
                        multiline
                        value={reviews}
                        placeholderStyle={{
                          fontSize: fontSize.twenty,
                        }}
                        placeholderTextColor="lightgray"
                        placeholder="Type here"
                        onChangeText={text => {
                          setReviews(text);
                        }}
                      />
                    </View>
                    {loader == true ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <ActivityIndicator size={'large'} color="#E14E4E" />
                      </View>
                    ) : (
                      <MYButton
                        title={'SUBMIT'}
                        onPress={() => {
                          Review();
                        }}
                        color="#E14E4E"
                        textcolor="white"
                      />
                    )}
                  </View>
                </View>
              )
            ) : null}
            <View>
              <View style={{height: scalableheight.three}} />
              <Bll
                label={'Sub Total'}
                price={orderResult[0]?.Amount.toFixed(2)}
              />
              <Bll
                label={'Delivery Charges'}
                price={orderResult[0]?.DeliveryCharges.toFixed(2)}
              />

              <View style={{height: scalableheight.one}} />
              {/* <Text style={{...styles.Text4, textAlign: 'right'}}>
                I HAVE A COUPON
              </Text> */}
              <View
                style={{
                  borderTopColor: 'rgba(211,211,211, 0.5)',
                  borderTopWidth: scalableheight.borderTopWidth,
                  marginVertical: scalableheight.one,
                }}></View>
              <Bll
                label={'Total Amount'}
                price={orderResult[0]?.TotalAmount.toFixed(2)}
              />
              <View style={{height: scalableheight.two}} />
              {orderResult[0]?.Status == 'Pending' ? (
                <MYButton title={'Cancel'} color="black" textcolor="white" />
              ) : null}
              <View style={{height: scalableheight.ten}} />
            </View>
          </View>
        </ScrollView>
      </View>
      <ItemsDetailsModel2
        state={itemmodalVisible}
        data={itemmodaldata}
        togglemodel={() => {
          setitemmodalVisible(false);
        }}
      />
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: fontSize.eight,
    padding: scalableheight.two,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    borderWidth: scalableheight.borderTopWidth,
    borderColor: 'rgba(211,211,211, 0.6)',
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
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default OrderDetails;
