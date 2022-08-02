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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function Addressplace(props) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: scalableheight.one,
      }}>
      <View
        style={{
          backgroundColor: 'rgba(42, 28, 28, 0.1)',
          borderRadius: scalableheight.one,
          width: scalableheight.six,
          height: scalableheight.six,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5
          style={{alignSelf: 'center'}}
          name={props?.data.icon}
          color={'rgba(41, 38, 42, 0.5)'}
          size={fontSize.twentysix}
        />
      </View>
      <View style={{marginHorizontal: scalableheight.onepointfive}}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.fifteen,
            color: '#49454B',
          }}>
          {props?.data?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
