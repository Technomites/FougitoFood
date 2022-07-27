
import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function Whyuscomponent(props) {
  const {Lang} = useSelector(state => state.userReducer);
  
  return (
    <View  style={{flexDirection: Lang == "en" ? "row" : "row-reverse", alignSelf:Lang == "en" ? "flex-start" : "flex-end", alignItems:"center", marginTop:5, marginBottom:5}}>
    <AntDesign 
          style={{}}
          color={'#C59E6E'}
          name="checkcircle"
          size={fontSize.fifteen}
       />
    <Text style={{marginRight:  Lang == "en" ?"0%": "3%", marginLeft:  Lang == "en" ?"3%": "0%", fontSize: fontSize.twelve, fontFamily: "Rubik-Regular", color:"#0000008C"}}>{props.text}</Text>
    </View>

  );
}

const styleSheet = StyleSheet.create({
    Line1: {
        borderBottomWidth: 1,
        width: '100%',
        height: 10,
        color: '#707070',
        opacity: 0.1,
        justifyContent:"center",
        alignItems:"center"
      },
  
})
