import React, {useState, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {getcoupons} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
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
import NetInfo from '@react-native-community/netinfo';

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
  const dispatch = useDispatch();
  const {Lang, coupons} = useSelector(state => state.userReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getcoupons());
  }, []);

  function copied() {
    showToast('Copied to clipboard', {
      duration: 500,
    });
  }
  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(getcoupons());
      } else {
        showToast('No Internet Connection', {
          duration: 500,
        });
      }
    });
  }
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,

          alignSelf: 'center',
          marginTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'My Coupons'} />

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignSelf: 'center',
            width: '100%',
            paddingBottom: scalableheight.two,
          }}
          data={Bookingdata}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: scalableheight.two,
             
                }}>
                <Couponscomponent
                  sale={'40% OFF'}
                  title={'EidSpecial40'}
                  minorder={'AED 100'}
                  daysleft={'3 days left'}
                
                  discountprice={item.dicountAmount}
                />
              </View>
            );
          }}
          // onEndReached={() => LoadVRTourPagination()}
          // onEndReachedThreshold={0.1}
        />
      </View>

      <GToastContainer paddingBottom={100} style={{height: 50, width: 60}} />
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
