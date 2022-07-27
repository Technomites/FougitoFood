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
  Platform
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getcoupons
} from '../Actions/actions';
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GToastContainer, showToast} from 'react-native-gtoast';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Animated from 'react-native-reanimated';
import {fontSize, scalableheight} from '../Utilities/fonts';
import NetInfo from '@react-native-community/netinfo';

const Coupons = ({navigation,drawerAnimationStyle}) => {
  const [Loading, setLoading] = useState(false);
  const [Bookingdata, setBookingdata] = useState([
    {
        title: 'Weekend Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
    {
        title: 'Holiday Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
    {
        title: 'Weekend Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
    {
        title: 'Weekend Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
    {
        title: 'Weekend Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
    {
        title: 'Weekend Special Discount',
        discountprice: "100",
        vailidity: "30/01/2022",
        percentage: '10%',
        code: "FLAWQDVHH",
    
    },
 
  ]);
  const dispatch = useDispatch();
  const {Lang, coupons} = useSelector(state => state.userReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {

    dispatch(getcoupons())
  }, []);

function copied(){
    showToast(
        'Copied to clipboard',
        {
          duration: 500,
        },
      );
}
function onRefresh() {
  NetInfo.fetch().then(state => {
    if (state.isConnected == true && state.isInternetReachable == true) {
      dispatch(getcoupons())
    } else {
      showToast(
        Lang == 'en' ? 'No Internet Connection' : 'لا يوجد اتصال بالإنترنت',
        {
          duration: 500,
        },
      );
    }
  });
}
  return (
    <Animated.View style={{flex:1,...drawerAnimationStyle,  backgroundColor: 'white'}}>

           
      <View
        style={{
          height: '100%',
          width: '100%',
      
          alignSelf: 'center', paddingTop: getStatusBarHeight(),
          flex:12
        }}>
        <PlainHeader title={Lang == "en" ? 'Coupons' : "كوبونات"} />
        <View style={{height:"91%", width:"100%", paddingHorizontal: scalableheight.two}}>
        {Loading == false?
    <FlatList
   
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
       keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignSelf:"center" , width: "100%", paddingBottom:20 }}
        data={coupons}
        renderItem={({item}) => {
          return (
            <View style={{alignItems:"center", marginTop:"5%"}}>
        <Couponscomponent copy={copied} code= {item.promoCode} percentage= {item.dicountPercentage} vailidity= {item.expiry} title= {item.name} discountprice= {item.dicountAmount}/>
      
    
    
      </View>


          );
        }}
        // onEndReached={() => LoadVRTourPagination()}
        // onEndReachedThreshold={0.1}
      />
      :
<View style={{  height: "100%", width: "100%",
alignItems:"center",
justifyContent:"center",

}}>
<Image
resizeMode="cover"
              source={require('../Resources/images/Skeleton/1.gif')}
              style={{width: "100%", height: "90%"}}
            />
            </View>}
           </View>   
      </View>
      <View  style={{  flex: 1, backgroundColor: 'white',        borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
<BottomTab/>
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
    textAlignVertical:'top',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

    color: '#8c8c8c',
    fontSize: fontSize.fifteen,
    paddingLeft: 10,
    alignSelf: 'center',
    marginTop: '4%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 8,
  },
});
export default Coupons;
