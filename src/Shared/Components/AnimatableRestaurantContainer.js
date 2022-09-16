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

export default function AnimatableRestaurantContainer(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View style={{
        ...styleSheet.shadow,
        width: '100%',
        alignSelf: 'center',
        height: "100%",
       flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: scalableheight.one,
        overflow: "hidden",
        paddingHorizontal: scalableheight.three,
        borderBottomLeftRadius: fontSize.twenty,
        borderBottomRightRadius: fontSize.twenty,
        zIndex:1}}>
          <View style= {{height:"100%", width: "50%",}}>
      <View style={{flexDirection:"row", paddingVertical: scalableheight.one, alignItems:"center",}}>
          <View style={{height:scalableheight.three, backgroundColor:"#E14E4E", width: scalableheight.eight , flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", borderRadius: fontSize.borderradius}}>
          <FontAwesome 
                name="star"
                color={"white"}
                size={fontSize.sixteen}
              />
              <Text style={{color:"white" , fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.twelve,}}>{props.rating}</Text>
          </View>
          <Text style={{marginLeft: scalableheight.one, color:"#29262A", fontFamily: 'Inter-Regular',
                    fontSize: fontSize.twelve,}}>{props.reviews}{ " reviews"}</Text>
          </View>
    <Text style={{ color:"#303030", fontFamily: 'Inter-Bold',
                    fontSize: fontSize.twentytwo,}}>{props.title}</Text>
    <Text style={{ color:"#303030", fontFamily: 'Inter-Medium',
                    fontSize: fontSize.twelve, opacity: 0.4}}>{props.description}</Text>
          </View>
          <View style= {{height:"100%", width: "50%",  alignItems:"flex-end",justifyContent:"center", }}>
          <Image
              resizeMode="contain"
              style={{ height: "100%", width:"60%"}}
              source={props.image}
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


