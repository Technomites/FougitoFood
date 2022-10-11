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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Reviewscontainer(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View style={{
        ...styleSheet.shadow,
        width: '100%',
        alignSelf: 'center',
        height: props.pickupstate == false ? scalableheight.seventeen : scalableheight.sixteen,
       flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: scalableheight.one,
  
        paddingHorizontal: scalableheight.three,
        borderBottomLeftRadius: fontSize.twenty,
        borderBottomRightRadius: fontSize.twenty,
        zIndex:1}}>
          <View style= {{height:"100%", width: "70%",}}>
      <View style={{flexDirection:"row", paddingVertical: scalableheight.one, alignItems:"center",}}>
        {props?.token != "" &&
   <TouchableOpacity 
   style={{ marginRight:scalableheight.one}}
         onPress={props.onPress}>
      <FontAwesome 
                name="heart"
                color={props?.Isfavourite == true ? "red" : '#00000029'}

                // #FFD700
                size={fontSize.twenty}
              />
              </TouchableOpacity>}
          <View style={{height:scalableheight.three, backgroundColor:"#E14E4E", width: scalableheight.eight , flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", borderRadius: fontSize.borderradius,}}>
          <FontAwesome 
                name="star"
                color={"white"}
                size={fontSize.sixteen}
              />
              <Text style={{color:"white" , fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.twelve,}}>{props.rating}</Text>
          </View>
          <Text style={{marginLeft: scalableheight.one, color:"#29262A", fontFamily: 'Inter-Regular',
                    fontSize: fontSize.twelve,}}>{props.reviews}{ " Reviews"}</Text>
          </View>
    <Text
    numberOfLines={1}
    style={{ color:"#303030", fontFamily: 'Inter-Bold',
                    fontSize: fontSize.eightteen,}}>{props.title}</Text>
    <Text 
    numberOfLines={3}
    style={{ color:"#303030", fontFamily: 'Inter-Medium',
                    fontSize: fontSize.twelve, opacity: 0.4}}>{props.Address}</Text>

{props.pickupstate == false &&
<TouchableOpacity 
onPress={props.openbranchlist}
>


<Text
    numberOfLines={1}
    style={{ color:"#E14E4E", fontFamily: 'Inter-Bold',
                    fontSize: fontSize.twelve,}}>Change Branch</Text>
                    </TouchableOpacity>
  }
          </View>
          <View style= {{height:"100%", width: "30%",  alignItems:"flex-end",justifyContent:"center", }}>
          <Image
              resizeMode="contain"
              style={{ height: "100%", width:"100%",}}
              // source={{uri: props.image}}
              source={  props.image ? {uri: props.image} : null}
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


