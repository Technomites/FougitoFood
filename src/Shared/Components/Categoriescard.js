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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Categoriescard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {}}
      style={{
        height: scalableheight.tweleve,
        width: scalableheight.thirtytwo,
      }}>
      <ImageBackground
        borderRadius={scalableheight.two}
        resizeMode="cover"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: scalableheight.one,
        }}
        source={ {uri: props.image}}>
        
        <ImageBackground
      borderRadius={scalableheight.two}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',

            // justifyContent: 'flex-end',
            // alignItems: 'center',
          }}
          source={require('../../Resources/images/Rectangle.png')}>
          <View style={{position: 'absolute', bottom: scalableheight.two}}>
            <Text
              style={{
                paddingLeft: scalableheight.two,
                fontFamily: 'Inter-Bold',
                fontSize: fontSize.sixteen,
                color: 'white',
              }}>
              {props.type}
            </Text>
            <Text
              style={{
                paddingLeft: scalableheight.two,
                fontFamily: 'Inter-medium',
                fontSize: fontSize.twelve,
                color: 'white',
                opacity: 0.6,
              }}>
              {'Avg Price AED '} {props.price.toFixed(2)}
            </Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
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
    elevation: 2,
  },
});
