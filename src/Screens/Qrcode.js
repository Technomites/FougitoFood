import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
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
import Faqtitle from '../Shared/Components/Faqtitle';
import {RNCamera} from 'react-native-camera';
const Qrcode = ({navigation, drawerAnimationStyle}) => {
  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={'Scan QR Code'} />
        <View style={styles.container}>
          {/* <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}
          /> */}
          {/* <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={{}} style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View> */}
        </View>
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
  container: {
    height: scalableheight.six,
    backgroundColor: 'rgba(42, 28, 28, 0.1)',
    width: '100%',
    flexDirection: 'row',
    borderRadius: fontSize.eight,
    marginBottom: scalableheight.one,
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
});
export default Qrcode;
