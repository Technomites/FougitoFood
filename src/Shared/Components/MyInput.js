import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontSize, scalableheight} from '../../Utilities/fonts';
const MyInput = props => {
  const {Lang} = useSelector(state => state.userReducer);
  return (
    <View
      style={{
    
      
        backgroundColor: '#FFF',
       
       
        flexDirection: 'row',
        paddingLeft:props.padding ? 11: 0 ,

        fontFamily: 'Rubik-Regular',
        fontSize: fontSize.fifteen,
        color: '#000000',
        borderRadius: fontSize.borderradiusmedium,
        paddingHorizontal: scalableheight.two,
    
        justifyContent: 'center',
        width: '100%',
        borderColor: '#A0A0A0',
        borderWidth: 1,
        height: scalableheight.seven,
        
   
      }}>
      {props.phone && (
        <TouchableOpacity
          onPress={props.onPhone}
          style={{
            height:  scalableheight.seven,
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:"row"
          }}>
          <Text style={{fontSize: fontSize.twelve}}>{props.countryCode}</Text>
          <MaterialIcons
              name="arrow-drop-down"
              style={{
                color: 'black',
       

                fontSize: fontSize.twenty,
                width: 'auto',
                height: 'auto',
              }}
            />
        </TouchableOpacity>
        
      )}

      <TextInput
        value={props.value}
        numberOfLines={props.msg ? 2 : 1}
        placeholderTextColor={'#A0A0A0'}
        style={{fontSize: fontSize.twelve, paddingRight: 15, paddingLeft: 15, width: '75%', color:"grey", alignItems:"center", textAlign:  'left' , alignSelf: "center"}}
        placeholder={props.placeHolder}
        onChangeText={props.onChangeText}
        keyboardType= {props.keyboardnum ? 'numeric': 'default'} 
     
      />
    </View>
  );
};
export default MyInput;
