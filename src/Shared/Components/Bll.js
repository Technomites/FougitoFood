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
  ImageBackground
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Bll(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    
  
    <View style={styleSheet.Container}>
    <Text style={styleSheet.Text3}>{props.label}</Text>
    <Text style={styleSheet.Text3}>AED {props.price}</Text>
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
  Text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color:"black"
  },
  Text2: {
     fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.ten,
    color:"#29262A", opacity: 0.4
  },
  Text3: {
    fontFamily: 'Inter-Bold',
   fontSize: fontSize.fourteen,
   color:"black"
 },
 Text4: {
    fontFamily: 'Inter-SemiBold',
   fontSize: fontSize.fourteen,
   color:"#E14E4E"
 },
 Container:{
    flexDirection:"row", alignItems:"center", justifyContent:"space-between"
 },


});


