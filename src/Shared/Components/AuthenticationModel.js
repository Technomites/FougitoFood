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
    ScrollView
    
  } from 'react-native';

  import renderIf from 'render-if';
  
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
export default function AuthenticationModel(props) {
    const [number, setnumber] = useState("");
    const [fullname, setfullname] = useState("");
    const [password, setpassword] = useState("");
    const [newpasswordshow, setnewpasswordshow] = useState(false);
    const [inscreenanimation, setinscreenanimation] = useState(false);
    const [loginvisible, setloginvisible] = useState(true);
    const [signupvisible, setsignupvisible] = useState(false);
    const [otpvisible, setotpvisible] = useState(false);
    const [timeractive, settimeractive] = useState(false);
    const [animationtype, setanimationtype] = useState("fadeInUpBig");

    
    const [forgetpasswordvisible, setforgetpasswordvisible] = useState(false);
    const [animationstate, setanimationstate] = useState(false);
    const [codeOneActive, setCodeOneActive] = useState(false);
    const [codeTwoActive, setCodeTwoActive] = useState(false);
    const [codeThreeActive, setCodeThreeActive] = useState(false);
    const [codeFourActive, setCodeFourActive] = useState(false);
    const [codeOne, setCodeOne] = useState("");
    const [codeTwo, setCodeTwo] = useState("");
    const [codeThree, setCodeThree] = useState("");
  
  
    const [codeFour, setCodeFour] = useState("");
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
    if(props.state == true){
      setanimationstate(true);
    }
 
  }, [props.state]);
  function clearandclose(){
    toggleanimation()
    setanimationstate(true)
    setnumber("")
    setfullname("")
    setpassword("")
    setnewpasswordshow(false)
    setloginvisible(true)
    setsignupvisible(false)
    setotpvisible(false)
    settimeractive(false)
    setforgetpasswordvisible(false)
  
    setCodeOneActive(false)
    setCodeTwoActive(false)


  }

  function togglescreen(index){
    setinscreenanimation(true)
   
      if(index == 1){
        setsignupvisible(false)
        setotpvisible(false)
        setforgetpasswordvisible(false)
        setloginvisible(true)
    
      }else if(index == 2){
  
        setloginvisible(false)
        setotpvisible(false)
        setforgetpasswordvisible(false)
        setsignupvisible(true)
     
      }else if(index == 3){
        setsignupvisible(false)
        setotpvisible(false)
        setloginvisible(false)
        setforgetpasswordvisible(true)
     
      }else if(index == 4){
        setsignupvisible(false)

        setloginvisible(false)
        setforgetpasswordvisible(false)
        setotpvisible(true)
          
    setTimeout(async () => {
      input_1.current.focus()
    }, 500);

     
      }
 
  
  }

  return (
  <>
   {props.state  &&  (  
   <Animatable.View
            
              animation={animationstate ? animationtype : null}
              onAnimationEnd={() => {
                setanimationstate(false);
                if(animationtype == "fadeOutDownBig"){
                  setanimationtype("fadeInUpBig")
                 
                  props.togglemodel()
                }
              
              }}
                   easing="ease"
                   //  iterationCount="infinite"
                   iterationCount={1}
                    style={{ zIndex: 3,
                      elevation:3,
                      position: 'absolute',
                      width: '100%', height: '100%'}}
                   >
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
                    position:"absolute",
                    bottom: scalableheight.three,
                    alignSelf: "center"
                 
                  }}
                  source={require('../../Resources/images/logo-black.png')}
                />
     <TouchableOpacity
                  onPress={()=> {clearandclose()}}
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
                 showsVerticalScrollIndicator={false}
                 style={{width:"100%", height:"55%",}}
                 contentContainerStyle={{...styleSheet.scrollcontainer, paddingHorizontal: scalableheight.two, justifyContent:"center"}}>
                
                   {renderIf(loginvisible == true)(
                    <>
                      <Animatable.View
        animation={ inscreenanimation ? 'bounceInRight' : undefined}
        onAnimationEnd={()=>{ setinscreenanimation(false)}}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={{width:"100%", height: "100%"}}>
               <Text style={{ fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.twentytwo,
  color:"black",}}>Login</Text>
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Phone Number</Text>
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Phone Number"}
              onChangeText={text => setnumber(text)}
              defaultValue={number}
            />
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Password</Text>
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
        onPress={() => {togglescreen(3)}}
        >
        <Text  style={{...styleSheet.Text4, textAlign: "right", marginTop: scalableheight.one, marginBottom: scalableheight.two }}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
        <MYButton   title={'LOGIN'} onPress={()=>{}}
                    color="#E14E4E"
                    textcolor="white"/>
          
          <TouchableOpacity 
          onPress={()=>{togglescreen(2)}}
          >
                <Text  style={{...styleSheet.Text6, textAlign: "center", marginTop: scalableheight.two}}>Dont have an account?</Text>
                <Text  style={{...styleSheet.Text4, textAlign: "center", }}>SIGN UP</Text>
                </TouchableOpacity>
                </Animatable.View>
                 </>  )}
                 {renderIf(signupvisible == true)(
                    <>
                      <Animatable.View
        animation={ inscreenanimation ? 'bounceInRight' : undefined}
        onAnimationEnd={()=>{ setinscreenanimation(false)}}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={{width:"100%", height: "100%"}}>
               <Text style={{ fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.twentytwo,
  color:"black",}}>Sign Up</Text>
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Phone Number</Text>
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Phone Number"}
              onChangeText={text => setnumber(text)}
              defaultValue={number}
            />
             <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Full Name</Text>
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Full Name"}
              onChangeText={text => setfullname(text)}
              defaultValue={fullname}
            />
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Password</Text>
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
        <View style={{marginTop: scalableheight.two}}></View>
        <MYButton   title={'SIGNUP'} onPress={()=>{}}
                    color="#E14E4E"
                    textcolor="white"/>
          
          <TouchableOpacity 
          onPress={()=>{togglescreen(1)}}
          >
                <Text  style={{...styleSheet.Text6, textAlign: "center", marginTop: scalableheight.two}}>Already have an account?</Text>
                <Text  style={{...styleSheet.Text4, textAlign: "center", }}>LOGIN</Text>
                </TouchableOpacity>
                </Animatable.View>
                 </>  )}
                 {renderIf(forgetpasswordvisible == true)(
                    <>
                      <Animatable.View
        animation={ inscreenanimation ? 'bounceInRight' : undefined}
        onAnimationEnd={()=>{ setinscreenanimation(false)}}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={{width:"100%", height: "100%"}}>
               <Text style={{ fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.twentytwo,
  color:"black",}}>Forgot Password</Text>
    <Text  style={{...styleSheet.Text6, textAlign: "left", marginTop: scalableheight.two}}>Enter the phone number associated with your account so we can send you a Verification code.</Text>
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two,}}>Phone Number</Text>
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={"Enter Phone Number"}
              onChangeText={text => setnumber(text)}
              defaultValue={number}
            />
            
              
       <View style={{marginTop: scalableheight.two}}></View>
        <MYButton   title={'PROCEED'} onPress={()=>{togglescreen(4)}}
                    color="#E14E4E"
                    textcolor="white"/>
          
          <TouchableOpacity 
          onPress={()=>{togglescreen(1)}}
          >
              
                <Text  style={{...styleSheet.Text4, textAlign: "center", marginTop: scalableheight.one }}>Login with a different account?</Text>
                </TouchableOpacity>
                </Animatable.View>
                 </>  )}
                 {renderIf(otpvisible == true)(
                    <>
                      <Animatable.View
        animation={ inscreenanimation ? 'bounceInRight' : undefined}
        onAnimationEnd={()=>{ setinscreenanimation(false)}}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={{width:"100%", height: "100%"}}>
               <Text style={{ fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.twentytwo,
  color:"black",}}>Verification</Text>
    <Text  style={{...styleSheet.Text6, textAlign: "left", marginTop: scalableheight.one}}>A verification code was sent to your number <Text style={{  fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.fourteen,
  color:"#E14E4E"}}>+971507567601</Text></Text>
                <Text style={{...styleSheet.Text5,   marginTop: scalableheight.two, marginBottom: scalableheight.one}}>OTP Code</Text>
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TextInput
                          ref={input_1}
                        style={[ styleSheet.inputStyle, {backgroundColor: codeOneActive || codeOne !== "" ? '#F5F5F5' : "transparent"}]}
                        value={codeOne}
                        placeholder={""}
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styleSheet.placeholderStyle}
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
                        style={[styleSheet.inputStyle, {backgroundColor: codeTwoActive || codeTwo !== "" ? '#F5F5F5' : "transparent"}]}
                        value={codeTwo}
                        placeholder={""}
                        placeholderTextColor={"#A0A0A0"}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderStyle={styleSheet.placeholderStyle}
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
                        style={[styleSheet.inputStyle, {backgroundColor: codeThreeActive || codeThree !== "" ? '#F5F5F5' : "transparent"}]}
                        value={codeThree}
                        placeholder={""}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styleSheet.placeholderStyle}
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
                        style={[ styleSheet.inputStyle, {backgroundColor: codeFourActive || codeFour !== "" ? '#F5F5F5' : "transparent"}]}
                        value={codeFour}
                        placeholder={""}
                        maxLength={1}
                        keyboardType="numeric"
                        placeholderTextColor={"#A0A0A0"}
                        placeholderStyle={styleSheet.placeholderStyle}
                        onChangeText={(val) => setCodeFour(val)}
                        onFocus={() => setCodeFourActive(true)}
                        onBlur={() => setCodeFourActive(false)}
                    />
                </View>
            </View>
            
              
       <View style={{marginTop: scalableheight.two}}></View>
        <MYButton   title={'VERIFY'} onPress={()=>{}}
                    color="#E14E4E"
                    textcolor="white"/>
          
          <TouchableOpacity 
          onPress={()=>{togglescreen(1)}}
          >
              
                <Text  style={{...styleSheet.Text4, textAlign: "center", marginTop: scalableheight.one }}>RESEND CODE</Text>
                </TouchableOpacity>
                <View style={{marginTop: scalableheight.one}}></View>
                <CountDown
                onFinish={() => settimeractive(false)}
                  until={120}
                  size={fontSize.fourteen}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: 'Min', s: 'Sec'}}
                  digitStyle={{backgroundColor: "#E14E4E"}}
                  digitTxtStyle={{color:"white"}}
                  timeLabelStyle={{color:"white"}}
                />
                </Animatable.View>
                 </>  )}
                </ScrollView>
                
            </View>
          
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>
        )} 
    {props.state && animationtype == "fadeInUpBig" && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
             zIndex: 2,
             elevation:2
          }}></View>
      )}
      
   {/* {props.state  &&  (   */}

      {/* // )}  */}
    
  
  
  </>
  );
}

