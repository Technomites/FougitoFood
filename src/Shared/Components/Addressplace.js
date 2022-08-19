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
  console.log(props?.onPress);
  console.log(props?.data);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: scalableheight.one, 
      }}>
      <View
        style={{
          backgroundColor:
            props?.data?.title === props?.selection?.title
              ? 'rgba(245, 80, 80, 0.2)'
              : '#F9F9F9',
          borderRadius: scalableheight.one,
          width: scalableheight.six,
          height: scalableheight.six,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5
          style={{alignSelf: 'center'}}
          name={props?.data.icon}
          color={
            props?.data?.title === props?.selection?.title ? '#F55050' : 'rgba(17, 17, 17, 0.1)'
          }
          size={fontSize.twentysix}
        />
      </View>
      <View style={{marginHorizontal: scalableheight.onepointfive}}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.fifteen,
            color:
            props?.data?.title === props?.selection?.title
                ? 'rgba(73, 69, 75, 1)'
                : 'rgba(73, 69, 75, 0.5))',
          }}>
          {props?.data?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
