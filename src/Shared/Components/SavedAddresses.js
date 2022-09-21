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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';

import AntDesign from 'react-native-vector-icons/AntDesign';
export default function SavedAddresses(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {AuthToken, alladdresses, Selectedcurrentaddress} = useSelector(state => state.userReducer);

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderRadius: fontSize.borderradiusmedium,
        backgroundColor: Selectedcurrentaddress[0]?.Latitude == props.Latitude &&  Selectedcurrentaddress[0]?.Longitude == props.Longitude ? 'rgba(245, 80, 80, 0.3)' : null,
        borderColor: 'rgba(211,211,211, 0.5)',
        paddingVertical: scalableheight.one,
        borderWidth: Selectedcurrentaddress[0]?.Latitude == props.Latitude &&  Selectedcurrentaddress[0]?.Longitude == props.Longitude ? 1 : 0 , 
        paddingHorizontal: scalableheight.one
      }}>
      <View style={{justifyContent: 'center'}}>
        {/* <FontAwesome
          name={'home'}
          color={'#F55050'}
          size={fontSize.twentyfour}
        /> */}
        {props?.icon == 'Home' ? (
          <FontAwesome5
            style={{alignSelf: 'center'}}
            name={'home'}
            color={'#F55050'}
            size={fontSize.twenty}
          />
        ) : props?.icon == 'Work' ? (
          <FontAwesome5
            style={{alignSelf: 'center'}}
            name={'briefcase'}
            color={'#F55050'}
            size={fontSize.twenty}
          />
        ) : (
          <FontAwesome5
            style={{alignSelf: 'center'}}
            name={'building'}
            color={'#F55050'}
            size={fontSize.twenty}
          />
        )}
      </View>
      <View style={{marginLeft: scalableheight.two}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Inter-SemiBold',
            fontSize: fontSize.sixteen,
          }}>
          {props.title}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: 'black',
            fontFamily: 'Inter-Regular',
            opacity: 0.5,
            fontSize: fontSize.fourteen,
          }}>
          {props.address}
        </Text>
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
