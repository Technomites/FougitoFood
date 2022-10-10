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
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import {format} from 'date-fns';
import moment from 'moment';

export default function Couponscomponent(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styleSheet.shadow,
        ...styleSheet.MainContainer,
        width: '100%',
        height: Dimensions.get('window').height / 8,
        borderRadius: fontSize.borderradiusmedium,
        padding: scalableheight.pointfive,
      }}>
      <View style={{height: '100%', width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            height: '100%',
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth:1, borderColor:"red"
          }}>
          <View
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: fontSize.borderradiusmedium,
            }}>
            <FontAwesome5
              name="tags"
              size={fontSize.twenty}
              color={'#F55050'}
            />
          </View>
        </View>
        <View style={{height: '100%', width: '50%', justifyContent: 'center', 
        // borderWidth:1, borderColor:"blue"
        }}>
          <Text
              numberOfLines={1}
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.eleven,
              color: '#F55050',
            }}>
            {props.sale}
          </Text>
          <Text
          numberOfLines={1}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.sixteen,
              color: 'black',
            }}>
            {props.title}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.twelve,
              color: '#636363',
            }}>
          {props.Name}
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '30%',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingHorizontal:scalableheight.one
            // borderWidth:1, borderColor:"red"
          }}>
         <Text
         numberOfLines={1}
          style={{
            // position: 'absolute',
            // right: scalableheight.one,
            // top: scalableheight.one,
            fontFamily: 'Inter-Bold',
            fontSize: fontSize.twelve,
            color: '#F55050',
          }}>
          {props.daysleft <= 0 ? "Expired" : props.daysleft + ' days left'}
        </Text>
        <FontAwesome
              name="clipboard"
              size={fontSize.fifteen}
              color={'#F55050'}
            />
        </View>
       
      </View>
{/* 
      <View style={{height: '0%', width: '100%'}}>
        <View
          style={{
            borderTopWidth: 1,
            width: '90%',
            borderColor: '#707070',
            alignSelf: 'center',
            paddingVertical: scalableheight.one,
            position: 'absolute',
            top: scalableheight.pointfive,
            opacity: 0.6,
          }}></View>
        <View style={{width: '100%', padding: scalableheight.two}}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.ten,
              color: '#E14E4E',
            }}>
            T&C
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.ten,
              color: '#636363',
            }}>
            {props.tc}
          </Text>
        </View>
      </View> */}
    </View>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: fontSize.twenty,
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
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.ten,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: 'white',
  },
  topViewContainer: {
    paddingHorizontal: fontSize.eight,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});
