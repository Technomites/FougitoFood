import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import DerivedText from './DerivedText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {myColors} from './MyColors';
import {useSelector, useDispatch} from 'react-redux';

export default function HeaderTypes({label, headerType, navigation}) {
  const {Lang} = useSelector(
    state => state.userReducer,
  );

  switch (headerType) {
    case 'labelback':
      return (
        <SafeAreaView style={{flex:1}}>
          <View
            style={{
              height: 60,
               backgroundColor:"white",
              paddingVertical: 20,
              paddingHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            
            }}>
              <TouchableOpacity 
                  onPress={() => navigation.pop()}
              style={{position:"absolute", left:10,  height: 60,  justifyContent: 'center', width:40,
              alignItems: 'center',}}>
            <MaterialIcons
          
              color={myColors.primaryText}
              size={20}
              name="arrow-back"
            />
            </TouchableOpacity>
            <DerivedText
              fontType="SemiBold"
              style={{
                textAlign: 'center',
                color: myColors.primaryText,
                fontSize: 18,
    
              }}>
              {label}  
            </DerivedText>
        
      
          </View>
          </SafeAreaView>
      );

    default:
      break;
  }
}

const styles = StyleSheet.create({});
