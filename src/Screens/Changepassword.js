import React, {useState, useEffect} from 'react';
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
  Platform,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {
  changelang,
  seticonfocus,
  changepassword,
  clearpasswordupdated,
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GToastContainer, showToast} from 'react-native-gtoast';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import BottomTab from '../Shared/Components/BottomTab';
import Settingscomponent from '../Shared/Components/Settingscomponent';
import CustomButton from '../Shared/Components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import Animated from 'react-native-reanimated';
const Changepassword = ({navigation, drawerAnimationStyle}) => {
  const [Loader, setLoader] = useState(false);
  const [realpassword, setrealpassword] = useState('');
  const [currentpassword, setcurrentpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [currentpasswordshow, setcurrentpasswordshow] = useState(true);
  const [newpasswordshow, setnewpasswordshow] = useState(true);
  const [confirmpasswordshow, setconfirmpasswordshow] = useState(true);
  const {Lang, passwordupdated} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(seticonfocus('setting'));
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setcurrentpassword("")
      setnewpassword("")
      setconfirmpassword("")
      getpassword();
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setLoader(false)
   
    if(passwordupdated != ""){
      
        showToast(passwordupdated, {
            duration: 500,
          });
          if(passwordupdated == "Password Changed Successfully !"){
            updatestorage()
            navigation.navigate("Settings")
          }
    }
    dispatch(clearpasswordupdated())

}, [passwordupdated]);



  async function updatestorage(){
    await AsyncStorage.setItem('Password', newpassword);
  }
  async function getpassword() {
    const value = await AsyncStorage.getItem('Password');
    setrealpassword(value);
  }
  async function updatepassword() {
    console.log(realpassword + 'ss' + currentpassword);
    if (currentpassword == '') {
      showToast(
        Lang == 'en'
          ? 'Current password field can not be empty.'
          : 'لا يمكن ترك حقل كلمة المرور الحالية فارغًا',
        {
          duration: 500,
        },
      );
    } else if (newpassword == '') {
      showToast(
        Lang == 'en'
          ? 'New password field can not be empty.'
          : 'لا يمكن ترك حقل كلمة المرور الجديدة فارغًا',
        {
          duration: 500,
        },
      );
    } else if (confirmpassword == '') {
      showToast(
        Lang == 'en'
          ? 'Confirm password field can not be empty.'
          : 'لا يمكن ترك حقل تأكيد كلمة المرور فارغًا',
        {
          duration: 500,
        },
      );
    } else if (confirmpassword != newpassword) {
      showToast(
        Lang == 'en' ? 'Passwords do not match.' : 'كلمة المرور غير مطابقة',
        {
          duration: 500,
        },
      );
    } else if (currentpassword != realpassword) {
      showToast(
        Lang == 'en'
          ? 'Incorrect current password entered.'
          : 'تم إدخال كلمة مرور حالية غير صحيحة.',
        {
          duration: 500,
        },
      );
    } else {
      setLoader(true);
      dispatch(changepassword(currentpassword, newpassword));
    }
  }
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          paddingLeft: '2%',
          paddingRight: '2%',
          alignSelf: 'center',
          flex: 12,
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader
          title={Lang == 'en' ? 'Change Password' : 'غير كلمة السر'}
        />
        <View style={{height: scalableheight.three}} />

        <View style={{width: '100%'}}>
          <TextInput
            style={{
              ...styleSheet.TextInput,
              ...styleSheet.shadow,
            }}
            secureTextEntry={currentpasswordshow}
            placeholderTextColor="#8c8c8c"
            placeholder={
              Lang == 'en' ? 'Current Password' : 'كلمة المرور الحالية'
            }
            onChangeText={text => setcurrentpassword(text)}
            defaultValue={currentpassword}
          />

          <TouchableOpacity
            onPress={() => {
              setcurrentpasswordshow(!currentpasswordshow);
            }}
            style={styleSheet.inputIconStyle}>
            <Ionicons
              color={'#8c8c8c'}
              name={currentpasswordshow ? 'eye-off' : 'eye'}
              size={fontSize.twentytwo}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          <TextInput
            style={{
              ...styleSheet.TextInput,
              ...styleSheet.shadow,
            }}
            secureTextEntry={newpasswordshow}
            placeholderTextColor="#8c8c8c"
            placeholder={Lang == 'en' ? 'New Password' : 'كلمة السر الجديدة'}
            onChangeText={text => setnewpassword(text)}
            defaultValue={newpassword}
          />
          <TouchableOpacity
            onPress={() => {
              setnewpasswordshow(!newpasswordshow);
            }}
            style={styleSheet.inputIconStyle}>
            <Ionicons
              color={'#8c8c8c'}
              name={newpasswordshow ? 'eye-off' : 'eye'}
              size={fontSize.twentytwo}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          <TextInput
            style={{
              ...styleSheet.TextInput,
              ...styleSheet.shadow,
            }}
            secureTextEntry={confirmpasswordshow}
            placeholderTextColor="#8c8c8c"
            placeholder={
              Lang == 'en' ? 'Current Password' : 'كلمة المرور الحالية'
            }
            onChangeText={text => setconfirmpassword(text)}
            defaultValue={confirmpassword}
          />
          <TouchableOpacity
            onPress={() => {
              setconfirmpasswordshow(!confirmpasswordshow);
            }}
            style={styleSheet.inputIconStyle}>
            <Ionicons
              color={'#8c8c8c'}
              name={confirmpasswordshow ? 'eye-off' : 'eye'}
              size={fontSize.twentytwo}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: scalableheight.one,
          }}>
          <CustomButton
            title={Lang == 'en' ? 'Update' : 'تحديث'}
            customButtonStyle={{marginTop: '2%'}}
            Loading={Loader}
            onPress={() => {
              updatepassword();
              // navigation.navigate("OtpVerification")
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <BottomTab />
      </View>
      <GToastContainer paddingBottom={100} style={{height: 40, width: 60}} />
    </Animated.View>
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
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: '4%',
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
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
  TextInput: {
    width: '95%',
    backgroundColor: '#F5F5F5',
    fontSize: fontSize.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.eleven,
    height: scalableheight.seven,
    color: '#8c8c8c',

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: '4%',
  },
});
export default Changepassword;
