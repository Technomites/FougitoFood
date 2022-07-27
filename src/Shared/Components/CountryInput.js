import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable, Dimensions} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';
import {fontSize, scalableheight} from '../../Utilities/fonts';
const CountryInput = ({
  heading,
  placeholder,
  inputStyle,
  containersStyle,
  color,
}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const {Lang} = useSelector(state => state.userReducer);
  return (
    <View style={{width: '100%', ...containersStyle, }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="AE"
        layout="first"
        // autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        style={{}}
        textInputStyle={{
          color: 'black',
          fontFamily: 'Rubik-Regular',
          fontSize:fontSize.twelve,

        }}
        flagButtonStyle={{
          borderRadius: 8,
          borderWidth: 0,
          borderBottomEndRadius: 1,
         
         
          backgroundColor: '#EEEBE7',
        }}
        onChangeFormattedText={text => {
          setphoneNumber(text);
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
    height: 48,
borderWidth:1, borderColor:"#A0A0A0",
borderRadius:6,
color: '#000000',
    //backgroundColor: '#F7F7FA',
    //backgroundColor: 'red',
    backgroundColor:"#EEEBE7",
    height: Dimensions.get('window').height / 15,
  },

  textInput: {
    paddingVertical: 0,
   
  
    //paddingVertical: 7,
    fontFamily: 'Rubik-Regular',
   
      borderRadius:13,
  backgroundColor:"#EEEBE7",
  

   
    paddingLeft: 5,
 

    
  },
});

export default CountryInput;
