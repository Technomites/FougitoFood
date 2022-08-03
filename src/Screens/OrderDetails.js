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
} from 'react-native';

import PlainHeader from '../Shared/Components/PlainHeader';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MYButton from '../Shared/Components/MYButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Addresstile from '../Shared/Components/Addresstile';

const OrderDetails = ({route, props, navigation, drawerAnimationStyle}) => {
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);

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
  //console.log(route?.params.completedetails[0].OrderStatus,'Order Details')
  const [menuitems, SetMenuItems] = useState([
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
  ]);
  const [address, Setaddress] = useState([
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Enchiladas',
      price: '20',
    },
    {
      qty: '1',
      itemname: 'Burrito',
      price: '20',
    },
  ]);
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          //height: '100%',
          width: '100%',
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          // padding:scalableheight.one
        }}>
        <PlainHeader title={'My Orders'} />
        <ScrollView>
          <View
            style={{
              padding: scalableheight.two,
            }}>
            <View style={{...styles.shadow, ...styles.MainContainer}}>
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
                  <Image
                    style={{
                      height: scalableheight.twentysix,
                      width: scalableheight.twentysix,
                      textAlign: 'center',
                    }}
                    resizeMode={'contain'}
                    source={require('../Resources/images/FoodPreperainggif.gif')}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      color: '#F55050',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                    }}>
                    Status
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(73, 69, 75, 0.4)',
                      fontFamily: 'Inter-Medium',
                      fontSize: fontSize.thirteen,
                    }}>
                    {'Order Confirmed'}
                  </Text>
                  <Text
                    style={{
                      color: '#F55050',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                    }}>
                    ETA
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(73, 69, 75, 0.4)',
                      fontFamily: 'Inter-Medium',
                      fontSize: fontSize.thirteen,
                    }}>
                    {'25 Minutes'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: scalableheight.twentytwo,
                  borderRadius: fontSize.eight,
                  marginHorizontal: scalableheight.two,
                  overflow: 'hidden',
                }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={customStyle}
                  ref={refMap}
                  style={{
                    width: '100%',
                    height: '100%',
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
            </View>
            <View
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
            </View>

            <View>
              {menuitems?.map((item, index) => {
                return (
                  <View
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
                Delivery Address
              </Text>
              <Addresstile
                style={{height: scalableheight.one}}
                address={'7399 Stefan Trace Joanne Ligh Street No.85'}
                note={'4th floor, Take a left, 2nd brown Door on your right'}
              />
              {/* <View style={styles.MainConatiner}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View style={{width: '5%'}}>
                    <Image
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        height: scalableheight.five,
                        width: scalableheight.five,
                      }}
                      resizeMode={'contain'}
                      source={require('../Resources/images/Homeicon.png')}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: scalableheight.five,
                      justifyContent: 'flex-start',
                      width: '95%',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.twelve,
                        color: '#29262A',
                      }}>
                      {'Home'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.thirteen,
                        color: '#636363',
                      }}>
                      {'7399 Stefan Trace Joanne Ligh Street No.85'}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Rubik-MediumItalic',
                          fontSize: fontSize.twelve,
                          color: '#636363',
                          textAlign: 'right',
                        }}>
                        {'Note to rider'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Rubik-Italic',
                          fontSize: fontSize.eleven,
                          color: '#636363',
                        }}>
                        {
                          '4th floor, Take a left, 2nd brown Door on your right.'
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </View> */}
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
                    }}>
                    <View style={{width: '5%'}}>
                      <Image
                        style={{
                          height: scalableheight.five,
                          width: scalableheight.five,
                        }}
                        resizeMode={'contain'}
                        source={require('../Resources/images/Paymenticon.png')}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: scalableheight.five,
                        justifyContent: 'flex-start',
                        width: '80%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.twelve,
                          color: '#29262A',
                        }}>
                        {'Credit/Debit Card'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: fontSize.thirteen,
                          color: '#636363',
                        }}>
                        {'Pay Online'}
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
                        {'Paid'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row', marginBottom: 8}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'Sub Total'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'AED ' + '209.00'}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 8}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'Delivery Charges'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'AED ' + '10.00'}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 8}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'VAT Amount'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'AED ' + '13.00'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#707070',
                  borderBottomWidth: 1,
                  marginVertical: 2,
                  opacity: 0.4,
                }}></View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'Total'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: fontSize.fifteen,
                      color: '#29262A',
                    }}>
                    {'AED ' + '222.00'}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginBottom: scalableheight.tweleve,
                marginTop: scalableheight.two,
              }}>
              <MYButton
                onPress={() => {
                  // navigation.navigate("Home")
                  navigation.goBack();
                }}
                color={'#111111'}
                title={'CANCEL'}
                textcolor={'white'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: 'white',
  },
  topViewContainer: {
    paddingHorizontal: fontSize.eight,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
});
export default OrderDetails;
