import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  
  Image,

  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Modal
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {postupdatedprofile, clearprofileupdate, getProfileInformation, updateprofilepicture, clearprofilemessage} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MYButton from '../Shared/Components/MYButton';
import Line from '../Shared/Components/Line';
import Header from '../Shared/Components/Header';
import {SliderBox} from 'react-native-image-slider-box';
import CustomButton from '../Shared/Components/CustomButton';
import Animated from 'react-native-reanimated';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {GToastContainer, showToast} from 'react-native-gtoast';
import {format} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NetInfo from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-crop-picker';

const AccountInfo = ({navigation, drawerAnimationStyle}) => {

    const [Populardata, setPopulardata] = useState([ 
        
          require('../Resources/images/popularservicedetails.png'),
        
        
          require('../Resources/images/popularservicedetails.png'),
          require('../Resources/images/popularservicedetails.png'),
        
        
          require('../Resources/images/popularservicedetails.png'),
          require('../Resources/images/popularservicedetails.png'),
        
        
          require('../Resources/images/popularservicedetails.png'),
       
       
     
      
      ])
      const [BrowseServices, setBrowseServices] = useState([ 
        {
          name: "cars service",
          image: require('../Resources/images/browseservices.png')
        },
        {
         name: "cleaning service",
         image: require('../Resources/images/browseservices.png')
       },
       {
         name: "car wash service",
         image: require('../Resources/images/browseservices.png')
       },
       {
         name: "hair cut service",
         image: require('../Resources/images/browseservices.png')
       },
       {
         name: "driver service",
         image: require('../Resources/images/browseservices.png')
       },
       {
         name: "maid service",
         image: require('../Resources/images/browseservices.png')
       },
      
      ])
      const [modalVisible, setmodalVisible] = useState(false);
      const [FirstName, setFirstName] = useState('');
      const [LastName, setLastName] = useState('');
      const [Name, setName] = useState('');
      const [EmailAddress, setEmailAddress] = useState('');
      const [PhoneNumber, setPhoneNumber] = useState('');
      const [Country, setCountry] = useState('');
      const [City, setCity] = useState('');
      const [Address1, setAddress1] = useState('');
      const [Address2, setAddress2] = useState('');
      const [POBOX, setPOBOX] = useState('');
      const [ZipCode, setZipCode] = useState('');
      const [EmiratesID, setEmiratesID] = useState('');
      const [EmiratesIDExpiry, setEmiratesIDExpiry] = useState(Lang == "en" ? "Emirates ID Expiry" : "انتهاء الهوية الإماراتية");
      const [PassportNumber, setPassportNumber] = useState('');
      const [PassportNumberexpiry, setPassportNumberexpiry] = useState(Lang == "en" ? "Passport Number Expiry" : "انتهاء رقم جواز السفر");
      const [passportexpirypickshow, setpassportexpirypickshow] = useState(false);
      const [emeratesidexpirypickshow, setemeratesidexpirypickshow] = useState(false);
      const [PickImage, setPickImage] = useState('');
      
      const [Loader, setLoader] = useState(false)
      const {Lang, ProfileInfo, profileupdated, profileimage, profilemessage} = useSelector(state => state.userReducer);
      const dispatch = useDispatch();

  useEffect(() => {
 console.log("ProfileInfo" + JSON.stringify(ProfileInfo))
 setFirstName(ProfileInfo?.firstName)
 setLastName(ProfileInfo?.lastName)
 setEmailAddress(ProfileInfo?.email)
 setPhoneNumber(ProfileInfo?.contact)
 setCountry(ProfileInfo?.country)
 setCity(ProfileInfo?.city)
 setAddress1(ProfileInfo?.address)
 setAddress2(ProfileInfo?.address2)
 setPOBOX(ProfileInfo?.poBox)
 setZipCode(ProfileInfo?.zipCode)
 setPassportNumber(ProfileInfo?.passportNo)
 setPassportNumberexpiry(ProfileInfo?.passportExpiry)
 setEmiratesID(ProfileInfo?.emiratesID)
 setEmiratesIDExpiry(ProfileInfo?.emiratesIDExpiry)
 setName(ProfileInfo?.name)
 
  }, [ProfileInfo]);

  useEffect(() => {
  
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');  
    StatusBar.setBarStyle("dark-content")

}, []);

useEffect(() => {
  if(profilemessage != ""){
    showToast(profilemessage, {
      duration: 500,
    });
    dispatch(getProfileInformation())
  } 
  dispatch(clearprofilemessage())
console.log(profileimage + "dgdhdgsy")
  }, [profilemessage]);

useEffect(() => {
if(profileupdated == "success"){
  setmodalVisible(true)
  setLoader(false);
  dispatch(getProfileInformation())
} else if(profileupdated == "error"){
  showToast("There was an error updating your profile.", {
    duration: 500,
  });
}
dispatch(clearprofileupdate())
// error
}, [profileupdated]);


function UpdateProfile(){
 if(FirstName == ""){
  showToast("enter first name", {
    duration: 500,
  });
 } else if(LastName == ""){
  showToast("enter last name", {
    duration: 500,
  });
 } else if(Name == ""){
  showToast("enter full name", {
    duration: 500,
  });
 }  else if(EmailAddress == ""){
  showToast("enter email address", {
    duration: 500,
  });
 } else if(Country == ""){
  showToast("enter country", {
    duration: 500,
  });
 }
 else if(City == ""){
  showToast("enter city", {
    duration: 500,
  });
 } else if(Address1 == ""){
  showToast("enter address line 1", {
    duration: 500,
  });
 }else if(POBOX == ""){
  showToast("enter POBOX", {
    duration: 500,
  });
 }else if(ZipCode == ""){
  showToast("enter zip code", {
    duration: 500,
  });
 }else if( City == ""){
  showToast("enter zip code", {
    duration: 500,
  });
 }
 
 
 
else {
  NetInfo.fetch().then(state => {
    if (state.isConnected == false && state.isInternetReachable == false) {
      showToast('Problem with internet connectivity', {
        duration: 500,
      });
      setLoader(false);
    } else {
      setLoader(true);
      dispatch(postupdatedprofile(FirstName, LastName, Name, EmailAddress, Address1, Address2, POBOX, ZipCode, PassportNumber, PassportNumberexpiry, EmiratesID, EmiratesIDExpiry,  City, Country ));
    }
  });
 }

}

const showEmiratesDatePicker = () => {

  setemeratesidexpirypickshow(true)
};
const handleEmiratesConfirm = (date) => {
  console.log(date)
  setEmiratesIDExpiry(format(date, 'yyyy-MM-dd'))
  hideDatePicker();
};
const showDatePicker = () => {

  setpassportexpirypickshow(true)
};

const hideDatePicker = () => {
  setpassportexpirypickshow(false)
  setemeratesidexpirypickshow(false)
};

const handleConfirm = (date) => {
  console.log(date)
   setPassportNumberexpiry(format(date, 'yyyy-MM-dd'))
  hideDatePicker();
};

const imagePicker = async () => {
  let imagePick = [];
  ImagePicker.openPicker({
   
    waitAnimationEnd: false,
    includeExif: true,
    forceJpg: true,
    compressImageQuality: 0.8,
    maxFiles: 10,
    mediaType: 'photo',
    includeBase64: true,
  })
    .then(response => {
      setPickImage(response.path);
      console.log(response);
      dispatch(updateprofilepicture(response));
      
    })
    .catch(e => console.log(e, 'Error'));
};
  return (
    
  
<View style={{flex:1}}>

   <Animated.View  style={{height:"100%",width: '100%',  alignSelf:"center",...drawerAnimationStyle, backgroundColor:"white"}}>
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

<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black", textAlign:"center", marginTop:"10%"}}>{ Lang == "en" ? 'Your profile information has been updated successfully.' : "تم تحديث معلومات ملفك الشخصي بنجاح."}</Text>
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

    }}