const styleSheet = StyleSheet.create({
    Text1: {
      fontFamily: 'Inter-Bold',
      fontSize: fontSize.fifteen,
      color:"black"
    },
    Text2: {
       fontFamily: 'Inter-SemiBold',
      fontSize: fontSize.ten,
      color:"#29262A", opacity: 0.4
    },
    Text3: {
      fontFamily: 'Inter-Bold',
     fontSize: fontSize.fourteen,
     color:"black"
   },
   Text4: {
      fontFamily: 'Inter-SemiBold',
     fontSize: fontSize.fourteen,
     color:"#E14E4E"
   },
   Text4: {
      fontFamily: 'Inter-SemiBold',
     fontSize: fontSize.fifteen,
     color:"#E14E4E"
   },
   Text5: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.thirteen,
    color:"black", opacity:0.4
   },
  
   Text6: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color:"black", opacity:0.8
   },
   Container:{
      flexDirection:"row", alignItems:"center", justifyContent:"space-between"
   },
   inputStyle: {
    fontFamily: "Inter-Regular",
    fontSize: fontSize.twenty,
    color: "#000000",
    borderRadius: fontSize.eleven,
   
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: scalableheight.one,
    borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)',
    padding:scalableheight.onepointfive
  },
  placeholderStyle: {
    color: "#818181",
    fontFamily: "Inter-Regular",
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
  
      marginTop:  scalableheight.two,
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
      elevation: 3
    },
    scrollcontainer:{ flexGrow: 1,  paddingVertical: scalableheight.two},
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
      backgroundColor:'#F9F9F9', 
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
