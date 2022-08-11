import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
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

import Animated from 'react-native-reanimated';
import PlainHeader from '../Shared/Components/PlainHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';

//import {RNCamera} from 'react-native-camera';
import {CameraScreen} from 'react-native-camera-kit';

const Qrcode = ({navigation, drawerAnimationStyle}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const onOpneScanner = () => {
    alert('hello');
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted

            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    // <Animated.View
    //   style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
    <View
      style={{
        alignSelf: 'center',
        paddingTop: getStatusBarHeight(),
        flex: 12,
      }}>
      <PlainHeader title={'Scan QR Code'} />
      <SafeAreaView style={{flex: 1}}>
        {opneScanner ? (
          <View style={{flex: 1, backgroundColor: 'red'}}>
            <CameraScreen
              // Barcode props
              scanBarcode={true}
              onReadCode={event =>{
                setQrvalue(event.nativeEvent.codeStringValue);
                console.log('QR code found' + event.nativeEvent.codeStringValue)
              }} // optional
              showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
              laserColor="red" // (default red) optional, color of laser in scanner frame
              frameColor="white" // (default white) optional, color of border of scanner frame
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Barcode and QR Code Scanner using Camera in React Native
            </Text>
            <Text style={styles.textStyle}>
              {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
            </Text>
            {qrvalue.includes('https://') ||
            qrvalue.includes('http://') ||
            qrvalue.includes('geo:') ? (
              <TouchableHighlight onPress={onOpenlink}>
                <Text style={styles.textLinkStyle}>
                  {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
                </Text>
              </TouchableHighlight>
            ) : null}
            <TouchableHighlight
              onPress={onOpneScanner}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
            </TouchableHighlight>
          </View>
        )}
      </SafeAreaView>
    </View>
    // </Animated.View>
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
  // container: {
  //   height: scalableheight.six,
  //   backgroundColor: 'rgba(42, 28, 28, 0.1)',
  //   width: '100%',
  //   flexDirection: 'row',
  //   borderRadius: fontSize.eight,
  //   marginBottom: scalableheight.one,
  // },
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
