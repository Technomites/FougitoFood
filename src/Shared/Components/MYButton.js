import React from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { fontSize, scalableheight } from "../../Utilities/fonts";
export default function MYButton(props) {

  
  return (
<View style={{...styleSheet.Loginbutton,   backgroundColor: props.color}}>
             <Text style={{fontSize:fontSize.fifteen, color:props.textcolor,  fontFamily: 'Rubik-Medium'}}>{props.title}</Text>
           </View>

  );
}

const styleSheet = StyleSheet.create({
  
    Loginbutton: {
   
        width: "100%",
      
        justifyContent: 'center',
        alignItems: 'center',
      
      
    borderWidth:scalableheight.borderTopWidth,
    borderColor:"#C59E6E",

    height:scalableheight.seven,

    borderRadius: fontSize.borderradiusmedium,
 
    marginTop:"1%",
    marginBottom:"1%"
      },
})
