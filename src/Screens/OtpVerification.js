import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Image, ImageBackground, StyleSheet,TouchableOpacity,StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import CustomStatusBar from '../component/StatusBar/customStatusBar';
import { FontFamily } from '../constants/fonts';
import { theme } from '../constants/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Shared/Components/CustomButton';
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
  } from 'react-native-navigation-bar-color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import { fontSize, scalableheight } from "../Utilities/fonts";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountDown from 'react-native-countdown-component';
import renderIf from 'render-if';
import {verifyotp, resetotp, resendcode, clearotpreset } from '../Actions/actions';
import {GToastContainer, showToast} from 'react-native-gtoast';
import NetInfo from '@react-native-community/netinfo';

const OtpVerification = ({navigation, route}) => {
    const [codeOneActive, setCodeOneActive] = useState(false);
    const [codeTwoActive, setCodeTwoActive] = useState(false);
    const [codeThreeActive, setCodeThreeActive] = useState(false);
    const [timeractive, settimeractive] = useState(true);
    const [codeFourActive, setCodeFourActive] = useState(false);
    const [codeOne, setCodeOne] = useState("");
    const [codeTwo, setCodeTwo] = useState("");
    const [codeThree, setCodeThree] = useState("");
    const [Loader, setLoader] = useState(false);

    const [codeFour, setCodeFour] = useState("");
    const {Lang, OtpVerified, OtpRegenerated} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const phonenumber = route?.params?.phoneNumber;
    const pin = route?.params?.pin;
    const screen = route?.params?.screentitle;

    const input_1 = useRef(null);
    const input_2 = useRef(null);  
    const input_3 = useRef(null);
    const input_4 = useRef(null);


    useEffect(() => {
        console.log(phonenumber)
        console.log(pin)
        console.log(screen)
    input_1.current.focus()
   }, []);

   useEffect(() => {
    setLoader(false);

    if (OtpVerified == "200") {
        showToast("OTP Verified", {
            duration: 500,
          });
          setTimeout(async () => {
            // navigation.navigate('Changepasswordforgot');
            let code = codeOne + codeTwo + codeThree + codeFour
            if (screen === "forgotpassword") { 
              navigation.navigate('Changepasswordforgot', {
                phoneNumber: phonenumber,   pin: pin, otp: code
              }); 
            } else {
              navigation.navigate('Login'); 
            }

          }, 2000);
       
    } else {
      if (OtpVerified != '') {
      showToast(OtpVerified, {
        duration: 500,
      });
    }
    }
    dispatch(resetotp());
}, [OtpVerified]);
   

useEffect(() => {

    if (OtpRegenerated == "success") {
        showToast("OTP Reset Successfully", {
            duration: 500,
          });
          settimeractive(true)
    } 
dispatch(clearotpreset())
}, [OtpRegenerated]);


   function verify(){
    let code = codeOne + codeTwo + codeThree + codeFour

    if (codeOne == '' || codeTwo == '' || codeThree == '' || codeFour == '' ) {
        showToast(
          Lang == 'en' ? 'Please enter complete OTP.' : 'الرجاء إدخال OTP كاملة.',
          {
            duration: 500,
          },
        );
      }  else {
        NetInfo.fetch().then(state => {
          if (state.isConnected == false && state.isInternetReachable == false) {
            showToast('Problem with internet connectivity', {
              duration: 500,
            });
     
          } else {
            setLoader(true);
            console.log("NUMBER =====> ", phonenumber)
            console.log("code =====> ", code)
            console.log("pin.substring(1) =====> ", pin.substring(1))
            Keyboard.dismiss();
            dispatch(verifyotp(phonenumber, code,  pin.substring(1)))
          }
        });
      }
   }

   function resendotpcode(){
    dispatch(resendcode(phonenumber,  pin.substring(1) ))
    // settimeractive(false)
   }



    return (
      <KeyboardAvoidingView
      style={{width:"100%", height:"100%"}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <ImageBackground
            resizeMode= "stretch"
            style={styles.backgroundImageStyle}
            source={require('../Resources/images/Splash.png')}
        >
            <CustomStatusBar 
                barStyle={"light-content"}
                backgroundColor={"transparent"}
            />
            <TouchableOpacity 
             onPress={() => {
                
                navigation.goBack()
                }}
            style={styles.backButtonMain}>
                  {/* <MaterialIcons
              style={{  alignSelf:"center"}}
          name="keyboard-arrow-left"
       color={"black"}
       size={fontSize.twentythree}
        
        /> */}
             <View style={styles.backButtonInner}>
          <Ionicons
            color={'#FFF'}
            name="chevron-back"
            size={fontSize.twenty}
          />
        </View>
            </TouchableOpacity>
            {/* <Image
                resizeMode= "contain"
                style={styles.imageStyle}
                source={require('../Resources/images/GettingStartedLogo.png')}
            /> */}
            <Text style={styles.mainTextStyle}>
                          {Lang == "en" ? "Verification" : "تَحَقّق"}
            </Text>
            <Text style={styles.innerTextStyle}>
            {Lang == "en" ? `Enter the OTP You Received to\n ${pin} - ${phonenumber}` : `أدخل OTP الذي تلقيته \n ${pin} - ${phonenumber}`}
                
            </Text>
            
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TextInput
                          ref={input_1}
                        style={[styles.inputStyle, {backgroundColor: codeOneActive || codeOne !== "" ? "#FFF" : "transparent"}]}
                        value={codeOne}
                        placeholder={""}
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styles.placeholderStyle}
                        onChangeText={(val) => {
                            setCodeOne(val)
                            if (val != '') input_2.current.focus();
                            }}
                        maxLength={1}
                        keyboardType="numeric"
                        onFocus={() => setCodeOneActive(true)}
                        onBlur={() => setCodeOneActive(false)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',marginLeft:"4%"}}>
                    <TextInput
                          ref={input_2}
                        style={[styles.inputStyle, {backgroundColor: codeTwoActive || codeTwo !== "" ? "#FFF" : "transparent"}]}
                        value={codeTwo}
                        placeholder={""}
                        placeholderTextColor={"#A0A0A0"}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderStyle={styles.placeholderStyle}
                        onChangeText={(val) => {setCodeTwo(val)
                            if (val != '') input_3.current.focus();
                        }}
                        onFocus={() => setCodeTwoActive(true)}
                        onBlur={() => setCodeTwoActive(false)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',marginLeft:"4%"}}>
                    <TextInput
                          ref={input_3}
                        style={[styles.inputStyle, {backgroundColor: codeThreeActive || codeThree !== "" ? "#FFF" : "transparent"}]}
                        value={codeThree}
                        placeholder={""}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styles.placeholderStyle}
                        onChangeText={(val) => {setCodeThree(val)
                        if (val != '') input_4.current.focus();
                    }}
                        onFocus={() => setCodeThreeActive(true)}
                        onBlur={() => setCodeThreeActive(false)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',marginLeft:"4%"}}>
                    <TextInput
                          ref={input_4}
                        style={[styles.inputStyle, {backgroundColor: codeFourActive || codeFour !== "" ? "#FFF" : "transparent"}]}
                        value={codeFour}
                        placeholder={""}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styles.placeholderStyle}
                        onChangeText={(val) => setCodeFour(val)}
                        onFocus={() => setCodeFourActive(true)}
                        onBlur={() => setCodeFourActive(false)}
                    />
                </View>
            </View>
            <View style={styles.bottomTextStyle}>
            {/* <Text style={{ fontFamily: FontFamily.regularFont,
        color: "#E6E3E3", 
        fontSize:fontSize.fourteen,
        textAlign: "center", 
     
         marginLeft:"2%"
        }}>
                    0:42
                </Text> */}
                    {renderIf(timeractive == true)(
                <CountDown
                onFinish={() => settimeractive(false)}
                  until={120}
                  size={fontSize.fourteen}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: 'Min', s: 'Sec'}}
                  digitStyle={{backgroundColor: "#AB8651"}}
                  digitTxtStyle={{color:"white"}}
                  timeLabelStyle={{color:"white"}}
                />)}
                          {renderIf(timeractive == false)(
                            <TouchableOpacity
                            onPress={()=> {resendotpcode()}}
                            >
                              <Text style={{color:"#B3B3B3",  fontFamily: FontFamily.regularFont,
    
                              fontSize:fontSize.fourteen,
                              textAlign: "center", 
                              marginLeft:"2%"
                           }}>
                                      {Lang == "en" ? "Resend OTP" : "إعادة إرسال OTP"}
                                      </Text>
                                      </TouchableOpacity>
                )}
          
       
             
            </View>
            <View style={{
        marginBottom: "15%",}}>
         
                  
       
             
            </View>
            <View style={{position:"absolute" , bottom: scalableheight.two, width:"100%", alignSelf:"center"}}>
            <CustomButton
             Loading={Loader} 
                title= {Lang == "en" ? "Verify" : "التحقق"}
                onPress={() => {
             
                   verify()
                     }}
              
            />
            </View>
            <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />
        </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backgroundImageStyle: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scalableheight.two,
    },
    // backButtonMain: {
    //     position: 'absolute',
    //     top: "5%",
    //     left: scalableheight.three,
    //     backgroundColor: "#EEEBE7",
    //     height:scalableheight.four,
    //     width: scalableheight.four,
    //     borderRadius: 6,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    imageStyle: {
        width: "85%",
        height: scalableheight.twentysix,

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
     
        marginBottom: "5%",
    },
    inputStyle: {
        fontFamily: "Rubik-Regular",
        fontSize: fontSize.thirtysix,
        color: "#000000",
        borderRadius: fontSize.eleven,
        paddingHorizontal: scalableheight.two,
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        borderColor: "#A0A0A0",
        borderWidth: scalableheight.borderTopWidth,
        paddingVertical:scalableheight.onepointfive
    },
    placeholderStyle: {
        color: "#818181",
        fontFamily: FontFamily.regularFont,
        fontSize: fontSize.twelve,

    },
    inputIconStyle: {
        position: 'absolute',
        right: scalableheight.two,
        height: "100%",
        justifyContent: 'center',
    },
    forgotPasswordStyle: {
        fontFamily: FontFamily.regularFont,
        color: theme.color.white,
        fontSize: fontSize.fourteen,
        textAlign: 'right',
        marginTop: "3%",
    },
    bottomTextStyle: {
      
        marginTop: "8%",
        marginBottom: "20%",
        justifyContent:"center",
     

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
});
export default OtpVerification;