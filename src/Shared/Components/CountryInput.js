import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';

import {fontSize, scalableheight} from '../../Utilities/fonts';
const CountryInput = props => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const {Lang} = useSelector(state => state.userReducer);
  return (
    <View
      style={{
        width: '100.5%',
        height: scalableheight.seven,
        marginBottom: scalableheight.two,
        overflow: 'hidden',
      }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="AE"
        placeholder="Enter Phone Number"
        layout="first"
        // autoFocus

        containerStyle={styles.phoneContainer}
        textContainerStyle={{
          ...styles.textInput,

          borderWidth: 1,
          borderColor: 'rgba(128, 128,128, 0.6)',
          height: '100%',
        }}
        style={{}}
        textInputStyle={{
          // fontFamily: 'Rubik-Regular',
          color: 'rgba(128, 128,128)',
          fontSize: fontSize.fifteen,
          height: scalableheight.six,

          position: 'absolute',
          left: '25%',
          width: '80%',
        }}
        codeTextStyle={{
          // height: scalableheight.six,
          // borderWidth:1, borderColor:"green",
          // alignSelf: 'center',
          // zIndex:5, elevation:5,
          height: '100%',

          color: 'rgba(128, 128,128)',

          fontSize: fontSize.fifteen,
        }}
        flagButtonStyle={{
          // ...styles.shadow ,
          borderWidth: 1,
          borderColor: 'rgba(128, 128,128, 0.6)',
          width: '20%',
          height: '100%',
          fontSize: fontSize.fifteen,
          backgroundColor: '#F9F9F9',

          alignSelf: 'center',
          borderRadius: fontSize.borderradiusmedium,
          paddingHorizontal: '5%',
          marginHorizontal: '0.4%',
        }}
        onChangeFormattedText={text => {
          if (text.length < 14) {
            setphoneNumber(text);
            props.Onpress(text);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: '100%',

    backgroundColor: '#F9F9F9',
    //  height: scalableheight.eight,
  },

  textInput: {
    width: '100%',
    // height: scalableheight.ten,
    fontSize: fontSize.fifteen,
    // backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
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
  },
});

export default CountryInput;