style={{   ...styleSheet.shadow, width: "100%", height: "40%", backgroundColor:"white", borderRadius:fontSize.borderradiusmedium, marginTop:"2%",  alignItems:"center", justifyContent:"center"}}>
<Text style= {{fontFamily:"Rubik-Regular", fontSize:fontSize.fourteen, color:"black"}}>{ Lang == "en" ? 'Close' : "حجوزاتي"}</Text>
</TouchableOpacity>
</View>

          </View>
          </View>
        </Modal>
    
<Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: Dimensions.get('window').height / 3,
            borderBottomLeftRadius:fontSize.circle,
            borderBottomRightRadius:fontSize.circle,
          }}
          source={require('../Resources/images/accountinfobackground.jpeg')}
        />
        <Text style={{  fontFamily:"Rubik-SemiBold", fontSize:fontSize.twenty, color: "white", position:"absolute", alignSelf:'center', top:scalableheight.five,    height: scalableheight.eight, }}>{Lang == "en" ? "Account Info" : "معلومات الحساب"}</Text>
        <TouchableOpacity
    onPress={() => {
        // navigation.navigate("Home")
        navigation.goBack()
        }}
          style={{
     
            height: scalableheight.eight,
            width: scalableheight.six,
      
            alignItems: 'center',
            position:"absolute", 
        
       
              top:scalableheight.fourpointfive,
          }}>
              {/* <View style={{ backgroundColor:"	rgba(0,0,0, 0.6)", width: "60%", height:"40%", borderRadius:6}}>
              <MaterialIcons
              style={{  alignSelf:"center"}}
          name="keyboard-arrow-left"
       color={"white"}
          size={fontSize.twentythree}
        
        />
              </View> */}
                  <View style={{...styleSheet.backButtonInner ,   backgroundColor:"	rgba(0,0,0, 0.6)",}}>
          <Ionicons
            color={'#FFF'}
            name="chevron-back"
            size={fontSize.twenty}
          />
        </View>
       
        </TouchableOpacity>
        <View style={{...styleSheet.shadow,  borderRadius:fontSize.circle, width: scalableheight.fifteen, height:scalableheight.fifteen, alignSelf:"center", marginTop: -scalableheight.eight, backgroundColor:"white"}}> 
        <Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: "100%",
            borderColor:"#C51B83", borderWidth:scalableheight.borderwidth, borderRadius:fontSize.circle
          }}
       
          source={   ProfileInfo != ''
          ? {
              uri: profileimage,
            }
          :  require('../Resources/images/logoguest.png')
      }
        />
            {/* <MaterialCommunityIcons
      name=   {"pencil-circle"}
   color={"#C51B83"}
      size={30}
    style={{position:"absolute", right:-5}}
    /> */}
