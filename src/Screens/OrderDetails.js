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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {OrderStatus} from '../Actions/actions';
import ItemDetailsStatus from '../Shared/Components/ItemDetailsStatus';
import PlainHeader from '../Shared/Components/PlainHeader';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MYButton from '../Shared/Components/MYButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Bll from '../Shared/Components/Bll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
import ItemDetailsModel from '../Shared/Components/ItemDetailsModel';
import ItemsDetailsModel2 from '../Shared/Components/ItemsDetailsModel2';

import Ratingbar from '../Shared/Components/Ratingbar';

const OrderDetails = ({route, props, navigation, drawerAnimationStyle}) => {
  const {AuthToken, orderdetails, orderResult} = useSelector(
    state => state.userReducer,
  );
  const [itemmodalVisible, setitemmodalVisible] = useState(false);
  const [itemmodaldata, setitemmodaldata] = useState([]);
  const [MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [DefaultRating, setDefaultRating] = useState(0);
  const [indexstate, setindexstate] = useState(0);
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const [togglelist, settogglelist] = useState(true);
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
  const refMap = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  useEffect(() => {
    if( orderResult[0]?.RestaurantRatings[0]?.Rating > -1){
      setDefaultRating(orderResult[0]?.RestaurantRatings[0]?.Rating)
    }
 
  }, [orderResult]);
 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('this is the placement order id ' + orderdetails);
      if (orderdetails != 0) dispatch(OrderStatus(AuthToken, orderdetails));
    });
    return unsubscribe;
  }, [navigation, orderdetails]);
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
      <View
        style={{
          //height: '100%',
          width: '100%',
          alignSelf: 'center',
          marginTop: getStatusBarHeight(),
           padding:scalableheight.one
        }}>
        <PlainHeader title={'Order Details'} />
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
                        marginTop: scalableheight.five,
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
                            marginTop: -scalableheight.three,
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
                      Order No.
                    </Text>
                    <Text
                      style={{
                        color: '#29262A',
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.thirteen,
                        paddingBottom:scalableheight.pointeightfive
                      }}>
                      {orderResult[0]?.OrderNo}
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
                        fontSize: fontSize.thirteen,
                        paddingBottom:scalableheight.pointeightfive
                      }}>
                      {orderResult[0]?.Status}
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
                        fontSize: fontSize.thirteen,
                      }}>
                    {orderResult[0]?.EstimatedDeliveryMinutes < 0 ? 0 : orderResult[0]?.EstimatedDeliveryMinutes} Minutes
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
                  // customMapStyle={customStyle}
                  ref={refMap}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  // showsUserLocation
                  region={{
                    latitude: orderResult[0]?.Latitude != undefined ? orderResult[0]?.Latitude : 0,
                    longitude: orderResult[0]?.Longitude != undefined ? orderResult[0]?.Longitude : 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  initialRegion={{
                    latitude: orderResult[0]?.Latitude != undefined ? orderResult[0]?.Latitude : 0,
                    longitude: orderResult[0]?.Longitude != undefined ? orderResult[0]?.Longitude : 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <Marker
                    // position={center}
                    coordinate={{
                      latitude: orderResult[0]?.Latitude != undefined ? orderResult[0]?.Latitude : 0,
                      longitude: orderResult[0]?.Longitude != undefined ? orderResult[0]?.Longitude : 0,
                  
                  
                    }}
                    // draggable
                    // onDragEnd={e => {
                    //   console.log(
                    //     'longitude',
                    //     e?.nativeEvent?.coordinate?.longitude,
                    //   );
                    //   console.log(
                    //     'latitude',
                    //     e?.nativeEvent?.coordinate?.latitude,
                    //   );
                    //   setlat(e?.nativeEvent?.coordinate?.latitude);
                    //   setlong(e?.nativeEvent?.coordinate?.longitude);
                    // }}
                    pinColor={'red'} // any color
                    title={'Location'}
                    // description={pinlocation}
                  />
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
                  paddingBottom: scalableheight.three,
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
              style={{
                marginTop: scalableheight.two,
              }}>
              <Text
                style={{
                  color: '#29262A',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Delivery Info
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
                          Delivery Address
                        </Text>
                      </View>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.Address}
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
                        {orderResult[0]?.Street != ''
                          ? orderResult[0]?.Street
                          : 'No Details'}
                      </Text>
                    </View>
                  </View>
                  {orderResult[0]?.Floor == null ? null : (
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
                  )}
                  {orderResult[0]?.NoteToRider == null ? null : (
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
                  )}
                </View>
              </View>
            </View>

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
                        {orderResult[0]?.DeliveryStaff?.FirstName}{" "}{orderResult[0]?.DeliveryStaff?.LastName}
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
                        Linking.openURL(`tel:${orderResult[0]?.DeliveryStaff?.PhoneNumber}`);
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
                Payment Method
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
                    <View style={{width: '10%',  alignItems:"center"}}>
                    {orderResult[0]?.PaymentMethod == 'Card' ?
                    <FontAwesome5 
                    name="credit-card"
                    color={"#F55050"}
                    size={fontSize.twentyfive}
                  />:
                  <Ionicons 
                  name="wallet-sharp"
                  color={"#F55050"}
                  size={fontSize.twentyfive}
                />
                   
          }
                    </View>
                    <View
                      style={{
                        paddingHorizontal: scalableheight.two,
                        justifyContent: 'flex-start',
                        width: '75%',
                     
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.thirteen,
                          color: '#29262A',
                        }}>
                        {orderResult[0]?.PaymentMethod}
                        {/* {'Credit/Debit Card'} */}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {orderResult[0]?.PaymentMethod == 'Card'
                          ? 'Pay Online'
                          : 'Cash On Delivery'}
                      </Text>
                    </View>
                    <View
                      style={{
                        // paddingHorizontal: scalableheight.five,
                        justifyContent: 'flex-end',
                        width: '15%',
                    
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Bold',
                          fontSize: fontSize.thirteen,
                          color: '#E14E4E',
                          textAlign: 'right',
                        }}>
                        {orderResult[0]?.PaymentMethod == 'Card'
                          ? 'Paid'
                          : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
{orderResult[0]?.Status == 'Delivered' &&
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
              color={item <= DefaultRating ? '#E6C24D' : '#F5F5F5'}
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
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: fontSize.eleven,
                    color: '#636363',
                    textAlign: 'justify',
                  }}>
                 {orderResult[0]?.RestaurantRatings[0]?.Review}
                </Text>
              </View>
            </View>
}
            <View>
              <View style={{height: scalableheight.three}} />
              <Bll label={'Sub Total'} price={'209.00 No binding'} />
              <Bll
                label={'Delivery Charges'}
                price={orderResult[0]?.DeliveryCharges}
              />

              <View style={styles.Container}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.Text3}>Vat Amount </Text>
                  <Text style={styles.Text4}>{'(4%)'}</Text>
                </View>
                <Text style={styles.Text3}>AED 209.00 no binding</Text>
              </View>
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
              <Bll label={'Total'} price={orderResult[0]?.TotalAmount} />
              <View style={{height: scalableheight.two}} />
              <MYButton title={'Cancel'} color="black" textcolor="white" />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: fontSize.eleven,
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
