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
  StatusBar,
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
import ActiveRequestTile from '../Shared/Components/ActiveRequestTile';

import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import {styles} from 'react-native-element-dropdown/src/components/TextInput/styles';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';

const MyOrders = ({props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {notificationList, notificationCount} = useSelector(
    state => state.userReducer,
  );

  const [Order, SetOrders] = useState([
    {
      OrderNo: 'ORD-85814',
      Restaurant: 'Perfect Grill Restaurant',
      timmings: '06-12-21 | 4:00 PM',
      Amount: '1337.00',
      OrderStatus: 'Order Confirmed',
    },
    {
      OrderNo: 'ORD-85814',
      Restaurant: 'Perfect Grill Restaurant',
      timmings: '06-12-21 | 4:00 PM',
      Amount: '1337.00',
      OrderStatus: 'Cancelled',
    },
    {
      OrderNo: 'ORD-85814',
      Restaurant: 'Perfect Grill Restaurant',
      timmings: '06-12-21 | 4:00 PM',
      Amount: '1337.00',
      OrderStatus: 'Delivered',
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
        <StatusBar
          barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        />
        <PlainHeader title={'My Orders'} />

        <View style={{width: '100%', paddingHorizontal: scalableheight.two}}>
          <FlatList
            data={Order}
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              marginBottom: 20,
              height: '100%',
            }}
            renderItem={({item, i}) => {
              return (
                <ActiveRequestTile
                  onPress={() =>
                    navigation.navigate('OrderDetails', {
                      orderId: item.OrderNo,
                      completedetails: Order,
                    })
                  }
                  // onModelPopUp={changestatus}
                  deatils={item}
                />
              );
            }}
          />
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
export default MyOrders;
