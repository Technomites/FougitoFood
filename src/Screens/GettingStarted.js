import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  
} from 'react-native';
import {useSelector} from 'react-redux';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontSize, scalableheight } from '../Utilities/fonts'
// import AuthButton from '../Shared/Components/AuthButton';
import * as Animatable from 'react-native-animatable';

const GettingStarted = props => {
  const {Lang} = useSelector(state => state.userReducer);

 
  useEffect(() => {
    //  StatusBar.setHidden(false);
    // StatusBar.setBackgroundColor('#363431');  
    // StatusBar.setBarStyle("dark-content")
    // hideNavigationBar()
    // changeNavigationBarColor("white");
  }, []);

  return (
    
  

      <ImageBackground
      resizeMode="cover"
  
        source={require('../Resources/images/Splash.png')}
        style={styleSheet.BackgroundImage}>
          <Image
    resizeMode= "contain"
      style={styleSheet.Image}
      source={require('../Resources/images/GettingStartedLogo.png')}/>
      <Text style={{color:"white", fontSize:fontSize.twentysix, fontFamily:"Rubik-Medium", textAlign:"center", width: "80%",    marginBottom:scalableheight.two}}>{Lang == "en" ? "PROVIDING YOU\n THE BEST FACILITIES" : "نوفر لك \n أفضل المرافق"}</Text>
    
      <Text style={{color:"#E6E3E3", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", textAlign:"center", width: "80%",  marginBottom:scalableheight.two}}>{Lang == "en" ? "It is a long established fact that a reader will be distracted by the readable" : "هناك حقيقة مثبتة منذ زمن طويل وهي أن المقروء سيلهي القارئ عن التركيز"}</Text>

<TouchableOpacity
 onPress={() => {

  props.navigation.replace("Drawernavigator")
}}
style= {{paddingVertical: scalableheight.onepointfive,
  paddingHorizontal: scalableheight.two, backgroundColor: "#AB8651", alignItems:"center", justifyContent:"space-evenly", flexDirection:"row", borderRadius:8 ,
elevation: 3,
shadowOffset: {width: 1, height: 1},
shadowColor: '#333',
shadowOpacity: 0.3,
shadowRadius: 2,

marginVertical: 6,
}}>
<Text style= {{color:"white", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", paddingRight: scalableheight.two,}}>{Lang == "en" ? "Get Started" : "البدء"}</Text>
<Animatable.View
        animation="zoomIn"
             easing="ease"
              iterationCount="infinite"
           
            >
<AntDesign name="arrowright" size={fontSize.twenty} color={'white'} />
</Animatable.View>
</TouchableOpacity>

      </ImageBackground>

 
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
    color:"black"
  },
  Image: {
 
    width:scalableheight.thirtysix,
    height:scalableheight.twentysix,
 

  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GettingStarted;
