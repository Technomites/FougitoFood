import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  RefreshControl,
  Modal,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {MyCoupons} from '../Actions/actions';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PlainHeader from '../Shared/Components/PlainHeader';
import UpcomingBookingCard from '../Shared/Components/UpcomingBookingCard';
import Couponscomponent from '../Shared/Components/Couponscomponent';
import BottomTab from '../Shared/Components/BottomTab';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GToastContainer, showToast} from 'react-native-gtoast';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Animated from 'react-native-reanimated';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Toast from 'react-native-toast-notifications';
import NetInfo from '@react-native-community/netinfo';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const Coupons = ({navigation, drawerAnimationStyle}) => {
  const [Loading, setLoading] = useState(false);
  const [Bookingdata, setBookingdata] = useState([
    {
      title: 'Weekend Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
    {
      title: 'Holiday Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
    {
      title: 'Weekend Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
    {
      title: 'Weekend Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
    {
      title: 'Weekend Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
    {
      title: 'Weekend Special Discount',
      discountprice: '100',
      vailidity: '30/01/2022',
      percentage: '10%',
      code: 'FLAWQDVHH',
    },
  ]);
  const toast = useRef();
  const dispatch = useDispatch();
  const {AuthToken, UserCoupons} = useSelector(
    state => state.userReducer,
  );
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(MyCoupons(AuthToken));
   
  }, [AuthToken]);



  function copied() {
    toast.current.show('Copied To Clipboard', {
      type: 'normal',
      placement: 'bottom',
      duration: 4000,
      offset: 10,
      animationType: 'slide-in',
    });
  }

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View
        style={{
     flex:1,
   

          alignSelf: 'center',
          marginTop: getStatusBarHeight(),
    
        }}>
          <View style={{
              height: "99%",
              width:"100%",
              overflow:"hidden",
          }}>
        {/* <StatusBar
          barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        /> */}
        <PlainHeader title={'My Coupons'} />
        {UserCoupons.length == 0 ? (
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              alignSelf: 'center',
              marginVertical: scalableheight.fourty,
            }}>
            <Text style={{fontSize: fontSize.thirteen, color: '#000'}}>
             No Data Found
            </Text>
          </View>
        ) : (
          <FlatList
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignSelf: 'center',
              width: '100%',
              paddingBottom: scalableheight.two,
            }}
            data={UserCoupons}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                onPress={() => {
                  
                  Clipboard.setString(item.CouponCode)
                  copied()

                  }}
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: scalableheight.two,
                  }}>
                  <Couponscomponent
                    sale={item.DiscountAmount + ' %'}
                    title={item.Name}
                    // minorder={'AED 100'}
                    daysleft={item.DaysLeft + ' days left'}
                    discountprice={item.dicountAmount}
                    tc={item.TermsAndConditions}
                  />
                </TouchableOpacity>
              );
            }}
            // onEndReached={() => LoadVRTourPagination()}
            // onEndReachedThreshold={0.1}
          />
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
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: fontSize.fourteen,
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
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

    color: '#8c8c8c',
    fontSize: fontSize.fifteen,
    paddingLeft: 10,
    alignSelf: 'center',
    marginTop: '4%',
  },
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
export default Coupons;