<TouchableOpacity
onPress={() => {imagePicker()}}
style={{backgroundColor:"#C51B83", height:scalableheight.four, width:scalableheight.four, position:"absolute", right: scalableheight.pointfive, borderRadius: fontSize.circle, alignItems:"center", justifyContent:"center"}}>
<MaterialIcons 
                              color={"white"}
                                name="edit"
                                size={fontSize.twentyfour}
                         
                            />
                            </TouchableOpacity>
        </View>
    <Text style={{fontFamily:"Rubik-Regular", fontSize:fontSize.thirteen, color: "#7187F8", alignSelf:'center',marginTop:"2%"}}>{Lang == "en" ? "Upload Image" : "تحميل الصور"}</Text>
  
    <ScrollView 
    style={{marginTop:"2%"}}
    showsVerticalScrollIndicator={false}>
      
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "First Name" : "الاسم الأول"}
              onChangeText={text => setFirstName(text)}
              defaultValue={FirstName}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Last Name" : "الكنية"}
              onChangeText={text => setLastName(text)}
              defaultValue={LastName}
            />

<TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Full Name" : "الاسم الكامل"}
              onChangeText={text => setName(text)}
              defaultValue={Name}
            />

            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Email Address" : "عنوان بريد الكتروني"}
              onChangeText={text => setEmailAddress(text)}
              defaultValue={EmailAddress}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              editable={false}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Phone Number" : "رقم الهاتف"}
              onChangeText={text => setPhoneNumber(text)}
              defaultValue={PhoneNumber}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Country" : "دولة"}
              onChangeText={text => setCountry(text)}
              defaultValue={Country}
            />
            <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "City" : "مدينة"}
              onChangeText={text => setCity(text)}
              defaultValue={City}
            />
                   <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Address Line 1" : "العنوان سطر 1"}
              onChangeText={text => setAddress1(text)}
              defaultValue={Address1}
            />
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Address Line 2" : "سطر العنوان 2"}
              onChangeText={text => setAddress2(text)}
              defaultValue={Address2}
            />
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "P.O.Box" : "صندوق البريد"}
              onChangeText={text => setPOBOX(text)}
              defaultValue={POBOX}
            />
                <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Zip Code" : "رمز بريدي"}
              onChangeText={text => setZipCode(text)}
              defaultValue={ZipCode}
            />
             <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              editable={false}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Emirates ID" : "هويه الإمارات"}
              onChangeText={text => setEmiratesID(text)}
              defaultValue={EmiratesID}
            />
             

