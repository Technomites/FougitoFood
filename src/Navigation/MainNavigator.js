import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  SafeAreaView,
  ImageBackground,
  Image,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Touchable,
  Animation,
  StyleSheet,
  StatusBar,
  Vibration,
  Platform,
  Modal,
} from 'react-native';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomButton from '../Shared/Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import Toast from 'react-native-toast-notifications';
import AuthenticationModel from '../Shared/Components/AuthenticationModel';
import {useSelector, useDispatch} from 'react-redux';
import {FullWindowOverlay} from 'react-native-screens';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GettingStarted from '../Screens/GettingStarted';
import SplashScreen from '../Screens/SplashScreen';
import * as Animatable from 'react-native-animatable';
import Home from '../Screens/Home';
import Restaurantpage from '../Screens/Restaurantpage';
import Checkout from '../Screens/Checkout';
import RestaurantPageAnimation from '../Screens/RestaurantPageAnimation';
import Settings from '../Screens/Settings';
import Help from '../Screens/Help';
import Coupons from '../Screens/Coupons';
import PreparingFood from '../Screens/PreparingFood';


import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import OtpVerification from '../Screens/OtpVerification';
import ContactUs from '../Screens/ContactUs';
import Aboutus from '../Screens/Aboutus';
import ForgotPassword from '../Screens/ForgotPassword';
import MyFavourite from '../Screens/MyFavourite';
import MyOrders from '../Screens/MyOrders';
import MyAddresses from '../Screens/MyAddresses';
import Changepassword from '../Screens/Changepassword';
import OrderDetails from '../Screens/OrderDetails';
import EditAddress from '../Screens/EditAddress';
import AccountSettings from '../Screens/AccountSettings';
import Legal from '../Screens/Legal';
import Faqs from '../Screens/Faqs';
import Qrcode from '../Screens/Qrcode';
import TermsCondition from '../Screens/Terms&Condition';

import Changepasswordforgot from '../Screens/Changepasswordforgot';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
// import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {fontSize, scalableheight} from '../Utilities/fonts';
import renderIf from 'render-if';
import {totalSize, height} from 'react-native-dimension';
import {PortalProvider} from 'react-native-portal';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {eraselogout, logout, ClearAsycn} from '../Actions/actions';
import {GToastContainer, showToast} from 'react-native-gtoast';

