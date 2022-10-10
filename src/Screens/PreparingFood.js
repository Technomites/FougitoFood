import React, {useState, useEffect} from 'react';
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
  Dimensions,
  TextInput,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {OrderStatus} from '../Actions/actions';
import * as Animatable from 'react-native-animatable';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ItemDetailsStatus from '../Shared/Components/ItemDetailsStatus';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';
import BottomTab from '../Shared/Components/BottomTab';
import Infobar from '../Shared/Components/Infobar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {totalSize, height} from 'react-native-dimension';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import Navigation from '../Shared/Components/Navigation';

const PreparingFood = ({navigation, route}, props) => {
  const [togglelist, settogglelist] = useState(true);

  const [indexstate, setindexstate] = useState(0);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [ridercontact, setriderContact] = useState('03342044037');
  const {AuthToken, orderdetails, orderResult} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('this is the placement order id ' + orderdetails);
      if (orderdetails != 0) dispatch(OrderStatus(AuthToken, orderdetails));
    });
    return unsubscribe;
  }, [navigation, orderdetails]);

  useEffect(() => {
    if (orderResult.length > 0) {
      if (
        orderResult[0]?.Status == 'Pending' ||
        orderResult[0]?.Status == 'Confirmed'
      ) {
        setindexstate(1);
      } else if (orderResult[0]?.Status == 'Preparing') {
        setindexstate(2);
      } else if (orderResult[0]?.Status == 'FoodReady') {
        setindexstate(3);
      } else if (orderResult[0]?.Status == 'OnTheWay') {
        setindexstate(4);
      } else if (
        orderResult[0]?.Status == 'Delivered' ||
        orderResult[0]?.Status == 'Cancelled'
      ) {
        setindexstate(5);
      }
    }
  }, [orderResult]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          paddingTop: getStatusBarHeight(),
        }}>
        <Navigation
          title={'Order Details'}
          //onPress={navigation.navigate('Home')}
        />
        <View style={{justifyContent: 'center', marginHorizontal: 20}}>
          <View>
            {orderResult != undefined && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: scalableheight.five,
                }}>
                {orderResult[0]?.EstimatedDeliveryMinutes > 0 && (
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
                      style={{justifyContent: 'center', alignItems: 'center'}}>
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
                )}
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
                      height: scalableheight.twenty,
                      width: scalableheight.twenty,
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

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: scalableheight.two,
                    justifyContent: 'space-between',
                    position: 'relative',
                    bottom: scalableheight.three,
                  }}>
                  {indexstate == 1 ? (
                    <Image
                      style={{
                        height: scalableheight.onepointfive,
                        width: scalableheight.six,

                        borderRadius: fontSize.borderradiusmedium,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: scalableheight.one,
                      }}
                      resizeMode={'stretch'}
                      source={require('../Resources/images/lineloader.gif')}
                    />
                  ) : (
                    // </View>
                    <View
                      style={{
                        height: scalableheight.one,
                        width: scalableheight.six,
                        backgroundColor:
                          indexstate >= 1 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
                        borderRadius: fontSize.borderradiusmedium,
                        marginTop: height(0.2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: scalableheight.one,
                      }}></View>
                  )}

                  {indexstate == 2 ? (
                    <Image
                      style={{
                        height: scalableheight.onepointfive,
                        width: scalableheight.six,
                        borderRadius: fontSize.borderradiusmedium,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: scalableheight.one,
                      }}
                      resizeMode={'stretch'}
                      source={require('../Resources/images/lineloader.gif')}
                    />
                  ) : (
                    <View
                      style={{
                        height: scalableheight.one,
                        width: scalableheight.six,
                        backgroundColor:
                          indexstate >= 2 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
                        borderRadius: fontSize.borderradiusmedium,
                        marginTop: height(0.2),
                        marginRight: scalableheight.one,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}></View>
                  )}

                  {indexstate == 3 ? (
                    <Image
                      style={{
                        height: scalableheight.onepointfive,
                        width: scalableheight.six,
                        borderRadius: fontSize.borderradiusmedium,
                        alignItems: 'center',
                        marginRight: scalableheight.one,
                        justifyContent: 'center',
                      }}
                      resizeMode={'stretch'}
                      source={require('../Resources/images/lineloader.gif')}
                    />
                  ) : (
                    <View
                      style={{
                        height: scalableheight.one,
                        width: scalableheight.six,
                        backgroundColor:
                          indexstate >= 3 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
                        borderRadius: fontSize.borderradiusmedium,
                        marginTop: height(0.2),
                        alignItems: 'center',
                        marginRight: scalableheight.one,
                        justifyContent: 'center',
                      }}></View>
                  )}

                  {indexstate == 4 ? (
                    <Image
                      style={{
                        height: scalableheight.onepointfive,
                        width: scalableheight.six,
                        borderRadius: fontSize.borderradiusmedium,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode={'stretch'}
                      source={require('../Resources/images/lineloader.gif')}
                    />
                  ) : (
                    <View
                      style={{
                        height: scalableheight.one,
                        width: scalableheight.six,
                        backgroundColor:
                          indexstate >= 4 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
                        marginTop: height(0.2),
                        borderRadius: fontSize.borderradiusmedium,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}></View>
                  )}
                </View>
              </View>
            )}
            <View
              style={{
                ...styleSheet.shadow,
                flexDirection: 'row',
                width: '100%',
                height: scalableheight.eight,
                backgroundColor: 'white',
                borderRadius: fontSize.borderradiusmedium,
                marginVertical: scalableheight.one,
              }}>
              <View
                style={{
                  height: '100%',
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: scalableheight.six,
                    width: scalableheight.six,
                    backgroundColor: 'rgba(211,211,211, 0.3)',
                    borderRadius: fontSize.borderradiusmedium,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="pedal-bike"
                    color={'#F55050'}
                    size={fontSize.thirtythree}
                  />
                </View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '60%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.sixteen,
                    color: '#29262A',
                  }}>
                  Contact your rider
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: fontSize.ten,
                    color: '#29262A',
                    opacity: 0.4,
                  }}
                  numberOfLines={2}>
                  Ask for Contactless Delivery
                  {/* {props.Details} */}
                </Text>
              </View>

              <View
                // onPress={props.onPress}
                style={{
                  height: '100%',
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${ridercontact}`);
                  }}
                  activeOpacity={0.9}>
                  <MaterialIcons
                    name="call"
                    color={'#00000029'}
                    size={fontSize.twentyeight}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: scalableheight.one}}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.sixteen,
                  color: '#29262A',
                }}>
                Order Details
              </Text>
              <View
                style={{
                  ...styleSheet.shadow,
                  padding: scalableheight.one,

                  backgroundColor: 'white',
                  borderRadius: fontSize.borderradiusmedium,
                  marginVertical: scalableheight.one,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: scalableheight.one,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-medium',
                      fontSize: fontSize.fourteen,
                      color: '#29262A',
                    }}>
                    Your Order No.
                  </Text>
                  <View
                    style={{
                      height: scalableheight.three,
                      width: scalableheight.ten,
                      backgroundColor: 'rgba(211,211,211, 0.3)',
                      borderRadius: fontSize.borderradius,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: fontSize.ten,
                        color: '#F55050',
                      }}>
                      {orderResult[0]?.OrderNo}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-medium',
                      fontSize: fontSize.fourteen,
                      color: '#29262A',
                      width: '50%',
                    }}>
                    Your order from
                  </Text>

                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.ten,
                      color: '#000',
                      width: '50%',
                    }}>
                    {/* abc */}
                    {orderResult[0]?.RestaurantBranch.Address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: scalableheight.one,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-medium',
                      fontSize: fontSize.fourteen,
                      color: '#29262A',
                      width: '50%',
                    }}>
                    Delivery Address
                  </Text>

                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.ten,
                      color: '#000',
                      width: '50%',
                    }}>
                    {orderResult[0]?.Address}
                    {/* {Selectedcurrentaddress[0].address} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    //  marginVertical:scalableheight.one
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-medium',
                      fontSize: fontSize.fourteen,
                      color: '#29262A',
                    }}>
                    Total (inc. VAT)
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.ten,
                      color: '#000',
                    }}>
                    AED {orderResult[0]?.TotalAmount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  ...styleSheet.shadow2,
                  marginVertical: scalableheight.pointfive,
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: scalableheight.one,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.sixteen,
                    color: '#29262A',
                  }}>
                  View Details
                </Text>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (togglelist == false) {
                      settogglelist(true);
                    } else if (togglelist == true) {
                      settogglelist(false);
                    }
                  }}
                  style={{
                    height: scalableheight.four,
                    width: scalableheight.four,
                    backgroundColor: 'rgba(211,211,211, 0.3)',
                    borderRadius: fontSize.borderradiusmedium,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name={
                      togglelist == true
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    color={'#F55050'}
                    size={fontSize.thirtythree}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {togglelist == true ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            style={{
              // width: '50%',

              paddingHorizontal: scalableheight.one,
              // marginTop: scalableheight.two,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: scalableheight.three,
            }}
            data={orderResult[0]?.OrderDetails}
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
                    }}
                  />
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scalableheight.one,
  },

  text: {
    fontSize: 20,
  },
  icon: {
    position: 'absolute',
    left: '-1%',
  },
  videocall: {
    flexDirection: 'row',
    position: 'absolute',
    right: '-1%',
  },
  backButtonMain: {
    backgroundColor: '#F9F9F9',
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
  },
  shadow2: {
    shadowColor: '#E14E4E',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
export default PreparingFood;
