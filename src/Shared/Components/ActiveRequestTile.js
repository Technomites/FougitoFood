import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import {fontSize, scalableheight} from '../../Utilities/fonts';
import moment from 'moment';
import {height} from 'react-native-dimension';
export default function ActiveRequestTile(props) {
  console.log(props?.deatils);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={{
        ...style.shadow,
        ...style.MainContainer,
      }}>
      <View
        style={{
          ...style.topViewContainer,
        }}>
        <View style={{}}>
          <Image
            source={require('../../Resources/images/food.png')}
            style={{
              height: scalableheight.ten,
              width: scalableheight.ten,
              resizeMode: 'cover',
              borderRadius: fontSize.eight,
            }}
          />
        </View>
        <View style={{paddingHorizontal: scalableheight.two}}>
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.sixteen,
                color: '#E14E4E',
              }}>
              {/* <SubHeading
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: 13,
              color: Color.btnBgColor,
            }}
            text={'ORDER# ' + props.deatils?.OrderNo}
          /> */}
              {'ORDER# ' + props?.deatils?.OrderNo}
              {/* ORDER# 0000 */}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.sixteen,
                color: '#000',
              }}>
              {/* <SubHeading
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: 13,
              color: Color.btnBgColor,
            }}
            text={'ORDER# ' + props.deatils?.OrderNo}
          /> */}
              {props?.deatils?.Restaurant}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.eleven,
                color: '#707070',
              }}>
              {/* {moment(props.deatils?.timmings).format(
              'dddd, MMMM Do YYYY, h:mm:ss a',
            )} */}
              {props.deatils?.timmings}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#707070',
          borderBottomWidth: scalableheight.borderwidth,
          margin: scalableheight.two,
          opacity: 0.2,
        }}></View>
      <View
        style={{flexDirection: 'row', marginHorizontal: scalableheight.two}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* <SubHeading
          style={{
            fontFamily: 'Inter-SemiBold',
            fontSize: 14,
            color: Color.otptextColor,
          }}
          text={'Status'}
        /> */}
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.fourteen,
                color: '#707070',
              }}>
              {'AED ' + props.deatils?.Amount}
            </Text>
          </View>

          {/* {
        props.status? <SubHeading
          style={{
            fontFamily: 'Inter-SemiBold',
            fontSize: 12,
            color: Color.normaltextColor,
          }}
          text={props.status}
        />: <SubHeading
        style={{
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
          color: Color.normaltextColor,
        }}
        text={
          props.deatils?.Status === 'FoodReady'
            ? 'Ready for Pickup'
            : 'Picked Up'
        }
      />
       } */}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: fontSize.sixteen,
              color: '#E14E4E',
            }}>
            {props?.deatils.OrderStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
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
  elevation: 2
  },

  // modalView: {
  //   backgroundColor: '#FFF',
  //   borderRadius: 6,
  //   padding: 16,
  //   shadowColor: '#29262A',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  //   width: '100%',
  // },
});
