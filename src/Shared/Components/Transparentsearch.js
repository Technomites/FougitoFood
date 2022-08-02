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
  TextInput
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function Transparentsearch(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View style={{...styleSheet.shadow, flexDirection:"row", width:"100%", height:scalableheight.six,  borderRadius: fontSize.borderradiusmedium, borderWidth:1, borderColor:"rgba(211,211,211, 0.5)", backgroundColor: "rgba(211,211,211, 0.05)"}}>
    <TextInput
    value={props.search}
    placeholderTextColor= "rgba(211,211,211, 0.5)"
      onChangeText={text => props.onchange(text)}
      placeholder={"Search Restaurants"}
      style={{
        width: '100%',
        height: '100%',
fontSize:fontSize.fifteen,
   color: "rgba(211,211,211, 0.5)",
   
        alignSelf: 'center',
        paddingHorizontal: scalableheight.seven
        
     
      
      }}
    />
      

<Ionicons
name="search"
color={'grey'}
size={ fontSize.twenty}
style={{position: 'absolute', left: '5%', alignSelf: "center"}}
/>

<View style={{height: "100%", width: scalableheight.six, backgroundColor:"#E14E4E",position: 'absolute', right: 0, borderRadius: fontSize.borderradiusmedium, alignItems: "center", justifyContent: "center"}}>
<MaterialCommunityIcons
name="qrcode-scan"
color={'white'}
size={ fontSize.fourty}
style={{ alignSelf: "center"}}
/>
</View>

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
});


