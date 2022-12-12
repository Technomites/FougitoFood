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
export default function BranchListed(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={styleSheet.branchcontainer}>
      <View style={styleSheet.innerbranchview}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={styleSheet.imageview}
          source={props?.image ? {uri: props.image} : null}></Image>
      </View>
      <View style={styleSheet.innercontainer}>
        <Text numberOfLines={1} style={styleSheet.text1}>
          {props.title}
        </Text>
        <Text numberOfLines={2} style={styleSheet.text2}>
          {props.Address}
        </Text>
        {/* 
        image={inneritem.Restaurant?.Logo}
                        title={inneritem?.NameAsPerTradeLicense}
                        Address={inneritem?.Address} */}
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = StyleSheet.create({
  innercontainer: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    padding: scalableheight.one,
  },
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
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  branchcontainer: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    height: scalableheight.eleven,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalableheight.pointfive,
    marginTop: scalableheight.one,
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  innerbranchview: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scalableheight.one,
  },
  imageview: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.eleven,
    // borderWidth: 1,
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: '#111111',
  },
  text2: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.eleven,
    color: '#111111',
  },
});
