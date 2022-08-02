import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  readallnotifications,
  addReadNotifications,
  clearNotificationCount,
  clearNotifications,
  getAllNotifications,
  GetNotifications,
  notificationCountHandle,
  readNotification,
  seticonfocus,
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Favourites from '../Shared/Components/Favourites';
import Addresstile from '../Shared/Components/Addresstile';
import MYButton from '../Shared/Components/MYButton';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';

import NetInfo from '@react-native-community/netinfo';
import {styles} from 'react-native-element-dropdown/src/components/TextInput/styles';

const MyAddresses = ({props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {notificationList, notificationCount} = useSelector(
    state => state.userReducer,
  );

  const [addresses, Setaddresses] = useState([
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Home',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Work',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Othericon.png'),
      Place: 'Other',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
  ]);

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'My Address'} />
        <View style={{height: scalableheight.three}} />
        <View style={{width: '100%', paddingHorizontal: scalableheight.two}}>
          <FlatList
            data={addresses}
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              marginBottom: 20,
              height: '75%',
            }}
            renderItem={({item, i}) => {
              return (
                <Addresstile
                  //   onPress={() =>
                  //     navigation.navigate('OrderDetails', {
                  //       orderId: item.OrderNo,
                  //       completedetails: Order,
                  //     })
                  //   }
                  //   // onModelPopUp={changestatus}
                  icon={item.Icon}
                  place={item.Place}
                  address={item.address}
                  note={item.Note}
                />
              );
            }}
          />
          <View style={{marginBottom: scalableheight.six}}>
            <MYButton
              onPress={() => {
                navigation.navigate('EditAddress');
                navigation.goBack();
              }}
              color={'rgba(225, 78, 78, 1)'}
              title={'ADD NEW'}
              textcolor={'white'}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: 'Rubik-Regular',
    width: '90%',
    color: 'black',
  },
  Image: {
    width: 241,
    height: 104,
    marginBottom: '10%',
  },
  inputIconStyle: {
    position: 'absolute',
    right: scalableheight.two,

    justifyContent: 'center',
    alignSelf: 'center',

    marginTop: '4%',
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
    shadowRadius: 18,
  },
  TextInput: {
    width: '95%',
    backgroundColor: '#F5F5F5',
    fontSize: fontSize.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.eleven,
    height: scalableheight.seven,
    color: '#8c8c8c',

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: '4%',
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000075',
    paddingHorizontal: 30,
  },
  modalView: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#29262A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
});
export default MyAddresses;
