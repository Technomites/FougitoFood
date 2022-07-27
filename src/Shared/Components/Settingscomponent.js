import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Switch,
  NativeModules,
  LayoutAnimation,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import ToggleSwitch from 'toggle-switch-react-native';
import { changelang, eraseNotificationStatus, updateNotificationStatus, } from '../../Actions/actions';
import { showToast } from 'react-native-gtoast';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Settingscomponent(props) {
    const [isMenu, setIsMenu] = useState(false);
    const [Language, setLanguage] = useState("");
    const {Lang} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (Lang == "en"){
        setLanguage("English")
      } else{
        setLanguage("Arabic")
      }
    }, [Lang]);

  return (
    <View style={{alignItems:"center", justifyContent: "flex-start" , flexDirection: Lang == "en" ? "row" : "row-reverse", width: "100%", borderTopWidth:scalableheight.borderTopWidth, borderColor:"#DBDBDB", paddingHorizontal: scalableheight.one, height: Dimensions.get('window').height /13}}>
    <View style={{width:scalableheight.five, height:scalableheight.five, borderRadius:fontSize.circle, backgroundColor:"#F9F9F9", alignItems:"center", justifyContent:"center"}}>
  {props.notify == "true" ? 
   <MaterialIcons
   name=   {props.icon}
color={"#8F7B62"}
   size={fontSize.twentyfour}
 
 />
:
 props.newicon == true ?

 <MaterialCommunityIcons
                  name={'chat'}
                  color={"#8F7B62"}
                  size={fontSize.twenty}
                />
:
                props.ionicon == true ? 

                <Ionicons
                  name={'document'}
                  color={"#8F7B62"}
                  size={fontSize.twenty}
                />
  :  <FontAwesome5
          name=   {props.icon}
       color={"#8F7B62"}
       size={fontSize.twenty}
        
        />}
    </View>
   <Text style={{marginRight: Lang == "en" ? "0%": "5%", marginLeft: Lang == "en" ? "5%": "0%", color:"black", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium"}}>
   {props.title}
   </Text>
   {props.notify == "true" ? 
  //  <Switch
  //  style={{position:"absolute", right:"3%", transform: [{ scaleX: scalableheight.borderTopWidth }, { scaleY: scalableheight.borderTopWidth }]}}
  //             trackColor={{false: '#767577', true: '#C59E6E'}}
  //             thumbColor={isEnabled ? 'white' : 'white'}
  //             ios_backgroundColor="#3e3e3e"
  //             onValueChange={toggleSwitch}
  //             value={isEnabled}
  //           />
  <ToggleSwitch
  style={{position:"absolute", right:"3%"}}
              isOn={props.isEnabled}
              thumbOnStyle={{backgroundColor: 'white'}}
              thumbOffStyle={{backgroundColor: 'white'}}
              trackOnStyle={{backgroundColor: '#C59E6E'}}
              trackOffStyle={{backgroundColor: '#DFE0E2'}}
              onToggle={props.toggleSwitch}
              size="medium"
            />
            
            :null}

{props.langtoggle == "true" ?
isMenu ? (  <View
    style={{width:Dimensions.get('window').width /4, height:Dimensions.get('window').height /8, borderRadius:24, backgroundColor:"#F9F9F9", alignItems:"center", justifyContent:"center",position:"absolute", right:"3%", top:"10%"}}
                 >
  <TouchableOpacity 
   onPress={() => {
    // LayoutAnimation.spring();
      setIsMenu(false)
      dispatch(changelang("en"));
      AsyncStorage.setItem('Language', 'en');
      setLanguage("English")}}
  style={{width:"100%", height:"50%", alignItems:"center", justifyContent:"center", backgroundColor: Language == "English" ? "#C59E6E" : "#F9F9F9", borderTopLeftRadius:24, borderTopRightRadius: 24}}>
<Text style={{ color:Language == "English" ? "white" : "black", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium"}}>English</Text>
  </TouchableOpacity>
  <TouchableOpacity
   onPress={() => {
    // LayoutAnimation.spring();
      setIsMenu(false)
      dispatch(changelang("ar"));
      AsyncStorage.setItem('Language', 'ar');
      setLanguage("Arabic")}}
  style={{width:"100%", height:"50%", alignItems:"center", justifyContent:"center", backgroundColor:Language == "Arabic" ? "#C59E6E" : "#F9F9F9", borderBottomLeftRadius:24, borderBottomRightRadius: 24}}>
  <Text style={{ color:Language == "Arabic" ? "white" : "black", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium"}}>Arabic</Text>
  </TouchableOpacity>
</View>):(
   <TouchableOpacity
   style={{width:"20%", height:"60%", borderRadius:45, backgroundColor:"#C59E6E", alignItems:"center", justifyContent:"center",position:"absolute", right:"3%"}}
   onPress={() =>{
    // LayoutAnimation.spring();
       setIsMenu(true)}}>
           <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
    <Text style={{ color:"white", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular"}}>{Language == "English" ? "EN" : "AR"}</Text>
    <MaterialIcons
   name= "keyboard-arrow-down"
color={"white"}
size={fontSize.twentytwo}
 
 />
 </View>
</TouchableOpacity>
):null}
   </View>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: fontSize.twenty,
  },
  icon: {
    position: 'absolute',
    left: '-1%',
  },
  videocall: {
    flexDirection: 'row',
    position: 'absolute',
    right: '-1%',
  },
});


