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
  const {Lang, notificationStatus, ProfileInfo} = useSelector(
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (ProfileInfo.allowPushNotifications == true) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const toggleSwitch = async () => {
    dispatch(updateNotificationStatus(!isEnabled));
    setIsEnabled(!isEnabled);
  };

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
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
            <Image
              style={{
                height: scalableheight.fifteen,
                width: scalableheight.fifteen,
                borderRadius: scalableheight.twenty,
                resizeMode: 'contain',

                // marginBottom: scalableheight.one,
              }}
              source={{
                uri:
                  // userInfo?.Result?.Logo === null ||
                  // userInfo?.Result?.Logo === ''
                  //?
                  'https://img.freepik.com/free-vector/automotive-auto-repair-logo_160069-1.jpg',
                // : userInfo?.Result?.Logo,
              }}
            />
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
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}>
          <View style={{padding: scalableheight.two}}>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
    shadowRadius: 18,
  },
});
export default Settings;
