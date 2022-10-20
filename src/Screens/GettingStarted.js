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

// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {fontSize, scalableheight} from '../Utilities/fonts';
import NetInfo from '@react-native-community/netinfo';
// import AuthButton from '../Shared/Components/AuthButton';
import * as Animatable from 'react-native-animatable';
import MYButton from '../Shared/Components/MYButton';
import {useSelector, useDispatch} from 'react-redux';
import renderIf from 'render-if';

// import Modal from "react-native-modal";
import {storetoken, storetokenrefresh, refreshmytoken, isconnected, storecartdata, storerestrauntid, storecartprice} from '../Actions/actions';

const GettingStarted = props => {
  const {refreshtokendata, AuthToken} = useSelector(state => state.userReducer);

  const [count, setcount] = useState(0);
  const [animationstate, setanimationstate] = useState(true);

  const [getstarted, SetGetstarted] = useState([
    {
      image: require('../Resources/images/GetstartedS1.png'),
      caption: 'One thousand flavors in one place',
      buttontitle: 'NEXT',
      buttontitle2: true,

      press2: () => {
        setcount(2);
      },
    },
    {
      image: require('../Resources/images/GetstartedS2.png'),
      caption: 'Your favorite eateries one click away',
      buttontitle: 'NEXT',
      buttontitle2: true,

      press2: () => {
        setcount(2);
      },
    },
    {
      image: require('../Resources/images/GetstartedS3.png'),
      caption: 'Live longer with fresh food',
      buttontitle: 'PROCEED',
      buttontitle2: false,
    },
  ]);



  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);



  return (
    <ImageBackground
      resizeMode="cover"
      source={getstarted[count]?.image}
      style={styleSheet.BackgroundImage}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      {/* <Animatable.View
        animation={animationstate ? 'bounceInRight' : undefined}
        onAnimationEnd={() => {
          setanimationstate(false);
        }}
        // animation={ getstart1  ? 'bounceInRight' :  getstart2  ? 'bounceInRight':  getstart3 ? 'bounceInRight' : undefined}
        //animation="bounceInRight"
        easing="ease"
        // iterationCount="infinite"
        iterationCount={1}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: scalableheight.two,
          justifyContent: 'flex-start',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}> */}
           <View
       
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: scalableheight.two,
          justifyContent: 'flex-start',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
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
              fontFamily: 'Inter-ExtraBold',
              textAlign: 'center',
              width: '80%',
              paddingBottom:scalableheight.one
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
            {getstarted[count]?.caption}
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
            {getstarted.map((item, index) => {
              return (
                <Entypo
                key={index.toString()}
           
                  style={{margin: -15}}
                  name="dot-single"
                  color={index === count ? '#E14E4E' : 'rgba(245, 80, 80, 0.5)'}
                  size={scalableheight.six}
                />
              );
            })}
          </View>

          <View style={{width: '100%', padding: scalableheight.three}}>
            <MYButton
              color={'#E14E4E'}
              title={getstarted[count]?.buttontitle}
              textcolor={'white'}
              onPress={() => {
                setanimationstate(true);
                count < 2
                  ? setcount(count + 1)
                  : (
                     AsyncStorage.setItem(
                      'GettingStarted',
                      "Done",
                    ),
                    props.navigation.replace('Drawernavigator'))
                // getstarted[count]?.onPress
              }}
            />
            {getstarted[count]?.buttontitle2 ? (
              <MYButton
                title={'SKIP'}
                textcolor={'#000'}
                onPress={getstarted[count]?.press2}
              />
            ) : (
              <View
                style={{
                  width: '100%',

                  justifyContent: 'center',
                  alignItems: 'center',

                  height: scalableheight.seven,

                  borderRadius: fontSize.borderradiusmedium,

                  marginTop: '1%',
                  marginBottom: '1%',
                }}></View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
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
    height: '100%',
    // height: scalableheight.thirtyfive,
  },
});
export default GettingStarted;
