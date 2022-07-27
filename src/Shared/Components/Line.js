
import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Line({navigation}) {

  
  return (
    <View style={styleSheet.Line1} />

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
