import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  TextInput
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function SearchBar(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View
    style={{
      ...styleSheet.shadow,
      width: '99%',
      height: Dimensions.get('window').height / 15,
      justifyContent: 'center',
      borderRadius: fontSize.twenty,
      marginTop: '3%',
      alignSelf: 'center',
      marginBottom: '3%',
    }}>
    <TextInput
    value={props.search}
      onChangeText={text => props.onchange(text)}
      placeholder={"Search here"}
      style={{
        width: '100%',
        height: '100%',
fontSize:fontSize.fifteen,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: fontSize.twenty,
        paddingHorizontal: '5%',
      
      }}
    />
      

<Ionicons
name="search"
color={'grey'}
size={ fontSize.twenty}
style={{position: 'absolute', right: '5%'}}
/>
      
        
   
  </View>   
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scalableheight.one
  },

  text: {
    fontSize: 20,
  },
  icon: {
    position: 'absolute',
    left: '-1%',
  },
  videocall: {
    flexDirection: 'row',
    position: 'absolute',
    right: '-1%',
  },
  backButtonMain: {
    backgroundColor: "#F9F9F9",
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
},
shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});


