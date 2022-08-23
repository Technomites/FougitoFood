import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Dimensions,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import TransparentHeader from '../Shared/Components/TransparentHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Favourites from '../Shared/Components/Favourites';

import {CameraScreen} from 'react-native-camera-kit';

const Qrcode = ({navigation, drawerAnimationStyle}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [camscanner, setCamScanner] = useState(false);
  const [scanpermission, setScanPermission] = useState(true);
  const [animationstate, setanimationstate] = useState(false);
  const [animationtype, setanimationtype] = useState("fadeInUpBig");

  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('hehhehehehh');
      setCamScanner(false);
      setTimeout(async () => {
        setCamScanner(true);
      }, 500);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Animated.View style={{flex: 1, ...drawerAnimationStyle}}>
      <View
        style={{
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#000',
        }}>
                
        <View style={{position: 'absolute', top: getStatusBarHeight()}}>
          <TransparentHeader
            title={'Scan QR Code'}
            refresh={qrvalue}
            onpress={() => {
              setScanPermission(true);
              setQrvalue('');
            }}
          />
        </View>
        {camscanner && (
          <CameraScreen
            scanBarcode={scanpermission}
            onReadCode={event => {
              setQrvalue(event.nativeEvent.codeStringValue),
                setScanPermission(false);
                setanimationstate(true)
            }}
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="red" // (default red) optional, color of laser in scanner frame
            frameColor="#962E2B" // (default white) optional, color of border of scanner frame
          />
        )}
{animationstate &&
<Animatable.View
        
         
        animation={animationstate && qrvalue != "" ? "fadeInUpBig" : animationstate && qrvalue == "" ? "fadeOutDownBig" : null}
        onAnimationEnd={() => {
          // setanimationstate(false);
        
      
          // if(animationtype == "fadeInUpBig"){
          //   setanimationtype("fadeOutDownBig")
          // //  setlogoutmodal(false)
          
          // }else{
          //   setanimationtype("fadeInUpBig")
       
          // }
         
        
        }}
        easing="ease"
        iterationCount={1}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: scalableheight.three,

            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
bottom: scalableheight.three,
            elevation: 100000,
            zIndex: 1000000,
          }}>
          <Favourites
            image={require('../Resources/images/food.jpg')}
            title={'Mexican Enchiladas'}
            reviews={'8.9 (350 reviews)'}
            time={'9:00 AM - 10:00PM'}
            onPress={() => {
              navigation.navigate('Restaurantpage');
              setQrvalue('');
              setScanPermission(true);
            }}
            distance={'2.5KM AWAY'}
          />
        </View>
      </Animatable.View>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: '#e8e8e8',
  },

  textInput: {
    marginLeft: scalableheight.one,
    width: '100%',
    color: 'black',
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
export default Qrcode;
