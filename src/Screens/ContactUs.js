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
    }
  }, [detailsContactstatus, detailsContactmessage]);

  const emailsend = () => {
    if (message == '') {
      toast.current.show('Type your message', {
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

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          flex: 12,
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'Settings'} />
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: scalableheight.two,
          }}>
          <View style={{marginVertical: 5}}>
            <Text
              style={{
                fontSize: fontSize.fourteen,
                fontFamily: 'Inter-Bold',
                color: '#29262A',
                alignSelf: 'flex-start',
              }}>
              {detailsContact[0]?.Title}
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
                {detailsContact[0]?.Contact}
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
                {detailsContact[0]?.Email}
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
                {detailsContact[0]?.StreetAddress}
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
              onPress={() => Linking.openURL(`${detailsContact[0]?.Facebook}`)}
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
              onPress={() => Linking.openURL(`${detailsContact[0]?.Instagram}`)}
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
              onPress={() => Linking.openURL(`${detailsContact[0]?.Twitter}`)}
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
              onPress={() => Linking.openURL(`${detailsContact[0]?.Youtube}`)}
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
                name={'youtube-play'}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'whatsapp://send?text=&phone=' +
                    `${detailsContact[0]?.WhatsApp}`,
                )
              }
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

          {/* <SuccessModal
              yesPress={() => {
                setSuccessModal(false);
              }}
              bnText="OK"
              message="Your message has been sent successfully"
              visible={successModal}
            /> */}
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
              marginTop: scalableheight.one,
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
              marginTop: scalableheight.one,
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
              multiline
              value={message}
              placeholderStyle={{
                fontSize: fontSize.twenty,
              }}
              style={{marginVertical: scalableheight.one}}
              placeholderTextColor="lightgray"
              placeholder="Type here"
              onChangeText={text => {
                setMessage(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: scalableheight.two,
            width: '100%',
            justifyContent: 'center',
            paddingHorizontal: scalableheight.two,
          }}>
          <View style={{marginTop: scalableheight.two}}>
            {loader == true ? (
              <View
                style={{
                  height: scalableheight.seven,

                  marginTop: '1%',
                  marginBottom: '1%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color="#E14E4E" />
              </View>
            ) : (
              <MYButton
                onPress={() => {
                  {
                    AuthToken != '' ? emailsend() : setmodalVisible(true);
                  }
                }}
                title={AuthToken != '' ? 'SEND' : 'Login'}
                color={'#E14E4E'}
                textcolor={'white'}
              />
            )}
          </View>
        </View>
        <AuthenticationModel
          state={modalVisible}
          togglemodel={() => {
            setmodalVisible(false);
          }}
        />
        <Toast
          ref={toast}
          style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
        />
      </View>
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
