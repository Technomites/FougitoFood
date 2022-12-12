import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  eraseNotificationStatus,
  seticonfocus,
  updateNotificationStatus,
  deleteaccountcustomer,
  cleardeletionstatus,
  ClearAsycn,
} from '../Actions/actions';
import Toast from 'react-native-toast-notifications';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
// import BottomTab from '../Shared/Components/BottomTab';

import Animated from 'react-native-reanimated';


import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import AccountInfotile from '../Shared/Components/AccountInfotile';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import ChnagePasswordModel from '../Shared/Components/ChnagePasswordModel';
import AuthenticationModel from '../Shared/Components/AuthenticationModel';

import {ScrollView} from 'react-native-gesture-handler';

const Settings = ({navigation, drawerAnimationStyle}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [modalVisible3, setmodalVisible3] = useState(false);
  const toast = useRef();
  const [loader, setloader] = useState(false);
  const [setting, SetSetting] = useState([
    {
      icon: 'person-outline',
      title: 'Account Info',
      onPress: () => {
        navigation.navigate('AccountSettings');
        // navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 1,
    },
    {
      icon: 'lock',
      title: 'Change Password',
      onPress: () => {
        setmodalVisible2(true);
        // console.log('ancnnc');
        navigation.navigate('drawernavigation');
        //  navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 2,
    },
    {
      icon: 'briefcase-outline',
      title: 'Contact Us',
      onPress: () => {
        navigation.navigate('ContactUs');
        //  navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 1,
    },
    {
      icon: 'delete',
      title: 'Delete Account',
      onPress: () => {
        console.log('delete account');
        setmodalVisible3(true);
        // navigation.navigate('ContactUs');
        //  navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 3,
    },

    // {
    //   icon: 'sharealt',
    //   title: 'Share with Your Friends',
    //   onPress: () => {
    //     navigation.navigate('Home');
    //     //  navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 4,
    // },
    //   {
    //     icon: 'information-variant',
    //     title: 'About Us',
    //     onPress: () => {
    //  //     navigation.navigate('Aboutus');

    //     },
    //     type: 5,
    //   },
    //   {
    //     icon: 'briefcase-outline',
    //     title: 'Legal',
    //     onPress: () => {
    //      navigation.navigate('Legal');

    //     },
    //     type: 1,
    //   },
    //   {
    //     icon: 'question',
    //     title: 'Frequently Asked Questions',
    //     onPress: () => {
    //   //    navigation.navigate('Faqs');

    //     },
    //     type: 6,
    //   },

    // {
    //   icon: 'logout',
    //   title: 'Logout',
    //   onPress: () => {
    //     navigation.navigate('Home');
    //     //   navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 8,
    // },
    // {
    //   icon: 'logout',
    //   title: 'Logout',
    //   onPress: () => {
    //     navigation.navigate('Home');
    //     //   navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 8,
    // },
    // {
    //   icon: 'logout',
    //   title: 'Logout',
    //   onPress: () => {
    //     navigation.navigate('Home');
    //     //   navigation.dispatch(DrawerActions.closeDrawer());
    //   },
    //   type: 8,
    // },
  ]);
  const dispatch = useDispatch();
  const {
    userid,
    Lang,
    notificationStatus,
    AuthToken,
    ProfileName,
    ProfileImage,
    internetconnectionstate,
    deletionstatus,
  } = useSelector(state => state.userReducer);

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    dispatch(seticonfocus('setting'));
  }, []);

  async function clear() {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    setloader(false);

    if (deletionstatus == 'true') {
      toast.current.show('Your account has been deleted successfully.', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      clear();
      dispatch(ClearAsycn());
      setmodalVisible3(false);
    } else if (deletionstatus == 'false') {
      toast.current.show(
        'An error occured while deleting your account. Please try again later',
        {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        },
      );
    }
    dispatch(cleardeletionstatus());
  }, [deletionstatus]);
  const toggleSwitch = async () => {
    dispatch(updateNotificationStatus(!isEnabled));
    setIsEnabled(!isEnabled);
  };

  function deleteaccount() {
    setloader(true);
    dispatch(deleteaccountcustomer(userid, AuthToken));
  }

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: '#F6F6F6'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          flex: 12,
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'Settings'} />
        {/* <View style={{height: scalableheight.three}}></View> */}
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: scalableheight.two,
            //    backgroundColor:'red',
            height: scalableheight.twenty,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{width: '50%', alignItems: 'center', alignItems: 'center'}}>
            <View
              style={{
                ...styleSheet.shadow,
                height: scalableheight.fifteen,
                width: scalableheight.fifteen,
                borderRadius: fontSize.circle,
                backgroundColor: 'white',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                    {AuthToken != '' ?
                      <FastImage
                      style={{
                         height: '99.5%',
                         width: '99.5%',
                         borderRadius: fontSize.circle,
         
                         // marginBottom: scalableheight.one,
                       }}
                       source={{
                        uri: ProfileImage,
                        priority: FastImage.priority.normal,
                      }
                       }
                       resizeMode={FastImage.resizeMode.cover}
                     /> 
                     :
                     <Image
                     resizeMode="cover"
                     style={{
                       height: '99.5%',
                       width: '99.5%',
                       borderRadius: fontSize.circle,
     
                       // marginBottom: scalableheight.one,
                     }}
                     source={require('../Resources/images/logoguest.png')}
                   />}
             
            </View>
          </View>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              alignItems: 'flex-start',
              //  backgroundColor: 'yellow',
            }}>
            <Text
              style={{
                fontSize: fontSize.fifteen,
                color: '#29262A',
                fontFamily: 'Inter-SemiBold',
              }}>
              {AuthToken != '' && internetconnectionstate == true
                ? ProfileName
                : 'Guest User'}
            </Text>
            <TouchableOpacity
              onPress={() =>
                AuthToken !== ''
                  ? navigation.navigate('AccountSettings')
                  : setmodalVisible(true)
              }>
              <Text
                style={{
                  fontSize: fontSize.thirteen,
                  color: '#E14E4E',
                  fontFamily: 'Inter-SemiBold',
                }}>
                {AuthToken !== '' && internetconnectionstate == true
                  ? 'ACCOUNT SETTINGS'
                  : 'Login/Signup'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            flex: 1,
            borderRadius: fontSize.fourtyeight,

            borderWidth: scalableheight.borderTopWidth,
            borderColor: 'rgba(211,211,211, 0.6)',
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{
              paddingHorizontal: scalableheight.two,
              marginVertical: scalableheight.three,
            }}>
            {setting.map(item => {
              if (
                (AuthToken !== '' && internetconnectionstate == true) ||
                (item.title !== 'Account Info' &&
                  item.title !== 'Change Password' &&
                  item.title !== 'Logout' &&
                  item.title !== 'Delete Account')
              ) {
                return (
                  <AccountInfotile
                    onPress={() => {
                      // SetPlaceSelected(item);
                    }}
                    data={item}
                    // selection={placeselected}
                  />
                );
              }
            })}

            {/* <AccountInfotile  /> */}
          </ScrollView>
        </View>
      </View>
      <ChnagePasswordModel
        state={modalVisible2}
        togglemodel={() => {
          setmodalVisible2(false);
        }}
      />
      <AuthenticationModel
        state={modalVisible}
        togglemodel={() => {
          setmodalVisible(false);
        }}
      />

      {modalVisible3 && (
        <View
          style={{
            elevation: 4000,
            zIndex: 4000,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              backgroundColor: '#303030',
              padding: scalableheight.one,
              width: '90%',
              borderRadius: fontSize.eleven,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#E14E4E',
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
                paddingTop: scalableheight.one,
                paddingVertical: scalableheight.pointfive,
                textAlign: 'center',
              }}>
              Are you sure you want to delete this account?
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
                    deleteaccount();
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
                    setmodalVisible3(false);
                    // setanimationstate(true);
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
        </View>
        //  </Animatable.View>
      )}

      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: 'Rubik-Regular',
    width: '90%',
    color: 'black',
  },
  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
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
    elevation: 7,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});
export default Settings;
