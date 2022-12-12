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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
export default function Starters(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={styleSheet.starterscontainer}>
      <View style={styleSheet.innerview}>
        <Text numberOfLines={1} style={styleSheet.text1}>
          {props.title}
        </Text>
        <Text numberOfLines={2} style={styleSheet.text2}>
          {props.description.trim()}
        </Text>

        {props?.price > 0 && (
          <Text style={styleSheet.text3}>
            {'AED '}
            {props?.price?.toFixed(2)}
          </Text>
        )}
      </View>
      <View style={styleSheet.innerview2}>
        {props.image != '' && props.image != 'NULL' && props.image != null ? (
          <>
            <Image
              resizeMode="cover"
              style={styleSheet.imageview}
              // source={{uri: props.image}}></Image>
              source={require('../../Resources/images/Broken_Image.png')}></Image>
            <FastImage
              style={styleSheet.fastimageview}
              source={{
                uri: props.image,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </>
        ) : (
          <Image
            resizeMode="cover"
            style={styleSheet.imageview2}
            // source={{uri: props.image}}></Image>
            source={require('../../Resources/images/Broken_Image.png')}></Image>
        )}

        <View style={styleSheet.iconview2}>
          <Entypo
            name="plus"
            color={'white'}
            size={fontSize.seven}
            style={{}}
          />
        </View>
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
    elevation: 0.5,
    borderWidth: scalableheight.borderTopWidth,
    borderColor: 'rgba(211,211,211, 0.6)',
  },
  starterscontainer: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    height: scalableheight.fourteen,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalableheight.one,
    borderRadius: fontSize.borderradius,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  innerview: {
    height: '100%',
    width: '75%',
    justifyContent: 'center',
    padding: scalableheight.two,
  },
  text1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
    color: '#111111',
  },
  text2: {
    fontFamily: 'Inter-Light',
    fontSize: fontSize.thirteen,
    color: '#636363',
  },
  text3: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    color: '#111111',
    marginTop: scalableheight.pointfive,
  },
  innerview2: {
    height: '100%',
    width: '25%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: scalableheight.one,
  },
  imageview: {
    position: 'absolute',
    width: scalableheight.ten,
    height: scalableheight.ten,
    borderRadius: fontSize.borderradius,
    right: scalableheight.one,
    //
  },
  fastimageview: {
    width: scalableheight.ten,
    height: scalableheight.ten,
    borderRadius: fontSize.borderradius,
  },
  imageview2: {
    width: scalableheight.ten,
    height: scalableheight.ten,
    borderRadius: fontSize.borderradius,
    //
  },
  iconview2: {
    width: scalableheight.three,
    height: scalableheight.three,
    backgroundColor: '#E14E4E',
    position: 'absolute',
    bottom: scalableheight.onepointeightfive,
    right: scalableheight.one,
    borderBottomRightRadius: fontSize.borderradius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
