import React, {useState, useEffect, useRef} from 'react';
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
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function UpcomingBookingCard(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();
const [DefaultRating, setDefaultRating] = useState(0);
const [MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
const {Lang} = useSelector(state => state.userReducer);



useEffect(() => {
  // if(props.rating[0])
  // setDefaultRating
  if(props.rating != null){
    console.log(props.rating[0])
  }

}, []);


const Ratingbar = () => {
  return (
    <View
      style={{
        width: '30%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      {MaxRating.map((item, key) => {
        return (
          <View>
            <FontAwesome
              name="star"
              size={fontSize.fourteen}
              color={item <= props.rating[0] ? '#E6C24D' : '#F5F5F5'}
            />
          </View>
        );
      })}
    </View>
  );
};
  return (
 <>
         <View
          style={{
            flexDirection: Lang == "en" ? 'row' : 'row-reverse',
        
            width: '94%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom:"2%",
            marginTop:"5%"
          }}>
          <View style={{flexDirection: Lang == "en" ? 'row' : 'row-reverse'}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
              }}>
          {Lang == "en" ? "Book ID:" : "معرف الكتاب:" }
            </Text>
            <Text
              style={{
                color: '#C59E6E',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
                marginLeft: Lang == "en" ?  "3%" : "0%",
                marginRight: Lang == "en" ?  "0%" : "3%"
              }}>
              {props.bookingid}
            </Text>
          </View>
          <Text
            style={{
              color: '#C59E6E',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>
            {props.bookingdate}
          </Text>
        </View>
        <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.35,
                    shadowRadius: 4.5,
              
                  elevation: 2,
              
                  width: "95%",
                  height: Dimensions.get('window').height / 4.5,
                  backgroundColor: 'white',
                  borderRadius:  fontSize.borderradiuslarge,
                 
                  borderWidth:1,
                  borderColor:"#C59E6E"
                }}>
<View style={{width:"100%", height: "70%", alignItems:"center"}}>
<View style={{width:"95%", height: "33.33%",flexDirection: Lang == "en" ? 'row' : 'row-reverse', alignItems:"center", justifyContent:"space-between"}}>
<Text  style={{
              color: 'black',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>{props.category}</Text>
            <Text  style={{
              color: '#707070',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>{props.subcategory}</Text>
</View>
<View style={{width:"95%", height: "33.33%",flexDirection: Lang == "en" ? 'row' : 'row-reverse', alignItems:"center", justifyContent:"flex-start"}}>
<Text  style={{
              color: 'black',
              fontFamily: 'Rubik-Regular',
              fontSize:  fontSize.twelve,
            }}>{Lang == "en" ? "Address" : "عنوان"}</Text>
            <Text  
            numberOfLines={2}
            style={{
              color: '#C59E6E',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
              marginLeft:"4%",
              width:"83%", 
              marginLeft: Lang == "en" ? "4%" : "0%",
              marginRight: Lang == "en" ? "0%" : "4%",
          
            textAlign: Lang == "en" ? "left" : "right"
            }}>{props.address}</Text>
</View>
<View style={{width:"95%", height: "33.33%",flexDirection: Lang == "en" ? 'row' : 'row-reverse', alignItems:"center", justifyContent:"flex-start"}}>
<Text  style={{
              color: 'black',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>{Lang == "en" ? "Status" : "حالة"}</Text>
            <Text  style={{
              color: '#C59E6E',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
              marginLeft: Lang == "en" ? "4%" : "0%",
              marginRight: Lang == "en" ? "0%" : "4%",
            }}>{props.status}</Text>
</View>
</View>
<View style={{flexDirection: Lang == "en" ? 'row' : 'row-reverse' , width:"99.8%", height: "30%", backgroundColor:"#EEEBE7", alignItems:"center", justifyContent:"space-between", borderBottomLeftRadius: fontSize.borderradiuslarge, borderBottomRightRadius: fontSize.borderradiuslarge, paddingLeft:"3%", paddingRight:"1%"}}>

<View style={{flexDirection: Lang == "en" ? 'row' : 'row-reverse'}}>
<Text  style={{
              color: 'black',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>{Lang == "en" ? "Total" : "المجموع" }</Text>
            <Text  style={{
              color: '#AB8651',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,     
               marginLeft: Lang == "en" ? "5%" : "0%",
              marginRight: Lang == "en" ? "0%" : "5%",
            }}>{Lang == "en" ? "AED |" : "درهم |" }  {props.price}</Text>
            </View>

        
                    {props.status == "Completed" ?
                    props.Rated == false ? 
            <TouchableOpacity
            
            onPress={() => {
              props.givereview(props.SID, props.SBID, props.INDEX)
            }}
                           style={{
                    
                  width: "30%",
                  height: "65%",
                  backgroundColor: '#AB8651',
                  borderRadius:  fontSize.borderradiuslarge,
                  borderWidth:1,
                  borderColor:"#C59E6E",
                  alignItems:"center",
                  justifyContent:"center"
                }}>
                    <Text style={{
              color: 'white',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.ten}}>{ Lang == "en" ? "Write a Review" : "أكتب مراجعة"}</Text>
                </TouchableOpacity>:
    //  <Text style={{
    //   color: "#C59E6E",
    //   fontFamily: 'Rubik-Regular',
    //   fontSize: fontSize.ten, paddingRight:"2%"}}>{ Lang == "en" ? "Review Submitted" : "تم إرسال المراجعة"}{props.rating[0]}</Text>
    <Ratingbar />
                    
         :
         null}
</View>
                </View>
 
 </>
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
});


