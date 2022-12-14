import React from 'react';
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
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function MYButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styleSheet.Loginbutton, backgroundColor: props.color}}>
      <Text
        style={{
          fontSize: fontSize.fifteen,
          color: props.textcolor,
          fontFamily: 'Inter-SemiBold',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styleSheet = StyleSheet.create({
  Loginbutton: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    height: scalableheight.seven,

    borderRadius: fontSize.borderradiusmedium,

    marginTop: '1%',
    marginBottom: '1%',
  },
});
