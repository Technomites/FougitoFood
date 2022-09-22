import React, {useState, useEffect} from 'react';
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
import * as Animatable from 'react-native-animatable';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {parseWithOptions} from 'date-fns/fp';
import {filteredcatdata, storecartprice} from '../../Actions/actions';
export default function ItemDetailsStatus(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showcounter, setshowcounter] = useState(false);
  const [animationstate, setanimationstate] = useState(true);

  const {cartdata, price} = useSelector(state => state.userReducer);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('search hit ');
      setshowcounter(false);
      setanimationstate(true);

      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [cartdata, showcounter]);

  return (
    <View
      style={{
        ...styleSheet.shadow,
        height: scalableheight.nine,
        width: '99%',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: fontSize.eleven,
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: '100%',
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: scalableheight.five,
            width: scalableheight.five,
            backgroundColor: '#F9F9F9',
            borderRadius: fontSize.borderradiusmedium,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.fourteen,
              color: '#111111',
            }}>
            {props.qty}
          </Text>
        </View>
      </View>
      <View style={{}}>
          <Image
            resizeMode="stretch"
            style={{
              width: scalableheight.six,
              height: scalableheight.six,
              borderRadius: fontSize.eleven,
            }}
            source={{uri: props.image}}
          />
        </View>
      <TouchableOpacity
        // activeOpacity={1}
        // onPress={props.onPress}
        disabled={true}
        style={{
          overflow: 'hidden',
          height: '100%',
          width: '40%',
          justifyContent: 'center',
          padding: scalableheight.one,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
     
        <View style={{marginLeft: scalableheight.one, width: '70%'}}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: fontSize.twelve,
              color: '#111111',
            }}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: '100%',
          width: '30%',
          justifyContent: 'center',
          padding: scalableheight.two,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: fontSize.twelve,
            color: '#111111',
          }}>
          {'AED '}
          {props.price}
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
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});
