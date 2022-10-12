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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
        // width: scalableheight.fourty,
        width: "99%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scalableheight.one,
        borderRadius: fontSize.eleven,
        backgroundColor:"white",
        flexDirection:"row",
        marginTop: scalableheight.one,
        marginLeft: scalableheight.borderwidth,
        // marginRight: scalableheight.two,
      
       
      }}>
      <View style={{height:"100%", width: "20%", alignItems:"center", justifyContent:"center"}}>
<View style={{height: scalableheight.six, width: scalableheight.six,      backgroundColor:'#F9F9F9', borderRadius: fontSize.borderradiusmedium, alignItems:"center", justifyContent:"center",}}>
{props.option == 1 ? 
<FontAwesome5 
            name="credit-card"
            color={"#E14E4E"}
            size={fontSize.twenty}
          />
          : 
          <Ionicons 
            name="wallet-sharp"
            color={"#E14E4E"}
            size={fontSize.twenty}
          />}
</View>

</View>
<View style={{height:"100%", width: "60%",justifyContent:"center", padding: scalableheight.two}}>
<Text style={{
            
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.fifteen,
                color:"#111111",
            
              }}>{props.title}</Text>
              <Text style={{
            
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.twelve,
            color:"#636363",
        
          }}>{props.payment}</Text>
            
</View>
<View style={{height:"100%", width: "20%",justifyContent:"center", padding: scalableheight.two,}}>
{props.selected ? 

<Ionicons 
            name="ios-radio-button-on"
            color={"#E14E4E"}
            size={fontSize.twenty}
          />
          :
          <Ionicons 
            name="ios-radio-button-off-sharp"
            color={'rgba(211,211,211, 0.8)'}
            size={fontSize.twenty}
          /> 
          }


       
              
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
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'

  
  },
});


