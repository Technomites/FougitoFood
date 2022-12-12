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
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Contactus, emailNullstate, Contactemail} from '../Actions/actions';


import MYButton from '../Shared/Components/MYButton';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import PlainHeader from '../Shared/Components/PlainHeader';

import CountryInput from '../Shared/Components/CountryInput';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// import BottomTab from '../Shared/Components/BottomTab';
import {fontSize, scalableheight} from '../Utilities/fonts';
import PickerModel from '../Shared/Components/PickerModel';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import Toast from 'react-native-toast-notifications';
import AuthenticationModel from '../Shared/Components/AuthenticationModel';

const ContactUs = ({navigation, drawerAnimationStyle}) => {
  const toast = useRef();
  const [modalVisible, setmodalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [contactinfo, setContactInfo] = useState();
  const [successModal, setSuccessModal] = useState(false);

  const [selectNumber, setSelectedNumber] = useState('+971');
  const [pickerSearch, setPickerSearch] = useState('');
  const [numberShown, setNumberShown] = useState(false);

  const {
    AuthToken,
    detailsContact,
    detailsContactstatus,
    detailsContactmessage,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Contactus());
  }, []);

  useEffect(() => {
    console.log('this is the data ' + JSON.stringify(detailsContact));
  }, [detailsContact]);

  useEffect(() => {
    if (detailsContactstatus === 'Success') {
      toast.current.show(detailsContactmessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });

      dispatch(emailNullstate());
      setMessage('');
      setLoader(false);
    } else if (detailsContactstatus === 'Error') {
      toast.current.show(detailsContactmessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      dispatch(emailNullstate());
      setMessage('');
      setLoader(false);
    } else if (detailsContactstatus === 'Network Request Failed') {
      toast.current.show('Network Request Failed', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      dispatch(emailNullstate());
      setMessage('');
      setLoader(false);
    }
  }, [detailsContactstatus, detailsContactmessage]);

  const emailsend = () => {
    if (message == '') {
      toast.current.show('Message Cannot Be Empty', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
      });
    } else {
      setLoader(true);
      dispatch(Contactemail(AuthToken, message));
    }
  };

  function closemodal() {
    setmodalVisible(false);
  }

  function buttonpress() {
    if (AuthToken != '') {
      emailsend();
    } else {
      setmodalVisible(true);
    }
  }

  function openurl5() {
    Linking.openURL(`${detailsContact[0]?.Facebook}`);
  }
  function openurl6() {
    Linking.openURL(`${detailsContact[0]?.Instagram}`);
  }

  function openurl7() {
    Linking.openURL(`${detailsContact[0]?.Twitter}`);
  }

  function openurl8() {
    Linking.openURL(`${detailsContact[0]?.Youtube}`);
  }

  function openurl9() {
    Linking.openURL(
      'whatsapp://send?text=&phone=' + `${detailsContact[0]?.WhatsApp}`,
    );
  }
  return (
    <Animated.View
      style={[drawerAnimationStyle, styleSheet.maindrawercontainer]}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <View style={styleSheet.innerview}>
        <PlainHeader title={'Contact Us'} />
        <View style={styleSheet.innerview3}>
          <View style={styleSheet.marginverticle5}>
            <Text style={styleSheet.text5}>{detailsContact[0]?.Title}</Text>
            <Text style={styleSheet.text6}>
              We’re always available and happy to chat with you! Reach out to us
            </Text>
          </View>
          <View style={styleSheet.innerview4}>
            <View style={styleSheet.innerview5}>
              <View style={styleSheet.innerview6}>
                <Icon
                  name="call-sharp"
                  size={scalableheight.three}
                  color="#fff"
                />
              </View>
            </View>
            <View style={styleSheet.paddingleftone}>
              <Text style={styleSheet.text7}>
                {detailsContact[0]?.Contact}
                {' , '}
                {detailsContact[0]?.Contact2}
              </Text>
            </View>
          </View>
          <View style={styleSheet.innerview4}>
            <View style={styleSheet.innerview5}>
              <View style={styleSheet.innerview6}>
                <Icon name="mail" size={scalableheight.three} color="#fff" />
              </View>
            </View>
            <View style={styleSheet.paddingleftone}>
              <Text style={styleSheet.text7}>{detailsContact[0]?.Email}</Text>
            </View>
          </View>
          <View style={styleSheet.innerview4}>
            <View style={styleSheet.innerview5}>
              <View style={styleSheet.innerview6}>
                <Icon
                  name="location"
                  size={scalableheight.three}
                  color="#fff"
                />
              </View>
            </View>
            <View style={styleSheet.paddingleftone}>
              <Text style={styleSheet.text6}>
                {detailsContact[0]?.StreetAddress}
              </Text>
            </View>
          </View>
          <View style={styleSheet.innerview12}>
            <TouchableOpacity
              onPress={openurl5}
              activeOpacity={0.9}
              style={styleSheet.touchableview}>
              <FontAwesome
                style={styleSheet.alignselfcenter}
                name={'facebook'}
                color={'#1980e7'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={openurl6}
              style={styleSheet.touchableview}>
              <FontAwesome
                style={styleSheet.alignselfcenter}
                name={'instagram'}
                color={'#d72e75'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openurl7}
              activeOpacity={0.9}
              style={styleSheet.touchableview}>
              <FontAwesome
                style={styleSheet.alignselfcenter}
                name={'twitter'}
                color={'#7fcdf8'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={openurl8}
              style={styleSheet.touchableview}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name={'youtube-play'}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openurl9}
              activeOpacity={0.9}
              style={styleSheet.touchableview}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name={'whatsapp'}
                color={'#26c54b'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>
          </View>

          {/* <SuccessModal
              yesPress={() => {
                setSuccessModal(false);
              }}
              bnText="OK"
              message="Your message has been sent successfully"
              visible={successModal}
            /> */}
          <View style={styleSheet.innerview14}></View>
          <Text style={styleSheet.messagetext}>Send us a Message</Text>

          <Text style={styleSheet.innertext}>
            We’d love to hear from you! Get in touch with us here
          </Text>

          {/* <SubHeading
            style={{marginVertical: 5, color: 'black'}}
            text="Your Message"
          /> */}
          {/* <MyFormInputTile placeHolder="Type Here" /> */}
          <View style={styleSheet.textinputview}>
            <TextInput
              multiline
              value={message}
              placeholderStyle={{
                fontSize: fontSize.twenty,
              }}
              style={styleSheet.marginverticleone}
              placeholderTextColor="lightgray"
              placeholder="Type here"
              onChangeText={text => {
                setMessage(text);
              }}
            />
          </View>
        </View>
        <View style={styleSheet.innerview7}>
          <View style={styleSheet.marginTopone}>
            {loader == true ? (
              <View style={styleSheet.activityindicatorview}>
                <ActivityIndicator size={'large'} color="#E14E4E" />
              </View>
            ) : (
              <MYButton
                onPress={() => buttonpress()}
                title={AuthToken != '' ? 'Submit' : 'Login'}
                color={'#E14E4E'}
                textcolor={'white'}
              />
            )}
          </View>
        </View>
        <AuthenticationModel state={modalVisible} togglemodel={closemodal} />
        <Toast ref={toast} style={styleSheet.toastview} />
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  marginverticleone: {marginVertical: scalableheight.one},
  textinputview: {
    marginTop: scalableheight.one,
    backgroundColor: '#F9F9F9',
    height: scalableheight.twenty,
    borderRadius: scalableheight.one,
    paddingHorizontal: scalableheight.one,
    width: '100%',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
  },
  innertext: {
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
    color: 'rgba(41, 38, 42, 0.5)',

    marginBottom: scalableheight.one,
  },
  messagetext: {
    fontSize: fontSize.fourteen,
    fontFamily: 'Inter-Bold',
    color: '#29262A',
    alignSelf: 'flex-start',
    marginTop: scalableheight.one,
  },
  innerview14: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.15)',
  },
  alignselfcenter: {alignSelf: 'center'},
  touchableview: {
    backgroundColor: '#F9F9F9',
    borderRadius: scalableheight.one,
    width: scalableheight.six,
    height: scalableheight.six,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 2,
    // borderWidth: scalableheight.borderTopWidth,
    // borderColor: 'rgba(211,211,211, 0.6)',
  },
  innerview12: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scalableheight.two,
  },
  innerview11: {
    alignItems: 'center',
    padding: scalableheight.one,
  },
  paddingleftone: {paddingLeft: scalableheight.one},
  text7: {
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
    color: '#29262A',
    textAlign: 'justify',
  },

  innerview7: {
    position: 'absolute',
    bottom: scalableheight.two,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: scalableheight.two,
  },
  marginTopone: {marginTop: scalableheight.two},
  activityindicatorview: {
    height: scalableheight.seven,

    marginTop: '1%',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastview: {marginBottom: scalableheight.ten, justifyContent: 'center'},
  innerview6: {
    alignItems: 'center',
    padding: scalableheight.one,
  },
  innerview5: {
    width: scalableheight.five,
    height: scalableheight.five,
    backgroundColor: '#E14E4E',
    borderRadius: scalableheight.five,
  },
  innerview4: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: scalableheight.one,
  },
  Text1: {
    color: '#F9B35E',
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: fontSize.fourteen,
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
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 3,
  },
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
    color: '#000000',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: scalableheight.two,
    paddingVertical: scalableheight.two,
    justifyContent: 'center',
    height: Dimensions.get('window').height / 15,
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 1,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
  },
  inputIconStyle: {
    position: 'absolute',
    right: '5%',
    height: '100%',
    justifyContent: 'center',
  },
  maindrawercontainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  innerview: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    flex: 12,
    paddingTop: getStatusBarHeight(),
  },
  innerview3: {
    justifyContent: 'center',
    paddingHorizontal: scalableheight.two,
  },
  marginverticle5: {marginVertical: 5},
  text5: {
    fontSize: fontSize.fourteen,
    fontFamily: 'Inter-Bold',
    color: '#29262A',
    alignSelf: 'flex-start',
  },
  text6: {
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
    color: 'rgba(41, 38, 42, 0.5)',
    textAlign: 'justify',
  },
});
export default ContactUs;
