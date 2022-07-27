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
  Vibration,
  
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {seticonfocus} from '../../Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function BottomTab() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {Lang, HomeIcon, BookingIcon, SettingIcon, ProfileInfo} = useSelector(
    state => state.userReducer,
  );

  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 8,
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',   borderBottomLeftRadius:10, borderBottomRightRadius:10,
     paddingBottom: Platform.OS === 'ios' ? scalableheight.onepointfive : null

      }}>
      <TouchableOpacity
        onPress={() => {
          dispatch(seticonfocus('home'));
          Vibration.vibrate(70);
          navigation.navigate('Home');
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <FontAwesome5
          name="home"
          color={HomeIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)'}
          size={HomeIcon == 'true' ? fontSize.twentyfour : fontSize.eightteen}
        />
        <Text
          style={{
            color: HomeIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)',
            fontSize: fontSize.twelve,
          }}>
          {Lang == 'en' ? 'Home' : 'مسكن'}
        </Text>
      </TouchableOpacity>
      {ProfileInfo != "" ?
      <TouchableOpacity
        onPress={() => {
          dispatch(seticonfocus('booking'));
          Vibration.vibrate(70);
          navigation.navigate('MyBookings');
        }}
        style={{
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="calendar"
          color={BookingIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)'}
          size={BookingIcon == 'true' ? fontSize.twentyfour : fontSize.eightteen}
        />
        <Text
          style={{
            color: BookingIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)',
            fontSize: fontSize.twelve,
          }}>
          {Lang == 'en' ? 'Bookings' : 'الحجوزات'}
        </Text>
      </TouchableOpacity> : null}
      <TouchableOpacity
        onPress={() => {
          dispatch(seticonfocus('setting'));
          Vibration.vibrate(70);
          navigation.navigate('Settings');
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <FontAwesome5
          name="cogs"
          color={SettingIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)'}
          size={SettingIcon == 'true' ? fontSize.twentyfour : fontSize.eightteen}
        />
        <Text
          style={{
            color: SettingIcon == 'true' ? '#8F7B62' : 'rgba(0,0,0, 0.4)',
            fontSize: fontSize.twelve,
          }}>
          {Lang == 'en' ? 'Settings' : 'إعدادات'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
});
