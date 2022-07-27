import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,

  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateupcomingbookingdata, clearbookingcancelrequest, cancelrequest, updatemessagearray, clearclientmessage, sendclientmesaage, changelang, seticonfocus, bookingdetailsinformation, submitcoupon, clearcouponresponse, cancelcouponrequest, acceptandrejectdiagnosis, clearacceptrectresponse
} from '../Actions/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlainHeader from '../Shared/Components/PlainHeader';
import UpcomingBookingCard from '../Shared/Components/UpcomingBookingCard';
import Couponscomponent from '../Shared/Components/Couponscomponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GToastContainer, showToast} from 'react-native-gtoast';
import moment from 'moment';
import BottomTab from '../Shared/Components/BottomTab';
import RBSheet from "react-native-raw-bottom-sheet";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Animated from 'react-native-reanimated';
import { fontSize, scalableheight } from '../Utilities/fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { height } from 'react-native-dimension';


const AllBookingDetails = ({navigation, drawerAnimationStyle, route}) => {
  const [Loading, setLoading] = useState(false);
 
  const [code, setcode] = useState('');
  const [enable, setenable] = useState(false);
  const [load, setload] = useState(false);
  const [payment, setpayment] = useState('1');
  const [terms, setterms] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [chatmodalVisible, setchatmodalVisible] = useState(false);
  const [cancellationreason1, setcancellationreason1] = useState(false);
  const [cancellationreason2, setcancellationreason2] = useState(false);
  const [cancellationreason3, setcancellationreason3] = useState(false);
  const [cancellationreason, setcancellationreason] = useState(false);
  const [cancel, setcancel] = useState(false);
  const [orderstatus, setorderstatus] = useState("");
  const [clientmessge, setclientmessge] = useState("");
  const [acceptloader, setacceptloader] = useState(false);
  const [rejectloader, setrejectloader] = useState(false);
  const [indexx, setindexx] = useState(-1);
  
  const [sendmessageloader, setsendmessageloader] = useState(false);
  const [cancelbookingrequestloader, setcancelbookingrequestloader] = useState(false);
  const refRBSheet = useRef();
  const [chathistory, setchathistory] = useState([
    {
      
      time: "2:30pm",
      type: 'vendor',
      image: require('../Resources/images/browseservices.png'),
     message: "the tile is amazing",
    },
  
    {
      time: "2:30pm",
      type: 'client',
      image: require('../Resources/images/browseservices.png'),
     message: "i dont like it",
    },
    {
      time: "2:30pm",
      type: 'vendor',
      image: require('../Resources/images/browseservices.png'),
     message: "but its amazing im telling oyu anf the cheapest",
    },
    {
      time: "2:30pm",
      type: 'client',
      image: require('../Resources/images/browseservices.png'),
     message: "sell it to someone else",
    },
    {
      time: "2:30pm",
      type: 'vendor',
      image: require('../Resources/images/browseservices.png'),
     message: "thank you for contacting us",
    },
  
  ]);
  const ref = useRef()

  const {bookingdata, bookcancelrequest, clientmessage, acceptrejectdecision, Lang, bookinddetailsdata, couponcoderesponse, quotationdetails, messagedata, profileimage} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(seticonfocus("booking"))   
}, []);

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // let id = route?.params?.data;
    console.log(route?.params?.id)
    const id = route?.params?.id;
    console.log(route?.params?.status)
    setorderstatus(route?.params?.status)
    setindexx(route?.params?.key)
    dispatch(bookingdetailsinformation(id))
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [route, navigation]);


useEffect(() => {
  console.log("couponcoderesponse" + couponcoderesponse)
  setload(false)
  if (couponcoderesponse != ""){
    showToast(couponcoderesponse, {
      duration: 1000,
    });

    if(couponcoderesponse == "Coupon code added successfully"){
      dispatch(bookingdetailsinformation(id))
      setcancel(false)
    }
    if(couponcoderesponse == "Coupon code removed successfully"){
      dispatch(bookingdetailsinformation(id))
      setcancel(true)
    }
    dispatch(clearcouponresponse())
  }

}, [couponcoderesponse]);

useEffect(() => {

  console.log(JSON.stringify(bookinddetailsdata) + "bookinddetailsdata")
  console.log(JSON.stringify(quotationdetails) + "quotationdetails")

  
  
}, [bookinddetailsdata, quotationdetails]);


useEffect(() => {
if(  bookinddetailsdata?.couponCode != null){
 
  setcancel(false)
}else{
  setcancel(true)
}

  
}, [bookinddetailsdata]);

