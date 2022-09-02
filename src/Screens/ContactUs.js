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
import {
  changelang,
  seticonfocus,
  submitcontactusform,
  clearcontactform,
  getbussinesssettings,
} from '../Actions/actions';
import {GToastContainer, showToast} from 'react-native-gtoast';
import renderIf from 'render-if';
import MYButton from '../Shared/Components/MYButton';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import PlainHeader from '../Shared/Components/PlainHeader';
import CustomButton from '../Shared/Components/CustomButton';
import CountryInput from '../Shared/Components/CountryInput';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BottomTab from '../Shared/Components/BottomTab';
import {fontSize, scalableheight} from '../Utilities/fonts';
import PickerModel from '../Shared/Components/PickerModel';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const ContactUs = ({navigation, drawerAnimationStyle}) => {
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [contactinfo, setContactInfo] = useState();
  const [successModal, setSuccessModal] = useState(false);

  const [selectNumber, setSelectedNumber] = useState('+971');
  const [pickerSearch, setPickerSearch] = useState('');
  const [numberShown, setNumberShown] = useState(false);

  const {Lang, contactformsubmissionsuccess, bussinesslist} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(seticonfocus('home'));
  }, []);

  useEffect(() => {
    if (contactformsubmissionsuccess != '') {
      setLoader(false);
      if (contactformsubmissionsuccess == 200) {
        showToast(
          Lang == 'en'
            ? 'Your email has been sent successfully. We will getback to you shortly'
            : 'تم إرسال بريدك الإلكتروني بنجاح ، وسنعاود الاتصال بك قريبًا.',
          {
            duration: 500,
          },
        );

        setFirstName('');
        setPhoneNumber('');
        setMessage('');
        setEmail('');
      } else {
        showToast(
          Lang == 'en'
            ? 'There was a problem sending your email. Please try again later.'
            : 'حدثت مشكلة أثناء إرسال البريد الإلكتروني الخاص بك. يرجى المحاولة مرة أخرى في وقت لاحق.',
          {
            duration: 500,
          },
        );
      }

      dispatch(clearcontactform());
    }
  }, [contactformsubmissionsuccess]);

  useEffect(() => {
    dispatch(getbussinesssettings(Lang));
  }, [Lang]);

  function submitcontactus() {
    if (FirstName == '') {
      showToast(
        Lang == 'en'
          ? 'Please enter your first name.'
          : 'الرجاء إدخال اسمك الأول.',
        {
          duration: 500,
        },
      );
    } else if (PhoneNumber == '') {
      showToast(
        Lang == 'en'
          ? 'Please enter your phone number.'
          : 'يرجى إدخال رقم الهاتف الخاص بك.',
        {
          duration: 500,
        },
      );
    } else if (Email == '') {
      showToast(
        Lang == 'en'
          ? 'Please enter your email address.'
          : 'الرجاء إدخال عنوان البريد الإلكتروني الخاص بك.',
        {
          duration: 500,
        },
      );
    } else if (Message == '') {
      showToast(
        Lang == 'en' ? 'Please enter your message.' : 'أدرج رسالتك من فضلك.',
        {
          duration: 500,
        },
      );
    } else {
      setLoader(true);
      console.log(selectNumber + PhoneNumber);
      let number = selectNumber.substring(1) + PhoneNumber;
      dispatch(submitcontactusform(FirstName, number, Email, Message));
    }
  }

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignSelf: 'center',
            flex: 12,
            paddingTop: getStatusBarHeight(),
          }}>
          <PlainHeader title={'Settings'} />
          <View style={{justifyContent: 'center', marginHorizontal: 20}}>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  fontSize: fontSize.fourteen,
                  fontFamily: 'Inter-Bold',
                  color: '#29262A',
                  alignSelf: 'flex-start',
                }}>
                Get in touch with us
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                }}>
                We’re always available and happy to chat with you! Reach out to
                us"
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: scalableheight.one,
              }}>
              <View
                style={{
                  width: scalableheight.five,
                  height: scalableheight.five,
                  backgroundColor: '#E14E4E',
                  borderRadius: scalableheight.five,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: scalableheight.one,
                  }}>
                  <Icon
                    name="call-sharp"
                    size={scalableheight.three}
                    color="#fff"
                  />
                </View>
              </View>
              <View style={{paddingLeft: scalableheight.one}}>
                <Text
                  style={{
                    fontSize: fontSize.twelve,
                    fontFamily: 'Inter-Medium',
                    color: '#29262A',
                    textAlign: 'justify',
                  }}>
                  (446)078-4232
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: scalableheight.one,
              }}>
              <View
                style={{
                  width: scalableheight.five,
                  height: scalableheight.five,
                  backgroundColor: '#E14E4E',
                  borderRadius: scalableheight.five,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: scalableheight.one,
                  }}>
                  <Icon name="mail" size={scalableheight.three} color="#fff" />
                </View>
              </View>
              <View style={{paddingLeft: scalableheight.one}}>
                <Text
                  style={{
                    fontSize: fontSize.twelve,
                    fontFamily: 'Inter-Medium',
                    color: '#29262A',
                    textAlign: 'justify',
                  }}>
                  support@fougito.com
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: scalableheight.one,
              }}>
              <View
                style={{
                  width: scalableheight.five,
                  height: scalableheight.five,
                  backgroundColor: '#E14E4E',
                  borderRadius: scalableheight.five,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: scalableheight.one,
                  }}>
                  <Icon
                    name="location"
                    size={scalableheight.three}
                    color="#fff"
                  />
                </View>
              </View>
              <View style={{paddingLeft: scalableheight.one}}>
                <Text
                  style={{
                    fontSize: fontSize.twelve,
                    fontFamily: 'Inter-Medium',
                    color: '#29262A',
                    textAlign: 'justify',
                  }}>
                  3636 Flavie Crest Barton Parkways Pedroton
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: scalableheight.two,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 2,
                  borderWidth: scalableheight.borderTopWidth,
                  borderColor: 'rgba(211,211,211, 0.6)',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'facebook'}
                  color={'#1980e7'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 2,
                  borderWidth: scalableheight.borderTopWidth,
                  borderColor: 'rgba(211,211,211, 0.6)',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'instagram'}
                  color={'#d72e75'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 2,
                  borderWidth: scalableheight.borderTopWidth,
                  borderColor: 'rgba(211,211,211, 0.6)',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'twitter'}
                  color={'#7fcdf8'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 2,
                  borderWidth: scalableheight.borderTopWidth,
                  borderColor: 'rgba(211,211,211, 0.6)',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'linkedin'}
                  color={'#1980e7'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 2,
                  borderWidth: scalableheight.borderTopWidth,
                  borderColor: 'rgba(211,211,211, 0.6)',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'whatsapp'}
                  color={'#26c54b'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderColor: 'rgba(112, 112, 112, 0.15)',
              }}></View>
            <Text
              style={{
                fontSize: fontSize.fourteen,
                fontFamily: 'Inter-Bold',
                color: '#29262A',
                alignSelf: 'flex-start',
              }}>
              Send us a Message
            </Text>

            <Text
              style={{
                fontSize: fontSize.twelve,
                fontFamily: 'Inter-Medium',
                color: 'rgba(41, 38, 42, 0.5)',

                marginBottom: scalableheight.one,
              }}>
              We’d love to hear from you! Get in touch with us here
            </Text>

            {/* <SubHeading
            style={{marginVertical: 5, color: 'black'}}
            text="Your Message"
          /> */}
            {/* <MyFormInputTile placeHolder="Type Here" /> */}
            <View
              style={{
                backgroundColor: '#F9F9F9',
                height: scalableheight.twenty,
                borderRadius: scalableheight.one,
                paddingHorizontal: scalableheight.one,
                width: '100%',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 1,
                // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
              }}>
              <TextInput
                value={message}
                placeholderStyle={{
                  fontSize: fontSize.eightteen,
                }}
                placeholderTextColor="lightgray"
                placeholder="Type here"
                onChangeText={text => {
                  setMessage(text);
                }}
              />
            </View>
            <View style={{marginTop: scalableheight.two}}>
              {/* {loader ? (
                <ActivityIndicator size={'large'} color={Color.btnBgColor} />
              ) : ( */}
              <MYButton
                onPress={() => {}}
                title="SEND"
                color={'#E14E4E'}
                textcolor={'white'}
              />
              {/* )} */}
            </View>

            {/* <SuccessModal
              yesPress={() => {
                setSuccessModal(false);
              }}
              bnText="OK"
              message="Your message has been sent successfully"
              visible={successModal}
            /> */}
          </View>
        </View>
      </SafeAreaView>
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
});
export default ContactUs;
