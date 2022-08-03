import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';

import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Favourites(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={{
        ...styleSheet.shadow,
        height: scalableheight.fifteen,
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scalableheight.one,
        borderRadius: fontSize.eleven,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: '100%',
          width: '60%',
          justifyContent: 'center',
          padding: scalableheight.two,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name={'star'}
            color={'#E14E4E'}
            style={{}}
            size={fontSize.seventeen}
          />

          <Text
            style={{
              marginLeft: scalableheight.zeropointeight,
              fontFamily: 'Inter-SemiBold',
              fontSize: fontSize.twelve,
              color: '#111111',
              opacity: 0.8,
            }}>
            {props.reviews}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: fontSize.sixteen,
            color: '#111111',
            paddingVertical: scalableheight.pointfive,
          }}>
          {props.title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            name={'clockcircle'}
            color={'black'}
            style={{opacity: 0.2}}
            size={fontSize.thirteen}
          />
          <Text
            style={{
              marginLeft: scalableheight.one,
              fontFamily: 'Inter-SemiBold',
              fontSize: fontSize.eleven,
              color: '#111111',
              opacity: 0.4,
            }}>
            {props.time}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -scalableheight.zeropointnine,
          }}>
          <Entypo
            name={'location-pin'}
            color={'black'}
            style={{opacity: 0.2}}
            size={fontSize.twenty}
          />
          <Text
            style={{
              marginLeft: scalableheight.zeropointsix,

              fontFamily: 'Inter-SemiBold',
              fontSize: fontSize.eleven,
              color: '#111111',
              opacity: 0.4,
            }}>
            {props.distance}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '40%',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: scalableheight.one,
        }}>
        <Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: scalableheight.tweleve,
            borderRadius: fontSize.eleven,
          }}
          source={props.image}></Image>
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scalableheight.one,
  },

  text: {
    fontSize: 20,
  },
  icon: {
    position: 'absolute',
    left: '-1%',
  },
  videocall: {
    flexDirection: 'row',
    position: 'absolute',
    right: '-1%',
  },
  backButtonMain: {
    backgroundColor: '#F9F9F9',
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 3
  },
});