useEffect(() => {
if(bookcancelrequest != ''){
  setcancelbookingrequestloader(false)
  if(bookcancelrequest == "success"){
    refRBSheet.current.close()
    showToast(Lang =="en"  ? "Booking cancelled successfully." : "تم إلغاء الحجز بنجاح.", {
      duration: 500,
    });
    let data = [...bookingdata]
    data[indexx].status = "Cancelled"
    dispatch(updateupcomingbookingdata(data))
  
    setTimeout(async () => {
      navigation.navigate('MyBookings')
    }, 600);
 
  }else{
    refRBSheet.current.close()
    showToast(Lang =="en"  ? "Cancelation request can not be processed at the moment. Please try again later." : "لا يمكن معالجة طلب الإلغاء في الوقت الحالي. يرجى المحاولة مرة أخرى في وقت لاحق.", {
      duration: 500,
    });
  }
  dispatch(clearbookingcancelrequest())
}
    
  }, [bookcancelrequest]);

useEffect(() => {
if(clientmessage != ""){
  setsendmessageloader(false)
if(clientmessage == "success"){
  // "message": "hi sir, i am not ok with these prices",
  // "time": "6/1/2022 11:44:24 AM",
  
  let data = [...messagedata]
  let today = new Date();
  var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
    let date = (today.getMonth()+1)+'/'+today.getDate() +'/'+ today.getFullYear() + " " +  time.toLocaleString('en-US', { hour: 'numeric', hour12: true });


  let newdata = [{
        "type": "Customer",
     message: clientmessge,
     time: date,
  }]
   data = [...messagedata, ...newdata]
   setclientmessge('')
dispatch(updatemessagearray(data))
setTimeout(async () => {
  ref.current?.scrollToIndex({
    index: messagedata?.length -1,
    animated: true,
  
  
  })
}, 500);

  console.log(JSON.stringify(messagedata) + "messagedata")
  console.log(JSON.stringify(data) + "data")
}else{
  showToast(Lang =="en"  ? "Your message was not delivered. Please try again later" : "لم يتم تسليم رسالتك. يرجى المحاولة مرة أخرى في وقت لاحق", {
    duration: 500,
  });

}
dispatch(clearclientmessage())
}
  
    
  }, [clientmessage]);

useEffect(() => {
 if(acceptrejectdecision != ''){
  setacceptloader(false)
  setrejectloader(false)
  if(acceptrejectdecision == "Accepted"){
    showToast(Lang =="en"  ? "Diagnosis confirmed successully" : "تم تأكيد التشخيص بنجاح", {
      duration: 500,
    });
    let data = [...bookingdata]
    data[indexx].status = "Inprocess"
    dispatch(updateupcomingbookingdata(data))
  
    setTimeout(async () => {
      navigation.navigate('MyBookings')
    }, 600);
   
  }else if(acceptrejectdecision == "Rejected"){
    showToast(Lang =="en"  ? "You have successfully rejected the Diagnosis. The technician will get back to you with a revised quotstion soon." : "لقد رفضت التشخيص بنجاح. سيعود الفني إليك مع عرض أسعار منقح قريبًا.", {
      duration: 500,
    });
    // "Pending" indexx
    let data = [...bookingdata]
    data[indexx].status = "Pending"
    dispatch(updateupcomingbookingdata(data))
  
    setTimeout(async () => {
      navigation.navigate('MyBookings')
    }, 600);
  }else if(acceptrejectdecision == "Acceptederror"){
    showToast(Lang =="en"  ? "There was an error accepting the Diagnosis. Please try again later." : "حدث خطأ أثناء قبول التشخيص. يرجى المحاولة مرة أخرى لاحقًا.", {
      duration: 500,
    });
  }else if(acceptrejectdecision == "Rejectederror"){
    showToast(Lang == "en"  ? "There was an error rejecting the Diagnosis. Please try again later." : "حدث خطأ أثناء رفض التشخيص. يُرجى المحاولة مرة أخرى لاحقًا.", {
      duration: 500,
    });
  }


  dispatch(clearacceptrectresponse())
 }
    
  }, [acceptrejectdecision]);

function applycoupon(){
if(code == ""){
  showToast(Lang =="en"  ? "Add coupon code" : "إضافة رمز القسيمة", {
    duration: 500,
  });
}else{
  setload(true)
  dispatch(submitcoupon(code, bookinddetailsdata.id))
}
  console.log("hello")
  console.log(JSON.stringify(bookinddetailsdata.id) + "id")
  console.log(JSON.stringify(code) + "code")
// dispatch(submitcoupon(code, bookinddetailsdata.id))
}


function cancelcoupon(){
  console.log("hello")
  setload(true)
dispatch(cancelcouponrequest(bookinddetailsdata?.couponCode, bookinddetailsdata?.id))
}


