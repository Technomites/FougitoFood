import React from 'react';
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
  ImageBackground
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function Categoriescard(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
      
      }}
      style={{
      
        height: scalableheight.fifteen,
        width: scalableheight.fourty,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scalableheight.two
       
      }}>
      <>
       <View
          style={{
            ...styleSheet.shadow,
            width: '100%',
            height: '95%',
            borderRadius: fontSize.eleven,
            justifyContent:"center"
          }}>

     <ImageBackground
    resizeMode= "stretch"
    style={{
      width: '100%',
      height: '99.5%',
   justifyContent:"center",


    }}
    imageStyle={{    borderRadius: fontSize.eleven,}}
      source={props.image}>
        
        <Text style={{
            paddingLeft: scalableheight.two,
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.sixteen,
                color:"white"
              }}>{props.type}</Text>
           <Text style={{
             paddingLeft: scalableheight.two,
                fontFamily: 'Inter-medium',
                fontSize: fontSize.twelve,
                color:"white",
                opacity:0.6
              }}>{"Average Price AED "} {props.price}</Text>
              </ImageBackground> 
        </View> 
       
      </>
    </TouchableOpacity>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scalableheight.one
  },

  text: {
    fontSize: 20,
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
  backButtonMain: {
    backgroundColor: "#F9F9F9",
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
},
shadow:{
  shadowColor: '#470000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.2,
  elevation: 2
}
});


