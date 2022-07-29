import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Entypo from 'react-native-vector-icons/Entypo';
import {fontSize, scalableheight} from '../Utilities/fonts';
// import AuthButton from '../Shared/Components/AuthButton';
import * as Animatable from 'react-native-animatable';
import MYButton from '../Shared/Components/MYButton';

const GetStartedstepthree = props => {
  const {Lang} = useSelector(state => state.userReducer);

  useEffect(() => {
    //  StatusBar.setHidden(false);
    // StatusBar.setBackgroundColor('#363431');
    // StatusBar.setBarStyle("dark-content")
    // hideNavigationBar()
    // changeNavigationBarColor("white");
  }, []);

  return (
    <View
      style={{height: '100%', width: '100%', backgroundColor: 'transparent'}}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../Resources/images/GetstartedS3.png')}
        style={styleSheet.BackgroundImage}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scalableheight.fifty,
            width: '100%',
          }}>
          <Image
            resizeMode="contain"
            style={styleSheet.Image}
            source={require('../Resources/images/logo-black.png')}
          />
          <Text
            style={{
              color: '#29262A',
              fontSize: fontSize.twentyseven,
              fontWeight: '700',
              fontFamily: 'Inter, Extra Bold',
              textAlign: 'center',
              width: '80%',
              // marginBottom: scalableheight.two,
            }}>
            Getting Started
          </Text>

          <Text
            style={{
              color: '#29262A',
              fontSize: fontSize.fourteen,
              fontFamily: 'Rubik-Regular',
              textAlign: 'center',
              width: '80%',
              // marginBottom: scalableheight.two,
            }}>
            Your Favourite Food Delivered to you
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              width: '100%',
              position: 'relative',
              marginVertical: scalableheight.pointfive,
            }}>
            <View style={{width: scalableheight.four, alignItems: 'center'}}>
              <Entypo
                name="dot-single"
                color={'rgba(245, 80, 80, 0.5)'}
                size={scalableheight.six}
              />
            </View>
            <View style={{width: scalableheight.four}}>
              <Entypo
                name="dot-single"
                color={'rgba(245, 80, 80, 0.5)'}
                size={scalableheight.six}
              />
            </View>
            <View style={{width: scalableheight.four}}>
              <Entypo
                name="dot-single"
                color={'#E14E4E'}
                size={scalableheight.six}
              />
            </View>
          </View>
          <View style={{width: '100%', padding: scalableheight.three}}>
            <MYButton
               color={'#E14E4E'}
              title="PROCEED"
              textcolor={'white'}
              onPress={() => {props.navigation.replace('Drawernavigator')}}
            />
          </View>
        </View>
      </ImageBackground>
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
    width: scalableheight.twenty,
    // height: scalableheight.ten,
    resizeMode: 'contain',
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF1F3',
    height: scalableheight.twentyseven,
    // height: scalableheight.thirtyfive,
  },
});
export default GetStartedstepthree;
