import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {eraseNotificationStatus, seticonfocus, updateNotificationStatus} from '../Actions/actions';
import {scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import BottomTab from '../Shared/Components/BottomTab';
import Settingscomponent from '../Shared/Components/Settingscomponent';
import Animated from 'react-native-reanimated';
import { GToastContainer, showToast } from 'react-native-gtoast';
import renderIf from 'render-if';

const Settings = ({navigation, drawerAnimationStyle}) => {

  const dispatch = useDispatch();
  const {Lang, notificationStatus, ProfileInfo} = useSelector(state => state.userReducer);
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
     if( ProfileInfo.allowPushNotifications == true){
      setIsEnabled(true)
     }else{
      setIsEnabled(false)
     }
  
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const toggleSwitch = async () => {
    dispatch(updateNotificationStatus(!isEnabled));
    setIsEnabled(!isEnabled)
  };

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white',}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          flex: 12,
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={Lang == 'en' ? 'Settings' : 'إعدادات'} />
        <View style={{height:scalableheight.three}}>

        </View>

<View style={{paddingHorizontal:scalableheight.two,}}>
{renderIf(ProfileInfo != '')(
  <>
        <TouchableOpacity
          onPress={() => {
         navigation.navigate('AccountInfo')
          }}>
        <Settingscomponent
          title={Lang == 'en' ? 'Account Information' : 'معلومات الحساب'}
          icon={'user-cog'}
        />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Documents');
          }}>
          <Settingscomponent
            title={Lang == 'en' ? 'Documents' : 'وثائق'}
            icon={'file'}
            ionicon= {true}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
         navigation.navigate('Suggestions')
          }}>
        <Settingscomponent
          title={Lang == 'en' ? 'Suggestions' : 'اقتراحات'}
          icon={'chat'}
          newicon ={true}
        />
        </TouchableOpacity>


<TouchableOpacity
          onPress={() => {
         navigation.navigate('Changepassword')
          }}>
        <Settingscomponent
          title={Lang == 'en' ? 'Change Password' : 'غير كلمة السر'}
          icon={'lock'}
        />
        </TouchableOpacity>
        <Settingscomponent
          title={Lang == 'en' ? 'Notification Settings' : 'إعدادات الإشعار'}
          icon={'notifications'}
          notify={'true'}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        />
        </>
        )}
        <Settingscomponent
          title={Lang == 'en' ? 'Language Selection' : 'اختيار اللغة'}
          icon={'language'}
          langtoggle={'true'}
        />
        </View>
  
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <BottomTab />
      
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
