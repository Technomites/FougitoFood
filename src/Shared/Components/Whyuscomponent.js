import React from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function Whyuscomponent(props) {
  const {Lang} = useSelector(state => state.userReducer);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
      }}>
      <Text style={{color: '#111111', marginRight: scalableheight.one}}>
        {'\u2022'}
      </Text>
      <Text
        style={{
          fontSize: fontSize.twelve,
          fontFamily: 'Inter-Medium',
          color: 'rgba(41, 38, 42, 0.5)',
          alignSelf: 'flex-start',
        }}>
        {props.text}
      </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
