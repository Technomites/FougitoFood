import React, {useState, useEffect} from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { fontSize, scalableheight } from '../../Utilities/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { parseWithOptions } from 'date-fns/fp';
import {
  filteredcatdata,
  storecartprice
} from '../../Actions/actions';
export default function ItemDetails(props) {
  const dispatch = useDispatch();
const navigation = useNavigation();
const [showcounter, setshowcounter] = useState(false);
const [animationstate, setanimationstate] = useState(true);

const {
  cartdata,
  price
} = useSelector(
  state => state.userReducer,
);


useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    console.log("search hit " )
    setshowcounter(false)
    setanimationstate(true)
  
    // Send Axios request here
  }, 3000)

  return () => clearTimeout(delayDebounceFn)
}, [cartdata, showcounter])



  return (
    
    <View
      // activeOpacity={1}
    
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
        {showcounter ? 
            <Animatable.View
            animation={animationstate ? "pulse" : null}
            onAnimationEnd={() => {
              setanimationstate(false);
              // if (animationtype == 'fadeOutDownBig') {
              //   setanimationtype('fadeInUpBig');
  
              //   props.togglemodel();
              // }
            }}
            easing="ease"
            //  iterationCount="infinite"
            iterationCount={1}
            style={{width:scalableheight.tweleve, height: "70%", position:"absolute", left: scalableheight.seven, backgroundColor:"white", zIndex:1, borderRadius:fontSize.borderradius, flexDirection:"row", borderWidth:0.1, borderColor:"grey"}}
          >
      
<TouchableOpacity 

onPress={() => {
  console.log("hhrrnr", props.index)
  let data = [...cartdata]

    data[props.index].Qty =  data[props.index].Qty + 1
    let previousprice = data[props.index].completeitemorderprice
    data[props.index].completeitemorderprice =  data[props.index].priceperitem * data[props.index].Qty
    let newprice = data[props.index].completeitemorderprice

  let incrementedprice = newprice - previousprice

   dispatch(storecartprice(price + incrementedprice))
    // "Qty": 1,
    // "completeitemorderprice": 22
  
  dispatch(filteredcatdata(data))
}}
style={{width:"50%", height:"100%",  justifyContent:"center",alignItems:"center"}}>
   <FontAwesome5
                      name="plus-circle"
                      color={"#E14E4E"}
                      size={fontSize.twentyeight}
                      style={{}}
                    />
</TouchableOpacity>
<TouchableOpacity 
onPress={() => {
  console.log("hhrrnr", props.index)
  let data = [...cartdata]

    if( data[props.index].Qty > 1){
      data[props.index].Qty  =  data[props.index].Qty - 1
      let previousprice = data[props.index].completeitemorderprice
      data[props.index].completeitemorderprice =  data[props.index].priceperitem * data[props.index].Qty
      let newprice = data[props.index].completeitemorderprice
  
    let decrementedprice = previousprice - newprice
  
     dispatch(storecartprice(price - decrementedprice))
    }
 
  
  dispatch(filteredcatdata(data))
}}
style={{width:"50%", height:"100%", justifyContent:"center",alignItems:"center"}}>
   <FontAwesome5
                      name="minus-circle"
                      color={"#E14E4E"}
                      size={fontSize.twentyeight}
                      style={{}}
                    />
</TouchableOpacity>
</Animatable.View>
        : null
}
     <View style={{height:"100%", width: "15%", alignItems:"center", justifyContent:"center"}}>
<TouchableOpacity
onPress={() => {{
  setanimationstate(true)
  setshowcounter(!showcounter)}}}
style={{height: scalableheight.six, width: scalableheight.six,     backgroundColor:'#F9F9F9', borderRadius: fontSize.borderradiusmedium, alignItems:"center", justifyContent:"center",}}>
<Text style={{
            
            fontFamily: 'Inter-Bold',
            fontSize: fontSize.fourteen,
            color:"#111111",
        
          }}>{props.qty}</Text>
</TouchableOpacity>

</View>

<TouchableOpacity
activeOpacity={1}
  onPress={props.onPress}
style={{overflow:"hidden", height:"100%", width: "55%",justifyContent:"center", padding: scalableheight.one, flexDirection: "row", alignItems: "center",  justifyContent: "flex-start"}}>
<View style={{      width: "25%", }}>
<Image
                    resizeMode="stretch"
                    style={{
                      width: scalableheight.six,
                      height: scalableheight.six,
                      borderRadius: fontSize.eleven
                    }}
                    source={require('../../Resources/images/foods.png')}
                  />
                  </View>
<View style={{marginLeft: scalableheight.one, width:"70%"}}>
<Text 
numberOfLines={1}
style={{
          
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
            
</TouchableOpacity>
<View style={{height:"100%", width: "30%",justifyContent:"center", padding: scalableheight.two,}}>

              <Text style={{
            
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.twelve,
            color:"#111111",
        
          }}>{"AED "}{props.price}</Text>
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
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});


