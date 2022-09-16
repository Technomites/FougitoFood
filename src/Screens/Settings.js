import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  eraseNotificationStatus,
  seticonfocus,
  updateNotificationStatus,
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import BottomTab from '../Shared/Components/BottomTab';
import Settingscomponent from '../Shared/Components/Settingscomponent';
import Animated from 'react-native-reanimated';
import {GToastContainer, showToast} from 'react-native-gtoast';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountInfotile from '../Shared/Components/AccountInfotile';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const Settings = ({navigation, drawerAnimationStyle}) => {
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
        navigation.navigate('Home');
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
      icon: 'sharealt',
      title: 'Share with Your Friends',
      onPress: () => {
        navigation.navigate('Home');
        //  navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 4,
    },
    {
      icon: 'information-variant',
      title: 'About Us',
      onPress: () => {
        navigation.navigate('Aboutus');
        //   navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 5,
    },
    {
      icon: 'question',
      title: 'Frequently Asked Questions',
      onPress: () => {
        navigation.navigate('Faqs');
        //   navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 6,
    },
    {
      icon: 'briefcase-outline',
      title: 'Legal',
      onPress: () => {
        navigation.navigate('Legal');
        //  navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 1,
    },
    {
      icon: 'logout',
      title: 'Logout',
      onPress: () => {
        navigation.navigate('Home');
        //   navigation.dispatch(DrawerActions.closeDrawer());
      },
      type: 8,
    },
  ]);
  const dispatch = useDispatch();
  const {Lang, notificationStatus,AuthToken} = useSelector(
    state => state.userReducer,
  );
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    dispatch(seticonfocus('setting'));
  }, []);

  // useEffect(() => {
  //   if (notificationStatus == 200) {
  //     setIsEnabled(true);
  //   } else {
  //     if (notificationStatus != '') {
  //       showToast(notificationStatus, {
  //         duration: 500,
  //       });
  //     }
  //   }
  //   dispatch(eraseNotificationStatus());
  // }, [notificationStatus]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (ProfileInfo.allowPushNotifications == true) {
  //       setIsEnabled(true);
  //     } else {
  //       setIsEnabled(false);
  //     }
  //   });

  //   //  Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const toggleSwitch = async () => {
    dispatch(updateNotificationStatus(!isEnabled));
    setIsEnabled(!isEnabled);
  };

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
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
              <Image
                style={{
                  height: '99.5%',
                  width: '99.5%',
                  borderRadius: fontSize.circle,
                  resizeMode: 'contain',

                  // marginBottom: scalableheight.one,
                }}
                source={require('../Resources/images/logoguest.png')}
              />
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
              Tom Lucas
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountSettings')}>
              <Text
                style={{
                  fontSize: fontSize.thirteen,
                  color: '#E14E4E',
                  fontFamily: 'Inter-SemiBold',
                }}>
                ACCOUNT SETTINGS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            borderTopLeftRadius: fontSize.fourtyeight,
            borderTopRightRadius: fontSize.fourtyeight,
            // shadowColor: '#470000',
            // shadowOffset: {width: 0, height: 1},
            // shadowOpacity: 0.2,
            // elevation: 1,
            borderWidth: scalableheight.borderTopWidth,
            borderColor: 'rgba(211,211,211, 0.6)',
          }}>
          <View
            style={{
              paddingHorizontal: scalableheight.two,
              paddingTop: scalableheight.four,
            }}>
            {setting.map(item => {
              return (
                <AccountInfotile
                  onPress={() => {
                    // SetPlaceSelected(item);
                  }}
                  data={item}
                  // selection={placeselected}
                />
              );
            })}
            {/* <AccountInfotile  /> */}
          </View>
        </View>
      </View>

      <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />
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
