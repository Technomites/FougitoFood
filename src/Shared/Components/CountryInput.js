import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable, Dimensions} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';

import {fontSize, scalableheight} from '../../Utilities/fonts';
const CountryInput = (props) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const {Lang} = useSelector(state => state.userReducer);
  return (
    <View style={{width: '100.5%',   paddingBottom:scalableheight.two }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="AE"
        layout="first"
        // autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={{...styles.textInput, ...styles.shadow }}
        style={{}}
        textInputStyle={{
          // color: 'black',
          // fontFamily: 'Rubik-Regular',
          // fontSize:fontSize.twelve,

        }}
        flagButtonStyle={{
          ...styles.shadow ,
          width: '20%',
          height: scalableheight.six,
          fontSize: fontSize.fifteen,
          backgroundColor: '#F9F9F9',
          alignSelf: 'center',
          borderRadius: fontSize.borderradiusmedium,
          paddingHorizontal: '5%',
          marginHorizontal: '0.4%',
        }}
        onChangeFormattedText={text => {
          setphoneNumber(text);
          props.Onpress(text)
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
    height: scalableheight.six,
  },

  textInput: {
    width: '100%',
          height: scalableheight.six,
          fontSize: fontSize.fifteen,
          backgroundColor: '#F9F9F9',
          alignSelf: 'center',
          borderRadius: fontSize.borderradiusmedium,
          paddingHorizontal: '5%',
       
     
    
  },
 shadow:  {
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
