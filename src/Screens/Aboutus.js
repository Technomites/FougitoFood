import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlainHeader from '../Shared/Components/PlainHeader';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const Aboutus = ({navigation, drawerAnimationStyle}) => {

  const {detailsContact} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
    // StatusBar.setBackgroundColor('transparent');
    // StatusBar.setBarStyle('light-content');
    dispatch(seticonfocus('home'));
  }, []);

  function openurl() {
    Linking.openURL(`${detailsContact[0]?.Facebook}`);
  }

  function openurl1() {
    Linking.openURL(`${detailsContact[0]?.Instagram}`);
  }

  function openurl3() {
    Linking.openURL(`${detailsContact[0]?.Twitter}`);
  }

  function openurl4() {
    Linking.openURL(`${detailsContact[0]?.Youtube}`);
  }

  function openurl5() {
    Linking.openURL(
      'whatsapp://send?text=&phone=' + `${detailsContact[0]?.WhatsApp}`,
    );
  }
  return (
    <Animated.View
      style={{...styleSheet.maincontainerview, ...drawerAnimationStyle}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View style={styleSheet.innerview}>
        <PlainHeader title={'About Us'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styleSheet.scrollviewview}>
          <View>
            <View
              style={{
                ...styleSheet.shadow,
                ...styleSheet.MainContainer,
              }}>
              <Image
                resizeMode="contain"
                style={styleSheet.imageview}
                source={require('../Resources/images/fougitocover.png')}
              />
            </View>
            <View style={{marginVertical: scalableheight.one}}>
              <View style={styleSheet.alignandjustifycenter}>
                <Text style={styleSheet.text4}>Welcome to Fougito!</Text>
                <Text style={styleSheet.text5}>
                  You can refer to a specific region of Mexico where your food
                  comes from, or use some common Mexican terms in your tagline.
                  Make sure that they’re terms most people would know, to avoid
                  confusionSo encourage them to think of your restaurant as a
                  place where they can enjoy a delicious meal that won’t derail
                  their fitness goals
                </Text>
              </View>
              <View style={styleSheet.innerview2}>
                <View style={styleSheet.innerview3}>
                  <Text style={styleSheet.text4}>Come Sit With Us</Text>
                  <Text style={styleSheet.text7}>
                    You could also draw attention to an open-fire grill or
                    unique cooking method, or your particularly speedy service.
                  </Text>
                </View>

                <View style={styleSheet.innerview9}>
                  <View>
                    <Whyuscomponent text={'Amet curabitur loborti'} />
                    <Whyuscomponent text={'Purus purus'} />
                    <Whyuscomponent text={'Malesuada nisl'} />
                    <Whyuscomponent text={'Morbi proin'} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styleSheet.innerview10}>
              <TouchableOpacity
                onPress={openurl}
                activeOpacity={0.9}
                style={[styleSheet.shadow, styleSheet.touchableviewstyle]}>
                <FontAwesome
                  style={styleSheet.iconstyle}
                  name={'facebook'}
                  color={'#1980e7'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openurl1}
                activeOpacity={0.9}
                style={[styleSheet.shadow, styleSheet.touchableviewstyle]}>
                <FontAwesome
                  style={styleSheet.iconstyle}
                  name={'instagram'}
                  color={'#d72e75'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openurl3}
                activeOpacity={0.9}
                style={[styleSheet.shadow, styleSheet.touchableviewstyle]}>
                <FontAwesome
                  style={styleSheet.iconstyle}
                  name={'twitter'}
                  color={'#7fcdf8'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={openurl4}
                style={[styleSheet.shadow, styleSheet.touchableviewstyle]}>
                <FontAwesome
                  style={styleSheet.iconstyle}
                  name={'youtube-play'}
                  color={'#E14E4E'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openurl5}
                activeOpacity={0.9}
                style={[styleSheet.shadow, styleSheet.touchableviewstyle]}>
                <FontAwesome
                  style={styleSheet.iconstyle}
                  name={'whatsapp'}
                  color={'#26c54b'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  iconstyle: {alignSelf: 'center'},
  touchableviewstyle: {
    backgroundColor: '#F5F5F5',
    borderRadius: scalableheight.one,
    width: scalableheight.six,
    height: scalableheight.six,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerview10: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scalableheight.two,
  },
  innerview9: {
    width: '100%',
    flexDirection: 'row',
  },
  text7: {
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
    color: 'rgba(41, 38, 42, 0.5)',
    // alignSelf: 'flex-start',
    textAlign: 'justify',
  },
  innerview3: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  text5: {
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
    color: 'rgba(41, 38, 42, 0.5)',
    textAlign: 'justify',
    alignSelf: 'flex-start',
  },
  text4: {
    fontSize: fontSize.fourteen,
    fontFamily: 'Inter-Bold',
    color: '#29262A',
    alignSelf: 'flex-start',
  },
  alignandjustifycenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageview: {width: '100%', height: scalableheight.twenty},
  scrollviewview: {
    paddingHorizontal: scalableheight.two,
  },
  innerview: {
    alignSelf: 'center',
    paddingTop: getStatusBarHeight(),
    flex: 12,
  },
  innerview2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scalableheight.one,
  },
  maincontainerview: {
    flex: 1,
    backgroundColor: 'white',
  },
  Text1: {
    color: '#F9B35E',
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: fontSize.eightteen,
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
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: 'white',
  },

  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
    color: '#000000',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
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
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
export default Aboutus;
