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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function PlainHeader3(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function goback() {
    navigation.goBack();
  }
  return (
    <View style={styleSheet.header}>
      <View style={styleSheet.containerview}>
        <TouchableOpacity onPress={goback} style={styleSheet.innerview}>
          {/* <View style={styleSheet.backButtonMain}> */}
          <AntDesign
            style={styleSheet.alignselfcenter}
            name="arrowleft"
            color={'black'}
            size={fontSize.twentyfour}
          />
          {/* </View> */}
        </TouchableOpacity>

        <Text style={styleSheet.text1}>{props.title}</Text>
        <View style={styleSheet.flexdirectionrow}>
          <TouchableOpacity style={styleSheet.touchableview}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  touchableview: {
    height: scalableheight.seven,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexdirectionrow: {flexDirection: 'row'},
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(246, 246, 246, 1)',
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
  containerview: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerview: {
    height: scalableheight.seven,
    width: scalableheight.five,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignselfcenter: {alignSelf: 'center'},
  text1: {
    color: 'black',
    fontSize: fontSize.seventeen,
    fontFamily: 'Inter-SemiBold',
  },
});
