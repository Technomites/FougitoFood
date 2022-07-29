import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {FontFamily} from '../../constants/fonts';
import {theme} from '../../constants/styles';
import {fontSize, scalableheight} from '../../Utilities/fonts';

const CustomButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      style={[
        {
          ...styles.shadow,
          width: '100%',
          justifyContent: 'center',
          height: scalableheight.seven,
          backgroundColor: '#AB8651',
          borderRadius: fontSize.borderradiusmedium,

        //   marginTop: '1%',
        //   marginBottom: '5%',
        },
        props.containerstyle,
      ]}>
      {props.Loading == false ? (
        <Text style={[styles.buttonText, props.customButtonTextStyle]}>
          {props.title}
        </Text>
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="small" color={'white'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonMain: {
    backgroundColor: '#AB8651',
    borderRadius: 6,
    marginBottom: 20,
    paddingVertical: 14,

    justifyContent: 'center',

    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    fontFamily: 'Rubik-Regular',
    color: 'white',
    fontSize: fontSize.fourteen,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
    shadowRadius: 18,
  },
});

export default CustomButton;
