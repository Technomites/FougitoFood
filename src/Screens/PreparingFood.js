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
  Dimensions,
  TextInput,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PlainHeader from '../Shared/Components/PlainHeader';
import {OrderStatus} from '../Actions/actions';
import * as Animatable from 'react-native-animatable';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';

import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MYButton from '../Shared/Components/MYButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemDetailsModel from '../Shared/Components/ItemDetailsModel';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ItemDetailsStatus from '../Shared/Components/ItemDetailsStatus';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';
import BottomTab from '../Shared/Components/BottomTab';
import Infobar from '../Shared/Components/Infobar';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Bll from '../Shared/Components/Bll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {totalSize, height} from 'react-native-dimension';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Ratingbar from '../Shared/Components/Ratingbar';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import Navigation from '../Shared/Components/Navigation';

const PreparingFood = ({navigation, route}, props) => {


  const [itemmodalVisible, setitemmodalVisible] = useState(false);
  const [itemmodaldata, setitemmodaldata] = useState([]);

  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
 


  const [togglelist, settogglelist] = useState(true);

  const [indexstate, setindexstate] = useState(0);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [ridercontact, setriderContact] = useState('03342044037');
  const {AuthToken, orderdetails, orderResult} = useSelector(
    state => state.userReducer,
  );
  const refMap = useRef(null);
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
    // <View style={{flex: 1, backgroundColor: 'white'}}>
    //   <FocusAwareStatusBar
    //     barStyle={'dark-content'}
    //     backgroundColor="transparent"
    //   />
    //   <View
    //     style={{
    //       alignSelf: 'center',
    //       flex: 1,
    //       paddingTop: getStatusBarHeight(),
    //     }}>
    //     <Navigation
    //       title={'Order Details'}
    //       //onPress={navigation.navigate('Home')}
    //     />
    //     <View style={{justifyContent: 'center', marginHorizontal: 20}}>
    //       <View>
    //         {orderResult != undefined && (
    //           <View
    //             style={{
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               marginTop: scalableheight.five,
    //             }}>
    //             {orderResult[0]?.EstimatedDeliveryMinutes > 0 && (
    //               <>
    //               <Text
    //                 style={{
    //                   fontSize: fontSize.fourteen,
    //                   fontFamily: 'Inter-Bold',
    //                   color: '#29262A',
    //                 }}>
    //                 Estimated Delivery Time
    //               </Text>
            
    //             <View style={{justifyContent: 'center', alignItems: 'center'}}>
    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-SemiBold',
    //                   fontSize: fontSize.sixteen,
    //                   color: '#E14E4E',
    //                 }}>
    //                 {orderResult[0]?.Status + ' '}
    //               </Text>
                
    //                 <Text
    //                   style={{
    //                     color: '#000',
    //                     fontSize: fontSize.twelve,
    //                     fontFamily: 'Inter-Bold',
    //                     textAlign: 'center',
    //                   }}>
    //                   {orderResult[0]?.EstimatedDeliveryMinutes} Min
    //                 </Text>
                 
    //             </View>
    //             </>
    // )}
    //             {orderResult[0]?.Status == 'Pending' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/Pending.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'Confirmed' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/Confirmed.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'Preparing' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/FoodPreperainggif.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'FoodReady' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/FoodReady.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'OnTheWay' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/Ontheway.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'Delivered' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/Delivered.gif')}
    //               />
    //             )}

    //             {orderResult[0]?.Status == 'Canceled' && (
    //               <Image
    //                 style={{
    //                   height: scalableheight.twenty,
    //                   width: scalableheight.twenty,
    //                   marginTop: -scalableheight.three,
    //                 }}
    //                 resizeMode={'contain'}
    //                 source={require('../Resources/images/Cancelled.gif')}
    //               />
    //             )}

    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 marginVertical: scalableheight.two,
    //                 justifyContent: 'space-between',
    //                 position: 'relative',
    //                 bottom: scalableheight.three,
    //               }}>
    //               {indexstate == 1 ? (
    //                 <Image
    //                   style={{
    //                     height: scalableheight.onepointfive,
    //                     width: scalableheight.six,

    //                     borderRadius: fontSize.borderradiusmedium,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     marginRight: scalableheight.one,
    //                   }}
    //                   resizeMode={'stretch'}
    //                   source={require('../Resources/images/lineloader.gif')}
    //                 />
    //               ) : (
    //                 // </View>
    //                 <View
    //                   style={{
    //                     height: scalableheight.one,
    //                     width: scalableheight.six,
    //                     backgroundColor:
    //                       indexstate >= 1 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     marginTop: height(0.2),
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     marginRight: scalableheight.one,
    //                   }}></View>
    //               )}

    //               {indexstate == 2 ? (
    //                 <Image
    //                   style={{
    //                     height: scalableheight.onepointfive,
    //                     width: scalableheight.six,
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     marginRight: scalableheight.one,
    //                   }}
    //                   resizeMode={'stretch'}
    //                   source={require('../Resources/images/lineloader.gif')}
    //                 />
    //               ) : (
    //                 <View
    //                   style={{
    //                     height: scalableheight.one,
    //                     width: scalableheight.six,
    //                     backgroundColor:
    //                       indexstate >= 2 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     marginTop: height(0.2),
    //                     marginRight: scalableheight.one,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }}></View>
    //               )}

    //               {indexstate == 3 ? (
    //                 <Image
    //                   style={{
    //                     height: scalableheight.onepointfive,
    //                     width: scalableheight.six,
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     alignItems: 'center',
    //                     marginRight: scalableheight.one,
    //                     justifyContent: 'center',
    //                   }}
    //                   resizeMode={'stretch'}
    //                   source={require('../Resources/images/lineloader.gif')}
    //                 />
    //               ) : (
    //                 <View
    //                   style={{
    //                     height: scalableheight.one,
    //                     width: scalableheight.six,
    //                     backgroundColor:
    //                       indexstate >= 3 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     marginTop: height(0.2),
    //                     alignItems: 'center',
    //                     marginRight: scalableheight.one,
    //                     justifyContent: 'center',
    //                   }}></View>
    //               )}

    //               {indexstate == 4 ? (
    //                 <Image
    //                   style={{
    //                     height: scalableheight.onepointfive,
    //                     width: scalableheight.six,
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }}
    //                   resizeMode={'stretch'}
    //                   source={require('../Resources/images/lineloader.gif')}
    //                 />
    //               ) : (
    //                 <View
    //                   style={{
    //                     height: scalableheight.one,
    //                     width: scalableheight.six,
    //                     backgroundColor:
    //                       indexstate >= 4 ? '#E14E4E' : 'rgba(211,211,211,0.9)',
    //                     marginTop: height(0.2),
    //                     borderRadius: fontSize.borderradiusmedium,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }}></View>
    //               )}
    //             </View>
    //           </View>
    //         )}
    //         <View
    //           style={{
    //             ...styleSheet.shadow,
    //             flexDirection: 'row',
    //             width: '100%',
    //             height: scalableheight.eight,
    //             backgroundColor: 'white',
    //             borderRadius: fontSize.borderradiusmedium,
    //             marginVertical: scalableheight.one,
    //           }}>
    //           <View
    //             style={{
    //               height: '100%',
    //               width: '20%',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}>
    //             <View
    //               style={{
    //                 height: scalableheight.six,
    //                 width: scalableheight.six,
    //                 backgroundColor: 'rgba(211,211,211, 0.3)',
    //                 borderRadius: fontSize.borderradiusmedium,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //               }}>
    //               <MaterialIcons
    //                 name="pedal-bike"
    //                 color={'#F55050'}
    //                 size={fontSize.thirtythree}
    //               />
    //             </View>
    //           </View>

    //           <View
    //             style={{
    //               height: '100%',
    //               width: '60%',
    //               justifyContent: 'center',
    //             }}>
    //             <Text
    //               style={{
    //                 fontFamily: 'Inter-Bold',
    //                 fontSize: fontSize.sixteen,
    //                 color: '#29262A',
    //               }}>
    //               Contact your rider
    //             </Text>
    //             <Text
    //               style={{
    //                 fontFamily: 'Inter-Medium',
    //                 fontSize: fontSize.ten,
    //                 color: '#29262A',
    //                 opacity: 0.4,
    //               }}
    //               numberOfLines={2}>
    //               Ask for Contactless Delivery
    //               {/* {props.Details} */}
    //             </Text>
    //           </View>

    //           <View
    //             // onPress={props.onPress}
    //             style={{
    //               height: '100%',
    //               width: '20%',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 Linking.openURL(`tel:${ridercontact}`);
    //               }}
    //               activeOpacity={0.9}>
    //               <MaterialIcons
    //                 name="call"
    //                 color={'#00000029'}
    //                 size={fontSize.twentyeight}
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //         <View style={{marginVertical: scalableheight.one}}>
    //           <Text
    //             style={{
    //               fontFamily: 'Inter-Bold',
    //               fontSize: fontSize.sixteen,
    //               color: '#29262A',
    //             }}>
    //             Order Details
    //           </Text>
    //           <View
    //             style={{
    //               ...styleSheet.shadow,
    //               padding: scalableheight.one,

    //               backgroundColor: 'white',
    //               borderRadius: fontSize.borderradiusmedium,
    //               marginVertical: scalableheight.one,
    //             }}>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //                 marginVertical: scalableheight.one,
    //               }}>
    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-medium',
    //                   fontSize: fontSize.fourteen,
    //                   color: '#29262A',
    //                 }}>
    //                 Your Order No.
    //               </Text>
    //               <View
    //                 style={{
    //                   height: scalableheight.three,
    //                   width: scalableheight.ten,
    //                   backgroundColor: 'rgba(211,211,211, 0.3)',
    //                   borderRadius: fontSize.borderradius,
    //                   alignItems: 'center',
    //                   justifyContent: 'center',
    //                 }}>
    //                 <Text
    //                   style={{
    //                     fontFamily: 'Inter-Bold',
    //                     fontSize: fontSize.ten,
    //                     color: '#F55050',
    //                   }}>
    //                   {orderResult[0]?.OrderNo}
    //                 </Text>
    //               </View>
    //             </View>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //               }}>
    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-medium',
    //                   fontSize: fontSize.fourteen,
    //                   color: '#29262A',
    //                   width: '50%',
    //                 }}>
    //                 Your order from
    //               </Text>

    //               <Text
    //                 numberOfLines={2}
    //                 ellipsizeMode="tail"
    //                 style={{
    //                   fontFamily: 'Inter-Bold',
    //                   fontSize: fontSize.ten,
    //                   color: '#000',
    //                   width: '50%',
    //                 }}>
    //                 {/* abc */}
    //                 {orderResult[0]?.RestaurantBranch.Address}
    //               </Text>
    //             </View>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //                 marginVertical: scalableheight.one,
    //               }}>
    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-medium',
    //                   fontSize: fontSize.fourteen,
    //                   color: '#29262A',
    //                   width: '50%',
    //                 }}>
    //                 Delivery Address
    //               </Text>

    //               <Text
    //                 numberOfLines={2}
    //                 ellipsizeMode="tail"
    //                 style={{
    //                   fontFamily: 'Inter-Bold',
    //                   fontSize: fontSize.ten,
    //                   color: '#000',
    //                   width: '50%',
    //                 }}>
    //                 {orderResult[0]?.Address}
    //                 {/* {Selectedcurrentaddress[0].address} */}
    //               </Text>
    //             </View>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //                 //  marginVertical:scalableheight.one
    //               }}>
    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-medium',
    //                   fontSize: fontSize.fourteen,
    //                   color: '#29262A',
    //                 }}>
    //                 Total (inc. VAT)
    //               </Text>

    //               <Text
    //                 style={{
    //                   fontFamily: 'Inter-Bold',
    //                   fontSize: fontSize.ten,
    //                   color: '#000',
    //                 }}>
    //                 AED {orderResult[0]?.TotalAmount}
    //               </Text>
    //             </View>
    //           </View>
    //           <View
    //             style={{
    //               width: '100%',
    //               borderWidth: 0.2,
    //               ...styleSheet.shadow2,
    //               marginVertical: scalableheight.pointfive,
    //             }}></View>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-between',
    //               alignItems: 'center',
    //               marginTop: scalableheight.one,
    //             }}>
    //             <Text
    //               style={{
    //                 fontFamily: 'Inter-Bold',
    //                 fontSize: fontSize.sixteen,
    //                 color: '#29262A',
    //               }}>
    //               View Details
    //             </Text>

    //             <TouchableOpacity
    //               activeOpacity={0.9}
    //               onPress={() => {
    //                 if (togglelist == false) {
    //                   settogglelist(true);
    //                 } else if (togglelist == true) {
    //                   settogglelist(false);
    //                 }
    //               }}
    //               style={{
    //                 height: scalableheight.four,
    //                 width: scalableheight.four,
    //                 backgroundColor: 'rgba(211,211,211, 0.3)',
    //                 borderRadius: fontSize.borderradiusmedium,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //               }}>
    //               <MaterialIcons
    //                 name={
    //                   togglelist == true
    //                     ? 'keyboard-arrow-up'
    //                     : 'keyboard-arrow-down'
    //                 }
    //                 color={'#F55050'}
    //                 size={fontSize.thirtythree}
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     {togglelist == true ? (
    //       <FlatList
    //         showsVerticalScrollIndicator={false}
    //         keyboardShouldPersistTaps={"always"}
    //         style={{
    //           // width: '50%',

    //           paddingHorizontal: scalableheight.one,
    //           // marginTop: scalableheight.two,
    //         }}
    //         contentContainerStyle={{
    //           flexGrow: 1,
    //           paddingBottom: scalableheight.three,
    //         }}
    //         data={orderResult[0]?.OrderDetails}
    //         renderItem={(data, index) => {
    //           return (
    //             <View
    //               style={{
    //                 alignItems: 'center',
    //                 marginVertical: scalableheight.pointfive,
    //               }}>
    //               <ItemDetailsStatus
    //                 qty={data.item.Quantity}
    //                 title={data.item.MenuItems.Name}
    //                 price={data.item.TotalPrice}
    //                 image={data.item.MenuItems.Image}
    //                 onPress={() => {
    //                   setitemmodaldata(data?.item);
    //                   setitemmodalVisible(true);
    //                 }}
    //               />
    //             </View>
    //           );
    //         }}
    //       />
    //     ) : null}
    //   </View>
    // </View>
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
                  )}
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
                  latitude: orderResult[0]?.Latitude,
                  longitude: orderResult[0]?.Longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                initialRegion={{
                  latitude: orderResult[0]?.Latitude,
                  longitude: orderResult[0]?.Longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}>
                <Marker
                  // position={center}
                  coordinate={{
                    latitude: orderResult[0]?.Latitude,
                    longitude: orderResult[0]?.Longitude,
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

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
          {/* {togglelist == true ? (
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
          ) : null} */}
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
                    // marginBottom: scalableheight.two,
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
              Rider Info Not binded
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
                        Rider Jenny
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
                        Rider Phone
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
                      navigation.navigate('ContactUs');
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
                        : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#29262A',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.onepointfive,
              }}>
              My Review Not binded
            </Text>
            {/* <View style={{marginTop: scalableheight.one}}></View> */}
            <View
              style={{
                ...styles.MainContainer,
                // paddingVertical: scalableheight.two,
              }}>
              <Ratingbar />

              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.thirteen,
                  color: '#29262A',
                  marginVertical: scalableheight.one,
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
                {
                  'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
                }
              </Text>
            </View>
          </View>

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
    <ItemDetailsModel
      state={itemmodalVisible}
      data={itemmodaldata}
      togglemodel={() => {
        setitemmodalVisible(false);
      }}
    />
  </View>
  );
};

const styles = StyleSheet.create({
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
export default PreparingFood;
