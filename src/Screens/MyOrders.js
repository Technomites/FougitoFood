import React, {useState, useEffect, useRef} from 'react';
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
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  OrderStatus,
  Myorders,
  storeorderid,
  isconnected,
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Favourites from '../Shared/Components/Favourites';
import ActiveRequestTile from '../Shared/Components/ActiveRequestTile';
import Toast from 'react-native-toast-notifications';
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
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const MyOrders = ({props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {AuthToken, MyorderList, MyorderListpast} = useSelector(
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
  const [ordertype, Setordertype] = useState('On Going');
  const toast = useRef();
  useEffect(() => {
    dispatch(Myorders(AuthToken));
  }, [AuthToken]);

  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(Myorders(AuthToken));
        dispatch(isconnected(true));
      } else {
        dispatch(isconnected(false));
        navigation.replace('Drawernavigator');
        toast.current.show('No Internet Connection', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
      }
    });
  }

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      {/* <StatusBar
        barStyle={ 'dark-content'}
      /> */}
      <View
        style={{
          height: '99%',
          width: '100%',
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
            overflow: "hidden",
      
        }}>
        <PlainHeader title={'My Orders'} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            // height: '15%',
            paddingHorizontal: scalableheight.three,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Setordertype('On Going');
            }}
            style={{
              height: scalableheight.five,
              width: scalableheight.twenty,
              backgroundColor:
                ordertype == 'On Going' ? 'rgba(245, 80, 80, 0.3)' : '#F9F9F9',
              borderRadius: fontSize.borderradiusmedium,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color:
                  ordertype == 'On Going' ? '#F55050' : 'rgba(17, 17, 17, 0.2)',
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.fifteen,
              }}>
              On Going
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Setordertype('Past Orders');
            }}
            style={{
              height: scalableheight.five,
              width: scalableheight.twenty,
              backgroundColor:
                ordertype == 'Past Orders'
                  ? 'rgba(245, 80, 80, 0.3)'
                  : '#F9F9F9',
              borderRadius: fontSize.borderradiusmedium,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color:
                  ordertype == 'Past Orders'
                    ? '#F55050'
                    : 'rgba(17, 17, 17, 0.2)',
                fontFamily: 'Inter-SemiBold',
                fontSize: fontSize.fifteen,
              }}>
              Past Orders
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: scalableheight.one, }}>
          {MyorderList.length == 0 || MyorderListpast.length == 0 ? (
            <View
              style={{
                // justifyContent: 'center',
                // alignItems: 'center',
                alignSelf: 'center',
                marginVertical: scalableheight.fourty,
              }}>
              <Text style={{fontSize: fontSize.fifteen, color: '#000'}}>
                NO DATA FOUND
              </Text>
            </View>
          ) : (
            <View
              style={{width: '100%', paddingHorizontal: scalableheight.two}}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={ordertype == 'On Going' ? MyorderList : MyorderListpast}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: scalableheight.fourteen,
               
                }}
                style={{
               
                }}
                renderItem={({item, i}) => {
                  return (
                    <ActiveRequestTile
                      onPress={() => {
                        // navigation.navigate('PreparingFood');
                        // dispatch(OrderStatus(AuthToken, item.Id));
                        dispatch(storeorderid(item.Id));
                        navigation.navigate('PreparingFood');

                        // dispatch(OrderStatus(AuthToken, item.Id));
                      }}
                      // onModelPopUp={changestatus}
                      details={item}
                      // restaurantLogo={item?.Ongoing.RestaurantLogo}
                      // orderNo={item,}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
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
