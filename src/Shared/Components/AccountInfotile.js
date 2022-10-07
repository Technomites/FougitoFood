import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fontSize, scalableheight } from '../../Utilities/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function AccountInfotile(props) {
  const [animationstate, setanimationstate] = useState(false);
  // console.log(props?.data.onPress);
  // console.log(props?.data);

  async function pressablee() {
    props?.data?.onPress()
    setanimationstate(true)
   
    // setTimeout(async () => {
    //   props?.data?.onPress()
    // }, 500);
   
  }
  function pressablee1() {
     
    // console.log("yo")
  }
  
  return (
    // <Animatable.View
    //   animation={animationstate ? 'bounceOutRight' : ""}
    //   onAnimationEnd={() => {
    //     props?.data?.onPress()
    //     setanimationstate(false);
   
    //   }}
    //   easing="ease"
    //   iterationCount={1}>
    <View>
      <TouchableOpacity 
     activeOpacity={0.9}
      onPress={()=>{
        pressablee()
      }
       
    }

        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          // alignContent: 'center',
          marginVertical: scalableheight.one,
        }}>
        <View
          style={{
            ...styles.shadow,
            backgroundColor: '#F5F5F5',
            borderRadius: scalableheight.one,
            width: scalableheight.five,
            height: scalableheight.five,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ alignSelf: 'center' }}>
            {props?.data.type === 1 ? (
              <Ionicons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 2 ? (
              <Feather
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 3 ? (
              <MaterialCommunityIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 4 ? (
              <AntDesign
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 5 ? (
              <MaterialCommunityIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 6 ? (
              <AntDesign
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : props?.data.type === 8 ? (
              <MaterialIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentytwo}
              />
            ) : null}
          </View>
        </View>

        <View
          style={{
            marginHorizontal: scalableheight.onepointfive,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.fourteen,
            }}>
            {props?.data.title}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'rgba(112, 112, 112, 0.15)',
        }}></View>
        </View>
    // </Animatable.View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#470000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});


