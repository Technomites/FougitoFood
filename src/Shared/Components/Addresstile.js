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

export default function Addresstile(props) {
  return (
    <View style={{...styles.shadow, ...styles.MainContainer}}>
      <View
        style={{
          ...styles.topViewContainer,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View style={{width: '5%'}}>
            <Image
              style={{
                position: 'absolute',
                bottom: 0,
                height: scalableheight.five,
                width: scalableheight.five,
              }}
              resizeMode={'contain'}
              source={props?.icon}
            />
          </View>
          <View
            style={{
              paddingLeft: scalableheight.five,
              justifyContent: 'flex-start',
              width: '95%',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.twelve,
                  color: '#29262A',
                }}>
                {props?.place}
              </Text>
              <TouchableOpacity onPress={props.onPress} activeOpacity={0.9}>
                <Entypo
                  style={{alignSelf: 'center'}}
                  name="edit"
                  color={'rgba(41, 38, 42, 0.5)'}
                  size={fontSize.fifteen}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: fontSize.thirteen,
                color: '#636363',
              }}>
              {props?.address}
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: 'Rubik-MediumItalic',
                  fontSize: fontSize.twelve,
                  color: '#636363',
                  textAlign: 'right',
                }}>
                {'Note to rider'}
              </Text>
              <Text
                style={{
                  fontFamily: 'Rubik-Italic',
                  fontSize: fontSize.eleven,
                  color: '#636363',
                }}>
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
    padding: scalableheight.two,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3,
    
    backgroundColor:"white"
  },
});