// import { StatusBar } from 'expo-status-bar';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const CustomDrawerStyle = ({navigation}) => {
  const toast = useRef();
  const {
    Logout,
    Lang,
    ProfileInfo,
    newNotificationCount,
    AuthToken,
    userLogoutStatus,
    UserLogout,
    LoginCustomer,
    ProfileName,
    ProfileImage,
  } = useSelector(state => state.userReducer);

  console.log(LoginCustomer?.Logo, 'LoginCustomer?.Name LoginCustomer?.Name');
  let options = [
    {
      label: 'Settings',
      img: 'settings',
      onPress: () => {
        navigation.navigate('Settings');
        navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 4,
    },
    // {
    //   label:'Help',
    //   img: 'question-circle',
    //   onPress: () => {
    //     navigation.navigate('Help');
    //     navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 2,
    // },
    // {
    //   label: 'About Us',
    //   img: 'person',
    //   onPress: () => {
    //     navigation.navigate('Aboutus');
    //     navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 1,
    // },
    {
      label: 'Contact Us',
      img: 'phone',
      onPress: () => {
        navigation.navigate('ContactUs');
        navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 5,
    },
  ];
  const [modalVisible, setmodalVisible] = useState(false);
  const [logoutmodal, setlogoutmodal] = useState(false);

  const [nointernet, setnointernet] = useState(false);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  async function ClearAsyncStorage() {
    await AsyncStorage.clear();
    // props.navigation.navigate('login');
  }

  useEffect(() => {
    if (userLogoutStatus === 'Success') {
      toast.current.show(UserLogout, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,

        animationType: 'slide-in',
      });
      setLoader(false);
      setanimationstate(true);

      ClearAsyncStorage();
      dispatch(ClearAsycn());

      setlogoutmodal(false);
    } else if (userLogoutStatus === 'Error') {
      toast.current.show(UserLogout, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      // setLoader(false);
      console.log(UserLogout, 'abcc');
    }
  }, [userLogoutStatus, UserLogout]);
  const logoutHandle = () => {
    // dispatch(logout(AuthToken));
    setnointernet();
    // const deviceId = DeviceInfo.getUniqueId();
    // console.log(deviceId);
    NetInfo.fetch().then(state => {
      if (state.isConnected == false && state.isInternetReachable == false) {
        // showToast('Problem with internet connectivity', {
        //   duration: 500,
        // });
        console.log('no internet');
        setnointernet(true);
        // setLoader(false);
      } else {
        // setModalVisible(false);
        dispatch(logout(AuthToken));
        setLoader(true);

        // alert(loader);
      }
    });
  };

  return (
    // <ImageBackground
    //   resizeMode="cover"

    //   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    //   source={require('../Resources/images/drawer.jpg')}>
    // backgroundColor: 'rgba(0,0,0,0.6)'
    <>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#00BCD4"}} barStyle = "light-content">
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      </SafeAreaView>  */}
      {/* <Modal
      
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setmodalVisible(!modalVisible);
      }}>
   
    </Modal> */}

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          paddingLeft: scalableheight.pointfive,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: getStatusBarHeight(),
            width: '100%',
          }}>
          {/* <View
            style={{
              width: '95%',
              height: scalableheight.nine,
              alignSelf: 'center',
              borderRadius: fontSize.circle,
              backgroundColor: '#EEEBE7',
              marginTop: scalableheight.three,
              marginBottom: scalableheight.three,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}> */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: scalableheight.two,
            }}>
            <Image
              style={{
                width: scalableheight.tweleve,
                height: scalableheight.tweleve,
                borderRadius: fontSize.circle,
                borderWidth: scalableheight.borderwidth,
                borderColor: 'black',
              }}
              source={
                AuthToken != ''
                  ? {
                      uri: ProfileImage,
                    }
                  : require('../Resources/images/logoguest.png')
              }
            />
            <View style={{alignItems: 'center', marginTop: scalableheight.one}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: fontSize.eightteen,
                  fontFamily: 'Inter-SemiBold',
                }}>
                {AuthToken != '' ? ProfileName : 'Guest User'}
              </Text>
              {AuthToken != '' ? (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('AccountSettings')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: fontSize.twelve,
                      fontFamily: 'Inter-Medium',
                      opacity: 0.8,
                    }}>
                    Account Settings
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setmodalVisible(true)}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: fontSize.twelve,
                      fontFamily: 'Inter-Medium',
                      opacity: 0.8,
                    }}>
                    Login/Signup
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* {renderIf(ProfileInfo != '')(
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountInfo')}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize.sixteen,
                    fontFamily: 'Rubik-Medium',
                  }}>
                  {ProfileInfo?.name}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize.twelve,
                    fontFamily: 'Rubik-Regular',
                    opacity: 0.5,
                  }}>
                  {Lang == 'en' ? 'View Profile' : 'عرض الصفحة الشخصية'}
                </Text>
              </TouchableOpacity>
            )}
            {renderIf(ProfileInfo == '')(
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize.sixteen,
                    fontFamily: 'Rubik-Medium',
                  }}>
                  {Lang == 'en' ? 'Guest User' : 'حساب زائر'}
                </Text>
              </View>
            )}
   

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{
                height: scalableheight.six,
                width: scalableheight.four,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="settings-outline"
                color={'black'}
                size={fontSize.twentytwo}
              />
            </TouchableOpacity> 
          </View>*/}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('Home');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              // borderTopWidth: scalableheight.borderTopWidth,
              // borderColor: '#adadad',
              height: Dimensions.get('window').height / 12,
              marginHorizontal: scalableheight.two,
            }}>
            <View
              style={{
                ...styleSheet.shadowicon,
                width: scalableheight.five,
                height: scalableheight.five,
                borderRadius: fontSize.nine,
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name={'home-outline'}
                color={'black'}
                size={fontSize.twentyfour}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Medium',
                fontSize: fontSize.fourteen,
                marginLeft: scalableheight.two,
              }}>
              {'Home'}
            </Text>
          </TouchableOpacity>

          {/* {renderIf(ProfileInfo != '')(
            <> */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('MyOrders');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: scalableheight.borderTopWidth,
              borderColor: '#adadad',
              height: Dimensions.get('window').height / 12,
              marginHorizontal: scalableheight.two,
            }}>
            <View
              style={{
                ...styleSheet.shadowicon,
                width: scalableheight.five,
                height: scalableheight.five,
                borderRadius: fontSize.nine,
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name={'history'}
                color={'black'}
                size={fontSize.twentytwo}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Medium',
                fontSize: fontSize.fourteen,
                marginLeft: scalableheight.two,
              }}>
              {'My Orders'}
            </Text>
          </TouchableOpacity>

          {AuthToken != '' ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('Coupons');
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: scalableheight.borderTopWidth,
                borderColor: '#adadad',
                height: Dimensions.get('window').height / 12,
                marginHorizontal: scalableheight.two,
              }}>
              <View
                style={{
                  ...styleSheet.shadowicon,
                  width: scalableheight.five,
                  height: scalableheight.five,
                  borderRadius: fontSize.nine,
                  backgroundColor: '#F9F9F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={'tagso'}
                  color={'black'}
                  size={fontSize.twentytwo}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.fourteen,
                  marginLeft: scalableheight.two,
                }}>
                {'My Coupons'}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('MyFavourite');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: scalableheight.borderTopWidth,
              borderColor: '#adadad',
              height: Dimensions.get('window').height / 12,
              marginHorizontal: scalableheight.two,
            }}>
            <View
              style={{
                ...styleSheet.shadowicon,
                width: scalableheight.five,
                height: scalableheight.five,
                borderRadius: fontSize.nine,
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                name={'hearto'}
                color={'black'}
                size={fontSize.twentytwo}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Medium',
                fontSize: fontSize.fourteen,
                marginLeft: scalableheight.two,
              }}>
              {'My Favourites'}
            </Text>
          </TouchableOpacity>

          {AuthToken != '' ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('MyAddresses', {
                  screenname: 'drawer',
                });
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: scalableheight.borderTopWidth,
                borderColor: '#adadad',
                height: Dimensions.get('window').height / 12,
                marginHorizontal: scalableheight.two,
              }}>
              <View
                style={{
                  ...styleSheet.shadowicon,
                  width: scalableheight.five,
                  height: scalableheight.five,
                  borderRadius: fontSize.nine,
                  backgroundColor: '#F9F9F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name={'location-outline'}
                  color={'black'}
                  size={fontSize.twentytwo}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.fourteen,
                  marginLeft: scalableheight.two,
                }}>
                {'My Addresses'}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={{}}>
            {options.map(item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => item.onPress()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    borderTopWidth: scalableheight.borderTopWidth,
                    borderColor: '#adadad',
                    height: Dimensions.get('window').height / 12,
                    marginHorizontal: scalableheight.two,
                  }}>
                  <View
                    style={{
                      ...styleSheet.shadowicon,
                      width: scalableheight.five,
                      height: scalableheight.five,
                      borderRadius: fontSize.nine,
                      backgroundColor: '#F9F9F9',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {item.type == 1 ? (
                      <Ionicons
                        name={item.img}
                        color={'black'}
                        size={fontSize.twentytwo}
                      />
                    ) : item.type == 2 ? (
                      <FontAwesome
                        name={item.img}
                        color={'black'}
                        size={fontSize.twentytwo}
                      />
                    ) : item.type == 3 ? (
                      <MaterialCommunityIcons
                        name={item.img}
                        color={'black'}
                        size={fontSize.twentytwo}
                      />
                    ) : item.type == 4 ? (
                      <Feather
                        name={item.img}
                        color={'black'}
                        size={fontSize.twentytwo}
                      />
                    ) : item.type == 5 ? (
                      <AntDesign
                        name={item.img}
                        color={'black'}
                        size={fontSize.twentytwo}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Inter-Medium',
                      fontSize: fontSize.fourteen,
                      marginLeft: scalableheight.two,
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {renderIf(AuthToken != '')(
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={
                () =>
                  //logoutHandle()
                  setlogoutmodal(true)
                // alert('mm')
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                borderTopWidth: scalableheight.borderTopWidth,
                borderColor: '#adadad',
                height: Dimensions.get('window').height / 12,
                marginHorizontal: scalableheight.two,
              }}>
              <View
                style={{
                  ...styleSheet.shadowicon,
                  width: scalableheight.five,
                  height: scalableheight.five,
                  borderRadius: fontSize.nine,
                  backgroundColor: '#F9F9F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialIcons
                  name={'logout'}
                  color={'black'}
                  size={fontSize.twentytwo}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.fourteen,
                  marginLeft: scalableheight.two,
                }}>
                {'Logout'}
              </Text>
            </TouchableOpacity>,
          )}
          {/* {renderIf(AuthToken == '')(
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setmodalVisible(true);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                borderTopWidth: scalableheight.borderTopWidth,
                borderColor: '#adadad',
                height: Dimensions.get('window').height / 12,
                marginHorizontal: scalableheight.two,
              }}>
              <View
                style={{
                  ...styleSheet.shadowicon,
                  width: scalableheight.five,
                  height: scalableheight.five,
                  borderRadius: fontSize.nine,
                  backgroundColor: '#F9F9F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialIcons
                  name={'login'}
                  color={'black'}
                  size={fontSize.twentytwo}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.fourteen,
                  marginLeft: scalableheight.two,
                }}>
                {'Log in'}
              </Text>
            </TouchableOpacity>,
          )} */}
        </ScrollView>
      </View>
      {logoutmodal && (
        <Animatable.View
          animation={animationstate ? animationtype : null}
          onAnimationEnd={() => {
            setanimationstate(false);

            if (animationtype == 'fadeInUpBig') {
              setanimationtype('fadeOutDownBig');
              // setlogoutmodal(false)
            } else {
              setanimationtype('fadeInUpBig');
              setlogoutmodal(false);
            }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            bottom: scalableheight.two,
            position: 'absolute',
            width: Dimensions.get('window').width / 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: scalableheight.fifteen,
          }}>
          <View
            style={{
              backgroundColor: '#303030',
              height: '100%',
              width: '90%',
              borderRadius: fontSize.eleven,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              name={'exclamationcircle'}
              color={'white'}
              size={fontSize.thirtytwo}
            />
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                color: 'white',
                fontSize: fontSize.fifteen,
                paddingTop: scalableheight.pointfive,
              }}>
              Are you sure you want to logout?
            </Text>

            {loader == true ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: scalableheight.one,
                }}>
                <ActivityIndicator size={'small'} color="#fff" />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: scalableheight.one,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    logoutHandle();
                    //   setLoader(true);
                    //  setanimationstate(true);
                  }}
                  style={{
                    backgroundColor: '#E14E4E',
                    width: scalableheight.seven,
                    height: scalableheight.four,
                    borderRadius: fontSize.borderradiusmedium,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      color: 'white',
                      fontSize: fontSize.fifteen,
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setanimationstate(true);
                  }}
                  style={{
                    marginLeft: scalableheight.one,
                    width: scalableheight.seven,
                    height: scalableheight.four,
                    borderRadius: fontSize.borderradiusmedium,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      color: '#E14E4E',
                      fontSize: fontSize.fifteen,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animatable.View>
      )}
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
        visible={modalVisible}
        onRequestClose={() => setmodalVisible(false)}>
        <AuthenticationModel
          state={modalVisible}
          togglemodel={() => {
            setmodalVisible(false);
          }}
        />
      </Modal>
      {/* <View
style={{position:"absolute",
height: Dimensions.get('window').height,
width: Dimensions.get('window').width,
backgroundColor:"red",
elevation:999999999999999,
zIndex:999999999999999,

}}>
<AuthenticationModel
          state={modalVisible}
          togglemodel={() => {
            setmodalVisible(false);
          }}
        />
</View> */}
      <Toast
        ref={toast}
        style={{
          marginBottom: scalableheight.eight,
          justifyContent: 'center',
          width: '50%',
          alignItems: 'center',
          alignContent: 'center',
          position: 'relative',
          left: scalableheight.ten,
        }}
      />
    </>
  );
};

