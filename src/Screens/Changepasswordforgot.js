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
  KeyboardAvoidingView
} from 'react-native';

import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {fontSize, scalableheight} from '../Utilities/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {GToastContainer, showToast} from 'react-native-gtoast';
import NetInfo from '@react-native-community/netinfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {forgotpassword, forgotpasswordreset, createnewpassword, newpasswordreset} from '../Actions/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import BottomTab from '../Shared/Components/BottomTab';
import Settingscomponent from '../Shared/Components/Settingscomponent';
import CustomButton from '../Shared/Components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import Animated from 'react-native-reanimated';
import { FontFamily } from '../constants/fonts';
import { theme } from '../constants/styles';
const Changepasswordforgot = ({navigation, route}) => {
    const [passwordActive, setPasswordActive] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordshow, setpasswordshow]  = useState(true);

    const [confirmpasswordActive, setconfirmpasswordActive] = useState(false);
    const [confirmpassword, setconfirmpassword] = useState('');
    const [confirmpasswordshow, setconfirmpasswordshow] = useState(true);
   
 
    const [Loader, setLoader] = useState(false);
  const {Lang, newpasswordstatus, newpasswordmessage} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const phonenumber = route?.params?.phoneNumber;
  const pin = route?.params?.pin;
  const otp = route?.params?.otp;

  useEffect(() => {
  if(newpasswordstatus == "success"){
    showToast(newpasswordmessage, {
      duration: 500,
    });

    setTimeout(async () => {
      navigation.navigate("Login")
      dispatch(newpasswordreset())

    }, 2000);
 
  }else{
    if(newpasswordmessage != ""){
      showToast(newpasswordmessage, {
        duration: 500,
      });
      dispatch(newpasswordreset())
    }
  
  }
  setLoader(false);
}, [newpasswordstatus]);

  function updatepassword(){
  

    if (password == '') {
        showToast(
          Lang == 'en' ? 'Please enter password.' : "الرجاء إدخال كلمة المرور",
          {
            duration: 500,
          },
        );
      } else if (confirmpassword == '') {
        showToast(
          Lang == 'en' ? 'Please re enter your password in confirm password field.' : "الرجاء إعادة إدخال كلمة المرور الخاصة بك في حقل تأكيد كلمة المرور.",
          {
            duration: 500,
          },
        );
      }  else if (password != confirmpassword) {
        showToast(
          Lang == 'en' ? 'The passwords do not match.' : 'كلمات السر لا تتطابق.',
          {
            duration: 500,
          },
        );
      } 
      
      else {
        NetInfo.fetch().then(state => {
          if (state.isConnected == false && state.isInternetReachable == false) {
            showToast('Problem with internet connectivity', {
              duration: 500,
            });
     
          } else {
            setLoader(true);
           dispatch(createnewpassword(phonenumber, password,otp,  pin.substring(1)))
          }
        });
      }
  }
  return (
    <KeyboardAvoidingView
    style={{width:"100%", height:"100%"}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
    <ImageBackground
    resizeMode= "stretch"
    style={styleSheet.backgroundImageStyle}
    source={require('../Resources/images/loginpicture.png')}
>
<TouchableOpacity 
             onPress={() => {
                
                navigation.goBack()
                }}
            style={styleSheet.backButtonMain}>
                  {/* <MaterialIcons
              style={{  alignSelf:"center"}}
          name="keyboard-arrow-left"
       color={"black"}
          size={fontSize.twentythree}
        
        /> */}
           <View style={styleSheet.backButtonInner}>
          <Ionicons
            color={'#FFF'}
            name="chevron-back"
            size={fontSize.twenty}
          />
        </View>
            </TouchableOpacity>
    
       

{/* <Image
                resizeMode= "contain"
                style={styleSheet.imageStyle}
                source={require('../Resources/images/GettingStartedLogo.png')}            /> */}
            <Text style={styleSheet.mainTextStyle}>
                 {Lang == "en" ? "Change Password" : "غير كلمة السر"}
            </Text>
            <Text style={styleSheet.innerTextStyle}>
            {Lang == "en" ? "Enter the new password you would like to associated with your account. We will redirect you to the login screen once your password is successfully updated." : "أدخل كلمة المرور الجديدة التي ترغب في ربطها بحسابك. سنعيد توجيهك إلى شاشة تسجيل الدخول بمجرد تحديث كلمة المرور الخاصة بك بنجاح."}
            </Text>
<View style={{position:"absolute", bottom:"2%", width:"100%", alignSelf:"center"}}>
            <View style={{position: 'relative', width: '100%'}}>
            <TextInput
              style={[
                styleSheet.inputStyle,
                {
                  backgroundColor:
                    passwordActive || password !== '' ? '#FFF' : 'transparent',
                },
              ]}
              value={password}
              secureTextEntry={passwordshow}
              placeholder={'Password'}
              placeholderTextColor={'#A0A0A0'}
              placeholderStyle={styleSheet.placeholderStyle}
              onChangeText={val => setPassword(val)}
              onFocus={() => setPasswordActive(true)}
              onBlur={() => setPasswordActive(false)}
            />
            <TouchableOpacity
            onPress={()=>{setpasswordshow(!passwordshow)}}
            style={styleSheet.inputIconStyle}>
                   {passwordshow == true ?
              <Ionicons
                color={'#818181'}
                name="md-eye-outline"
                size={fontSize.twentytwo}
              />: 
              <Ionicons
              color={'#818181'}
              name="md-eye-off-sharp"
              size={fontSize.twentytwo}
            />
            }
            </TouchableOpacity>
          </View>

          <View style={{position: 'relative', width: '100%', marginTop:"5%", marginBottom:"5%"}}>
            <TextInput
              style={[
                styleSheet.inputStyle,
                {
                  backgroundColor:
                  confirmpasswordActive || confirmpassword !== '' ? '#FFF' : 'transparent',
                },
              ]}
              value={confirmpassword}
              secureTextEntry={confirmpasswordshow}
              placeholder={'Confirm Password'}
              placeholderTextColor={'#A0A0A0'}
              placeholderStyle={styleSheet.placeholderStyle}
              onChangeText={val => setconfirmpassword(val)}
              onFocus={() => setconfirmpasswordActive(true)}
              onBlur={() => setconfirmpasswordActive(false)}
            />
            <TouchableOpacity
            onPress={()=>{setconfirmpasswordshow(!confirmpasswordshow)}}
            style={styleSheet.inputIconStyle}>
              {confirmpasswordshow == true ?
              <Ionicons
                color={'#818181'}
                name="md-eye-outline"
                size={fontSize.twentytwo}
              />: 
              <Ionicons
              color={'#818181'}
              name="md-eye-off-sharp"
              size={fontSize.twentytwo}
            />
            }


            </TouchableOpacity>
          </View>
            <CustomButton 
            Loading={Loader}
                title=        {Lang == "en" ? "Update" : "تحديث"}
                customButtonStyle={{marginTop:scalableheight.two}}
                onPress={() => {
     updatepassword()
                  
                    }}
            />
            </View>
                        
    </ImageBackground>
    </KeyboardAvoidingView>
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
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,
  
    justifyContent: 'center',
    alignSelf:"center",
  
    marginTop: '4%',
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
},
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scalableheight.two,
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
  TextInput: {
    width: '95%',
    backgroundColor: '#F5F5F5',
    fontSize: fontSize.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.eleven,
    height: scalableheight.seven,
    color: '#8c8c8c',
 
    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: '4%',
  },
  backButtonMain: {
    position: 'absolute',
    top: scalableheight.four,
    left: 0,
    paddingLeft: scalableheight.two,
    paddingRight: scalableheight.three,
    paddingVertical: scalableheight.two,
  },

backButtonInner: {
    backgroundColor: '#727574',
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.fifteen,
    color: '#000000',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: scalableheight.two,

    justifyContent: 'center',
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 1,
    height: scalableheight.seven,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
  },
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    width: "85%",
    height: scalableheight.twentysix,
    // marginBottom: "10%",
    alignSelf: 'center',
},
mainTextStyle: {
    fontFamily: FontFamily.mediumFont,
    color: theme.color.white, 
    fontSize: fontSize.twentyfour, 
    textAlign: "center", 
    marginBottom: "6%",
},
innerTextStyle: {
    fontFamily: FontFamily.regularFont,
    color: "#E6E3E3", 
    fontSize:fontSize.fourteen,
    textAlign: "center", 
 
    marginBottom: scalableheight.ten,
},
});
export default Changepasswordforgot;
