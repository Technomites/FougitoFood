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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlainHeader from '../Shared/Components/PlainHeader';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';
import BottomTab from '../Shared/Components/BottomTab';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const TermsCondition = ({navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();

  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={'Terms & Condition'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: scalableheight.three,
          }}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: fontSize.fourteen,
                  fontFamily: 'Inter-Bold',
                  color: '#29262A',
                  alignSelf: 'flex-start',
                }}>
                Welcome to Fougito!
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                }}>
                These terms and conditions outline the rules and regulations for
                the use of Fougito's Website, located at Fougito.com.
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                  marginVertical: scalableheight.pointfive,
                }}>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Fougito if you do not agree
                to take all of the terms and conditions stated on this page.
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                }}>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                Company. "Party", "Parties", or "Us", refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: fontSize.fourteen,
                  fontFamily: 'Inter-Bold',
                  color: '#29262A',
                  alignSelf: 'flex-start',
                }}>
                Cookies
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                }}>
                We employ the use of cookies. By accessing Fougito, you agreed
                to use cookies in agreement with the Fougito's Privacy Policy.
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                  marginVertical: scalableheight.pointfive,
                }}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </Text>
            </View>
            <View style={{marginBottom: scalableheight.four}}>
              <Text
                style={{
                  fontSize: fontSize.fourteen,
                  fontFamily: 'Inter-Bold',
                  color: '#29262A',
                  alignSelf: 'flex-start',
                }}>
                License
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                }}>
                Unless otherwise stated, Fougito and/or its licensors own the
                intellectual property rights for all material on Fougito. All
                intellectual property rights are reserved. You may access this
                from Fougito for your own personal use subjected to restrictions
                set in these terms and conditions.
              </Text>
              <Text
                style={{
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-Medium',
                  color: 'rgba(41, 38, 42, 0.5)',
                  textAlign: 'justify',
                  marginTop: scalableheight.pointfive,
                }}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </Text>
              <Whyuscomponent text={'Amet curabitur loborti'} />
              <Whyuscomponent text={'Purus purus'} />
              <Whyuscomponent text={'Malesuada nisl'} />
            </View>
          </View>
        </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
export default TermsCondition;