const renderItem = ({item}) => (
  <View
    //   activeOpacity={0.9}
    //   onPress={() => {
    //     navigation.navigate('PopularServices');
    //   }}
    style={{
      height: '100%',
      width: Dimensions.get('window').width / 2.1,
      alignItems: 'center',

      marginRight: Dimensions.get('window').width / 25,

    }}>
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
        backgroundColor: 'white',
        width: '99%',
        height: '95%',
        borderRadius: fontSize.eleven,
      }}>
      <Image
        resizeMode="stretch"
        style={{
          width: '100%',
          height: "65%",
          alignSelf: 'center',
          borderRadius: fontSize.eleven,
        }}
        source={{ uri: item.product.thumbnail}}
      />
      <View style={{width:"100%", height:"35%", padding: scalableheight.one}}>
      <Text
        style={{
          color: 'black',

          fontSize: fontSize.fourteen,
          fontFamily: 'Rubik-Medium',
     
        }}>
        {item.product.name}
      </Text>
      <View style= {{flexDirection:"row"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}>{Lang == "en" ? 'SKU No: ': "رقم SKU:"}</Text>
      <Text
        style={{
          color:  "#AB8651",

          fontSize: fontSize.ten,
          fontFamily: 'Rubik-Regular',

          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {item.product.sku}
      </Text>
      </View>
      <View style= {{flexDirection:"row"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}>{Lang == "en" ? 'Unit Price: ': 'سعر الوحدة: '}</Text>
      <Text
        style={{
          color:  "#AB8651",

          fontSize: fontSize.ten,
          fontFamily: 'Rubik-Regular',
   
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {item.product.unitPrice}
      </Text>
      </View>
      <View style= {{flexDirection:"row"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}>{Lang == "en" ? 'Qty: ': "الكمية:"}</Text>
      <Text
        style={{
          color:  "#AB8651",

          fontSize: fontSize.ten,
          fontFamily: 'Rubik-Regular',
       
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {item.product.quantity}
      </Text>
      </View>
  
      </View>
    
      

    </View>
  </View>
);

const chatItem = ({item}) => (
  <>
 

 { item.type == 'Technician' ? 
  <View
  //   activeOpacity={0.9}
  //   onPress={() => {
  //     navigation.navigate('PopularServices');
  //   }}
  style={{
    justifyContent: 'flex-start',
    marginBottom:scalableheight.two,
flexDirection:"row"

  }}>
       <Image
resizeMode={'contain'}
source={{uri:item.technicianlogo}}
style={{
// height: stack % 2 == 0 ? window.height/22 : window.height/12 ,
height: scalableheight.four,
width:scalableheight.four,
alignSelf:"flex-start",
borderRadius: scalableheight.seven

}}
/>
  <View
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 3,
      backgroundColor: 'white',
      width: '70%',
      paddingVertical:height(2),
      paddingHorizontal: height(2),
      borderRadius: fontSize.eleven,
marginLeft: scalableheight.one
    }}>
      <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.eight, alignSelf:"flex-end", marginBottom: height(0.2)}}>{item.time}</Text>
    <Text style={{ fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, }}>{item.message}</Text>
  
    

  </View>
</View> : 
 <View
 //   activeOpacity={0.9}
 //   onPress={() => {
 //     navigation.navigate('PopularServices');
 //   }}
 style={{
   justifyContent: 'flex-end',
marginBottom:scalableheight.two,
flexDirection:"row"

 }}>
    <View
   style={{
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.23,
     shadowRadius: 2.62,

     elevation: 3,
     backgroundColor: '#F9B35E',
     width: '70%',
     paddingVertical:height(2),
     paddingHorizontal: height(2),
     borderRadius: fontSize.eleven,
marginRight: scalableheight.one
   }}>
       <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.eight, alignSelf:"flex-end", color:"white", marginBottom: height(0.2)}}>{item.time}</Text>
    <Text style={{ fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"white" }}>{item.message}</Text>
 
   

 </View>
      <Image
resizeMode={'contain'}
source={{
  uri: profileimage,
}}
style={{
// height: stack % 2 == 0 ? window.height/22 : window.height/12 ,
height: scalableheight.four,
width:scalableheight.four,
alignSelf:"flex-start",
borderRadius: scalableheight.seven

}}
/>

</View>
  
 }
</>
    )
  return (
 
    <Animated.View style={{flex: 1, backgroundColor: 'white',...drawerAnimationStyle}}>
 
             <Modal
      
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setmodalVisible(!modalVisible);
      }}>
      <View
        style={{
          height: "100%",
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems:"center",
          justifyContent:"center"
          
        }}>
        <View style={{width: "90%", height: "40%", borderRadius:fontSize.borderradius, backgroundColor:"white", padding:10}}>
   <View style={{ height:"60%", width: "100%", alignItems:"center", justifyContent:"center"}}>

  
    <Image
      resizeMode="contain"
      style={{ 

        width: '100%',
        height: "50%",
      }}
      source={require('../Resources/images/check.png')}
    />

<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black", textAlign:"center", marginTop:"10%", width:"80%"}}>{Lang == "en" ? "Your booking process has been completed" : "اكتملت عملية الحجز الخاصة بك"}</Text>
   </View>
   <View style={{height:"40%", width: "100%", justifyContent:"center"}}>

<TouchableOpacity
  onPress={() => {
    setmodalVisible(false)
    navigation.navigate("Home");
  }}
style={{   ...styleSheet.shadow, width: "100%", height: "40%", backgroundColor:"#AB8651", borderRadius:fontSize.borderradiusmedium, borderWidth:scalableheight.borderTopWidth, borderColor: "#C59E6E", alignItems:"center", justifyContent:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"white"}}>{Lang == "en" ? "Back To Home" : "العودة إلى المنزل"}</Text>
</TouchableOpacity>

<TouchableOpacity 
 onPress={() => {
  setmodalVisible(false)
  navigation.navigate('MyBookings', {
    reloadpermission: 1,
  });
}}
style={{   ...styleSheet.shadow, width: "100%", height: "40%", backgroundColor:"white", borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black"}}>{Lang == "en" ? "My Bookings" : "حجوزاتي"}</Text>
</TouchableOpacity>
</View>

      </View>
      </View>
    </Modal>

    <Modal
      
      animationType="fade"
      transparent={true}
      visible={chatmodalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setchatmodalVisible(!chatmodalVisible);
      }}>
           <KeyboardAvoidingView
      style={{width:"100%", height:"100%"}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
      <View
        style={{
          height: "100%",
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems:"center",
          justifyContent:"center"
          
        }}>
        <View style={{width: "90%", height: "90%", borderRadius:fontSize.borderradius, backgroundColor:"white", padding:10}}>
        <TouchableOpacity 
    onPress={() =>{ setchatmodalVisible(false) }}
    style={{height:scalableheight.four, width:scalableheight.four, borderRadius:scalableheight.seven, backgroundColor:"#880808", position:"absolute",right: - scalableheight.two, top: - scalableheight.two, zIndex:3, justifyContent:"center"}}>
    <Entypo
            style={{alignSelf:"center"}}
            color={"white"}
            name="cross"
            size={fontSize.twenty}
          />
    </TouchableOpacity>
 <View style={{widht:"100%", height:"90%", paddingVertical: scalableheight.two}}>
 <FlatList
   ref={ref}
  //  initialScrollIndex={messagedata -1}
  showsVerticalScrollIndicator={false}
  //  onScrollToIndexFailed={({
  //   index,
  //   averageItemLength,
  // }) => {
  //   // Layout doesn't know the exact location of the requested element.
  //   // Falling back to calculating the destination manually
  //   ref.current?.scrollToOffset({
  //     offset: index * averageItemLength,
  //     animated: true,
  //   });}}

              keyExtractor={(item, index) => index.toString()}
              style={{height:"100%"}}
              data={messagedata}
              renderItem={chatItem}
            
            />
 </View>
 <View style={{widht:"100%", height:"10%", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row"}}>
 <TextInput
// editable={cancel}
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                elevation:2, width:"80%", height: scalableheight.six
              }}
              placeholderTextColor="#8c8c8c"
              placeholder="Type message here"
              onChangeText={text => setclientmessge(text)}
              defaultValue={clientmessge}
            />
              <TouchableOpacity 
              disabled={sendmessageloader}
    onPress={() =>{ 
      setsendmessageloader(true)
      dispatch(sendclientmesaage(clientmessge, quotationdetails?.id))
      
      // setchatmodalVisible(false)
     }}
    style={{height:scalableheight.six, width:"15%", borderRadius:scalableheight.one, backgroundColor:'#F9B35E', justifyContent:"center"}}>

          {sendmessageloader == true ? 
  <ActivityIndicator
          size= "small"
          color={"white"}
        /> :
        <FontAwesome
            style={{alignSelf:"center"}}
            color={"white"}
            name="send"
            size={fontSize.twenty}
          />
}
    </TouchableOpacity>
</View>

      </View>
   
      </View>
      </KeyboardAvoidingView>
    </Modal>
    <TouchableOpacity 
    onPress={() =>{
      if(messagedata?.length > 0){
       
        setTimeout(async () => {
          ref.current?.scrollToIndex({
            index: messagedata?.length -1,
            animated: true,
          
          
          })
        }, 2000);
  
      }
   
      setchatmodalVisible(true) 
    }}
    style={{height:scalableheight.six, width:scalableheight.six, borderRadius:scalableheight.seven, backgroundColor:'#F9B35E', position:"absolute",right:scalableheight.four, bottom:scalableheight.tweleve, zIndex:3, justifyContent:"center"}}>
    <Entypo
            style={{alignSelf:"center"}}
            color={"white"}
            name="chat"
            size={fontSize.twenty}
          />
    </TouchableOpacity>
      <View
        style={{
          height: '100%',
          width: '100%',

          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex:12
        }}>
        <PlainHeader title={Lang == "en" ? 'Details': 'تفاصيل'} />
       {Loading == false?
    
        <ScrollView 
       showsVerticalScrollIndicator={false}
        style={{ height:"91%", width:"100%", paddingHorizontal:scalableheight.two}}>
            <View style={{flexDirection:"row",    }}>      
<View style= {{width:"50%", }}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black",textAlign:"left"}}>{Lang == "en" ? 'Service': "خدمة"}</Text>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#AB8651",textAlign:"left"}}>{bookinddetailsdata?.serviceName}</Text>
</View>
<View style= {{width:"50%", alignItems:"flex-end"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}>{Lang == "en" ? 'Booking ID': "معرف الحجز"}</Text>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#AB8651"}}>{bookinddetailsdata?.bookingNo}</Text>
</View>
</View>
<View style={{...styleSheet.shadow, borderWidth:scalableheight.borderTopWidth, borderColor:"#AB8651", width: "100%", height:Dimensions.get('window').height / 5, marginTop:"5%", borderRadius:fontSize.borderradius, padding:scalableheight.one, backgroundColor:"white"}}>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection: Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Name" : "اسم"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{bookinddetailsdata?.customerName}</Text>
</View>
<View  style={{ borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Email" : "بريد الالكتروني"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{bookinddetailsdata?.customerEmail}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Phone" : "هاتف"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{bookinddetailsdata?.customerContact}</Text>
</View>
<View  style={{ width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Address" : "عنوان"}</Text>
<Text 
numberOfLines={2}
style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{bookinddetailsdata?.customerAddress}</Text>
</View>
</View>
<Text style={{ marginTop: "3%", fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", textAlign:Lang == "en" ? "left" : "right", width:"100%"}}>{Lang == "en" ? 'Products': "منتجات"} </Text>
<View style={{width: "100%", height: scalableheight.thirtytwo, marginTop: "3%"}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={quotationdetails?.quoteDetails}
              renderItem={renderItem}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />
          </View>
          <View style={{...styleSheet.shadow, borderWidth:scalableheight.borderTopWidth, borderColor:"#AB8651", width: "100%", height:Dimensions.get('window').height / 3.2, marginTop:"5%", borderRadius:fontSize.borderradius, padding:scalableheight.one, backgroundColor:"white"}}>
<View style={{height:"80%"}}>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Sub Total" : "المجموع الفرعي"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {quotationdetails?.subtotal}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "TAX" : "ضريبة"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{quotationdetails?.tax}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Delivery Charges" : "رسوم التوصيل"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {quotationdetails?.charges}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "25%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Quotation Status" : "حالة الاقتباس"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}> {quotationdetails?.status}</Text>
</View>



</View>
<View style={{height:"20%", width: "100%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-SemiBold", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Total Amount" : "المبلغ الإجمالي"}</Text>
<Text 
style={{fontFamily:"Rubik-SemiBold", fontSize:fontSize.twelve, color: "black", width:"50%",  textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {quotationdetails?.total}</Text>
</View>
</View>

{orderstatus != "Diagnosis" &&
<View style={{...styleSheet.shadow, borderWidth:scalableheight.borderTopWidth, borderColor:"#AB8651", width: "100%", height:Dimensions.get('window').height / 8, marginTop:"5%", borderRadius:fontSize.borderradius, padding:scalableheight.one, justifyContent:"space-evenly", backgroundColor:"white"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}>Add Coupon Code</Text>
<View style={{justifyContent:"center"}}>
<TextInput
editable={cancel}
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                elevation:2
              }}
              placeholderTextColor="#8c8c8c"
              placeholder="Coupon code here"
              onChangeText={text => setcode(text)}
              defaultValue={code}
            />
            {load == false ? 
            
            cancel == false?   
              <TouchableOpacity
                     
                        onPress={() => cancelcoupon()}
                        style={{width: "30%", height: "80%", position:"absolute", right:5, borderRadius:8, alignItems:"center", justifyContent:"center"}
                    }>
                      
            <MaterialIcons
            name="cancel"
            color={'grey'}
            size={ fontSize.twenty}
            style={{position: 'absolute', right: '5%'}}
            />
            <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#AB8651"}}>cancel</Text>
                        </TouchableOpacity>:
                            <TouchableOpacity
                            onPress={() => {applycoupon()}}
                            style={{width: "30%", height: "80%", backgroundColor:"#AB8651", position:"absolute", right:5, borderRadius:8, alignItems:"center", justifyContent:"center"}
                        }>
                <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "white"}}>Apply</Text>
                            </TouchableOpacity>
          :
          <View
                     
          
          style={{width: "30%", height: "80%", position:"absolute", right:5, borderRadius:8, alignItems:"center", justifyContent:"center"}
      }>
          <ActivityIndicator
          size= "small"
          color={"#AB8651"}
        />
        </View>
          }

     
            </View>
</View>
}
<View style={{flexDirection:"row", marginTop:"5%",     paddingLeft: '2%',
          paddingRight: '2%',}}>      

<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", textAlign:Lang == "en" ? "left" : "right", width:"100%"}}>{Lang == "en" ? 'Summary': 'ملخص'} </Text>


</View>
<View style={{...styleSheet.shadow, borderWidth:scalableheight.borderTopWidth, borderColor:"#AB8651", width: "100%", height:Dimensions.get('window').height / 2.5, marginTop:"5%", borderRadius:fontSize.borderradius, padding:scalableheight.one, backgroundColor:"white"}}>
<View style={{height:"85%"}}>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Sub Total" : "المجموع الفرعي"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.subtotal}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Coupon Code" : "رمز الكوبون"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{bookinddetailsdata?.couponCode}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Coupon Discount ( 5% )" : "خصم القسيمة (5٪)"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.couponDiscount}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "VAT ( 5% )" : "ضريبة القيمة المضافة (5٪)"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.vat}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Visit Charges" : "زيارة الرسوم"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.visitCharges}</Text>
</View>
<View  style={{borderBottomWidth:1, borderColor:"rgba(192,192,192, 0.8)", width: "100%", height: "16.6%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Delivery Charges" : "رسوم التوصيل"}</Text>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.deliveryCharges}</Text>
</View>


</View>
<View style={{height:"15%", width: "100%", flexDirection:Lang == "en" ? 'row' : 'row-reverse', alignItems:"center"}}>
<Text style={{fontFamily:"Rubik-SemiBold", fontSize:fontSize.twelve, color: "black", width:"50%", textAlign: Lang == "en" ? "left" : "right"}}>{Lang == "en" ? "Total Amount" : "المبلغ الإجمالي"}</Text>
<Text 
style={{fontFamily:"Rubik-SemiBold", fontSize:fontSize.twelve, color: "black", width:"50%",  textAlign: Lang == "en" ? "right" : "left"}}>{Lang == "en" ? "AED" : "درهم"} {bookinddetailsdata?.total}</Text>
</View>
</View>

{orderstatus != "Diagnosis" &&
<>
<View style={{flexDirection:"row", marginTop:"5%",     paddingLeft: '2%',
          paddingRight: '2%',}}>      

<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black"}}></Text>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black", textAlign:Lang == "en" ? "left" : "right", width:"100%"}}>{Lang == "en" ? 'Payment Method': "طريقة الدفع او السداد"} </Text>


</View>
<View style={{width: "99%", marginTop:"5%", backgroundColor:"white",  flexDirection:"row", justifyContent:"space-between", alignSelf:"center"}}>
<TouchableOpacity 
onPress={()=> {setpayment("1")}}
style={{...styleSheet.shadow, width:"49%", height:Dimensions.get('window').height / 15, borderWidth: payment == "1" ? scalableheight.borderTopWidth : 0, borderColor:"#C59E6E", borderRadius:fontSize.borderradius, backgroundColor:"white", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row" }}>
{payment == "1" ? 
      <Ionicons
      name=   {"radio-button-on"}
   color={"#8F7B62"}
   size={fontSize.eightteen}
    style={{}}
    />
  :     <Ionicons
  name=   {"radio-button-off"}
color={"grey"}
size={fontSize.eightteen}
style={{}}
/>}
        
     
    <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#A5A5A5"}}>{Lang == "en" ? 'Pay On Delivery': "الدفع عند الاستلام"}</Text>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=> {setpayment("2")}}
style={{...styleSheet.shadow , width:"49%", height:Dimensions.get('window').height / 15, borderWidth: payment == "2" ? scalableheight.borderTopWidth : 0, borderColor:"#C59E6E", borderRadius:fontSize.borderradius , backgroundColor:"white", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row" }}>
{payment == "2" ? 
      <Ionicons
      name=   {"radio-button-on"}
   color={"#8F7B62"}
   size={fontSize.eightteen}
    style={{}}
    />
  :     <Ionicons
  name=   {"radio-button-off"}
color={"grey"}
size={fontSize.eightteen}
style={{}}
/>}
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#A5A5A5"}}>{Lang == "en" ? 'Debit / Credit Card': "بطاقة الخصم / الائتمان"}</Text>
</TouchableOpacity>
</View>
<View style={{flexDirection:Lang == "en" ? "row" : "row-reverse", marginTop:"5%", 
          paddingRight: '2%', alignItems:"center",  height:Dimensions.get('window').height / 20, alignItems:Lang == "en" ? "flex-start" : "flex-end"}}>      
<TouchableOpacity
onPress={()=> {

    setterms(!terms)
}}
style={{ width:"10%", height:"100%", alignItems:"center", justifyContent:"center"}}>
{terms  ? 
  <Ionicons
  name=   {"checkbox"}
color={"#B10071"}
size={fontSize.eightteen}

/>
  :    <Ionicons
  name=   {"checkbox"}
color={"grey"}
size={fontSize.eightteen}

/>}
</TouchableOpacity>
<View style={{  height:"100%",  justifyContent:"center"}}>
<Text style={{fontFamily:"Rubik-Light", fontSize:fontSize.twelve, color: "#707070"}}>{Lang == "en" ? 'I accept Terms & Conditions': "أوافق على الشروط والأحكام"}</Text>
</View>

</View>


<TouchableOpacity 
     onPress={() => {
        setmodalVisible(true)
    }}
style={{   ...styleSheet.shadow,   elevation:2,width: "99%", height: Dimensions.get('window').height / 14, backgroundColor:"#AB8651", borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center", alignSelf:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"white"}}>{Lang == "en" ? "Submit" : "إرسال"}</Text>
</TouchableOpacity>
<TouchableOpacity 
     onPress={() => {
        refRBSheet.current.open()
    }}
style={{   ...styleSheet.shadow, elevation:2,  width: "99%", height: Dimensions.get('window').height / 14, backgroundColor:'#F5F5F5', borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center", alignSelf:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black"}}>{Lang == "en" ? "Cancel" : "يلغي"}</Text>
</TouchableOpacity>
</>}

{orderstatus == "Diagnosis" &&
<>
<TouchableOpacity 
disabled={acceptloader}
     onPress={() => {
       setacceptloader(true)
       dispatch(acceptandrejectdiagnosis("Accepted", quotationdetails?.id ))
    }}
style={{   ...styleSheet.shadow,   elevation:2,width: "99%", height: Dimensions.get('window').height / 14, backgroundColor:'#F5F5F5', borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center", alignSelf:"center"}}>

{acceptloader == true ? 
  <ActivityIndicator
          size= "small"
          color={"#AB8651"}
        /> :
        <Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black"}}>{Lang == "en" ? "Accept" : "قبول"}</Text>
}


</TouchableOpacity>
<TouchableOpacity 
disabled={rejectloader}
     onPress={() => {
       setrejectloader(true)
      dispatch(acceptandrejectdiagnosis("Rejected", quotationdetails?.id ))
    }}
style={{   ...styleSheet.shadow, elevation:2,  width: "99%", height: Dimensions.get('window').height / 14, backgroundColor:"#880808", borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center", alignSelf:"center"}}>


{rejectloader == true ? 
  <ActivityIndicator
          size= "small"
          color={"white"}
        /> :
        <Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"white"}}>{Lang == "en" ? "Reject" : "رفض"}</Text>
}

</TouchableOpacity>
</>}
<View style={{height:scalableheight.three}}>

</View>
        </ScrollView>
     
    
        :
        <View style={{  height: "91%", width: "100%",
        alignItems:"center",
        justifyContent:"center",
  
    }}>
   <Image
       resizeMode="cover"
                      source={require('../Resources/images/Skeleton/11.gif')}
                      style={{width: "100%", height: "90%"}}
                    />
                    </View>}
      </View>
      <View  style={{ flex: 1, backgroundColor: 'white',        borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
<BottomTab/>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
       
        customStyles={{
            container: {
             height:scalableheight.thirty,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
    
            
              },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.8)',
    
          
           
         
          },
          draggableIcon: {
            backgroundColor: "rgb(192,192,192)"
          }
        }}
      >
      <ScrollView style={{ padding:scalableheight.two,}}>
          <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.eightteen, color: "black"}}>{Lang == "en" ? "Cancellation" : "إلغاء"}</Text>
          <View style={{flexDirection:Lang == "en" ? "row" : "row-reverse", justifyContent:"space-between", width:"100%", marginTop:scalableheight.one, alignItems:"center"}}>
          <Text style={{fontFamily:"Rubik-Medium", fontSize:fontSize.twelve, color: "black"}}>{Lang == "en" ? "Booking ID" : "معرف الحجز"}</Text>
          <Text style={{fontFamily:"Rubik-Medium", fontSize:fontSize.twelve, color: "#C59E6E"}}>{bookinddetailsdata?.bookingNo}</Text>
          </View>
<TouchableOpacity 
onPress={()=>{
  if( cancellationreason != "1"){
    setcancellationreason("1")
  }else{
    setcancellationreason("")
  }
    
}}
style={{flexDirection: Lang == "en" ? "row" : "row-reverse", justifyContent:"flex-start", width:"100%", alignItems:"center", height:scalableheight.three}}>

{cancellationreason == "1" ?
    <Ionicons
      name=   {"radio-button-on"}
   color={"#8F7B62"}
   size={fontSize.eightteen}
  
    />: 
    <Ionicons
  name=   {"radio-button-off"}
color={"grey"}
  size={fontSize.eightteen}

/>}


          <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#707070", marginLeft: Lang == "en" ? "2%" : "0%", marginRight: Lang == "en" ? "0%" : "2%"}}>{Lang == "en" ? "Service created by mistake" : "الخدمة تم إنشاؤها عن طريق الخطأ"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
 
    if( cancellationreason != "2"){
        setcancellationreason("2")
      }else{
        setcancellationreason("")
      }
        }}
          style={{flexDirection: Lang == "en" ? "row" : "row-reverse", justifyContent:"flex-start", width:"100%", alignItems:"center", height: scalableheight.three}}>
{cancellationreason == "2" ?
    <Ionicons
      name=   {"radio-button-on"}
   color={"#8F7B62"}
      size={fontSize.eightteen}
  
    />: 
    <Ionicons
  name=   {"radio-button-off"}
color={"grey"}
  size={fontSize.eightteen}

/>}
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#707070", marginLeft: Lang == "en" ? "2%" : "0%", marginRight: Lang == "en" ? "0%" : "2%"}}>{Lang == "en" ? "Service cost too high" : "تكلفة الخدمة مرتفعة للغاية"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            if( cancellationreason != "3"){
                setcancellationreason("3")
              }else{
                setcancellationreason("")
              }
        }}
          style={{flexDirection: Lang == "en" ? "row" : "row-reverse", justifyContent:"flex-start", width:"100%", alignItems:"center", height:scalableheight.three}}>
{cancellationreason == "3" ?
    <Ionicons
      name=   {"radio-button-on"}
   color={"#8F7B62"}
      size={fontSize.eightteen}
  
    />: 
    <Ionicons
  name=   {"radio-button-off"}
color={"grey"}
  size={fontSize.eightteen}

/>}
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "#707070", marginLeft: Lang == "en" ? "2%" : "0%", marginRight: Lang == "en" ? "0%" : "2%"}}>{Lang == "en" ? "Service is not required anymore" : "الخدمة غير مطلوبة بعد الآن"}</Text>
          </TouchableOpacity>
        
         <View style={{ width:"100%", height:scalableheight.six, alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
<TouchableOpacity 
disabled={cancelbookingrequestloader}
onPress={() => {  
  console.log( JSON.stringify(bookinddetailsdata))
  setcancelbookingrequestloader(true)
if(cancellationreason == "1") {
dispatch(cancelrequest("Service created by mistake", bookinddetailsdata?.id))
}else if(cancellationreason == "2") {
  dispatch(cancelrequest("Service cost too high", bookinddetailsdata?.id))
}else{
  dispatch(cancelrequest("Service is not required anymore", bookinddetailsdata?.id))
}
  

  }}
style={{...styleSheet.smallshadow, width:"30%", height:"70%", borderRadius:fontSize.borderradius, backgroundColor:"#AB8651", alignItems:"center", justifyContent:"center"}}>

{cancelbookingrequestloader == true ? 
  <ActivityIndicator
          size= "small"
          color={"white"}
        /> :
        <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "white",}}>{Lang == "en" ? "Submit" : "إرسال"}</Text>
}
</TouchableOpacity>
<TouchableOpacity
onPress={() => {  refRBSheet.current.close()}}
style={{...styleSheet.smallshadow, width:"30%", height:"70%", borderRadius:fontSize.borderradius, backgroundColor:"white", alignItems:"center", justifyContent:"center", marginLeft:"5%"}}>
<Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.twelve, color: "black",}}>{Lang == "en" ? "Cancel" : "يلغي"}</Text>
</TouchableOpacity>
         </View>
          
    
      </ScrollView>
      </RBSheet>
      <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: 'Rubik-Regular',
    width: '90%',
    color: 'black',
  },
  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    width: '100%',
    backgroundColor: '#F5F5F5',

   paddingVertical: scalableheight.one,
    borderRadius: fontSize.borderradiusmedium,

    color: '#8c8c8c',
    fontSize: fontSize.twelve,
    paddingLeft: scalableheight.one,
    
fontFamily:"Rubik-Regular"
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
  smallshadow: {
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
export default AllBookingDetails;
