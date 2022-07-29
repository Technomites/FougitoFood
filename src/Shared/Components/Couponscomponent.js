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

} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import {format} from 'date-fns';
import moment from 'moment';

export default function Couponscomponent(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View style={{...styleSheet.shadow, width:"100%", height:Dimensions.get('window').height / 5, borderRadius:fontSize.borderradiusmedium}}>
      <View style={{height:"57%", width: "100%", borderWidth:1, borderColor:"red", flexDirection:"row"}}>
<View style={{height: "100%", borderWidth:1, borderColor:"blue", width: "25%",alignItems:"center", justifyContent:"center"}}>
<View style={{ width :"80%", height:"80%", backgroundColor:"#F9F9F9",alignItems:"center", justifyContent:"center", borderRadius: fontSize.borderradiuslarge}}>
    <FontAwesome5 name="tags" size={fontSize.thirtyfive} color={"#F55050"} />
        </View>
</View>
<View style={{height: "100%", borderWidth:1, borderColor:"blue", width: "55%", justifyContent:"center"}}>
  <Text style={{fontFamily:"Inter-Medium", fontSize:fontSize.eleven, color: "#F55050"}}>40% OFF</Text>
  <Text style={{fontFamily:"Inter-Bold", fontSize:fontSize.sixteen, color: "black"}}>EidSpecial40</Text>
  <Text style={{fontFamily:"Inter-Medium", fontSize:fontSize.twelve, color: "#636363"}}>Min Order: AED 100</Text>
</View>
<View style={{height: "100%", borderWidth:1, borderColor:"blue", width: "20%"}}>
<Text style={{fontFamily:"Inter-Bold", fontSize:fontSize.twelve, color: "#F55050"}}>3 days left</Text>
</View>
      </View>
      <View style={{height:"42%", width: "100%", borderWidth:1, borderColor:"red"}}>

</View>
    {/* <View style={{ width :"25%", height:"100%", backgroundColor:"#F9F9F9", borderTopLeftRadius: fontSize.borderradiuslarge, borderBottomLeftRadius:fontSize.borderradiuslarge, alignItems:"center", justifyContent:"center"}}>
    <FontAwesome5 name="ticket-alt" size={fontSize.thirtyfive} color={"rgba(192,192,192, 0.8)"} />
        </View>
        <View style={{width :"75%", height:"100%", justifyContent:"space-evenly", padding:10,backgroundColor:"white", borderBottomRightRadius :fontSize.borderradiuslarge, borderTopRightRadius:fontSize.borderradiuslarge,}}>
            <Text style={{fontFamily:"Rubik-Medium", fontSize:fontSize.fourteen, color: "#000000"}}>{props.title}</Text>
            <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#000000", opacity:  0.4}}>Max Discount AED {props.discountprice}</Text>
            <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#000000", opacity:  0.4}}>Valid till {props.vailidity}</Text> 
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <View style={{backgroundColor:"#EEEBE7", alignItems:"center", justifyContent:"center", padding:5, borderRadius:fontSize.borderradius}}>
            <Text  style={{fontFamily:"Rubik-Medium", fontSize:fontSize.twelve, color: "#707070"}}>{props.percentage} Off</Text>
            </View>
            <TouchableOpacity
            onPress={() => {
                Clipboard.setString(props.code)
              props.copy()
            }}
            style={{flexDirection:"row"}}>
            <Text  style={{fontFamily:"Rubik-Medium", fontSize:fontSize.fourteen, color: "#C59E6E"}}>{props.code}</Text>
            <FontAwesome5 name="copy" size={fontSize.thirteen} color={"#C59E6E"} style={{marginLeft:"4%"}} />
        </TouchableOpacity>
            </View>
        </View> */}
     </View>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: fontSize.twenty,
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
});