const Drawernavigator = props => {
  const [progress, setprogress] = React.useState(new Animated.Value(0));
  const {Lang} = useSelector(state => state.userReducer);
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1.3],
    outputRange: [1, 0.6],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 45],
  });

  const animatedStyle = {
    ...styleSheet.shadow1,
    borderRadius,
    transform: [{scale}],
  };
  return (
    <Drawer.Navigator
      // contentContainerStyle={{flex:1, backgroundColor:"red", borderWidth:10, borderColor:"blue"}}
      contentContainerStyle={{flex: 1}}
      drawerType="slide"
      // screenOptions={TransitionScreenOptions}
      overlayColor="transparent"
      initialRouteName="DrawerStack"
      drawerPosition={'left'}
      drawerType="back"
      screenOptions={TransitionScreenOptions}
      drawerStyle={{
        //   drawerContentOptions={{

        width: '63%',

        backgroundColor: 'transparent',
      }}
      sceneContainerStyle={{
        // backgroundColor: "rgba(0,0,0,0.9)",

        backgroundColor: 'transparent',
      }}
      drawerContent={props => {
        setTimeout(() => {
          setprogress(props.progress);
        }, 0);

        return <CustomDrawerStyle navigation={props.navigation} />;
      }}>
      <Drawer.Screen name="Home" options={{headerShown: false}}>
        {props => <Home {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="MyOrders" options={{headerShown: false}}>
        {props => <MyOrders {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="Restaurantpage" options={{headerShown: false}}>
        {props => (
          <Restaurantpage {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Checkout" options={{headerShown: false}}>
        {props => <Checkout {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
     

      
      <Drawer.Screen name="Changepassword" options={{headerShown: false}}>
        {props => (
          <Changepassword {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="MyFavourite" options={{headerShown: false}}>
        {props => (
          <MyFavourite {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="MyAddresses" options={{headerShown: false}}>
        {props => (
          <MyAddresses {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="AccountSettings" options={{headerShown: false}}>
        {props => (
          <AccountSettings {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Legal" options={{headerShown: false}}>
        {props => <Legal {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="TermsCondition" options={{headerShown: false}}>
        {props => (
          <TermsCondition {...props} drawerAnimationStyle={animatedStyle} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Faqs" options={{headerShown: false}}>
        {props => <Faqs {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="Qrcode" options={{headerShown: false}}>
        {props => <Qrcode {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="RestaurantPageAnimation"
        options={{headerShown: false}}>
        {props => (
          <RestaurantPageAnimation
            {...props}
            drawerAnimationStyle={animatedStyle}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Settings" options={{headerShown: false}}>
        {props => <Settings {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>

      <Drawer.Screen name="Help" options={{headerShown: false}}>
        {props => <Help {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>

      <Drawer.Screen name="ContactUs" options={{headerShown: false}}>
        {props => <ContactUs {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="Aboutus" options={{headerShown: false}}>
        {props => <Aboutus {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="Coupons" options={{headerShown: false}}>
        {props => <Coupons {...props} drawerAnimationStyle={animatedStyle} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={TransitionScreenOptions}
      initialRouteName="CustomDrawerStyle">
      <Stack.Screen
        name="CustomDrawerStyle"
        component={CustomDrawerStyle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Help"
        component={Help}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const navTheme = {
  colors: {
    background: 'transparent',
  },
};
const MainNavigator = () => {
  return (
    <>
      <NavigationContainer theme={navTheme}>
        <ImageBackground
          resizeMode="cover"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
          source={require('../Resources/images/background.png')}>
          <Image
            resizeMode="contain"
            style={{
              position: 'absolute',
              bottom: scalableheight.three,
              left: scalableheight.three,
              width: scalableheight.thirteen,
              height: scalableheight.four,
            }}
            source={require('../Resources/images/logo.png')}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: scalableheight.three,
              right: scalableheight.four,
              color: 'white',
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.twelve,
              opacity: 0.7,
            }}>
            Version 1.0.5
          </Text>
        </ImageBackground>
        {/*     <View    style={{
           
            alignItems: 'center',
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor:"white"
          }}>
            <Image
          resizeMode="stretch"
          style={{
           
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            height: scalableheight.eighty,
        
          
          }}
          source={require('../Resources/images/drawer.png')}>
             </Image>
          {/* <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}></View>
            </View> */}
        {/* <RadialGradient
            colors={['white', '#E57160']}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}></RadialGradient> */}

        <Stack.Navigator
          screenOptions={TransitionScreenOptions}
          initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GettingStarted"
            component={GettingStarted}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Changepasswordforgot"
            component={Changepasswordforgot}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditAddress"
            component={EditAddress}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Legal"
            component={Legal}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="PreparingFood"
            component={PreparingFood}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="TermsCondition"
            component={TermsCondition}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Faqs"
            component={Faqs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Qrcode"
            component={Qrcode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Aboutus"
            component={Aboutus}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Drawernavigator"
            component={Drawernavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styleSheet = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  shadow1: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 35,
  },
  shadowicon: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 5,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  smallshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#00000075',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: height(4),
    paddingVertical: height(14),
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: height(3),
    paddingVertical: height(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  infoIconStyle: {
    height: scalableheight.five,
    width: scalableheight.five,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  modalDetailStyle: {
    fontFamily: 'Rubik-Medium',
    color: 'black',
    fontSize: fontSize.fourteen,
    textAlign: 'center',
  },

  submitButton: {
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: scalableheight.one,
    paddingHorizontal: scalableheight.four,
  },

  filterButton: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: scalableheight.one,
    paddingHorizontal: scalableheight.four,
    marginLeft: scalableheight.one,
  },
});

export default MainNavigator;
