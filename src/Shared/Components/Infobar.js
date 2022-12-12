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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function Infobar(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styleSheet.maincontainer}>
      <View style={styleSheet.innermaincontainer}>
        <View style={styleSheet.innermostmaincontainer}>
          <MaterialIcons
            name="location-pin"
            color={'#F55050'}
            size={fontSize.thirtythree}
          />
        </View>
      </View>

      <View style={styleSheet.secondview}>
        <Text style={styleSheet.text1}>{props.Heading}</Text>
        <Text style={styleSheet.text2} numberOfLines={1}>
          {props.Details}
        </Text>
      </View>

      <TouchableOpacity onPress={props.onPress} style={styleSheet.touchview}>
        <MaterialIcons
          name="edit"
          color={'rgba(128, 128,128, 0.9)'}
          size={fontSize.twentyeight}
        />
      </TouchableOpacity>
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
    elevation: 3,
  },
  maincontainer: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    flexDirection: 'row',
    width: '100%',
    height: scalableheight.eight,
    backgroundColor: 'white',
    borderRadius: fontSize.borderradiusmedium,
  },
  innermaincontainer: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innermostmaincontainer: {
    height: scalableheight.six,
    width: scalableheight.six,
    backgroundColor: 'rgba(211,211,211, 0.3)',
    borderRadius: fontSize.borderradiusmedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondview: {height: '100%', width: '60%', justifyContent: 'center'},
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: '#29262A',
  },
  text2: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.ten,
    color: '#29262A',
    opacity: 0.4,
  },
  touchview: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
