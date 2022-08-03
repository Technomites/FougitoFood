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
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function ItemDetails(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={{
        ...styleSheet.shadow,
        height: scalableheight.nine,
        width: "99%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scalableheight.one,
        borderRadius: fontSize.eleven,
        backgroundColor:"white",
        flexDirection:"row",
        marginTop: scalableheight.borderwidth,
 
       
      }}>
     <View style={{height:"100%", width: "15%", alignItems:"center", justifyContent:"center"}}>
<View style={{height: scalableheight.four, width: scalableheight.four,    backgroundColor: '#F5F5F5', borderRadius: fontSize.borderradiusmedium, alignItems:"center", justifyContent:"center",}}>
<Text style={{
            
            fontFamily: 'Inter-Bold',
            fontSize: fontSize.fourteen,
            color:"#111111",
        
          }}>1</Text>
</View>

</View>
<View style={{height:"100%", width: "55%",justifyContent:"center", padding: scalableheight.two}}>
<Text style={{
            
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.twelve,
                color:"#111111",
            
              }}>{props.title}</Text>
              <Text style={{
            
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.ten,
            color:"#E14E4E",
        
          }}>View Details</Text>
            
</View>
<View style={{height:"100%", width: "30%",justifyContent:"center", padding: scalableheight.two,}}>

              <Text style={{
            
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.twelve,
            color:"#111111",
        
          }}>{"AED "}{props.price}</Text>
</View>
   
            
       
    </TouchableOpacity>
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
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3
  },
});


