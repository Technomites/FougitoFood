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
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function HeaderComponent(props) {
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
          <View style={styleSheet.backButtonMain}>
            <Ionicons
              style={{alignSelf: 'center'}}
              name="chevron-back"
              // color={"black"}
              size={fontSize.twenty}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: 'black',
            fontSize: fontSize.twenty,
            fontFamily: 'Rubik-Medium',
          }}>
          {props.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {/* {props.notification &&  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{
              height: scalableheight.seven,
              width: scalableheight.five,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Fontisto
              name="bell"
              color={'#B10071'}
              size={fontSize.twentythree}
            />
          </TouchableOpacity>
          {/* } */}
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
});
