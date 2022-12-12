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
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import PlainHeader from '../Shared/Components/PlainHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import MYButton from '../Shared/Components/MYButton';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const Legal = ({navigation, drawerAnimationStyle}) => {
  function gotocontactus() {
    navigation.navigate('ContactUs');
  }
  return (
    <Animated.View style={[styles.MainContainerview, drawerAnimationStyle]}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View style={styles.innerview}>
        <PlainHeader title={'Legal'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.paddingHorizontaltwo}>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.MainContainer,
                // ...styles.shadow,
                styles.border,
              ]}>
              <View style={styles.topViewContainer}>
                <Text style={styles.text4}>Terms & Conditions</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.MainContainer,
                // ...styles.shadow,
                styles.border,
              ]}>
              <View
                style={{
                  ...styles.topViewContainer,
                }}>
                <Text style={styles.text4}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.MainContainer,
                // ...styles.shadow,
                styles.border,
              ]}>
              <View style={styles.topViewContainer}>
                <Text style={styles.text4}>Return Policy</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.innerview4}>
              <Text style={styles.text7}>Want To Know More?</Text>
              <Text style={styles.text8}>
                For any further queries,{'\n'} Feel free to reach out to us.
              </Text>
              <View style={styles.width50}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={gotocontactus}
                  style={[styles.Loginbutton, styles.margintopone]}>
                  <Text style={styles.text9}>CONTACT US</Text>
                  <Text style={styles.width25}>
                    <Entypo
                      name="phone"
                      size={scalableheight.three}
                      color={'white'}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  margintopone: {
    marginTop: scalableheight.one,
  },
  width25: {width: '25%'},
  text9: {
    fontSize: fontSize.fifteen,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    width: '75%',
    textAlign: 'center',
  },
  width50: {width: '50%'},
  text8: {
    fontFamily: 'Rubik-MediumItalic',
    fontSize: fontSize.twelve,
    color: '#636363',
    textAlign: 'center',
  },
  text7: {
    color: '#29262A',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.twenty,
  },
  innerview4: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scalableheight.twenty,
  },
  text4: {
    color: '#29262A',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    paddingHorizontal: scalableheight.two,
  },
  MainContainer: {
    borderRadius: fontSize.eleven,
    // paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: '#F5F5F5',
  },
  Loginbutton: {
    // width: '100%',
    backgroundColor: '#E14E4E',
    justifyContent: 'center',
    alignItems: 'center',
    height: scalableheight.six,
    borderRadius: fontSize.borderradiusmedium,

    paddingHorizontal: scalableheight.pointfive,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  MainContainerview: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  innerview: {
    alignSelf: 'center',
    paddingTop: getStatusBarHeight(),
    flex: 12,
  },
  paddingHorizontaltwo: {
    paddingHorizontal: scalableheight.two,
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',

    paddingVertical: scalableheight.two,
  },
});
export default Legal;
