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

import renderIf from 'render-if';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import SavedAddresses from './SavedAddresses';
import MYButton from './MYButton';
import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Custombottomsheet(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);

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

  // function togglescreen(index) {
  //   setanimationstate(true);
  // }
  function clearandclose() {
    toggleanimation();
    setanimationstate(true);
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
              props.onPress();
            }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: fontSize.twenty,
            borderTopRightRadius: fontSize.twenty,
            padding: scalableheight.two,
            zIndex: 3,
            elevation: 3,
          }}>
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
              color={'rgba(211,211,211, 0.8)'}
              size={fontSize.thirtyseven}
              style={{}}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.fifteen,
              alignSelf: 'center',
            }}>
            Select A Delivery Address
          </Text>
          <TouchableOpacity
            disabled={props.locationpin == '' ? false : true}
            onPress={props.onPressnewlocation}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: 'rgba(211,211,211, 0.5)',
              paddingVertical: scalableheight.one,
            }}>
            <View style={{justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name={'crosshairs-gps'}
                color={'#F55050'}
                size={fontSize.twentyfour}
              />
            </View>
            <View style={{marginLeft: scalableheight.two}}>
              <Text
                style={{
                  color: '#F55050',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.sixteen,
                }}>
                Detect current Location
              </Text>

              <Text
                numberOfLines={2}
                style={{
                  color: 'black',
                  opacity: 0.5,
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.eleven,
                }}>
                {props.pinlocation == null ? 'Use GPS' : props.pinlocation}
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              opacity: 0.6,
              fontFamily: 'Inter-Regular',
              fontSize: fontSize.sixteen,
              paddingTop: scalableheight.one,
            }}>
            My Saved Addresses
          </Text>
          <SavedAddresses
            title={'Home'}
            address={'Mann Crossing 332 Ardith Highway'}
          />
          <SavedAddresses title={'Home'} address={'Clifton block 2'} />

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: 'rgba(211,211,211, 0.5)',
              paddingVertical: scalableheight.one,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FontAwesome5
                name={'map-marked-alt'}
                color={'#F55050'}
                size={fontSize.twenty}
              />
            </View>
            <View style={{marginLeft: scalableheight.two}}>
              <Text
                style={{
                  color: '#F55050',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.sixteen,
                }}>
                Pin your Location
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Inter-Regular',
                  opacity: 0.5,
                  fontSize: fontSize.fourteen,
                }}>
                Open Map
              </Text>
            </View>
          </View>
        </Animatable.View>
      )}
      {/* {props.state && animationtype == 'fadeInUpBig' && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 2,
            elevation: 2,
          }}></View>
      )} */}
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
