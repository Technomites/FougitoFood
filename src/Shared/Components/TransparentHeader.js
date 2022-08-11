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
import Fontisto from 'react-native-vector-icons/Fontisto';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function TransparentHeader(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styleSheet.header}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Home")
            navigation.goBack();
          }}
          style={{
            height: scalableheight.seven,
            width: scalableheight.five,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View style={styleSheet.backButtonMain}> */}
          <AntDesign
            style={{alignSelf: 'center'}}
            name="arrowleft"
            color={'white'}
            size={fontSize.twentyfour}
          />
          {/* </View> */}
        </TouchableOpacity>

        <Text
          style={{
            color: 'white',
            fontSize: fontSize.twenty,
            fontFamily: 'Inter-SemiBold',
          }}>
          {props.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {props?.refresh != '' && (
            <TouchableOpacity
              onPress={props.onpress}
              style={{
                height: scalableheight.seven,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Fontisto
                style={{alignSelf: 'center'}}
                name="spinner-refresh"
                color={'white'}
                size={fontSize.twentyfour}
              />
            </TouchableOpacity>
          )}
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
    backgroundColor: 'transparent',
    paddingHorizontal: scalableheight.one,
    elevation: 100000,
    zIndex: 1000000,
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
});