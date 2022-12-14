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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

export default function Categoriescard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {}}
      style={styleSheet.cardcontainer}>
      {/* <ImageBackground
        borderRadius={scalableheight.one}
        resizeMode="cover"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: scalableheight.one,
        }}
        source={  props.image ? {uri: props.image} : null}> */}

      <ImageBackground
        borderRadius={scalableheight.one}
        resizeMode="cover"
        style={styleSheet.backgroundimageview}
        source={require('../../Resources/images/Rectangle.png')}>
        <View style={styleSheet.backgroundimageinnerview}>
          <Text style={styleSheet.text1}>{props.type}</Text>
          <Text style={styleSheet.text2}>
            {'Avg Price AED '} {props?.price?.toFixed(2)}
          </Text>
        </View>
      </ImageBackground>
      <FastImage
        style={styleSheet.imagecontainer}
        source={{
          uri: props.image ? props.image : null,
          // headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {/* // </ImageBackground>  */}
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
    elevation: 2,
  },
  cardcontainer: {
    height: scalableheight.tweleve,
    width: scalableheight.thirtytwo,
    marginRight: scalableheight.one,
    borderRadius: scalableheight.one,
    overflow: 'hidden',
  },
  backgroundimageview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    zIndex: 5,
    elevation: 5,

    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  backgroundimageinnerview: {position: 'absolute', bottom: scalableheight.two},
  text1: {
    paddingLeft: scalableheight.two,
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: 'white',
  },
  text2: {
    paddingLeft: scalableheight.two,
    fontFamily: 'Inter-medium',
    fontSize: fontSize.twelve,
    color: 'white',
    opacity: 0.8,
  },
  imagecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scalableheight.one,

    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
