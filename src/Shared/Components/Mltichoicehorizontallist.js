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
  FlatList,
  TextInput
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import renderIf from 'render-if';
import { useNavigation } from '@react-navigation/native';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ScrollView } from 'react-native-gesture-handler';
export default function Mltichoicehorizontallist(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();


  return (
    <View
    style={{
      
      width: '100%',
      
      justifyContent: 'center',
      
  
      alignSelf: 'center',
    
    }}>
    <Text  style={{fontFamily: 'Inter-Bold',
                fontSize: fontSize.fourteen,
                color:"black",}}>{props?.title} <Text style={{color:"#E14E4E"}}>{props?.IsRequired == true ? " " : " (Optional)"}</Text></Text>

      <FlatList
              keyExtractor={(item, index) => index.toString()}
           
          
                horizontal
                showsHorizontalScrollIndicator ={false}
                style={{width:"100%", flexDirection:"row"}}
                // contentContainerStyle={{flexDirection:"row"}}
              data={props?.data}
              renderItem={({item,index}) => 
                {  return (
                <TouchableOpacity 
                onPress={() => {props.update(index,  props.index)}}
                style={{flexDirection:"row", marginTop:scalableheight.pointfive,  alignItems:"center"}}>
                  {renderIf(item?.selected == true)(
                    <MaterialIcons
                    name="radio-button-checked"
                    color={'#E14E4E'}
                    size={ fontSize.twenty}
                    style={{}}
                    /> 
                  )}
                   {renderIf(item?.selected == false)(
                     <MaterialIcons
                     name="radio-button-unchecked"
                     color={'grey'}
                     size={ fontSize.twenty}
                     style={{}}
                     />
                  )}
          
               
        
                <Text  style={{fontFamily: 'Inter-Medium',
                        fontSize: fontSize.fifteen,
                        color:"black",marginLeft: scalableheight.one, marginRight: scalableheight.one}}>{item.Value}</Text>
                         {/* <Text  style={{fontFamily: 'Inter-Bold',
                        fontSize: fontSize.thirteen,
                        color:"black",position:"absolute", right:0}}>{item.price}</Text> */}
             
    
           
        </TouchableOpacity>
            )}}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
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


