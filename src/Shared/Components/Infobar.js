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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function Infobar(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View style={{...styleSheet.shadow, flexDirection:"row", width:"100%", height:scalableheight.eight, backgroundColor:"white", borderRadius: fontSize.borderradiusmedium}}>
    <View style={{height: "100%", width: "20%", alignItems:"center", justifyContent:"center"}}>
<View style={{height:scalableheight.six, width: scalableheight.six, backgroundColor:"#00000029",  borderRadius: fontSize.borderradiusmedium, alignItems:"center", justifyContent:"center"}}>
<MaterialIcons 
            name="location-pin"
            color={'#F55050'}
            size={fontSize.thirtythree}
          />
</View>
    </View>
 
    <View style={{height: "100%", width: "60%", justifyContent:"center"}}>

    <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.sixteen,
                color:"#29262A"
              }}>{props.Heading}</Text>
<Text 
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: fontSize.ten,
                color:"#29262A",
                opacity: 0.4
              }} numberOfLines={2}>{props.Details}</Text>
    </View>
  
    <View style={{height: "100%", width: "20%", alignItems:"center", justifyContent:"center"}}>
    <MaterialIcons 
            name="edit"
            color={"#00000029"}
            size={fontSize.twentyeight}
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


