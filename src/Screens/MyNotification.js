import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import PlainHeader from '../Shared/Components/PlainHeader';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Animated from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getAllNotifications,
  clearnotifications,
  readall,
  getnotificationcount,
  readnotificationbyid,
  isconnected,
} from '../Actions/actions';
import {useDispatch, useSelector} from 'react-redux';
const MyNotification = ({route, props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {AuthToken, Notificationsdata} = useSelector(
    state => state.userReducer,
  );
  const toast = useRef();
  const [count, setcount] = useState(1);
  const [IsFetching, setIsFetching] = useState(false);

  const [myNotoficationData, setmyNotoficationData] = useState([
    {
      Title: 'Food is Delivered',
      Description: 'Enjou your meal',
    },
    {
      Title: 'Food is Delivered',
      Description: 'Enjou your meal',
    },
    {
      Title: 'Food is Delivered',
      Description: 'Enjou your meal',
    },
    {
      Title: 'Food is Delivered',
      Description: 'Enjou your meal',
    },
  ]);

  useEffect(() => {
    dispatch(getAllNotifications(count, AuthToken));
  }, [count]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(readall(AuthToken));
      dispatch(getnotificationcount(AuthToken));
    });
    return unsubscribe;
  }, [navigation]);

  const fetchData = () => {
    dispatch(clearnotifications([]));
    if (count == 1) {
      setcount(1);
      dispatch(getAllNotifications(1, AuthToken));
    } else {
      setcount(1);
    }

    setIsFetching(false);
  };

  const onRefresh = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        setIsFetching(true);
        fetchData();
      } else {
        toast.current.show('No Internet Connection', {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
        dispatch(isconnected(false));
        navigation.replace('Drawernavigator');
      }
    });
  };

  const renderList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item, 'ITEMM-----');

          //props.navigation.navigate('RequestDeliveryMap');
          //  OnClickNotification(item.Id, index);
          // props.navigation.navigate('OrderDetail', {
          //   orderId: item.Notification.RecordId,
          // });
          let data = [...Notificationsdata];
          for (const key in data) {
            if (key == index) {
              if (data[key].expanded == false) {
                data[key].expanded = true;
              } else {
                data[key].expanded = false;
              }
            }
          }
          dispatch(clearnotifications(data));

          if (item.IsRead == false) {
            let data = [...Notificationsdata];
            for (const key in data) {
              if (key == index) {
                data[key].IsRead = true;
              }
            }
            dispatch(clearnotifications(data));
            dispatch(readnotificationbyid(item.Id, AuthToken));
          }
        }}
        // deatils={item}
        style={{
          width: '100%',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 0.5,
          paddingHorizontal: scalableheight.one,
          flexDirection: 'row',

          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scalableheight.two,
        }}>
        <View
          style={{
            width: '15%',
          }}>
          <View
            style={{
              height: scalableheight.four,
              width: scalableheight.four,
              backgroundColor: 'rgba(211,211,211, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scalableheight.pointfive,
              alignSelf: 'center',

              // right: 5,
            }}>
            <Icon
              //    onPress={props.onPress}
              name="bell-outline"
              size={fontSize.twenty}
              color={'#E14E4E'}
            />
          </View>
        </View>

        <View
          style={{
            height: '100%',
            width: '85%',
            paddingHorizontal: scalableheight.one,
            //    backgroundColor:'red',

            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <View style={{}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: fontSize.twelve,
                  fontFamily: 'Inter-SemiBold',
                  alignItems: 'center',
                }}>
                {item?.Notification.Title}
              </Text>
            </View>

            <Text
              numberOfLines={item.expanded ? null : 1}
              style={{
                fontFamily: 'Inter-Medium',
                color: 'gray',
                fontSize: fontSize.twelve,
                //  fontFamily: 'Inter-bold',
              }}>
              {item?.Notification.Description}
            </Text>
          </View>

          {item.IsRead === false ? (
            <View
              style={{
                height: scalableheight.one,
                width: scalableheight.one,
                backgroundColor: 'red',
                borderRadius: fontSize.circle,
              }}></View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: '#F6F6F6'}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          //height: '100%',
          width: '100%',
          alignSelf: 'center',
          marginTop: getStatusBarHeight(),
          padding: scalableheight.one,
        }}>
        <PlainHeader title={'Notifications'} />

        {Notificationsdata.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Notificationsdata}
            onRefresh={() => onRefresh()}
            refreshing={IsFetching}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
            onEndReached={() => setcount(count + 1)}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: scalableheight.eight,
            }}
            // onEndReachedThreshold={0.1}
          />
        ) : (
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              alignSelf: 'center',
              marginVertical: scalableheight.fourty,
            }}>
            <Text style={{fontSize: fontSize.thirteen, color: '#000'}}>
              No Notifications Available
            </Text>
          </View>
        )}
      </View>

      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
    // <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
    //   <StatusBar
    //     translucent={false}
    //     barStyle="dark-content"
    //     backgroundColor={"white"}
    //   />
    //   {/* <BackHeader
    //     onPress={() => props.navigation.goBack()}
    //     title="Notifications"
    //   /> */}
    //   {/* <MainHeader
    //     title="My Notifications"
    //     back
    //     onGoBack={() => props.navigation.goBack()}
    //     notiBlank
    //   /> */}
    //   <View
    //     style={{
    //       height: '92%',
    //       width: '100%',

    //       paddingHorizontal: 10,
    //     }}>
    //     <View
    //       style={{
    //         height: '100%',
    //         width: '100%',
    //       }}>
    //       {/* <FlatList
    //         showsVerticalScrollIndicator={false}
    //         // data={myNotoficationData}
    //         onRefresh={() => onRefresh()}
    //      //   refreshing={isFetching}
    //         keyExtractor={(item, index) => index.toString()}
    //         renderItem={renderList}
    //         onEndReached={() => LoadMoreNotfifcations()}
    //         onEndReachedThreshold={0.1}
    //       /> */}
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
};
export default MyNotification;
