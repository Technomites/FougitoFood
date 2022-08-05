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
import Bll from '../Shared/Components/Bll';
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
          marginTop: getStatusBarHeight(),
          // padding:scalableheight.one
        }}>
        <PlainHeader title={'My Orders'} />
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: scalableheight.fifteen}}>
          <View
            style={{
              padding: scalableheight.one,
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
                marginTop: scalableheight.two,
              }}>
              <Text
                style={{
                  color: '#29262A',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Delivery Address
              </Text>
              <View style={{marginTop: scalableheight.one}}></View>
              <Addresstile
                style={{}}
                icon={require('../Resources/images/Homeicon.png')}
                place={'Home'}
                address={'7399 Stefan Trace Joanne Ligh Street No.85'}
                note={'4th floor, Take a left, 2nd brown Door on your right'}
              />
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
              <View style={{...styles.shadow, ...styles.MainContainer,  paddingVertical: scalableheight.two}}>
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
              <View style={{height: scalableheight.three}} />
              <Bll label={'Sub Total'} price={'AED 209.00'} />
              <Bll label={'Delivery Charges'} price={'AED 209.00'} />

              <View style={styles.Container}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.Text3}>Vat Amount </Text>
                  <Text style={styles.Text4}>{'(4%)'}</Text>
                </View>
                <Text style={styles.Text3}>AED 209.00</Text>
              </View>
              <View style={{height: scalableheight.one}} />
              <Text style={{...styles.Text4, textAlign: 'right'}}>
                I HAVE A COUPON
              </Text>
              <View
                style={{
                  borderTopColor: 'rgba(211,211,211, 0.5)',
                  borderTopWidth: scalableheight.borderTopWidth,
                  marginVertical: scalableheight.one,
                }}></View>
              <Bll label={'Total'} price={'AED 222.00'} />
              <View style={{height: scalableheight.two}} />
              <MYButton title={'Cancel'} color="black" textcolor="white" />
              <View style={{height: scalableheight.ten}} />
            </View>
          </View>
        </ScrollView>
      </View>
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
    borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
   
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
