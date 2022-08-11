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
import Entypo from 'react-native-vector-icons/Entypo';
import PlainHeader from '../Shared/Components/PlainHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import MYButton from '../Shared/Components/MYButton';

const Legal = ({navigation, drawerAnimationStyle}) => {
  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={'Legal'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: scalableheight.two,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TermsCondition');
              }}
              activeOpacity={0.9}
              style={{
                ...styles.shadow,
                ...styles.MainContainer,
                paddingVertical: scalableheight.two,
              }}>
              <View
                style={{
                  ...styles.topViewContainer,
                }}>
                <Text
                  style={{
                    color: '#29262A',
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.fifteen,
                    paddingHorizontal: scalableheight.one,
                  }}>
                  Terms & Conditions
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                ...styles.shadow,
                ...styles.MainContainer,
                paddingVertical: scalableheight.two,
              }}>
              <View
                style={{
                  ...styles.topViewContainer,
                }}>
                <Text
                  style={{
                    color: '#29262A',
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.fifteen,
                    paddingHorizontal: scalableheight.one,
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                ...styles.shadow,
                ...styles.MainContainer,
                paddingVertical: scalableheight.two,
              }}>
              <View
                style={{
                  ...styles.topViewContainer,
                }}>
                <Text
                  style={{
                    color: '#29262A',
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.fifteen,
                    paddingHorizontal: scalableheight.one,
                  }}>
                  Return Policy
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: scalableheight.twenty,
              }}>
              <Text
                style={{
                  color: '#29262A',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.twenty,
                }}>
                Want To Know More?
              </Text>
              <Text
                style={{
                  fontFamily: 'Rubik-MediumItalic',
                  fontSize: fontSize.twelve,
                  color: '#636363',
                  textAlign: 'center',
                }}>
                For any further queries,{'\n'} Feel free to reach out to us.
              </Text>
              <View style={{width: '50%'}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('ContactUs');
                  }}
                  style={{
                    ...styles.Loginbutton,
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize.fifteen,
                      color: 'white',
                      fontFamily: 'Inter-SemiBold',
                      width: '75%',
                      textAlign: 'center',
                    }}>
                    CONTACT US
                  </Text>
                  <Text style={{width: '25%'}}>
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
  MainContainer: {
    borderRadius: fontSize.eleven,
    // paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: '#e8e8e8',
  },
  Loginbutton: {
    // width: '100%',
    backgroundColor: '#E14E4E',
    justifyContent: 'center',
    alignItems: 'center',
    height: scalableheight.seven,
    borderRadius: fontSize.borderradiusmedium,
    marginTop: '1%',
    marginBottom: '1%',
    flexDirection: 'row',
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
});
export default Legal;