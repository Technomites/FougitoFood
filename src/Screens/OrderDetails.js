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
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import {
  OrderStatus,
  RestaurantReview,
  RestaurantReviewNull,
  storeorderid,
  OrderCancel,
  OrderCancelnullstate,
  Myorders,
  getrepay,
  clearlink,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
import ItemDetailsModel from '../Shared/Components/ItemDetailsModel';
import ItemsDetailsModel2 from '../Shared/Components/ItemsDetailsModel2';
import Toast from 'react-native-toast-notifications';
import MapViewDirections from 'react-native-maps-directions';

const OrderDetails = ({route, props, navigation, drawerAnimationStyle}) => {
  const {
    AuthToken,
    orderdetails,
    orderResult,
    ReviewStatus,
    CancelationStatus,
    CancelationMessage,
    repayorderdetailslink,
  } = useSelector(state => state.userReducer);
  const [screenloader, setscreenloader] = useState(true);
  const [repayloader, setrepayloader] = useState(false);
  const [reviews, setReviews] = useState('');
  const [itemmodalVisible, setitemmodalVisible] = useState(false);
  const [itemmodaldata, setitemmodaldata] = useState([]);
  const [previousscreen, setpreviousscreen] = useState('');
  const [MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [DefaultRating, setDefaultRating] = useState(0);
  const [indexstate, setindexstate] = useState(0);
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const [loader, setLoader] = useState(false);
  const [modalVisiblepayment, setmodalVisiblepayment] = useState(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso';
  const refMap = useRef(null);
  const toast = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  useEffect(() => {
    if (repayorderdetailslink != '') {
      setrepayloader(false);
      setmodalVisiblepayment(true);
    }
  }, [repayorderdetailslink]);

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
      setDefaultRating(0);
      setscreenloader(true);
      if (route?.params?.screenname != undefined) {
        setpreviousscreen(route?.params?.screenname);
      } else {
        setpreviousscreen('');
      }
    });
    return unsubscribe;
  }, [navigation, route]);

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

  const cancelorder = () => {
    dispatch(OrderCancel(AuthToken, orderResult[0]?.Id));
    setLoader(true);
  };

  useEffect(() => {
    console.log(CancelationStatus, 'AuthTokenAuthToken');
    if (CancelationStatus === 'Success') {
      toast.current.show(CancelationMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      dispatch(OrderCancelnullstate());
      setLoader(false);

      dispatch(Myorders(AuthToken));
      navigation.navigate('Drawernavigator');
      console.log('navifating to home');
    } else if (CancelationStatus === 'Error') {
      toast.current.show(CancelationMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(OrderCancelnullstate());
      setLoader(false);
    } else if (CancelationStatus === 'Network request failed') {
      toast.current.show('Network request failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(OrderCancelnullstate());
      setLoader(false);
    }
  }, [CancelationStatus]);

  function repay() {
    setrepayloader(true);
    dispatch(getrepay(orderResult[0]?.Id));
  }

  function closemodal() {
    setmodalVisiblepayment(false);
  }

  function closeloader() {
    setscreenloader(false);
  }

  function closeitemdetailsmodal() {
    setitemmodalVisible(false);
  }

  function changeration(item) {
    setDefaultRating(item);
  }
  return (
    <Animated.View
      style={{...drawerAnimationStyle, ...styles.animatedviewstyle}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <Modal
        transparent
        style={styles.modalview1}
        statusBarTranslucent
        visible={modalVisiblepayment}
        onRequestClose={() => setmodalVisiblepayment(false)}>
        <View
          style={{
            ...styles.paddingtopbarheight,
            ...styles.modalview1,
          }}>
          {repayorderdetailslink != '' && (
            <>
              <TouchableOpacity
                onPress={closemodal}
                style={styles.touchableview}>
                {/* <View style={styleSheet.backButtonMain}> */}
                <AntDesign
                  style={{alignSelf: 'center'}}
                  name="arrowleft"
                  color={'black'}
                  size={fontSize.twentyfour}
                />
                {/* </View> */}
              </TouchableOpacity>
              <WebView
                style={styles.modalview1}
                source={{uri: repayorderdetailslink}}
                onMessage={event => {
                  let newdata = JSON.parse(event.nativeEvent.data);
                  console.log(newdata.data);
                  if (event.nativeEvent.data == 'Exit') {
                    setmodalVisiblepayment(false);
                    toast.current.show(
                      'There was an network failure while processing your payment. Please tru again later',
                      {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 10,
                        animationType: 'slide-in',
                        zIndex: 2,
                      },
                    );
                  } else if (newdata.data.Result.paymentStatus == 'Failed') {
                    setmodalVisiblepayment(false);
                    toast.current.show(
                      'There was an network failure while processing your payment. Please tru again later',
                      {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 10,
                        animationType: 'slide-in',
                        zIndex: 2,
                      },
                    );
                  } else if (newdata.data.Result.paymentStatus == 'Paid') {
                    setmodalVisiblepayment(false);
                    toast.current.show('Payment Successful', {
                      type: 'normal',
                      placement: 'bottom',
                      duration: 4000,
                      offset: 10,
                      animationType: 'slide-in',
                      zIndex: 2,
                    });
                    dispatch(OrderStatus(AuthToken, orderdetails));
                    dispatch(clearlink());
                  }
                }}
              />
            </>
          )}
        </View>
      </Modal>
      <Modal
        transparent
        style={styles.modalview1}
        statusBarTranslucent
        animationType="none"
        visible={screenloader}
        onRequestClose={closeloader}>
        <ImageBackground
          resizeMode="cover"
          style={[styles.alignandjustifycenter, styles.modalview1]}
          source={require('../Resources/images/orderdetailsloader.gif')}></ImageBackground>
      </Modal>
      <View style={styles.containerview}>
        <PlainHeader
          title={orderResult[0]?.OrderNo}
          previousscreen={previousscreen}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.paddingBottomfifteen}>
          <View style={styles.paddingone}>
            <View
              style={[
                // ...styles.shadow,
                styles.borderwwidthandcolor,

                styles.MainContainer,
              ]}>
              {orderResult != undefined && (
                <View style={styles.view2}>
                  <View style={styles.view3}>
                    <View style={styles.alignandjustifycenter}>
                      {orderResult[0]?.Status == 'Pending' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Pending.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Confirmed' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Confirmed.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Preparing' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/FoodPreperainggif.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'FoodReady' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/FoodReady.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'OnTheWay' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Ontheway.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Delivered' && (
                        <Image
                          style={styles.imageview2}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Delivered.gif')}
                        />
                      )}

                      {orderResult[0]?.Status == 'Canceled' && (
                        <Image
                          style={styles.imageview}
                          resizeMode={'contain'}
                          source={require('../Resources/images/Cancelled.gif')}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.width50}>
                    <Text style={styles.text7}>Order Type</Text>
                    <Text style={styles.text8}>
                      {orderResult[0]?.DeliveryType}
                    </Text>
                    <Text style={styles.text7}>Status</Text>
                    <Text style={styles.text8}>
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
                    <Text style={styles.text7}>ETA</Text>
                    <Text style={styles.text9}>
                      {orderResult[0]?.EstimatedDeliveryMinutes < 0
                        ? 0
                        : orderResult[0]?.EstimatedDeliveryMinutes}{' '}
                      Minutes
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.mapview}>
                <MapView
                  showsMyLocationButton={false}
                  // provider={PROVIDER_GOOGLE}
                  customMapStyle={blueOceanStyles}
                  ref={refMap}
                  style={styles.modalview1}
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
                      style={styles.imageview3}
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
                        style={styles.imageview3}
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
            <View style={styles.margintopone}>
              <Text style={styles.text10}>Items</Text>
            </View>
            <View style={styles.widthfull}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: scalableheight.one,
                }}
                data={orderResult[0]?.OrderDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data, index) => {
                  return (
                    <View style={styles.itemdetailsstatusview}>
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
              <View
                style={{
                  // ...styles.shadow,
                  borderWidth: 1,
                  borderColor: 'rgba(128, 128,128, 0.6)',
                  ...styles.MainContainer,
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
            {orderResult[0]?.Status != 'Pending' && (
              <>
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
                      <View
                        style={{
                          // ...styles.shadow,
                          borderWidth: 1,
                          borderColor: 'rgba(128, 128,128, 0.6)',
                          ...styles.MainContainer,
                        }}>
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
                      // ...styles.shadow,
                      borderWidth: 1,
                      borderColor: 'rgba(128, 128,128, 0.6)',
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
                                disabled={
                                  orderResult[0]?.RestaurantRatings.length > 0
                                    ? true
                                    : false
                                }
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
                                  style={{
                                    marginRight: scalableheight.pointeight,
                                  }}
                                  name="star"
                                  size={fontSize.twenty}
                                  color={
                                    item <= DefaultRating
                                      ? '#E6C24D'
                                      : '#F5F5F5'
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
                                onPress={() => changeration(item)}>
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
                                  style={styles.marginRightpoint8}
                                  name="star"
                                  size={fontSize.twenty}
                                  color={
                                    item <= DefaultRating
                                      ? '#E6C24D'
                                      : '#F5F5F5'
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
                        <View style={styles.textinputview}>
                          <TextInput
                            multiline
                            value={reviews}
                            placeholderStyle={{
                              fontSize: fontSize.twenty,
                            }}
                            placeholderTextColor="lightgray"
                            placeholder="Type here"
                            onChangeText={text => setReviews(text)}
                          />
                        </View>
                        {loader == true ? (
                          <View style={styles.alignandjustifycenter}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'SUBMIT'}
                            onPress={() => Review()}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}
                      </View>
                    </View>
                  )
                ) : null}
              </>
            )}
            <View>
              <View style={styles.height3} />
              <Bll label={'Sub Total'} price={orderResult[0]?.Amount} />
              <Bll
                label={'Delivery Charges'}
                price={orderResult[0]?.DeliveryCharges}
              />

              <View style={styles.height1} />
              {/* <Text style={{...styles.Text4, textAlign: 'right'}}>
                I HAVE A COUPON
              </Text> */}
              <View style={styles.containerview3}></View>
              <Bll label={'Total Amount'} price={orderResult[0]?.TotalAmount} />
              <View style={styles.height2} />
              {orderResult[0]?.Status == 'Pending' &&
              orderResult[0]?.IsPaid == false ? (
                repayloader == true ? (
                  <View style={styles.alignandjustifycenter}>
                    <ActivityIndicator size={'large'} color="#E14E4E" />
                  </View>
                ) : (
                  <MYButton
                    title={'Pay Now'}
                    color="#E14E4E"
                    textcolor="white"
                    onPress={repay}
                  />
                )
              ) : null}
              {orderResult[0]?.Status == 'Pending' &&
              orderResult[0]?.IsPaid == false ? (
                loader == true ? (
                  <View style={styles.alignandjustifycenter}>
                    <ActivityIndicator size={'large'} color="#E14E4E" />
                  </View>
                ) : (
                  <MYButton
                    title={'Cancel'}
                    color="black"
                    textcolor="white"
                    onPress={cancelorder()}
                  />
                )
              ) : null}

              <View style={styles.height10} />
            </View>
          </View>
        </ScrollView>
      </View>
      <ItemsDetailsModel2
        state={itemmodalVisible}
        data={itemmodaldata}
        togglemodel={closeitemdetailsmodal}
      />
      <Toast ref={toast} style={styles.toast} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  marginRightpoint8: {
    marginRight: scalableheight.pointeight,
  },
  textinputview: {
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
  },
  height3: {height: scalableheight.three},
  height1: {
    height: scalableheight.one,
  },
  containerview3: {
    borderTopColor: 'rgba(211,211,211, 0.5)',
    borderTopWidth: scalableheight.borderTopWidth,
    marginVertical: scalableheight.one,
  },
  height2: {height: scalableheight.two},
  height10: {height: scalableheight.ten},
  toast: {marginBottom: scalableheight.ten, justifyContent: 'center'},
  itemdetailsstatusview: {
    alignItems: 'center',
    marginVertical: scalableheight.pointfive,
  },
  imageview3: {
    width: scalableheight.three,
    height: scalableheight.three,
  },
  MainContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: fontSize.eight,
    padding: scalableheight.two,
    // shadowColor: '#470000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.2,
    // elevation: 2,

    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
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
  animatedviewstyle: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  modalview1: {
    width: '100%',
    height: '100%',
  },
  paddingtopbarheight: {
    paddingTop: getStatusBarHeight(),
  },
  touchableview: {
    height: scalableheight.seven,
    width: scalableheight.five,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scalableheight.six,
    left: scalableheight.one,
    zIndex: 10,
  },
  alignandjustifycenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerview: {
    //height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginTop: getStatusBarHeight(),
    padding: scalableheight.one,
  },
  paddingBottomfifteen: {paddingBottom: scalableheight.fifteen},
  paddingone: {
    padding: scalableheight.one,
  },
  borderwwidthandcolor: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: scalableheight.twenty,
  },
  view3: {
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  imageview: {
    height: scalableheight.twenty,
    width: scalableheight.twenty,
    marginTop: -scalableheight.three,
  },
  imageview2: {
    height: scalableheight.fifteen,
    width: scalableheight.fifteen,

    alignSelf: 'center',
  },
  width50: {width: '50%'},
  text7: {
    color: '#F55050',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.twelve,
  },
  text8: {
    color: '#29262A',
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    paddingBottom: scalableheight.pointeightfive,
  },
  text9: {
    color: '#29262A',
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
  },
  mapview: {
    height: scalableheight.twentytwo,
    borderRadius: fontSize.eight,

    overflow: 'hidden',
  },
  margintopone: {
    marginTop: scalableheight.one,
  },
  text10: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: '#29262A',
  },
  widthfull: {
    width: '100%',
  },
});
export default OrderDetails;
