
import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';


export default function BookingHeader(props) {
  const navigation = useNavigation();
 
  return (
    <View style={styleSheet.header}>

<Text style={{ fontSize:16, color:"white",  fontFamily: 'Rubik-Bold'}}>{props.title}</Text>
<TouchableOpacity
 onPress={() =>
  navigation.pop()
}
style={{    position:"absolute",
left:15}}
>
<FontAwesome5
                        name="arrow-left"
                        style={{
                          color: 'white',
                          fontSize: 22,
                          width: 'auto',
                          height: 'auto',
                      
                        }}
                      />
                      </TouchableOpacity>
                      <TouchableOpacity
 onPress={() =>
  props.openfilter()
}
style={{           position:"absolute",
right:15}}
>
                      <FontAwesome5
                        name="filter"
                        style={{
                          color: 'white',
                          fontSize: 20,
                          width: 'auto',
                          height: 'auto',
                   
                        }}
                      />
                            </TouchableOpacity>
    </View>
  );
}

const styleSheet = StyleSheet.create({
 
    header: {
     
  width: "100%",
  height:55,
  flexDirection:"row",
  alignItems: "center",
  justifyContent:"center",
  backgroundColor:"black",
  borderWidth:2, borderColor:"green"

  },
   
  text: {
  fontSize:20
  },
  icon: {
      position: "absolute",
      left: "-1%"
    },
    videocall: {
      flexDirection:"row",
      position: "absolute",
      right: "-1%"
          },
})
