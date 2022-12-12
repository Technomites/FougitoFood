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
  Platform,
  PermissionsAndroid
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

import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { width } from 'react-native-dimension';
import {Camera, CameraScreen} from 'react-native-camera-kit';
import Qrcode from '../../Screens/Qrcode';
export default function Dineinoption(props) {
  const [showqr, setshowqr] = useState(false);
  const [instructions, setinstructions] = useState(false);
  const [scanpermission, setScanPermission] = useState(true);
  const [camscanner, setCamScanner] = useState(false);
  const [animationstate, setanimationstate] = useState(false);

  const {
   
    dinein
  } = useSelector(state => state.userReducer);

    function  clearandclose(){
      setshowqr(false)
      setinstructions(false)
        props.togglemodel()
    }

    const requestCameraPermission = async () => {
      if (Platform.OS != 'ios') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Fougito Food App Camera Permission',
              message:
                'Fougito Food App needs access to your camera to scan QR code.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setCamScanner(true);
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
      if (Platform.OS == 'ios') {
        setCamScanner(true);
      }
    };
  
    useEffect(() => {
      setCamScanner(false);
      requestCameraPermission();
      if(dinein == true){
        setinstructions(true)
      }
    }, [props.state, showqr]);

    function closeanimationstate() {
      setanimationstate(false);
    }
  return (
    <>
      {props.state && (
        

        <View
          style={{
            zIndex: 3,
            elevation: 3,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
        
            <View
              style={{
                width: '90%',
                  // height: scalableheight.sixtyone,
                // maxHeight: '40%',
                minHeight: scalableheight.sixtyone,
                borderRadius: fontSize.eleven,
                backgroundColor: 'white',
                paddingVertical: scalableheight.two,
                paddingHorizontal: scalableheight.two,
                overflow:"hidden"
              }}>
                  <Animatable.View
        animation={animationstate ? 'slideInRight' : undefined}
        onAnimationEnd={closeanimationstate}
        duration={500}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={styleSheet.animagetionstyle}>
                   {showqr == false && instructions == false ?
              <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <Text

                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.fourteen,
                          color: 'black',
                          textAlign:"center"
                        }}>
                        {`Fougito Food has detected that you are within the 50 meter radius of ${props.name} Branch. Would you like to Dine in?`}
                      </Text>
              <Image
                  style={{width:"100%", height:scalableheight.thirty,}}
                  resizeMode={'contain'}
                  source={require('../../Resources/images/Radar.gif')}
                />
              <MYButton
                title={'Dine In'}
                onPress={() => {
                  setanimationstate(true);
           setinstructions(true)
                }}
                color="#E14E4E"
                textcolor="white"
              />
            
              <MYButton
                title={'Proceed'}
                onPress={() => {
                props.proceed()
                }}
                color="black"
                textcolor="white"
              />
              </ScrollView>
:
showqr == false && instructions == true ?
<View style={{justifyContent:"space-evenly", height:scalableheight.fiftyfive}}>
<Text

style={{
  fontFamily: 'Inter-Bold',
  fontSize: fontSize.fourteen,
  color: 'black',
  textAlign:"center"
}}>
Instructions
</Text>
  <Image
                  style={{width:"100%", height:scalableheight.fourty,}}
                  resizeMode={'contain'}
                  source={require('../../Resources/images/tablescan.gif')}
                />
<Text

style={{
  fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.twelve,
  color: 'black',
  textAlign:"center",
  paddingBottom:scalableheight.one
}}>
{`Scan the QR code placed on your table to notify us of your table number.`}
</Text>
<MYButton
                title={'Next'}
                onPress={() => {
                  setanimationstate(true);
                  setshowqr(true)
           setinstructions(false)
                }}
                color="#E14E4E"
                textcolor="white"
              />
</View>

: 
<View style={{height: scalableheight.fiftyfive, width:"100%", overflow:"hidden"    }}>
   {camscanner && (

          <CameraScreen
            scanBarcode={scanpermission}
            onReadCode={event => {
              console.log(event.nativeEvent.codeStringValue, 'eventtt');
              props.data(event.nativeEvent.codeStringValue, "DineIn")
              clearandclose()
          
            }}
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="transparent" // (default red) optional, color of laser in scanner frame
            frameColor="transparent"  // (default white) optional, color of border of scanner frame
          />
   
    
        )}
       </View>
}
</Animatable.View>
              <TouchableOpacity
                onPress={() => {
                  clearandclose();
                }}
                style={{
                  width: '100%',
                  // height: "10%",
                  alignItems: 'center',
                  justifyContent: 'center',
                  //   position: 'absolute',
                  //   top: scalableheight.one,
                  //   right: scalableheight.one,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.twelve,
                    color: 'grey',
                    paddingVertical: scalableheight.one,
                  }}>
                  CLOSE
                </Text>
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
      
      )}

      {/* //{props.state && animationtype == 'fadeInUpBig' && ( */}
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
