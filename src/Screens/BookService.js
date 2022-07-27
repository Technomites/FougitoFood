import React, {useState, useEffect, useRef} from 'react';
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
  Platform,
  PermissionsAndroid,
  Linking,
  Alert,
  ActivityIndicator
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {clearbookingresponse, changelang, seticonfocus, getProfileInformation, getbanner, getcategories, getcategoriesbyid, getservicedetailsbyid, createbooking} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Shared/Components/Header';
import CustomButton from '../Shared/Components/CustomButton';
import {GToastContainer, showToast} from 'react-native-gtoast';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { format } from 'date-fns'
import Geocoder from 'react-native-geocoding';
import MYButton from '../Shared/Components/MYButton';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { fontSize, scalableheight } from '../Utilities/fonts'
import Geolocation from "@react-native-community/geolocation";
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import moment from 'moment';
const BookService = ({navigation, drawerAnimationStyle, route}) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [pinlocation, setpinlocation] = useState("");
  const [visitdate, setvisitdate] = useState(new Date());
  const [visittime, setvisittime] = useState(new Date());
  const [selectvisitdate, setselectvisitdate] = useState("");      
  const [selectvisittime, setselectvisittime] = useState("");      
  const [visitdatemodalvisibile, setvisitdatemodalvisibile] = useState(false);
  const [visittimemodalvisibile, setvisittimemodalvisibile] = useState(false);
  const [details, setdetails] = useState('');
  const [images, setImages] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [show, setshow] = useState("");
  const [serviceid, setserviceid] = useState("");
  const [servicecategoryid, setservicecategoryid] = useState("");
  const [center, setCenter] = useState();
  const [Load, setLoad] = useState();
  const refMap = useRef(null);
  const {Lang, servicedetailsdata, createbookingresponse, createbookingresponsebookingnumber} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [Populardata, setPopulardata] = useState([
    {
      name: 'cars',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'cleaning',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'car wash',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'hair cut',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'driver',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'maid',
      image: require('../Resources/images/pservice.png'),
    },
  ]);

   const customStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffb606',
        },
      ],
    },
  //   {
  //     elementType: 'labels.text.stroke',
  //     stylers: [
  //       {
  //         color: '#242f3e',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.locality',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#fffff',
  //       },
  //     ],
  //   },
  
   {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#b6b4b4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ];
  const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]
  const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ]
  useEffect(() => {

 
 if(Lang == "en"){
  setselectvisitdate('Select visit date')
  setpinlocation('Select Pin Location')

  setselectvisittime('Select visit time')
 }else{
   setselectvisitdate("حدد تاريخ الزيارة")
   setpinlocation("حدد دبوس الموقع")
   setselectvisittime("حدد وقت الزيارة")
 }
 
    Geocoder.init("AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso")
    Geolocation.getCurrentPosition((info) => {
      setlat(info?.coords?.latitude)
      setlong(info?.coords?.longitude)

      console.log(info?.coords?.latitude);
      console.log(info?.coords?.longitude);})
      getLocation()
      // navigator.geolocation.getCurrentPosition((position) => {
      //   setlat(info.coords.latitude)
      //   setlong(info.coords.longitude)
  
      //   console.log(info.coords.latitude);
      //   console.log(info.coords.longitude)
      // },
      // (error) => alert(JSON.stringify(error)),
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
   
  }, [Lang]);

  useEffect(() => {
if(createbookingresponse != ""){
  setLoad(false)
  if(createbookingresponse == "success"){
    setmodalVisible(true)
  }else{
    showToast(Lang == "en" ? "There was a problem with creating your booking. Please try later." : "حدثت مشكلة في إنشاء الحجز الخاص بك. يرجى المحاولة لاحقًا.", {
      duration: 500,
    });
  }

dispatch(clearbookingresponse())
}
     }, [createbookingresponse]);


  
  useEffect(() => {
    Geocoder.from(lat, long)
		.then(json => {
        		var addressComponent = json.results[0].formatted_address;
			console.log(addressComponent);
      setpinlocation(addressComponent)

		})
		.catch(error => console.warn(error));
   
   
  }, [lat, long]);
  const getLocation = async () => {

    const hasLocationPermission = await hasLocationPermissions();
    if (!hasLocationPermission) {
      return;
    }

    
};
const hasLocationPermissions = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
    return false;
};
const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        ToastMessage('success', "Success", 'Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
        ToastMessage('error', "Error", 'Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow Bakery App to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }
    return false;
};


React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // let id = route?.params?.data;
    console.log(route?.params?.serviceid)
    console.log(route?.params?.servicecategoryid)
    setserviceid(route?.params?.serviceid)
    setservicecategoryid(route?.params?.servicecategoryid)
    // dispatch(getcategoriesbyid(Lang, route?.params?.categoryid))
    dispatch(getservicedetailsbyid(Lang, route?.params?.serviceid)) 
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [route, navigation, Lang]);
  


  useEffect(() => {
    hideNavigationBar();

    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    //     showNavigationBar()
    // changeNavigationBarColor("white");
  }, []);

  const imagePicker = async () => {
    let imagePick = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        // console.log(response);
        response.map(image => {
    
            imagePick.push({
     name: 'photo.jpg' + Math.random(),
    mime: image.mime,
    path: image.path,
  });
        });
        setImages([...images, ...imagePick]);
      })
      .catch(e => console.log(e, 'Error'));
  };




  function startbooking(){
console.log("hello")

if(name == ""){
  showToast(Lang == "en" ? "Enter Name" : "أدخل الاسم", {
    duration: 500,
  });
} else if(email == ""){
  showToast(Lang == "en" ? "Enter Email" : "أدخل البريد الإلكتروني", {
    duration: 500,
  });
} else if(phone == ""){
  showToast(Lang == "en" ? "Enter Phone Number" : "أدخل رقم الهاتف", {
    duration: 500,
  });
} else if(pinlocation == "حدد دبوس الموقع" || pinlocation == 'Select Pin Location' || pinlocation == ''){
  showToast(Lang == "en" ? "Select Pin Location" : "حدد دبوس الموقع", {
    duration: 500,
  });
} else if(selectvisitdate == "حدد تاريخ الزيارة" || selectvisitdate == 'Select visit date'){
  showToast(Lang == "en" ? 'Select visit date' : "حدد وقت الزيارة", {
    duration: 500,
  });
} else if(selectvisittime == 'Select visit time' || selectvisittime == 'Select visit date'){
  showToast(Lang == "en" ? 'Select visit time' : "حدد وقت الزيارة", {
    duration: 500,
  });
} else if(images.length == 0){
  showToast(Lang == "en" ? 'Select atleast one image' : "حدد صورة واحدة على الأقل", {
    duration: 500,
  });
} else{
  setLoad(true)
  console.log("serviceid " + serviceid)
  console.log("servicecategoryid " + servicecategoryid)
  console.log("phone " + phone)
  console.log("pinlocation " + pinlocation)
  console.log("format(visitdate, EEEE dd MMMM yyyy) " + format(visitdate, "EEEE dd MMMM yyyy"))
  console.log("format(visittime, 'p') " + format(visittime, 'p'))
  console.log("details " + details)
  console.log("images " + JSON.stringify(images))
let date = format(visitdate, "yyyy MM dd")
let time = format(visitdate, "hh:mm:ss")
let formatted = date + "T" + time
  let data =[]
  data.push({
    
    ServiceCategoryID:servicecategoryid,
    ServiceID: serviceid,
    CustomerName: name,
     CustomerContact:phone,
    Description:details,
    TimeOfVisit:format(visittime, 'hh:mm:ss'),
    DateOfVisit: formatted,
    CustomerEmail:email,
    CustomerAddress:pinlocation
  });
console.log("yo" + JSON.stringify(data))
console.log("yo1" + JSON.stringify(data[0]))

dispatch(createbooking(images, data))
  }

}

  return (
   <>
 
    <Animated.View style={{flex:1,...drawerAnimationStyle, backgroundColor:"white"}}>
      <View style={{height: '100%', width: '100%', alignSelf: 'center', paddingBottom:10, flex:12 }}>
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
            <View style={{width: "90%", height: "40%",    borderRadius:  fontSize.borderradiusmedium, backgroundColor:"white", padding: scalableheight.two
          }}>
       <View style={{ height:"60%", width: "100%", alignItems:"center", justifyContent:"center"}}>
   
      
        <Image
          resizeMode="contain"
          style={{ 
    
            width: '100%',
            height: "50%",
          }}
          source={require('../Resources/images/check.png')}
        />
  
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black", textAlign:"center", marginTop:"10%"}}>{ Lang == "en" ? `Your booking has been confirmed with booking Id : ${createbookingresponsebookingnumber}` : `تم تأكيد حجزك بمعرف الحجز: ${createbookingresponsebookingnumber}`}</Text>
       </View>
       <View style={{height:"40%", width: "100%", justifyContent:"center"}}>
     
<TouchableOpacity
      onPress={() => {
        setmodalVisible(false)
        navigation.navigate("Home");
      }}
style={{   ...styleSheet.shadow, width: "100%", height: "40%", backgroundColor:"#AB8651", borderRadius:fontSize.borderradiusmedium, borderWidth:1, borderColor: "#C59E6E", alignItems:"center", justifyContent:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"white"}}>{ Lang == "en" ? 'Back To Home' : "العودة إلى المنزل"}</Text>
</TouchableOpacity>

<TouchableOpacity 
     onPress={() => {
      setmodalVisible(false)
      navigation.navigate("MyBookings");
    }}
style={{   ...styleSheet.shadow, width: "100%", height: "40%", backgroundColor:"white", borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black"}}>{ Lang == "en" ? 'My Bookings' : "حجوزاتي"}</Text>
</TouchableOpacity>
</View>

          </View>
          </View>
        </Modal>

        <Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: Dimensions.get('window').height / 2.3,
          }}
          source={{uri: servicedetailsdata.image}}
        />
            <TouchableOpacity
    onPress={() => {
        // navigation.navigate("Home")
        navigation.goBack()
        }}
          style={{
            height: scalableheight.seven,
              width:  scalableheight.five,
            justifyContent: 'center',
            alignItems: 'center',
           position:"absolute",
           top: getStatusBarHeight(),
           left:"4%"
          }}>
              
          <View style={styleSheet.backButtonInner}>
          <Ionicons
        color={"black"}
            name="chevron-back"
            size={fontSize.twenty}
          />
        </View>
        </TouchableOpacity>

        <View
          style={{
            height: '70%',
            width: '96%',
            alignSelf: 'center',
            backgroundColor: '#F9F9F9',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: scalableheight.four,
            borderTopRightRadius:  scalableheight.four,
          }}>
          <View
            style={{
              height: '0.75%',
              width: '20%',
              backgroundColor: '#DCDCDC',
              alignSelf: 'center',
              marginTop: '4%',
              borderRadius: fontSize.circle,
            }}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: Lang == "en" ? 'row' : 'row-reverse',
                alignItems: 'center',
                marginTop: '8%',
                marginLeft: '5%',
              }}>
              <Text
                style={{
                  fontSize: fontSize.eightteen,
                  color: 'black',
                  fontFamily: 'Rubik-Regular',
                }}>
               {servicedetailsdata.serviceCategory}
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  color: 'black',
                  fontFamily: 'Rubik-Regular',
                }}>
               
              {" "} / {servicedetailsdata.serviceName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '4%',
                marginLeft: Lang == "en" ? '5%' : "0%",
             
                width:"95%"
              }}>
              <Text
                style={{
                  fontSize: fontSize.eightteen,
                  color: 'black',
                  fontFamily: 'Rubik-Medium',
                  width:"100%"
                }}>
                  { Lang == "en" ?"Service Booking" : "حجز الخدمة"}
              </Text>
            </View>
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
          
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "First Name" : "الاسم الأول"}
              onChangeText={text => setname(text)}
              defaultValue={name}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
          
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Email Address" : "عنوان بريد الكتروني"}
              onChangeText={text => setemail(text)}
              defaultValue={email}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
         
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Phone Number" : "رقم الهاتف"}
              onChangeText={text => setphone(text)}
              defaultValue={phone}
            />
          
    <TouchableOpacity
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
               
              }}
           onPress={()=> setshow(!show)}
            >
            <Text 
            numberOfLines={1}
            style={{ color: '#8c8c8c', width:"100%",   fontSize: fontSize.fifteen,}}>{pinlocation}</Text>
            
            </TouchableOpacity>
{show ? 
<View
              style={{
                ...styleSheet.shadow,
                height: Dimensions.get('window').height /2,
                width: '90%',
                backgroundColor: '#F5F5F5',
            
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: fontSize.fifteen,
            
                color: '#8c8c8c',
            
         
                alignSelf: 'center',
                marginTop: '4%',
                overflow: 'hidden' 
              }}
       
            >
           <MapView
           provider={PROVIDER_GOOGLE}
           customMapStyle={customStyle}
              ref={refMap}
      style={{ width:"100%", height:"100%",       borderRadius: fontSize.fifteen, }}
     
      showsUserLocation
      
      region={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}

      
   
    >
         

      <Marker 
      position={center} 
      coordinate = {{latitude: lat,longitude: long}}
      draggable
     onDragEnd={(e) => {

      console.log('longitude', e?.nativeEvent?.coordinate?.longitude )
       console.log('latitude', e?.nativeEvent?.coordinate?.latitude )
      setlat(e?.nativeEvent?.coordinate?.latitude)
      setlong(e?.nativeEvent?.coordinate?.longitude)

      }}
         pinColor = {"red"} // any color
         title={"Location"}
         description={pinlocation}/>
         </MapView>
            
            </View>
            : null} 
            <TouchableOpacity
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                // height: Dimensions.get('window').height / 15,
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
          onPress={()=> setvisitdatemodalvisibile(true)}
            >
            <Text style={{ color: '#8c8c8c', width:"100%" ,  fontSize: fontSize.fifteen,}}>{selectvisitdate != "" ? selectvisitdate : format(visitdate, "EEEE dd MMMM yyyy")}</Text>
            
            </TouchableOpacity>
              
                  <Modal
          animationType="fade"
                    transparent={true}
          statusBarTranslucent
          visible={visitdatemodalvisibile}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setvisitdatemodalvisibile(!visitdatemodalvisibile);
          }}>
            <View
            style={{
              height: "100%",
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              alignItems:"center",
              justifyContent:"center"
              
            }}>
              <View style={styleSheet.modalView3}>
              <DatePicker
                  style={{height: scalableheight.twentysix, width:Dimensions.get('window').width / 1.2,}}
                  mode={'date'}
                  date={visitdate}
                  onDateChange={setvisitdate}
                />
                <View style={{paddingTop: scalableheight.two,  width: '100%', height: scalableheight.eight,}}>
                  <TouchableOpacity
                    style={{width: '100%', alignItems: 'center'}}
                    onPress={() => {
                      setselectvisitdate("")
                      setvisitdatemodalvisibile(false)}}>
                  
                      <Text style={{fontSize:fontSize.fifteen}}>Set</Text>
                 
                  </TouchableOpacity>
                </View>
              </View>
            </View>
  
        </Modal>
        <TouchableOpacity
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                // height: Dimensions.get('window').height / 15,
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
          onPress={()=> setvisittimemodalvisibile(true)}
            >
            <Text style={{ color: '#8c8c8c', width:"100%" ,  fontSize: fontSize.fifteen,}}>{selectvisittime != "" ? selectvisittime : format(visittime, 'p')}</Text>
            
            </TouchableOpacity>

            <Modal
          animationType="fade"
                    transparent={true}
          statusBarTranslucent
          visible={visittimemodalvisibile}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setvisittimemodalvisibile(!visittimemodalvisibile);
          }}>
            <View
            style={{
              height: "100%",
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              alignItems:"center",
              justifyContent:"center"
              
            }}>
              <View style={styleSheet.modalView3}>
              <DatePicker
                  style={{height: scalableheight.twentysix, width:Dimensions.get('window').width / 1.2,}}
                  mode={'time'}
                  date={visittime}
                  onDateChange={setvisittime}
                />
                <View style={{paddingTop: scalableheight.two,  width: '100%', height: scalableheight.eight,}}>
                  <TouchableOpacity
                    style={{width: '100%', alignItems: 'center'}}
                    onPress={() => {
                      setselectvisittime("")
                      setvisittimemodalvisibile(false)}}>
                  
                      <Text style={{fontSize:fontSize.fifteen}}>Set</Text>
                 
                  </TouchableOpacity>
                </View>
              </View>
            </View>
  
        </Modal>
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                height: Dimensions.get('window').height / 6,
             textAlignVertical: "top",
                // paddingLeft: Lang == "en" ? 10: 0, paddingRight: Lang == "en" ? 0: 10
              }}
              numberOfLines={5}
              multiline
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Tell us more about your issue" : "اخبرنا أكثر عن مشكلتك"}
              onChangeText={text => setdetails(text)}
              defaultValue={details}
            />
            
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
           
                paddingTop: 10,
                marginTop: '2%',
     
          
              }}>
              <View
                style={{
                  ...styleSheet.shadow,
                  width: scalableheight.fifteen,
                  height: scalableheight.fifteen,
                  backgroundColor: 'white',
                  borderRadius: fontSize.borderradiusmedium,
                  borderStyle: 'dashed',
                }}>
                <TouchableOpacity
                  onPress={imagePicker}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius:  fontSize.borderradiusmedium,
                    borderColor: '#DCDCDC',
                    borderWidth: 1,
                  
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                  }}>
                  <MaterialCommunityIcons name="camera-plus" size={fontSize.thirty} />
                  <Text style={{fontSize: fontSize.eleven, fontWeight: '600'}}>
                  { Lang == "en" ? "Upload Image" : "تحميل الصور"}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                style={{height: scalableheight.sixteen}}
                showsHorizontalScrollIndicator={false}>
                {images?.map(image => {
                  return (
                    <View
                      style={{
                        ...styleSheet.shadow,
                        width: scalableheight.fifteen,
                        height: scalableheight.fifteen,
                        marginLeft: 10,
                        backgroundColor: 'white',
                        borderRadius:  fontSize.borderradiusmedium,
                      }}>
                      <Image
                        resizeMode="stretch"
                        style={{
                          ...styleSheet.shadow,
                          width: scalableheight.fifteen,
                          height: scalableheight.fifteen,
                          borderRadius:  fontSize.borderradiusmedium,
                        }}
                        source={{uri: image.path}}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            {/* </ScrollView>  */}
      {
Load ? 
<View
onPress={() => {
startbooking()
  
    }}
    style={{width: '90%', alignSelf: 'center',marginTop: '2%', paddingBottom:25}}>
<ActivityIndicator
size= "small"
color={"#AB8651"}
/> 
</View>
:
<TouchableOpacity
onPress={() => {
startbooking()
  
    }}
    style={{...styleSheet.shadow, width: '90%', alignSelf: 'center',marginTop: '2%', paddingBottom:25}}>
<MYButton title= { Lang == "en" ? 'Book Now' : 'احجز الآن'} color="#AB8651" textcolor = "white"/>
</TouchableOpacity>
      }
      
     
          </ScrollView>
        </View>
      </View>
      <View  style={{  flex: 1, backgroundColor: 'white',          borderRadius:  fontSize.borderradiusmedium, borderBottomRightRadius:10}}>
<BottomTab/>
      </View>
      <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />

      </Animated.View>
      </>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: 18,
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    
    elevation: 3,
  },
  
  TextInput: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    fontSize: fontSize.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,
    height: scalableheight.seven,
    color: '#8c8c8c',
 
    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: '4%',
  },
 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:"red"
  },
  modalView: {
    height: 350,
    width: 336,

    margin: 20,
    backgroundColor: 'white',
    borderRadius:  fontSize.borderradiusmedium,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView3: {
    height: scalableheight.thirtysix,
    width:  Dimensions.get('window').width / 1.1,

    // margin: 20,
    backgroundColor: 'white',
    borderRadius:  fontSize.borderradiusmedium,
    padding: scalableheight.two,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonMain: {
    position: 'absolute',
    top: scalableheight.four,
    left: 0,
    paddingLeft: scalableheight.two,
    paddingRight: scalableheight.three,
    paddingVertical: scalableheight.two,
  },

backButtonInner: {
    backgroundColor: '#F9F9F9',
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BookService;
