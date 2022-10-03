import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';

import renderIf from 'render-if';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import {
  ChangedNewPassword,
  NewpasswordChangednull,
} from '../../Actions/actions';

import MYButton from './MYButton';
import * as Animatable from 'react-native-animatable';
// import Animated from 'react-native-reanimated';

import Toast from 'react-native-toast-notifications';

export default function ChnagePasswordModel(props) {
  const toast = useRef();

  const [password, setpassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [confirmpassword, Setconfirmpassword] = useState('');



  const [oldpasswordshow, setoldpasswordshow] = useState(true);
  const [newpasswordshow, setnewpasswordshow] = useState(true);
  const [confirmnewpasswordshow, setconfirmnewpasswordshow] = useState(true);

  const [inscreenanimation, setinscreenanimation] = useState(false);
  const [changenewpassword, setchangenewpassword] = useState(true);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [loader, setLoader] = useState(false);
  const [animationstate, setanimationstate] = useState(false);
  const [prevscreen, setprevscreen] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {AuthToken, NewchangedpasswordStatus, NewchangedpasswordMessage} =
    useSelector(state => state.userReducer);

  useEffect(() => {
    if (NewchangedpasswordStatus === 'Success') {
      toast.current.show(NewchangedpasswordMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      dispatch(NewpasswordChangednull());
      clearandclose();
      setLoader(false);
    } else if (NewchangedpasswordStatus === 'Error') {
      toast.current.show(NewchangedpasswordMessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });

      console.log('LOGIN ERROROROOROROORO');
      dispatch(NewpasswordChangednull());
      setLoader(false);
    }else if (NewchangedpasswordStatus === 'Network Request Failed') {
      toast.current.show("Network Request Failed", {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });

      console.log('LOGIN ERROROROOROROORO');
      dispatch(NewpasswordChangednull());
      setLoader(false);
    }
  }, [NewchangedpasswordStatus, NewchangedpasswordMessage]);

  const ChangNewPasswordHandler = () => {
    Keyboard.dismiss();
    if (oldpassword == '' || confirmpassword == '' || password == '') {
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
      dispatch(
        ChangedNewPassword(AuthToken, oldpassword, password, confirmpassword),
      );
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
    toggleanimation();
    setanimationstate(true);
    Setconfirmpassword('');
    setpassword('');
    setoldpassword('');
    setchangenewpassword(true);
  }

  function togglescreen(index) {
    setinscreenanimation(true);

    if (index == 1) {
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
                      keyboardShouldPersistTaps={"always"}
                  showsVerticalScrollIndicator={false}
                  style={{width: '100%', height: '55%'}}
                  contentContainerStyle={{
                    ...styleSheet.scrollcontainer,
                    paddingHorizontal: scalableheight.two,
                    justifyContent: 'center',
                  }}>
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
                          Old Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={oldpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'Old Password'}
                            onChangeText={text => setoldpassword(text)}
                            defaultValue={oldpassword}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setoldpasswordshow(!oldpasswordshow);
                            }}
                            style={styleSheet.inputIconStyle}>
                            <Ionicons
                              color={'#8c8c8c'}
                              name={oldpasswordshow ? 'eye': 'eye-off'}
                              size={fontSize.twentytwo}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          New Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={newpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'New Password'}
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
                              name={newpasswordshow ?  'eye' :'eye-off' }
                              size={fontSize.twentytwo}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            ...styleSheet.Text5,
                            marginTop: scalableheight.two,
                          }}>
                          New Confirm Password
                        </Text>
                        <View style={{width: '100%'}}>
                          <TextInput
                            style={{
                              ...styleSheet.TextInput,
                              ...styleSheet.shadow,
                            }}
                            secureTextEntry={confirmnewpasswordshow}
                            placeholderTextColor="#8c8c8c"
                            placeholder={'New Confirm Password'}
                            onChangeText={text => Setconfirmpassword(text)}
                            defaultValue={confirmpassword}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setconfirmnewpasswordshow(!confirmnewpasswordshow);
                            }}
                            style={styleSheet.inputIconStyle}>
                            <Ionicons
                              color={'#8c8c8c'}
                              name={confirmnewpasswordshow ? 'eye' :  'eye-off' }
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
                              ChangNewPasswordHandler();
                            }}
                            color="#E14E4E"
                            textcolor="white"
                          />
                        )}
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
