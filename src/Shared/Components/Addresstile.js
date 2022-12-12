import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
export default function Addresstile(props) {
  const {Selectedcurrentaddress} = useSelector(state => state.userReducer);
  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          ...styles.topViewContainer,
        }}>
        <View style={styles.innerview}>
          <View style={styles.innerview3}>
            <View style={styles.innerview4}>
              {props?.icon == 'Home' ? (
                <FontAwesome5
                  style={styles.iconstyle}
                  name={'home'}
                  color={
                    (props?.Latitude == Selectedcurrentaddress[0]?.Latitude &&
                      props?.Longitude ==
                        Selectedcurrentaddress[0]?.Longitude &&
                      props.screenname == 'ckeckout') ||
                    props.screenname != 'ckeckout'
                      ? '#F55050'
                      : 'grey'
                  }
                  size={fontSize.twenty}
                />
              ) : props?.icon == 'Work' ? (
                <FontAwesome5
                  style={styles.iconstyle}
                  name={'briefcase'}
                  color={
                    (props?.Latitude == Selectedcurrentaddress[0]?.Latitude &&
                      props?.Longitude ==
                        Selectedcurrentaddress[0]?.Longitude &&
                      props.screenname == 'ckeckout') ||
                    props.screenname != 'ckeckout'
                      ? '#F55050'
                      : 'grey'
                  }
                  size={fontSize.twenty}
                />
              ) : (
                <FontAwesome5
                  style={styles.iconstyle}
                  name={'building'}
                  color={
                    (props?.Latitude == Selectedcurrentaddress[0]?.Latitude &&
                      props?.Longitude ==
                        Selectedcurrentaddress[0]?.Longitude &&
                      props.screenname == 'ckeckout') ||
                    props.screenname != 'ckeckout'
                      ? '#F55050'
                      : 'grey'
                  }
                  size={fontSize.twenty}
                />
              )}
              {/* <Image
          resizeMode="stretch"
          style={{
            width: scalableheight.five,
            height: scalableheight.tweleve,
            borderRadius: fontSize.eleven,
          }}
          source={props?.icon}></Image> */}
            </View>
          </View>
          <View style={styles.innerview7}>
            <View style={styles.innerview8}>
              <Text style={styles.text1}>{props?.place}</Text>

              {props?.Latitude == Selectedcurrentaddress[0]?.Latitude &&
                props?.Longitude == Selectedcurrentaddress[0]?.Longitude && (
                  // <TouchableOpacity onPress={props.onPress} activeOpacity={0.9}>
                  <AntDesign
                    style={styles.iconstyle}
                    name="checkcircle"
                    color={'#F55050'}
                    // color={'rgba(41, 38, 42, 0.5)'}
                    size={fontSize.fifteen}
                  />
                  // </TouchableOpacity>
                )}
            </View>
            <Text numberOfLines={2} style={styles.text3}>
              {props?.address}
            </Text>
            <View>
              <Text style={styles.text4}>{'Note to rider'}</Text>
              <Text numberOfLines={1} style={styles.text5}>
                {props?.note}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    borderRadius: fontSize.eleven,
    padding: scalableheight.one,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    // shadowColor: '#470000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.2,
    // elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)',

    backgroundColor: 'white',
  },
  innerview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerview3: {width: '5%', alignSelf: 'flex-start'},
  innerview4: {
    height: scalableheight.six,
    width: scalableheight.six,
    backgroundColor: '#F9F9F9',
    borderRadius: fontSize.borderradiusmedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconstyle: {alignSelf: 'center'},
  innerview7: {
    paddingLeft: scalableheight.five,
    justifyContent: 'flex-start',
    width: '95%',
  },
  innerview8: {flexDirection: 'row', justifyContent: 'space-between'},
  text1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.twelve,
    color: '#29262A',
  },
  text3: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.thirteen,
    color: '#636363',
  },
  text4: {
    fontFamily: 'Rubik-MediumItalic',
    fontSize: fontSize.twelve,
    color: '#636363',
    textAlign: 'right',
  },
  text5: {
    fontFamily: 'Rubik-Italic',
    fontSize: fontSize.eleven,
    color: '#636363',
  },
});
