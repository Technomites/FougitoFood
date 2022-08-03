import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
AntDesign;
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function AccountInfotile(props) {
  console.log(props?.onPress);
  console.log(props?.data);
  return (
    <View>
      <TouchableOpacity onPress={props?.data.onPress}
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          // alignContent: 'center',
          marginVertical: scalableheight.one,
        }}>
        <View
          style={{
            backgroundColor: '#EFF1F3',
            borderRadius: scalableheight.one,
            width: scalableheight.six,
            height: scalableheight.six,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignSelf: 'center'}}>
            {props?.data.type === 1 ? (
              <Ionicons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 2 ? (
              <Feather
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 3 ? (
              <MaterialCommunityIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 4 ? (
              <AntDesign
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 5 ? (
              <MaterialCommunityIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 6 ? (
              <AntDesign
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : props?.data.type === 8 ? (
              <MaterialIcons
                name={props?.data.icon}
                color={'#E14E4E'}
                size={fontSize.twentysix}
              />
            ) : null}
          </View>
        </View>

        <View
          style={{
            marginHorizontal: scalableheight.onepointfive,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.fifteen,
            }}>
            {props?.data.title}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'rgba(112, 112, 112, 0.15)',
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
