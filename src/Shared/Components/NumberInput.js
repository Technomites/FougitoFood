import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet, TextInput, Image} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {fontSize, scalableheight} from '../../Utilities/fonts';
// import Color from '../../Constants/Color';

const CountryInput = props => {
  const [phoneNumber, setphoneNumber] = useState('');

  return (
    <View
      style={{
        width: '100%',
        // height: 50,
        flexDirection: 'row',
        ...props.style,
      }}>
      <View
        style={{
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: scalableheight.three,
            width: scalableheight.four,
            resizeMode: 'stretch',
          }}
          source={require('../../Resources/images/uaeFlag.png')}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '15%',
        }}>
        <Text
          numberOfLines={props.numberOfLines}
          style={{
            fontSize: fontSize.fourteen,
            fontFamily: 'Inter-SemiBold',
            color: '#29262A',
            ...props.style,
          }}>
          +971
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '60%',
        }}>
        <TextInput
          editable={props.editable}
          maxLength={9}
          keyboardType="number-pad"
          value={props.value}
          onChangeText={props.onChangeText}
          placeholderTextColor={'lightgray'}
          secureTextEntry={props.secure}
          placeholder={'Enter number here'}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </View>
  );
};

export default CountryInput;
