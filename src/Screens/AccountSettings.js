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
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  postupdatedprofile,
  clearprofileupdate,
  getProfileInformation,
  updateprofilepicture,
  clearprofilemessage,
} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MYButton from '../Shared/Components/MYButton';
import Animated from 'react-native-reanimated';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {GToastContainer, showToast} from 'react-native-gtoast';
import NetInfo from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-crop-picker';
import NumberInput from '../Shared/Components/NumberInput';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Icon from 'react-native-vector-icons/Ionicons';
const AccountSettings = ({navigation, drawerAnimationStyle}) => {
  const [Name, setName] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [Password, setPassword] = useState('');
  const [newpasswordshow, setnewpasswordshow] = useState(false);
  const [Loader, setLoader] = useState(false);
  const {Lang, ProfileInfo, profileupdated, profileimage, profilemessage} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
  }, []);

  function UpdateProfile() {
    if (Name == '') {
      showToast('Enter first name', {
        duration: 500,
      });
    } else if (EmailAddress == '') {
      showToast('Enter Email Address', {
        duration: 500,
      });
    } else if (PhoneNumber == '') {
      showToast('enter full name', {
        duration: 500,
      });
    } else if (Password == '') {
      showToast('Enter Password', {
        duration: 500,
      });
    } else {
      NetInfo.fetch().then(state => {
        if (state.isConnected == false && state.isInternetReachable == false) {
          showToast('Problem with internet connectivity', {
            duration: 500,
          });
          setLoader(false);
        } else {
          setLoader(true);
          dispatch(
            postupdatedprofile(Name, EmailAddress, Password, PhoneNumber),
          );
        }
      });
    }
  }

  const imagePicker = async () => {
    let imagePick = [];
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
        dispatch(updateprofilepicture(response));
      })
      .catch(e => console.log(e, 'Error'));
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
        <PlainHeader title={'Account Settings'} />
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
            resizeMode="stretch"
            style={{
              width: '100%',
              height: '100%',

              borderWidth: scalableheight.borderwidth,
              borderRadius: fontSize.circle,
            }}
            source={
              ProfileInfo != ''
                ? {
                    uri: profileimage,
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
              //  disabled={imageLoader}
              onPress={() => imagePicker()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                //  alignItems:'center',
                padding: scalableheight.one,
              }}>
              {/* {imageLoader ? (
                <ActivityIndicator color={'white'} />
              ) : ( */}
              <Icon
                name="camera-outline"
                size={fontSize.twentythree}
                color="#fff"
              />
              {/* )} */}
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              imagePicker();
            }}
            style={{
              backgroundColor: '#C51B83',
              height: scalableheight.four,
              width: scalableheight.four,
              position: 'absolute',
              right: scalableheight.pointfive,
              borderRadius: fontSize.circle,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              color={'white'}
              name="edit"
              size={fontSize.twentyfour}
            />
          </TouchableOpacity> */}
        </View>

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
                marginBottom: scalableheight.pointfive
              }}>
              Full Name
            </Text>
          
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Full Name"}
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
                marginBottom: scalableheight.pointfive
              }}>
              Email Address
            </Text>
          
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Email Address"}
              onChangeText={text => setEmailAddress(text)}
              defaultValue={EmailAddress}
            />
          </View>
          <View style={{marginVertical: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive
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
            defaultValue={Password}
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
          </View>
          <View style={{marginVertical: scalableheight.one}}>
            <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                marginBottom: scalableheight.pointfive
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
              <View style={{justifyContent:"center"}}>
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                paddingLeft: scalableheight.fourteen
              }}
              keyboardType = 'numeric'
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Phone Number"}
              onChangeText={text => setPhoneNumber(text)}
              defaultValue={PhoneNumber}
            />
               <Image
          style={{
            height: scalableheight.three,
            width: scalableheight.four,
            resizeMode: 'stretch',
            position: "absolute",
            left: scalableheight.one,
      
            
     
       
          }}
          source={require('../Resources/images/uaeFlag.png')}
        />
           <Text
              style={{
                color: 'rgba(41, 38, 42, 0.6)',
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                position: "absolute",
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
          <MYButton
            onPress={() => {
              SetModelPopUP(true);
            }}
            color={'rgba(225, 78, 78, 1)'}
            title={'UPDATE'}
            textcolor={'white'}
          />
        </View>
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
  
    backgroundColor:'#F9F9F9',
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

    marginTop:  scalableheight.one,
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
  },
  
});
export default AccountSettings;
