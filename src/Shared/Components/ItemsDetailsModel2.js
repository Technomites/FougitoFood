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
} from 'react-native';



import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';

import MYButton from './MYButton';
import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bll from '../../Shared/Components/Bll';
export default function ItemsDetailsModel2(props) {
  const [number, setnumber] = useState('');
  const [fullname, setfullname] = useState('');
  const [password, setpassword] = useState('');
  const [newpasswordshow, setnewpasswordshow] = useState(false);
  const [inscreenanimation, setinscreenanimation] = useState(false);
  const [loginvisible, setloginvisible] = useState(true);
  const [signupvisible, setsignupvisible] = useState(false);
  const [otpvisible, setotpvisible] = useState(false);
  const [timeractive, settimeractive] = useState(false);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');

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
  const input_1 = useRef();
  const input_2 = useRef();
  const input_3 = useRef();
  const input_4 = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    props.togglemodel();
    toggleanimation();
    setanimationstate(true);
    setnumber('');
    setfullname('');
    setpassword('');
    setnewpasswordshow(false);
    setloginvisible(true);
    setsignupvisible(false);
    setotpvisible(false);
    settimeractive(false);
    setforgetpasswordvisible(false);

    setCodeOneActive(false);
    setCodeTwoActive(false);
  }

  function togglescreen(index) {
    setinscreenanimation(true);

    if (index == 1) {
      setsignupvisible(false);
      setotpvisible(false);
      setforgetpasswordvisible(false);
      setloginvisible(true);
    } else if (index == 2) {
      setloginvisible(false);
      setotpvisible(false);
      setforgetpasswordvisible(false);
      setsignupvisible(true);
    } else if (index == 3) {
      setsignupvisible(false);
      setotpvisible(false);
      setloginvisible(false);
      setforgetpasswordvisible(true);
    } else if (index == 4) {
      setsignupvisible(false);

      setloginvisible(false);
      setforgetpasswordvisible(false);
      setotpvisible(true);

      setTimeout(async () => {
        input_1.current.focus();
      }, 500);
    }
  }

  return (
    <>
      {props.state && (
        // <Animatable.View
        //   animation={animationstate ? animationtype : null}
        //   onAnimationEnd={() => {
        //     setanimationstate(false);
        //     if (animationtype == 'fadeOutDownBig') {
        //       setanimationtype('fadeInUpBig');

        //       props.togglemodel();
        //     }
        //   }}
        //   easing="ease"
        //   //  iterationCount="infinite"
        //   iterationCount={1}
        //   style={{
        //     zIndex: 3,
        //     elevation: 3,
        //     position: 'absolute',
        //     width: '100%',
        //     height: '100%',
        //   }}>

        <View style={styleSheet.maincontainer}>
          <View style={styleSheet.innercontainer}>
            <View style={styleSheet.innermostcontainer}>
              <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                <View style={styleSheet.innerview}>
                  <View style={styleSheet.innerview2}>
                    <Text style={styleSheet.text10}>QTY</Text>
                    <Text style={styleSheet.text11}>
                      {props?.data?.Quantity}
                    </Text>
                  </View>

                  {/* <Image
                    resizeMode="cover"
                    style={{
                      width: scalableheight.six,
                      height: scalableheight.six,
                      borderRadius: fontSize.eleven,
                    }}
                    // source={{uri: props?.data?.image}}
                    source={{uri: props?.data?.MenuItems?.Item?.Image}}
                  /> */}
                  <Text style={styleSheet.text12}>
                    {props?.data?.MenuItems?.Name}
                  </Text>
                  <Text style={styleSheet.text13}>
                    {'AED '}
                    {props?.data?.Price?.toFixed(2)}
                  </Text>
                </View>

                {/* {props?.data?.OrderDetailOptionValues?.map(item => {
                  return (
                    item.OrderDetailOptionValues?.find(
                      data => data?.selected === true,
                    ) != undefined && (
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-Bold',
                            fontSize: fontSize.twelve,
                            color: '#111111',
                            marginTop: scalableheight.two,
                          }}>
                          {item?.Title}
                        </Text>
                        {item?.MenuItemOptionValues.map(inneritem => {
                          return inneritem?.selected == true ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Inter-Medium',
                                  fontSize: fontSize.twelve,
                                  color: '#111111',
                                }}>
                                {inneritem?.Value.trim()}
                              </Text>
                              {inneritem?.Price > 0 ? (
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: fontSize.twelve,
                                    color: '#111111',
                                  }}>
                                  {'AED '}
                                  {inneritem?.Price}
                                </Text>
                              ) : null}
                            </View>
                          ) : null;
                        })}
                      </View>
                    )
                  );
                })} */}
                {props?.data?.OrderDetailOptionValues != '' &&
                  props?.data?.OrderDetailOptionValues != null && (
                    <>
                      <Text style={styleSheet.text14}>Addons</Text>
                      {props?.data?.OrderDetailOptionValues.map(inneritem => {
                        return (
                          <Text style={styleSheet.text15}>
                            <Text style={styleSheet.text16}>{'\u2B24'}</Text>
                            {' ' + inneritem?.MenuItemOptionValue}
                          </Text>
                        );
                      })}
                    </>
                  )}

                {props?.data?.CustomerNote != '' &&
                  props?.data?.CustomerNote != null && (
                    <>
                      <Text style={styleSheet.text14}>
                        Special Instructions
                      </Text>
                      <Text style={styleSheet.text17}>
                        {'" ' + props?.data?.CustomerNote + ' "'}
                      </Text>
                    </>
                  )}
              </ScrollView>
              {/* <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: scalableheight.two,
                  }}>
                  <View style={{width: '50%', justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.eleven,
                        color: '#636363',
                      }}>
                      Addons
                    </Text>
                  </View>
                  <View style={{width: '50%', justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.eleven,
                        color: '#636363',
                      }}>
                      Flavour
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: fontSize.eleven,
                      color: '#636363',
                      fontStyle: 'italic',
                    }}>
                    {'" ' + props?.data?.CustomerNote + ' "'}
                  </Text>
                </View>
              </View> */}
              <View style={styleSheet.innerview3}></View>
              {/* <Bll label={'Item Price'} price={props?.data?.Price.toFixed(2)} />
              <Bll
                label={'Discount Percentage'}
                price={props?.data?.MenuItems.DiscountPercentage.toFixed(2)}
              />
              <Bll
                label={'Discount Amount'}
                price={props?.data?.MenuItems.DiscountAmount.toFixed(2)}
              /> */}
              {/* <View
                style={{
                  borderTopColor: 'rgba(211,211,211, 0.5)',
                  borderTopWidth: scalableheight.borderTopWidth,
                  marginVertical: scalableheight.one,
                }}></View> */}
              {/* <Bll
                label={'Final Price'}
                price={props?.data?.TotalPrice.toFixed(2)}
              /> */}
              <TouchableOpacity
                onPress={() => {
                  clearandclose();
                }}
                style={styleSheet.innerview4}>
                <Text style={styleSheet.text19}>CLOSE</Text>
                {/* <Ionicons
                      name="close-circle"
                      color={"#E14E4E"}
                      size={fontSize.thirtyseven}
                      style={{}}
                    /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        //</Animatable.View>
      )}

      {/* //{props.state && animationtype == 'fadeInUpBig' && ( */}
      {props.state && <View style={styleSheet.backgroundview}></View>}
    </>
  );
}

const styleSheet = StyleSheet.create({
  backgroundview: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 2,
    elevation: 2,
  },
  text19: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.twelve,
    color: 'grey',
    paddingVertical: scalableheight.one,
  },
  innerview4: {
    width: '100%',
    // height: "10%",
    alignItems: 'center',
    justifyContent: 'center',
    //   position: 'absolute',
    //   top: scalableheight.one,
    //   right: scalableheight.one,
  },
  text12: {
    fontFamily: 'Inter',
    fontSize: fontSize.fourteen,
    color: '#111111',
    width: scalableheight.seventeen,
  },
  text11: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: '#111111',
  },
  maincontainer: {
    zIndex: 3,
    elevation: 3,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
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
  text15: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    color: '#F55050',
    // paddingBottom: scalableheight.two,
    //  marginLeft:scalableheight.one
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
  innercontainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innermostcontainer: {
    width: '90%',
    //   height: '40%',
    maxHeight: '40%',
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.two,
  },
  innerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerview3: {
    borderTopColor: 'rgba(211,211,211, 0.5)',
    borderTopWidth: scalableheight.borderTopWidth,
    marginVertical: scalableheight.one,
  },
  innerview2: {
    height: scalableheight.five,
    width: scalableheight.five,
    backgroundColor: '#F9F9F9',
    borderRadius: fontSize.borderradiusmedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text10: {
    fontFamily: 'Inter-bold',
    fontSize: scalableheight.onepointfive,
    color: '#F55050',
  },
  text13: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    color: '#F55050',
  },
  text14: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.twelve,
    color: '#111111',
    marginTop: scalableheight.two,
  },
  text16: {
    color: 'grey',
    alignSelf: 'center',
    // position: 'relative',
    marginRight: scalableheight.one,
    fontSize: scalableheight.one,
  },
  text17: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    color: '#111111',
    paddingBottom: scalableheight.two,
    fontStyle: 'italic',
  },
});
