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
export default function PlainHeader(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function navigatetoscreen() {
    // navigation.navigate("Home")
    if (props.previousscreen == 'checkout') {
      navigation.navigate('Drawernavigator');
    } else {
      navigation.goBack();
    }
  }
  return (
    <View style={styleSheet.header}>
      <View style={styleSheet.innerheadercontainer}>
        <TouchableOpacity
          onPress={navigatetoscreen}
          style={styleSheet.innerviewcontainer}>
          {/* <View style={styleSheet.backButtonMain}> */}
          <AntDesign
            style={{alignSelf: 'center'}}
            name="arrowleft"
            color={'black'}
            size={fontSize.twentyfour}
          />
          {/* </View> */}
        </TouchableOpacity>

        <Text style={styleSheet.text4}>{props.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleSheet.touchableview}></TouchableOpacity>
        </View>
      </View>
    </View>
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
    backgroundColor: '#F6F6F6',
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
  innerheadercontainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerviewcontainer: {
    height: scalableheight.seven,
    width: scalableheight.five,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text4: {
    color: 'black',
    fontSize: fontSize.seventeen,
    fontFamily: 'Inter-SemiBold',
  },
  touchableview: {
    height: scalableheight.seven,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
