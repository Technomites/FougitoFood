import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {readallnotifications,addReadNotifications, clearNotificationCount, clearNotifications, getAllNotifications, GetNotifications, notificationCountHandle, readNotification, seticonfocus} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';

const Notifications = ({navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {Lang, notificationList, notificationCount} = useSelector(state => state.userReducer);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousData, setPreviousData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    dispatch(seticonfocus('home'));
  }, []);
  useEffect(() => {
    setLoadMoreLoader(false);
    // const unsubscribe = navigation.addListener('focus', () => {
      if (notificationCount == 1) {
        NetInfo.fetch().then(state => {
          if (state.isConnected == false && state.isInternetReachable == false) {
            showToast('Problem with internet connectivity', {
              duration: 500,
            });
          } else {
            const count = notificationCount;
            dispatch(readallnotifications());
            dispatch(clearNotifications());
            setPageNumber(1);
            setPreviousData([]);
            dispatch(getAllNotifications(count, Lang));
          }
        });
      }
      console.log("notificationList =====> ", notificationList.length);
      console.log("notificationCount =====> ", notificationCount);
    // });
    
      // Return the function to unsubscribe from the event so it gets removed on unmount
      // return unsubscribe;
  }, [Lang]);
  useEffect(() => {
    console.log("CLEAR Notifications ======> ");
    dispatch(clearNotificationCount());
  }, [Lang]);
  const loadMoreNotifications = () => {
    if (notificationList.length >= 8) {
      if (previousData.length === notificationList.length) return;
      setLoadMoreLoader(true);
      const count = notificationCount+1;
      console.log("count =====> ", count);
      setPageNumber(count);
      dispatch(notificationCountHandle(count));
      dispatch(getAllNotifications(count, Lang));
      setPreviousData(notificationList);
    }
  };
  const readNotificationHandle = (id, index) => {
    notificationList[index].isRead = true;
    if (notificationList[index].expanded) {
      notificationList[index].expanded = false;
    } else {
      notificationList[index].expanded = true;
    }
    dispatch(addReadNotifications(notificationList));
    dispatch(readNotification(id));
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={styleSheet.RenderItemView}
      onPress={() => {
        readNotificationHandle(item.id, index);
      }}>
        <View style={{flexDirection:Lang==="en"?"row":"row-reverse"}}>
          <View style={{flex:1}}>
            <Text
              style={{
                fontSize: fontSize.fourteen,
                color: '#0A0909',
                fontFamily: 'Rubik-Medium',
                textAlign: Lang==="en"?"left":"right"
              }}>
              {item.title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize.twelve,
                color: '#0A0909',
                fontFamily: 'Rubik-Regular',
                opacity: 0.4,
                textAlign: Lang==="en"?"right":"left"
              }}>
              {item.date}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:Lang==="en"?"row":"row-reverse",marginTop:scalableheight.one}}>
          <View style={{flex:1}}>
            <Text
              numberOfLines={item.expanded ? null : 1}
              style={{
                fontSize: fontSize.fourteen,
                color: '#0A0909',
                fontFamily: 'Rubik-Regular',
                opacity: 0.8,
                textAlign: Lang==="en"?"left":"right"
              }}>
              {item.description}
            </Text>
          </View>
          {!item.isRead && 
            <View style={{paddingLeft:scalableheight.two}}>
              <Octicons
                name="dot-fill"
                style={{
                  color: '#F2A243',
                  fontSize: 20,
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </View>
          }
        </View>
    </TouchableOpacity>
  );
  const renderFooter = () => {
    return (
      <View style={{marginBottom:scalableheight.five}}>
        {loadMoreLoader ?
          <ActivityIndicator color={"#000"} />
        : 
          null
        }
      </View>
    )
  };

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
  
          alignSelf: 'center',
          flex: 12,
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={Lang == 'en' ? 'Notifications' : 'إشعارات'} />
        <View style={{height: scalableheight.three}} />
        <View style={{width: '100%',  paddingHorizontal: scalableheight.two,}}>
          <FlatList
            data={notificationList}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            onEndReached={loadMoreNotifications}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 54}}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <BottomTab />
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
});
export default Notifications;
