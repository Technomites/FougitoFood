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

import renderIf from 'render-if';

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
  } = useSelector(state => state.userReducer);



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
      clearandclose();
      console.log(' clearandclose();');
      setLoader(false);
    } else if (PayLoadLoginStatus === 'Error') {
      toast.current.show('Password/PhoneNumber Invalid', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('LOGIN ERROROROOROROORO');
      setLoader(false);
    }
  }, [PayLoadLoginStatus]);

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
      togglescreen(4);
      dispatch(ForgetPasswordNullstate());
    } else if (PasswordMessage === 'Error') {
      toast.current.show('PhoneNumber Invalid', {
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
      togglescreen(5);
      dispatch(OTPNullstate());
    } else if (OtpVerificationStatus === 'Error') {
      toast.current.show('OTP has been expired', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      console.log('OTP has been expired');
      setLoader(false);
      dispatch(OTPNullstate());
    }
  }, [OtpVerificationStatus]);

  const signUpHandler = async () => {
    Keyboard.dismiss();
    if (
      number == '' ||
      fullname == '' ||
      email == '' ||
      password == '' ||
      confirmpassword == ''
    ) {
      toast.current.show('Enter All Fields', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
      return;
    } else if (number.length == 0) {
      toast.current.show('Enter PhoneNumber', {
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
      toast.current.show('Password Not Matched', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      return;
    } else {
      dispatch(Signup(number, fullname, email, password));
    }
  };

  const VerifyOTP = () => {
    Keyboard.dismiss();
    if (
      codeOne.length === '' ||
      codeTwo.length === 0 ||
      codeThree.length === 0 ||
      codeFour.length === 0
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
      const otp = codeOne + codeTwo + codeThree + codeFour;
      console.log(SignupRandomid, 'otpotpotpotpotpotpotpotpotpotpotpotpotpotp');

      if (SignupRandomid != '') {
        dispatch(Verification(otp, SignupRandomid));
        console.log(otp, SignupRandomid, 'OTP CODE 4 DiGIT');
        console.log('if inner');
        // togglescreen(5);
      }
      setLoader(true);
      setCodeOne('');
      setCodeTwo('');
      setCodeThree('');
      setCodeFour('');
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

  const LoginHandler = () => {
    Keyboard.dismiss();
    if (number.length === 0) {
      toast.current.show('Enter PhoneNumber', {
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
      dispatch(Login(number, password));
      setLoader(true);
    }
  };

  const ForgetPasswordHandler = () => {
    Keyboard.dismiss();
    if (number.length === 0) {
      toast.current.show('Enter PhoneNumber', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      dispatch(ForgetPassword(number));
      setLoader(true);
    }
  };

  // const ChangedPasswordHandler = () => {
  //   Keyboard.dismiss();
  //   if (password == '' || confirmpassword == '') {
  //     toast.current.show('Enter All Fields', {
  //       type: 'normal',
  //       placement: 'bottom',
  //       duration: 4000,
  //       offset: 10,
  //       animationType: 'slide-in',
  //     });
  //     return;
  //   } else if (password == confirmpassword) {
  //     toast.current.show('Password Not Matched', {
  //       type: 'normal',
  //       placement: 'bottom',
  //       duration: 4000,
  //       offset: 10,
  //       animationType: 'slide-in',
  //     });
  //     return;
  //   } else {
  //     dispatch(ChangedPassword(SignupRandomid, password, confirmpassword));
  //     // toast.current.show('Password Changed Successfully', {
  //     //   type: 'normal',
  //     //   placement: 'bottom',
  //     //   duration: 4000,
  //     //   offset: 10,
  //     //   animationType: 'slide-in',
  //     // });
  //     // togglescreen(1);
  //   }
  // };

  // useEffect(() => {
  //   console.log(
  //     Reset_PasswordStatus,
  //     MessagePasswordStatus,
  //     'AuthTokenAuthToken',
  //   );
  //   if (Reset_PasswordStatus === 'Success') {
  //     toast.current.show(MessagePasswordStatus, {
  //       type: 'normal',
  //       placement: 'bottom',
  //       duration: 4000,
  //       offset: 10,
  //       animationType: 'slide-in',
  //     });

  //     setLoader(false);
  //     togglescreen(5);
  //     dispatch(OTPNullstate());
  //   } else if (Reset_PasswordStatus === 'Error') {
  //     toast.current.show(MessagePasswordStatus, {
  //       type: 'normal',
  //       placement: 'bottom',
  //       duration: 4000,
  //       offset: 10,
  //       animationType: 'slide-in',
  //       zIndex: 2,
  //     });
  //     console.log('OTP has been expired');
  //     setLoader(false);
  //     dispatch(OTPNullstate());
  //   }
  // }, [Reset_PasswordStatus, OtpVerificationStatus]);

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

      setTimeout(async () => {
        input_1.current.focus();
      }, 500);
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
                <View style={{width: '100%', height: '45%'}}>
                  <Image
                    resizeMode="stretch"
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
                      color={'#F5F5F5'}
                      size={fontSize.thirtyseven}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                  style={{width: '100%', height: '55%'}}
                  contentContainerStyle={{
                    ...styleSheet.scrollcontainer,
                    paddingHorizontal: scalableheight.two,
                    justifyContent: 'center',
                  }}>
                  {renderIf(loginvisible == true)(
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
                        <TextInput
                          style={{
                            ...styleSheet.TextInput,
                            ...styleSheet.shadow,
                          }}
                          placeholderTextColor="#8c8c8c"
                          placeholder={'Enter Phone Number'}
                          onChangeText={text => setnumber(text)}
                          defaultValue={number}
                        />
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
                    </>,
                  )}
                  {renderIf(signupvisible == true)(
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
                          Phone Number
                        </Text>
                        <TextInput
                          style={{
                            ...styleSheet.TextInput,
                            ...styleSheet.shadow,
                          }}
                          placeholderTextColor="#8c8c8c"
                          placeholder={'Enter Phone Number'}
                          onChangeText={text => setnumber(text)}
                          defaultValue={number}
                        />
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
                          placeholder={'Enter Full Name'}
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
                          placeholder={'Enter Email'}
                          onChangeText={text => Setemail(text)}
                          defaultValue={email}
                        />
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
                        <MYButton
                          title={'SIGNUP'}
                          onPress={() => {
                            signUpHandler();
                            togglescreen(4);
                          }}
                          color="#E14E4E"
                          textcolor="white"
                        />

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
                    </>,
                  )}
                  {renderIf(forgetpasswordvisible == true)(
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
                          Enter the phone number associated with your account so
                          we can send you a Verification code.
                        </Text>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          Phone Number
                        </Text>
                        <TextInput
                          style={{
                            ...styleSheet.TextInput,
                            ...styleSheet.shadow,
                          }}
                          placeholderTextColor="#8c8c8c"
                          placeholder={'Enter Phone Number'}
                          onChangeText={text => setnumber(text)}
                          defaultValue={number}
                          keyboardType="numeric"
                        />

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

                        <TouchableOpacity
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
                        </TouchableOpacity>
                      </Animatable.View>
                    </>,
                  )}
                  {renderIf(otpvisible == true)(
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
                            +971507567601
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
                              onChangeText={val => setCodeFour(val)}
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

                        {showtimer == false ? (
                          <TouchableOpacity
                            onPress={() => {
                              // ReVerifyOTP();
                              setShowTimer(true);
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
                        <View style={{marginTop: scalableheight.one}}></View>
                        {showtimer == true ? (
                          <CountDown
                            onFinish={() => {
                              settimeractive(false), setShowTimer(false);
                            }}
                            until={60}
                            size={fontSize.fourteen}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: 'Min', s: 'Sec'}}
                            digitStyle={{backgroundColor: '#E14E4E'}}
                            digitTxtStyle={{color: 'white'}}
                            timeLabelStyle={{color: 'white'}}
                          />
                        ) : null}
                      </Animatable.View>
                    </>,
                  )}
                  {renderIf(changenewpassword == true)(
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
                        <MYButton
                          title={'Change Password'}
                          onPress={() => {
                            ChangedPasswordHandler();
                          }}
                          color="#E14E4E"
                          textcolor="white"
                        />
                      </Animatable.View>
                    </>,
                  )}
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animatable.View>
      )}
      {props.state && animationtype == 'fadeInUpBig' && (
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
      {/* {props.state  &&  (   */}

      {/* // )}  */}
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
    fontSize: fontSize.fourteen,
    color: '#E14E4E',
  },
  Text4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
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
    right: scalableheight.two,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: scalableheight.two,
    height: scalableheight.six,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
});