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

const GettingStarted = props => {
  const {Lang} = useSelector(state => state.userReducer);

  useEffect(() => {
    //  StatusBar.setHidden(false);
    // StatusBar.setBackgroundColor('#363431');
    // StatusBar.setBarStyle("dark-content")
    // hideNavigationBar()
    // changeNavigationBarColor("white");
  }, []);
  const [count, setcount] = useState(0);
  const [animationstate, setanimationstate] = useState(true);

  const [getstarted, SetGetstarted] = useState([
    {
      image: require('../Resources/images/GetstartedS1.png'),
      caption: '5 Star Restaurants at your finger tips',
      buttontitle: 'NEXT',
      buttontitle2: true,

      press2: () => {
        setcount(2);
      },
    },
    {
      image: require('../Resources/images/GetstartedS2.png'),
      caption: 'Why go out when you can have food delivered to your doorstep',
      buttontitle: 'NEXT',
      buttontitle2: true,

      press2: () => {
        setcount(2);
      },
    },
    {
      image: require('../Resources/images/GetstartedS3.png'),
      caption: 'Your Favourite Food Delivered to you',
      buttontitle: 'PROCEED',
      buttontitle2: false,
    },
  ]);

  return (
    <ImageBackground
      resizeMode="cover"
      source={getstarted[count]?.image}
      style={styleSheet.BackgroundImage}>
      <Animatable.View
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
              fontFamily: 'Inter, Extra Bold',
              textAlign: 'center',
              width: '80%',
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
                  : props.navigation.replace('Drawernavigator');
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
      </Animatable.View>
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
