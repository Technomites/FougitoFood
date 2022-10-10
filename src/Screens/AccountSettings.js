import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Keyboard,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  ProfileUpdate,
  GetProfile,
  clearstatusProfileupdate,
  updateprofilepicture,
  clearimageresponse,
  clearprofileupdationstatus  
} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MYButton from '../Shared/Components/MYButton';
import Animated from 'react-native-reanimated';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {GToastContainer, showToast} from 'react-native-gtoast';
import NetInfo from '@react-native-community/netinfo';
import NumberInput from '../Shared/Components/NumberInput';
import ImagePicker from 'react-native-image-crop-picker';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import Toast from 'react-native-toast-notifications';
const AccountSettings = ({navigation, drawerAnimationStyle}) => {
  const toast = useRef();
  const [Name, setName] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [password, setPassword] = useState('');
  const [newpasswordshow, setnewpasswordshow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [PickImage, setPickImage] = useState('');
  const [imageloader, setimageloader] = useState(false);
  const {
    Lang,
    ProfileInfo,
    profileupdated,
    ProfileImage,
    profilemessage,
    ProfileName,
    ProfileContact,
    ProfileEmail,
    AuthToken,
    LoginCustomer,
    UserUpdateProfileStatus,
    UserUpdateProfileMessage,
    imageupdationstatus
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(false);
    // StatusBar.setBackgroundColor('transparent');
    // StatusBar.setBarStyle('light-content');
  }, []);
  useEffect(() => {
    if(imageupdationstatus != ""){
      if(imageupdationstatus == "Success"){
        toast.current.show('Profile Image Updated Successfully', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        });
      }else{
        toast.current.show('There was an error updating your profile picture. Please try again later', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        });
      }
      dispatch(clearimageresponse())
      dispatch(GetProfile(AuthToken));
      setimageloader(false)
    }
  }, [imageupdationstatus]);

  
  useEffect(() => {
    console.log(
      ProfileEmail,
      ProfileContact,
      ProfileName + 'UpdateProfile UpdateProfile UpdateProfile UpdateProfile',
    );
    setEmailAddress(ProfileEmail);
    setPhoneNumber(ProfileContact);
    setName(ProfileName);
  }, [ProfileEmail, ProfileContact, ProfileName, AuthToken]);

  const postupdatedprofileHandler = () => {
    Keyboard.dismiss();
    if (Name.length === 0) {
      toast.current.show('Enter Name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (EmailAddress.length === 0) {
      toast.current.show('Enter Email Address', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      // NetInfo.fetch().then(state => {
      //   if (state.isConnected == false && state.isInternetReachable == false) {
      //     showToast('Problem with internet connectivity', {
      //       duration: 500,
      //     });
      //     setLoader(false);
      //   } else {
      //     setLoader(true);
      dispatch(ProfileUpdate(Name, EmailAddress, PhoneNumber, AuthToken));
      setLoader(true);
      // }
      // });
    }
  };

  useEffect(() => {
    console.log(UserUpdateProfileStatus, 'AuthTokenAuthToken');
    if (UserUpdateProfileStatus === 'Success') {
      toast.current.show(UserUpdateProfileMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      setLoader(false);

      dispatch(GetProfile(AuthToken));
      dispatch(clearprofileupdationstatus())
    } else if (UserUpdateProfileStatus === 'Error') {
      toast.current.show(UserUpdateProfileMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      setLoader(false);
      dispatch(clearprofileupdationstatus())
    }
    else if (UserUpdateProfileStatus === 'Network Request Failed') {
      toast.current.show('Network Request Failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      setLoader(false);
      dispatch(clearprofileupdationstatus())
    }
  }, [UserUpdateProfileStatus, UserUpdateProfileMessage]);
  // function postupdatedprofile() {
  //   if (Name == '') {
  //     showToast('Enter first name', {
  //       duration: 500,
  //     });
  //   } else if (EmailAddress == '') {
  //     showToast('Enter Email Address', {
  //       duration: 500,
  //     });
  //   } else {
  //     NetInfo.fetch().then(state => {
  //       if (state.isConnected == false && state.isInternetReachable == false) {
  //         showToast('Problem with internet connectivity', {
  //           duration: 500,
  //         });
  //         setLoader(false);
  //       } else {
  //         setLoader(true);
  //         dispatch(
  //           postupdatedprofile(Name, EmailAddress, Password, PhoneNumber),
  //         );
  //       }
  //     });
  //   }
  // }

  const imagePicker = async () => {
    //  let imagePick = [];
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        setPickImage(response.path);
        console.log(response);
        setimageloader(true)
        dispatch(updateprofilepicture(response, AuthToken));
      })
      .catch(e => console.log(e, 'Error'));  
  };
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'rgba(246, 246, 246, 1)'}}>
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
        <PlainHeader title={'Account Settings'} />
        
        {imageloader == true ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: scalableheight.fifteen,
                height: scalableheight.fifteen,
           
                marginTop: scalableheight.three,
                alignSelf:"center"
              }}>
              <ActivityIndicator size={'large'} color="#E14E4E" />
            </View>
          ) : (
        <View
          style={{
            ...styleSheet.shadow,
            borderRadius: fontSize.circle,
            width: scalableheight.fifteen,
            height: scalableheight.fifteen,
            alignSelf: 'center',
            marginTop: scalableheight.three,
            backgroundColor: 'white',
          }}>
          <Image
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderColor: 'rgba(225, 78, 78, 1)',
              borderWidth: scalableheight.borderwidth,
              borderRadius: fontSize.circle,
            }}
            source={
              AuthToken != ''
                ? {
                    uri: ProfileImage,
                  }
                : require('../Resources/images/grill.png')
            }
          />

          <View
            style={{
              backgroundColor: '#E14E4E',
              height: scalableheight.five,
              width: scalableheight.five,
              borderRadius: fontSize.borderradiusmedium,
              bottom: scalableheight.three,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              //    disabled={imageLoader}
              onPress={() => imagePicker()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                //  alignItems:'center',
                padding: scalableheight.one,
              }}>
              {/* {imageLoader ? (
                <ActivityIndicator color={'white'} />
              ) : ( )} */}
              <Icon
                name="camera-outline"
                size={fontSize.twentythree}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
          )}

        <View
          style={{
            paddingHorizontal: scalableheight.two,
            marginVertical: scalableheight.ten,
          }}>
          <View style={{marginBottom: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive,
              }}>
              Full Name
            </Text>

            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={'Enter Full Name'}
              onChangeText={text => setName(text)}
              defaultValue={Name}
            />
          </View>
          <View style={{marginVertical: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive,
              }}>
              Email Address
            </Text>

            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={'Enter Email Address'}
              onChangeText={text => setEmailAddress(text)}
              defaultValue={EmailAddress}
            />
          </View>
          {/* <View style={{marginVertical: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive,
              }}>
              Password
            </Text>

            <View style={{width: '100%'}}>
              <TextInput
                style={{
                  ...styleSheet.TextInput,
                  ...styleSheet.shadow,
                }}
                secureTextEntry={newpasswordshow}
                placeholderTextColor="#8c8c8c"
                placeholder={'Password'}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
              />
              <TouchableOpacity
                onPress={() => {
                  setnewpasswordshow(!newpasswordshow);
                }}
                style={styleSheet.inputIconStyle}>
                <Ionicons
                  color={'#8c8c8c'}
                  name={newpasswordshow ? 'eye-off' : 'eye'}
                  size={fontSize.twentytwo}
                />
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={{marginVertical: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive,
              }}>
              Phone Number
            </Text>
            {/* <View style={styleSheet.container}> */}
            {/* <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <NumberInput
                  ref={phoneInput}
                  value={PhoneNumber}
                  onChangeText={text => {
                    setPhoneNumber(text);
                    if (PhoneNumber.length == 9) {
                      setErrorMessage(
                        "You can't enter a number more then 9 digit",
                      );
                      setErrorModal(true);
                    } else {
                      setPhoneNumber(text);
                    }
                  }}
                />
              </View> */}
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={{
                  ...styleSheet.TextInput,
                  ...styleSheet.shadow,
                  paddingLeft: scalableheight.fourteen,
                  backgroundColor:"#E1E1E1"
                }}
                editable={false}
                keyboardType="numeric"
                placeholderTextColor="#8c8c8c"
                //          placeholder={'Enter Phone Number'}
                onChangeText={text => setPhoneNumber(text)}
                defaultValue={PhoneNumber.substring(3)}
             
              />
              <Image
                style={{
                  height: scalableheight.three,
                  width: scalableheight.four,
                  resizeMode: 'stretch',
                  position: 'absolute',
                  left: scalableheight.one,
                }}
                source={require('../Resources/images/uaeFlag.png')}
              />
              <Text
                style={{
                  color: 'rgba(41, 38, 42, 0.6)',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                  position: 'absolute',
                  left: scalableheight.six,
                }}>
                +971
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: fontSize.eight,
            width: '100%',
            position: 'absolute',
            bottom: scalableheight.two,
            alignSelf: 'center',
            paddingHorizontal: scalableheight.two,
          }}>
          {loader == true ? (
            <View
              style={{
                width: '100%',

                justifyContent: 'center',
                alignItems: 'center',
            
                height: scalableheight.seven,
            
                borderRadius: fontSize.borderradiusmedium,
            
                marginTop: '1%',
                marginBottom: '1%',
              }}>
              <ActivityIndicator size={'large'} color="#E14E4E" />
            </View>
          ) : (
            <MYButton
              onPress={() => {
                // SetModelPopUP(true);
                postupdatedprofileHandler();
              }}
              color={'rgba(225, 78, 78, 1)'}
              title={'UPDATE'}
              textcolor={'white'}
            />
          )}
        </View>
        <Toast
          ref={toast}
          style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
        />
      </View>
    </Animated.View>
  );
};
const styleSheet = StyleSheet.create({
  container: {
    height: scalableheight.six,
    backgroundColor: 'rgba(42, 28, 28, 0.1)',
    width: '100%',
    flexDirection: 'row',
    borderRadius: fontSize.eight,
    marginTop: scalableheight.one,
  },
  textInput: {
    marginLeft: scalableheight.one,

    width: '100%',
    color: 'black',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  TextInput: {
    width: '100%',

    backgroundColor: '#F9F9F9',
    fontSize: fontSize.fifteen,
    color: '#8c8c8c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,
    height: scalableheight.seven,

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
  },
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: scalableheight.one,
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
  },
});
export default AccountSettings;
