import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  Keyboard,
} from 'react-native';


import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import {
  Login,
  Signup,
  Verification,
  ReVerification,
  ForgetPassword,
  ChangedPassword,
  ForgetPasswordNullstate,
  OTPNullstate,
  signupnullstate,
  LoginStateNull,
  ResetpasswordChangednull,
} from '../../Actions/actions';

import MYButton from './MYButton';
import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-notifications';
export default function AuthenticationModel(props) {
  const toast = useRef();
  const [number, setnumber] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, Setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, Setconfirmpassword] = useState('');
  const [newpasswordshow, setnewpasswordshow] = useState(false);
  const [inscreenanimation, setinscreenanimation] = useState(false);
  const [loginvisible, setloginvisible] = useState(true);
  const [signupvisible, setsignupvisible] = useState(false);
  const [changenewpassword, setchangenewpassword] = useState(false);
  const [otpvisible, setotpvisible] = useState(false);
  const [timeractive, settimeractive] = useState(false);
  const [showtimer, setShowTimer] = useState(false);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [loader, setLoader] = useState(false);

  const [forgetpasswordvisible, setforgetpasswordvisible] = useState(false);
  const [animationstate, setanimationstate] = useState(false);
  const [codeOneActive, setCodeOneActive] = useState(false);
  const [codeTwoActive, setCodeTwoActive] = useState(false);
  const [codeThreeActive, setCodeThreeActive] = useState(false);
  const [codeFourActive, setCodeFourActive] = useState(false);
  const [codeOne, setCodeOne] = useState('');
  const [codeTwo, setCodeTwo] = useState('');
  const [codeThree, setCodeThree] = useState('');
  const [codeFour, setCodeFour] = useState('');
  const [prevscreen, setprevscreen] = useState('');
  const [Otp, SetOtp] = useState('');
  const input_1 = useRef();
  const input_2 = useRef();
  const input_3 = useRef();
  const input_4 = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    //  AuthToken,
    SignupRandomid,
    PasswordMessage,
    ErrorResultMessage,
    SuccessMessageForgetpassword,
    PayLoadLoginStatus,
    OtpVerificationStatus,
    Reset_PasswordStatus,
    MessagePasswordStatus,
    signupStatus,
    signupmessage,
  } = useSelector(state => state.userReducer);

  //Login
  useEffect(() => {
    console.log(PayLoadLoginStatus, 'AuthTokenAuthToken');
    if (PayLoadLoginStatus === 'Success') {
      toast.current.show('Login SuccessFully', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      dispatch(LoginStateNull());
      clearandclose();
      setLoader(false);
    } else if (PayLoadLoginStatus === 'Error') {
      toast.current.show('Invalid Credentials', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(LoginStateNull());
      setLoader(false);
    } else if (PayLoadLoginStatus === 'Network request failed') {
      toast.current.show('Network request failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      dispatch(LoginStateNull());
      setLoader(false);
    }
  }, [PayLoadLoginStatus]);

  const LoginHandler = () => {
    Keyboard.dismiss();
    if (number.length === 0) {
      toast.current.show('Enter Phone Number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (password.length === 0) {
      toast.current.show('Enter Password', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      let newnumber = 971 + number;
      dispatch(Login(newnumber, password));
      setLoader(true);
    }
  };

  //proceed
  useEffect(() => {
    console.log(PasswordMessage, 'AuthTokenAuthToken');
    if (PasswordMessage === 'Success') {
      toast.current.show('OTP Generated', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      console.log('FAKE FAL+KE');
      setLoader(false);
      setprevscreen('ForgotPassword');
      togglescreen(4);
      dispatch(ForgetPasswordNullstate());
    } else if (PasswordMessage === 'Error') {
      toast.current.show('Invalid Phone Number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('FAKE FAL+KE');
      setLoader(false);
      dispatch(ForgetPasswordNullstate());
    } else if (PasswordMessage === 'Network Request Failed') {
      toast.current.show('Network Request Failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('FAKE FAL+KE');
      setLoader(false);
      dispatch(ForgetPasswordNullstate());
    }
  }, [PasswordMessage]);

  //OTP VERIFY
  useEffect(() => {
    console.log('hello', 'AuthTokenAuthToken');
    console.log(OtpVerificationStatus, 'AuthTokenAuthToken');
    if (OtpVerificationStatus === 'Success') {
      toast.current.show('OTP Verified', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      setLoader(false);
      setCodeOne('');
      setCodeTwo('');
      setCodeThree('');
      setCodeFour('');

      if (prevscreen == 'ForgotPassword') {
        togglescreen(5);
      } else {
        togglescreen(1);
      }

      dispatch(OTPNullstate());
    } else {
      if (OtpVerificationStatus != '') {
        toast.current.show(OtpVerificationStatus, {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
      }
      console.log('OTP has been expired');
      setCodeOne('');
      setCodeTwo('');
      setCodeThree('');
      setCodeFour('');
      setLoader(false);
      dispatch(OTPNullstate());
    }
  }, [OtpVerificationStatus]);

  // signup
  useEffect(() => {
    console.log(signupStatus, signupmessage, 'AuthTokenAuthToken');
    if (signupStatus === 'Success') {
      toast.current.show(signupmessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      setLoader(false);
      setprevscreen('Signup');
      togglescreen(4);
      dispatch(signupnullstate());
    } else if (signupStatus === 'Error') {
      toast.current.show(signupmessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });

      setLoader(false);
      dispatch(signupnullstate());
    } else if (signupStatus === 'Network Request Failed') {
      toast.current.show(signupmessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });

      setLoader(false);
      dispatch(signupnullstate());
    }
  }, [signupStatus, signupmessage]);

  // Change Password
  useEffect(() => {
    console.log(
      Reset_PasswordStatus,
      'hhih',
      MessagePasswordStatus,

      'CHANGE PASSWORD as',
    );
    if (Reset_PasswordStatus === 'Success') {
      toast.current.show(MessagePasswordStatus, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      setLoader(false);
      togglescreen(1);
      setpassword('');
      Setconfirmpassword('');
      dispatch(ResetpasswordChangednull());
    } else if (Reset_PasswordStatus === 'Error') {
      toast.current.show(MessagePasswordStatus, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      setLoader(false);
      dispatch(ResetpasswordChangednull());
    } else if (Reset_PasswordStatus === 'Network Request Failed') {
      toast.current.show('Network Request Failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      setLoader(false);
      dispatch(ResetpasswordChangednull());
    }
  }, [Reset_PasswordStatus, MessagePasswordStatus]);

  const signUpHandler = async () => {
    Keyboard.dismiss();
    if (number == '') {
      toast.current.show('Enter Phone Number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (fullname == '') {
      toast.current.show('Enter Full Name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (email == '') {
      toast.current.show('Enter Email Address', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (password == '') {
      toast.current.show('Enter Password', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (confirmpassword == '') {
      toast.current.show('Enter Confirm Password', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (number.length == 0) {
      toast.current.show('Enter Phone Number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      return;
    } else if (email.indexOf(' ') >= 0) {
      toast.current.show('Enter Email', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else if (password != confirmpassword) {
      toast.current.show('Passwords do not match', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      return;
    } else {
      let newnumber = 971 + number;
      dispatch(Signup(newnumber, fullname, email, password));
      setLoader(true);
    }
  };

  const VerifyOTP = val => {
    Keyboard.dismiss();
    const otp = codeOne + codeTwo + codeThree + val;
    console.log(otp, 'abbbcbcb');

    if (
      codeOne.length === 0 ||
      codeTwo.length === 0 ||
      codeThree.length === 0 ||
      val.length === 0
    ) {
      toast.current.show('Enter OTP Code', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      console.log('else');
      const otp = codeOne + codeTwo + codeThree + val;
      console.log(SignupRandomid, 'otpotpotpotpotpotpotpotpotpotpotpotpotpotp');

      if (SignupRandomid != '' && SignupRandomid != undefined) {
        dispatch(Verification(otp, SignupRandomid));
        console.log(otp, SignupRandomid, 'OTP CODE 4 DiGIT');
        console.log('if inner');
        // togglescreen(5);
      }
      setLoader(true);
    }
  };

  const ReVerifyOTP = () => {
    // Keyboard.dismiss();
    if (number != '') {
      dispatch(ReVerification(number));
      console.log(number, 'ReVerification ReVerification');
    } else {
      console.log('number Required');
    }
  };

  const ForgetPasswordHandler = () => {
    Keyboard.dismiss();
    if (number.length === 0) {
      toast.current.show('Enter Phone Number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      let newnumber = 971 + number;
      dispatch(ForgetPassword(newnumber));
      setLoader(true);
    }
  };

  const ChangedPasswordHandler = () => {
    Keyboard.dismiss();
    if (password == '' || confirmpassword == '') {
      toast.current.show('Enter All Fields', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      return;
    } else if (password != confirmpassword) {
      toast.current.show('Password Not Matched', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      return;
    } else {
      setLoader(true);
      dispatch(ChangedPassword(SignupRandomid, password, confirmpassword));
    }
  };

  function toggleanimation() {
    if (animationtype == 'fadeInUpBig') {
      setanimationtype('fadeOutDownBig');
    } else {
      setanimationtype('fadeInUpBig');
    }
  }

  useEffect(() => {
    if (props.state == true) {
      setanimationstate(true);
    }
  }, [props.state]);

  function clearandclose() {
    // props.togglemodel();
    toggleanimation();
    setanimationstate(true);
    setnumber('');
    Setemail('');
    Setconfirmpassword('');
    setfullname('');
    setpassword('');
    setnewpasswordshow(false);
    setloginvisible(true);
    setsignupvisible(false);
    setotpvisible(false);
    settimeractive(false);
    setforgetpasswordvisible(false);
    setchangenewpassword(false);
    setCodeOneActive(false);
    setCodeTwoActive(false);
    setCodeOne('');
    setCodeTwo('');
    setCodeThree('');
    setCodeFour('');
  
  }

  function togglescreen(index) {
    setinscreenanimation(true);

    if (index == 1) {
      setsignupvisible(false);
      setotpvisible(false);
      setforgetpasswordvisible(false);
      setchangenewpassword(false);
      setloginvisible(true);
    } else if (index == 2) {
      setloginvisible(false);
      setotpvisible(false);
      setforgetpasswordvisible(false);
      setchangenewpassword(false);
      setsignupvisible(true);
    } else if (index == 3) {
      setsignupvisible(false);
      setotpvisible(false);
      setloginvisible(false);
      setforgetpasswordvisible(true);
      setchangenewpassword(false);
    } else if (index == 4) {
      setsignupvisible(false);

      setloginvisible(false);
      setforgetpasswordvisible(false);
      setotpvisible(true);
      setchangenewpassword(false);

      // setTimeout(async () => {
      //   input_1.current.focus();
      // }, 500);
    } else if (index == 5) {
      setsignupvisible(false);
      setotpvisible(false);
      setloginvisible(false);
      setforgetpasswordvisible(false);
      setchangenewpassword(true);
    }
  }

  return (
    <>
      {props.state && (
        <Animatable.View
          animation={animationstate ? animationtype : null}
          onAnimationEnd={() => {
            setanimationstate(false);
            if (animationtype == 'fadeOutDownBig') {
              setanimationtype('fadeInUpBig');
 
              props.togglemodel();
            }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            zIndex: 3,
            elevation: 3,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
        {/* // <View
        //   style={{
        //     zIndex: 3,
        //     elevation: 3,
        //     position: 'absolute',
        //     width: '100%',
        //     height: '100%',
        //   }}> */}
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  height: '90%',
                  borderRadius: fontSize.eleven,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{width: '100%', height: signupvisible ? '0%' : '40%'}}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: fontSize.eleven,
                    }}
                    source={require('../../Resources/images/loginpicturewhite.png')}
                  />
                  <Image
                    resizeMode="contain"
                    style={{
                      width: scalableheight.twentytwo,
                      height: scalableheight.six,
                      position: 'absolute',
                      bottom: scalableheight.three,
                      alignSelf: 'center',
                    }}
                    source={require('../../Resources/images/logo-black.png')}
                  />
                </View>

                <ScrollView
                  keyboardShouldPersistTaps={'always'}
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: '100%',
                    height: signupvisible ? '100%' : '60%',
                  }}
                  contentContainerStyle={{
                    ...styleSheet.scrollcontainer,
                    paddingHorizontal: scalableheight.two,
                    justifyContent: 'center',
                    // flexGrow: signupvisible ? 1 : null,
                  }}>
                  {loginvisible == true &&
                    <>
                      <Animatable.View
                        animation={
                          inscreenanimation ? 'bounceInRight' : undefined
                        }
                        onAnimationEnd={() => {
                          setinscreenanimation(false);
                        }}
                        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
                        //animation="bounceInRight"
                        easing="ease"
                        // iterationCount="infinite"
                        iterationCount={1}
                        style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.twentytwo,
                            color: 'black',
                          }}>
                          Login
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Phone Number
                        </Text>
                        <View>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                              paddingLeft: scalableheight.ten,
                            }}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Enter number here'}
                            maxLength={9}
                            onChangeText={text => setnumber(text)}
                            defaultValue={number}
                            keyboardType="number-pad"
                          />
                          <View
                            style={{
                              position: 'absolute',
                              left: scalableheight.two,

                              marginTop: scalableheight.one,
                              // borderWidth:1, borderColor:"red",
                              height: scalableheight.seven,

                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: fontSize.fifteen,
                                color: '#8c8c8c',
                              }}>
                              + 971
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={!newpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Enter password here'}
                            onChangeText={text => setpassword(text)}
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
                        <TouchableOpacity
                          onPress={() => {
                            togglescreen(3);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text4,
                              textAlign: 'right',
                              marginTop: scalableheight.one,
                              marginBottom: scalableheight.two,
                            }}>
                            FORGOT PASSWORD
                          </Text>
                        </TouchableOpacity>
                        {loader == true ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'LOGIN'}
                            onPress={() => {
                              LoginHandler();
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            togglescreen(2);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text6,
                              textAlign: 'center',
                              marginTop: scalableheight.two,
                            }}>
                            Dont have an account?
                          </Text>
                          <Text
                            style={{...styleSheet.Text4, textAlign: 'center'}}>
                            SIGN UP
                          </Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    </>
                  }
                  {signupvisible == true &&
                    <>
                      <Animatable.View
                        animation={
                          inscreenanimation ? 'bounceInRight' : undefined
                        }
                        onAnimationEnd={() => {
                          setinscreenanimation(false);
                        }}
                        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
                        //animation="bounceInRight"
                        easing="ease"
                        // iterationCount="infinite"
                        iterationCount={1}
                        style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.twentytwo,
                            color: 'black',
                          }}>
                          Sign Up
                        </Text>

                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Full Name
                        </Text>
                        <TextInput
                          style={{
                            ...styleSheet.TextInput,
                            ...styleSheet.shadow,
                          }}
                          placeholderTextColor="#8c8c8c"
                          placeholder={'Enter full name'}
                          onChangeText={text => setfullname(text)}
                          defaultValue={fullname}
                        />
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Email
                        </Text>
                        <TextInput
                          style={{
                            ...styleSheet.TextInput,
                            ...styleSheet.shadow,
                          }}
                          placeholderTextColor="#8c8c8c"
                          placeholder={'Enter email address'}
                          onChangeText={text => Setemail(text)}
                          defaultValue={email}
                        />
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Phone Number
                        </Text>
                        <View>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                              paddingLeft: scalableheight.ten,
                            }}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Enter number here'}
                            maxLength={9}
                            onChangeText={text => setnumber(text)}
                            keyboardType={'number-pad'}
                            defaultValue={number}
                          />

                          <View
                            style={{
                              position: 'absolute',
                              left: scalableheight.two,

                              marginTop: scalableheight.one,
                              // borderWidth:1, borderColor:"red",
                              height: scalableheight.seven,

                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: fontSize.fifteen,
                                color: '#8c8c8c',
                              }}>
                              + 971
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={!newpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Enter password here'}
                            onChangeText={text => setpassword(text)}
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
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Confirm Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={!newpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Confirm password here'}
                            onChangeText={text => Setconfirmpassword(text)}
                            defaultValue={confirmpassword}
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

                        <View style={{marginTop: scalableheight.two}}></View>

                        {loader == true ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'PROCEED'}
                            onPress={() => {
                              signUpHandler();
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            togglescreen(1);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text6,
                              textAlign: 'center',
                              marginTop: scalableheight.two,
                            }}>
                            Already have an account?
                          </Text>
                          <Text
                            style={{...styleSheet.Text4, textAlign: 'center'}}>
                            LOGIN
                          </Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    </>
                  }
                  {forgetpasswordvisible == true &&
                    <>
                      <Animatable.View
                        animation={
                          inscreenanimation ? 'bounceInRight' : undefined
                        }
                        onAnimationEnd={() => {
                          setinscreenanimation(false);
                        }}
                        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
                        //animation="bounceInRight"
                        easing="ease"
                        // iterationCount="infinite"
                        iterationCount={1}
                        style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.twentytwo,
                            color: 'black',
                          }}>
                          Forgot Password
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text6,
                            textAlign: 'left',
                            marginTop: scalableheight.two,
                          }}>
                          Enter the phone number associated with your account.
                          We will send a verification for confirmation.
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Phone Number
                        </Text>
                        <View>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                              paddingLeft: scalableheight.ten,
                            }}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Enter number here'}
                            maxLength={9}
                            onChangeText={text => setnumber(text)}
                            defaultValue={number}
                            keyboardType="numeric"
                          />
                          <View
                            style={{
                              position: 'absolute',
                              left: scalableheight.two,

                              marginTop: scalableheight.one,
                              // borderWidth:1, borderColor:"red",
                              height: scalableheight.seven,

                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: fontSize.fifteen,
                                color: '#8c8c8c',
                              }}>
                              + 971
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: scalableheight.two}}></View>
                        {loader == true ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'PROCEED'}
                            onPress={() => {
                              ForgetPasswordHandler();
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}

                        {/* <TouchableOpacity
                          onPress={() => {
                            togglescreen(1);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text4,
                              textAlign: 'center',
                              marginTop: scalableheight.one,
                            }}>
                            Login with a different account?
                          </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            togglescreen(1);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text6,
                              textAlign: 'center',
                              marginTop: scalableheight.two,
                            }}>
                            Login with a different account?
                          </Text>
                          <Text
                            style={{...styleSheet.Text4, textAlign: 'center'}}>
                            LOGIN
                          </Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    </>
                  }
                  {otpvisible == true &&
                    <>
                      <Animatable.View
                        animation={
                          inscreenanimation ? 'bounceInRight' : undefined
                        }
                        onAnimationEnd={() => {
                          setinscreenanimation(false);
                        }}
                        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
                        //animation="bounceInRight"
                        easing="ease"
                        // iterationCount="infinite"
                        iterationCount={1}
                        style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.twentytwo,
                            color: 'black',
                          }}>
                          Verification
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text6,
                            textAlign: 'left',
                            marginTop: scalableheight.one,
                          }}>
                          A verification code was sent to your number{' '}
                          <Text
                            style={{
                              fontFamily: 'Inter-SemiBold',
                              fontSize: fontSize.fourteen,
                              color: '#E14E4E',
                            }}>
                            {'+971 ' + number}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                            marginBottom: scalableheight.one,
                          }}>
                          OTP Code
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <TextInput
                              ref={input_1}
                              style={[
                                styleSheet.inputStyle,
                                {
                                  backgroundColor:
                                    codeOneActive || codeOne !== ''
                                      ? '#F5F5F5'
                                      : 'transparent',
                                },
                              ]}
                              value={codeOne}
                              placeholder={''}
                              placeholderTextColor={'#A0A0A0'}
                              placeholderStyle={styleSheet.placeholderStyle}
                              onChangeText={val => {
                                setCodeOne(val);
                                if (val != '') input_2.current.focus();
                              }}
                              maxLength={1}
                              keyboardType="numeric"
                              onFocus={() => setCodeOneActive(true)}
                              onBlur={() => setCodeOneActive(false)}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: '4%',
                            }}>
                            <TextInput
                              ref={input_2}
                              style={[
                                styleSheet.inputStyle,
                                {
                                  backgroundColor:
                                    codeTwoActive || codeTwo !== ''
                                      ? '#F5F5F5'
                                      : 'transparent',
                                },
                              ]}
                              value={codeTwo}
                              placeholder={''}
                              placeholderTextColor={'#A0A0A0'}
                              maxLength={1}
                              keyboardType="numeric"
                              placeholderStyle={styleSheet.placeholderStyle}
                              onChangeText={val => {
                                setCodeTwo(val);
                                if (val != '') input_3.current.focus();
                              }}
                              onFocus={() => setCodeTwoActive(true)}
                              onBlur={() => setCodeTwoActive(false)}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: '4%',
                            }}>
                            <TextInput
                              ref={input_3}
                              style={[
                                styleSheet.inputStyle,
                                {
                                  backgroundColor:
                                    codeThreeActive || codeThree !== ''
                                      ? '#F5F5F5'
                                      : 'transparent',
                                },
                              ]}
                              value={codeThree}
                              placeholder={''}
                              maxLength={1}
                              keyboardType="numeric"
                              placeholderTextColor={'#A0A0A0'}
                              placeholderStyle={styleSheet.placeholderStyle}
                              onChangeText={val => {
                                setCodeThree(val);
                                if (val != '') input_4.current.focus();
                              }}
                              onFocus={() => setCodeThreeActive(true)}
                              onBlur={() => setCodeThreeActive(false)}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: '4%',
                            }}>
                            <TextInput
                              ref={input_4}
                              style={[
                                styleSheet.inputStyle,
                                {
                                  backgroundColor:
                                    codeFourActive || codeFour !== ''
                                      ? '#F5F5F5'
                                      : 'transparent',
                                },
                              ]}
                              value={codeFour}
                              placeholder={''}
                              maxLength={1}
                              keyboardType="numeric"
                              placeholderTextColor={'#A0A0A0'}
                              placeholderStyle={styleSheet.placeholderStyle}
                              onChangeText={val => {
                                setCodeFour(val);
                                if (val != '') VerifyOTP(val);
                              }}
                              // onChangeText={val => setCodeFour(val)}
                              onFocus={() => setCodeFourActive(true)}
                              onBlur={() => setCodeFourActive(false)}
                            />
                          </View>
                        </View>

                        <View style={{marginTop: scalableheight.two}}></View>
                        {loader == true ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'VERIFY'}
                            onPress={() => {
                              VerifyOTP();
                              // togglescreen(5);
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}
                        {loader != true && (
                          <>
                            {showtimer == true ? (
                              <TouchableOpacity
                                onPress={() => {
                                  ReVerifyOTP();
                                  setShowTimer(false);
                                }}>
                                <Text
                                  style={{
                                    ...styleSheet.Text4,
                                    textAlign: 'center',
                                    marginTop: scalableheight.one,
                                  }}>
                                  RESEND CODE
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                            <View
                              style={{marginTop: scalableheight.one}}></View>
                            {showtimer == false ? (
                              <CountDown
                                onFinish={() => {
                                  settimeractive(false), setShowTimer(true);
                                }}
                                until={120}
                                size={fontSize.fourteen}
                                timeToShow={['M', 'S']}
                                timeLabels={{m: 'Min', s: 'Sec'}}
                                digitStyle={{backgroundColor: '#E14E4E'}}
                                digitTxtStyle={{color: 'white'}}
                                timeLabelStyle={{color: 'white'}}
                              />
                            ) : null}
                          </>
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            togglescreen(1);
                          }}>
                          <Text
                            style={{
                              ...styleSheet.Text6,
                              textAlign: 'center',
                              marginTop: scalableheight.two,
                            }}>
                            Already have an account?
                          </Text>
                          <Text
                            style={{...styleSheet.Text4, textAlign: 'center'}}>
                            LOGIN
                          </Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    </>
                  }
                  {changenewpassword == true &&
                    <>
                      <Animatable.View
                        animation={
                          inscreenanimation ? 'bounceInRight' : undefined
                        }
                        onAnimationEnd={() => {
                          setinscreenanimation(false);
                        }}
                        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
                        //animation="bounceInRight"
                        easing="ease"
                        // iterationCount="infinite"
                        iterationCount={1}
                        style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.twentytwo,
                            color: 'black',
                          }}>
                          Change Password
                        </Text>

                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
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
                            onChangeText={text => setpassword(text)}
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
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Confirm Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={newpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Confirm Password'}
                            onChangeText={text => Setconfirmpassword(text)}
                            defaultValue={confirmpassword}
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

                        <View style={{marginTop: scalableheight.two}}></View>
                        {loader == true ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color="#E14E4E" />
                          </View>
                        ) : (
                          <MYButton
                            title={'Change Password'}
                            onPress={() => {
                              ChangedPasswordHandler();
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}
                      </Animatable.View>
                    </>
                  }
                </ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    clearandclose();
                  }}
                  style={{
                    position: 'absolute',
                    top: scalableheight.one,
                    right: scalableheight.one,
                  }}>
                  <Ionicons
                    name="close-circle"
                    color={signupvisible ? '#E14E4E' : '#F5F5F5'}
                    size={fontSize.thirtyseven}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        {/* // </View> */}
        </Animatable.View>
      )}

      {/* {props.state && animationtype == 'fadeInUpBig' && ( */}
      {props.state && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 2,
            elevation: 2,
          }}></View>
      )}
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </>
  );
}

const styleSheet = StyleSheet.create({
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
    fontSize: fontSize.thirteen,
    color: '#E14E4E',
  },
  Text5: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.thirteen,
    color: 'black',
    opacity: 0.4,
  },

  Text6: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color: 'black',
    opacity: 0.8,
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twenty,
    color: '#000000',
    borderRadius: fontSize.eleven,

    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: scalableheight.one,
    borderWidth: scalableheight.borderTopWidth,
    borderColor: 'rgba(211,211,211, 0.6)',
    padding: scalableheight.onepointfive,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twelve,
  },

  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
  },
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.pointfive,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: scalableheight.one,
    height: scalableheight.seven,
    paddingHorizontal: scalableheight.two,
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
    elevation: 3,
  },
  scrollcontainer: {flexGrow: 1, paddingVertical: scalableheight.two},
  // TextInput: {
  //   width: '95%',
  //   backgroundColor: '#F5F5F5',
  //   fontSize: fontSize.fifteen,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: fontSize.eleven,
  //   height: scalableheight.seven,
  //   color: '#8c8c8c',

  //   paddingHorizontal: scalableheight.two,
  //   alignSelf: 'center',
  //   marginTop: '4%',
  // },
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
    marginTop: scalableheight.one,
  },
  shadow: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
});
