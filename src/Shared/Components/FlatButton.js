import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {myColors} from './MyColors';

type Props = {
  label: String,
  onPress: Function,
  backgroundColor: String,
  buttonStyle: ViewStyle,
  labelStyle: ViewStyle,
  disabled: Boolean,
};

export default function FlatButton(props: Props) {
  const {label, onPress, backgroundColor, buttonStyle, labelStyle, disabled} =
    props;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor ? backgroundColor : myColors.tertiary,
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      borderColor: 'white',
      marginVertical: 12,
      // ...shadow.med,
      ...buttonStyle,
    },
    buttonText: {
      color: myColors.primaryLight,
     
      fontSize: 16,
      ...labelStyle,
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}>
      <Text fontType="SemiBold" style={styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