<TouchableOpacity
               style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                alignItems:"flex-start"
          
              }}
              onPress={() => showEmiratesDatePicker()}>
              {/* <Text>{format(expirydate, 'yyyy-MM-dd')}</Text> */}
              <Text style={{  fontSize: fontSize.fifteen,
      color: '#8c8c8c', justifyContent:"flex-start"}}>{EmiratesIDExpiry}</Text>
              <FontAwesome
                style={{position: 'absolute', right: 15}}
                name="calendar"
                size={20}
                color={'grey'}
              />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={emeratesidexpirypickshow}
                mode="date"
                onConfirm={handleEmiratesConfirm}
                onCancel={hideDatePicker}
              />
                 <TextInput
              style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
              }}
              editable={false}
              placeholderTextColor="#8c8c8c"
              placeholder={Lang == "en" ? "Passport Number" : "رقم جواز السفر"}
              onChangeText={text => setPassportNumber(text)}
              defaultValue={PassportNumber}
            />
            
               <TouchableOpacity
               style={{
                ...styleSheet.TextInput,
                ...styleSheet.shadow,
                alignItems:"flex-start"
          
              }}
              onPress={() => showDatePicker()}>
              {/* <Text>{format(expirydate, 'yyyy-MM-dd')}</Text> */}
              <Text style={{  fontSize: fontSize.fifteen,
      color: '#8c8c8c', justifyContent:"flex-start"}}>{PassportNumberexpiry}</Text>
              <FontAwesome
                style={{position: 'absolute', right: 15}}
                name="calendar"
                size={20}
                color={'grey'}
              />
            </TouchableOpacity>
     
              <DateTimePickerModal
                isVisible={passportexpirypickshow}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
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
           
            </View>
            {/* </ScrollView>  */}
      
            <View style={{width: '90%', alignSelf: 'center'}}>
              <CustomButton
                title={Lang == "en" ? "Update" : "تحديث"}
                customButtonStyle={{marginTop: '2%'}}
                Loading={Loader}
                onPress={() => {
  UpdateProfile()
                  // navigation.navigate("OtpVerification")
                }}
              />
            </View>
          </ScrollView>
          <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />
     </Animated.View>
     </View>
   

 
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 3,
      shadowRadius: 18,
    },
    // backButtonMain: {
    //   position: 'absolute',
    //   top: '5%',
    //   left: '6%',
    //   backgroundColor: '#F9F9F9',
    //   height: 28,
    //   width: 28,
    //   borderRadius: 6,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    TextInput: {
      width: '90%',
      backgroundColor: '#F5F5F5',
      fontSize: fontSize.fifteen,
      color: '#8c8c8c',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: fontSize.borderradiusmedium,
      height: scalableheight.seven,
  
   
      paddingHorizontal: scalableheight.two,
      alignSelf: 'center',
      marginTop: '4%',
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
    backButtonMain: {
      position: 'absolute',
      top: scalableheight.four,
      left: 0,
      paddingLeft: scalableheight.two,
      paddingRight: scalableheight.three,
      paddingVertical: scalableheight.two,
    },
  
  backButtonInner: {
      // backgroundColor: '#727574',
      height: scalableheight.four,
      width: scalableheight.four,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default AccountInfo;
