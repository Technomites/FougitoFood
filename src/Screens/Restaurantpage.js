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
  TextInput,
  FlatList,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ScreenWrapper from '../Shared/Components/ScreenWrapper';
import renderIf from 'render-if';
// import Modal from "react-native-modal";
import {
  getpopularcategoriesbyid,
  getrestrauntmenubyid,
  updatedmenuselection,
  savemenucategoryoptiondetailsdata,
  storecartdata,
  storecartprice,
  pickupstate,
  markfavourite,
  getallrestrauntsbyid,
  clearfavourite
} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Toast from 'react-native-toast-notifications';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {SliderBox} from 'react-native-image-slider-box';
import ImagesSwiper from 'react-native-image-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import HeaderComponentRestaurant from '../Shared/Components/HeaderComponentRestaurant';
import Mltichoicehorizontallist from '../Shared/Components/Mltichoicehorizontallist';
import Reviewscontainer from '../Shared/Components/Reviewscontainer';
import Categoriescard from '../Shared/Components/Categoriescard';
import Animated from 'react-native-reanimated';
import Infobar from '../Shared/Components/Infobar';
import SearchBar from '../Shared/Components/SearchBar';
import Starters from '../Shared/Components/Starters';
import MultiChoiceDropDown from '../Shared/Components/MultiChoiceDropDown';
import MYButton from '../Shared/Components/MYButton';
import {
  CollapsibleContainer,
  CollapsibleFlatList,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
  StickyView,
} from '@r0b0t3d/react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import listeners from '../Listener/Listener';
import {createConfigItem} from '@babel/core';
import {fontSize, scalableheight} from '../Utilities/fonts';
import moment from 'moment';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles} from 'react-native-element-dropdown/src/components/TextInput/styles';
import Custombottomsheet from '../Shared/Components/Custombottomsheet';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Restaurantpage = ({navigation, drawerAnimationStyle, props, route}) => {
  //console.log(props?.route?.params?.latitude,'abcbcbbcbcbcbcbb')

  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [selecteditemimage, setselecteditemimage] = useState("");
  const [dataSourceCordsHorizontal, setdataSourceCordsHorizontal] = useState(
    [],
  );
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [keyboardopen, setkeyboardopen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [specialinstructions, setspecialinstructions] = useState('');
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [count, setcount] = useState(1);
  const [lat, setlat] = useState(route?.params?.latitude);
  const [long, setlong] = useState(route?.params?.longitude);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [pinlocation, setpinlocation] = useState('');
  const [modaldataoptions, setmodaldataoptions] = useState([]);
  const [modaldataoptionsindex, setmodaldataoptionsindex] = useState();
  const [search, setsearch] = useState('');
  const [isEnabled, setisEnabled] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);
  // const Top = createMaterialTopTabNavigator();

  const [inlat, setinlat] = useState();

  const [inlong, setinlong] = useState();
  const scrollviewhorizontalref = useRef();
  const scrollviewref = useRef();
  const drinksref = useRef();
  const toast = useRef();
  const [serving, setserving] = useState([
    {
      selected: false,
      serving: 'Single Plate',
      price: 'AED 159.00',
    },
    {
      selected: false,
      serving: 'Double Plate',
      price: 'AED 129.00',
    },
    {
      selected: false,
      serving: 'Triple Plate',
      price: 'AED 59.00',
    },
  ]);

  const [flavours, setflavours] = useState([
    {
      selected: false,
      serving: 'Hummus',
    },
    {
      selected: false,
      serving: 'Chicken Munchurian',
    },
    {
      selected: false,
      serving: 'Pasta',
    },
  ]);
  const [types, settypes] = useState([
    {
      title: 'Starters',
      visible: true,
    },
    {
      title: 'Main Food',
      visible: false,
    },
    {
      title: 'Desert',
      visible: false,
    },
    {
      title: 'Drinks',
      visible: false,
    },
  ]);
  const [dished, setdisdhed] = useState([
    {
      selected: false,
      serving: 'Hummus',
    },
    {
      selected: false,
      serving: 'Chicken Munchurian',
    },
    {
      selected: false,
      serving: 'Pasta',
    },
    {
      selected: false,
      serving: 'Hummus',
    },
    {
      selected: false,
      serving: 'Chicken Munchurian',
    },
    {
      selected: false,
      serving: 'Pasta',
    },
    {
      selected: false,
      serving: 'Hummus',
    },
  ]);
  const {
    restrauntdetails,
    popularcategories,
    restrauntmenu,
    retaurantmenucategorydataoption,
    cartdata,
    price,
    AuthToken,
    addedtofavourite
 
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const {
    collapse, // <-- Collapse header
    expand,
    scrollTo,

    scrollToIndex,
    scrollHandler,

    scrollY, // <-- Animated scroll position. In case you need to do some animation in your header or somewhere else
  } = useCollapsibleContext();

  // useEffect(() => {
  //     console.log(route?.params?.latitude, 'hellow');
  //   }, [route?.params?.latitude]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log(route?.params?.latitude, 'abcbcbbcbcbcbcbb');
  //   });

  //   //  Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     collapse();
  //     StatusBar.setBarStyle('light-content');
  //   });

  //   //  Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);
  

  useEffect(() => {
    if(addedtofavourite == "Success"){

      dispatch(getallrestrauntsbyid(restrauntdetails?.RestaurantBranchId, AuthToken));
  dispatch(clearfavourite())
      
    }
   

  }, [addedtofavourite]);

  useEffect(() => {
    if(restrauntdetails?.RestaurantBranchId != undefined){
      dispatch(getpopularcategoriesbyid(restrauntdetails?.RestaurantBranchId))
      dispatch(getrestrauntmenubyid(restrauntdetails?.RestaurantBranchId))
  
      
    }
   

  }, [restrauntdetails]);



  useEffect(() => {
    if(cartdata.length > 0){
      setcartvisible(true)
    }else{
      setcartvisible(false)
   
    }
   console.log("all cart data length" + cartdata.length + "data " + JSON.stringify(cartdata))
  }, [cartdata]);

  
  function toggleanimation() {
    if (animationtype == 'fadeInUpBig') {
      setanimationtype('fadeOutDownBig');
    } else {
      setanimationtype('fadeInUpBig');
    }
  }

  useEffect(() => {
    if (modalVisible == true) {
      setanimationstate(true);
    }
  }, [modalVisible]);

  function additemtocart(){
 
    let errorcaused = false
    let arr = retaurantmenucategorydataoption;
   
    for (const key in arr.MenuItemOptions) {
      // console.log("yo yo" + JSON.stringify(arr.MenuItemOptions[key]))
  let found = 0

        for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
        
        if(arr.MenuItemOptions[key].MenuItemOptionValues[item].selected == true){
          // console.log("yo yo" + JSON.stringify(arr.MenuItemOptions[key].MenuItemOptionValues))
found = 1
          }
        }
      if(found == 0 &&  arr.MenuItemOptions[key].IsRequired == true){
        errorcaused = true
        toast.current.show(arr.MenuItemOptions[key].Title + " is a required field", {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        });
      }

    }

    if(errorcaused == true){

    }else{
      let a = []
      arr["SpecialInstructios"] = specialinstructions
      arr["Qty"] = count
  
      a.push(
        arr
      )


    let addedprice = arr.Price
    for(const priceindex in arr.MenuItemOptions){
      for(const i in arr.MenuItemOptions[priceindex].MenuItemOptionValues){
        if(arr.MenuItemOptions[priceindex].MenuItemOptionValues[i].selected == true){
          addedprice = addedprice + arr.MenuItemOptions[priceindex].MenuItemOptionValues[i].Price
        }
      }
    } 
    arr["priceperitem"] = addedprice
    addedprice = addedprice * count
    arr["completeitemorderprice"] = addedprice
    addedprice = price + addedprice
    dispatch(storecartprice(addedprice))
    dispatch(storecartdata(a))
    console.log("this is the price" + JSON.stringify(addedprice))
    console.log("this is the data going into the cart" + JSON.stringify(arr))
   clearandclose();
    setcartvisible(true);
    }
  }
  
  function clearandclose() {
    collapse();
    Keyboard.dismiss();
    toggleanimation();
    setanimationstate(true);
  }

  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);


  useEffect(() => {
    console.log(
      'dataSourceCordsHorizontal' + JSON.stringify(dataSourceCordsHorizontal),
    );
  }, [dataSourceCordsHorizontal]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideNavigationBar();
        console.log('Keyboard is open');
        setkeyboardopen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideNavigationBar();
        setkeyboardopen(false);
        console.log('Keyboard is closed');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    hideNavigationBar();
  }, [modalVisible]);

  useEffect(() => {
   dispatch(pickupstate(isEnabled))
  }, [isEnabled]);
  
  useEffect(() => {
    if (lat != null && long != null) {
      Geocoder.from(lat, long)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          setpinlocation(addressComponent);
        })
        .catch(error => console.warn(error));
    }
  }, [lat, long]);

  function getnewlocation() {
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setpinlocation(addressComponent);
      })
      .catch(error => console.warn(error));
  }

  const hasLocationPermissions = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      // ToastAndroid.show(
      //   'Location permission denied by user.',
      //   ToastAndroid.LONG,
      // );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      // ToastAndroid.show(
      //   'Location permission revoked by user.',
      //   ToastAndroid.LONG,
      // );
    }
    return false;
  };
  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        ToastMessage('success', 'Success', 'Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      ToastMessage('error', 'Error', 'Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow Bakery App to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }
    return false;
  };

  const renderpopularcategories = ({item}) => (
    <Categoriescard
      image={item?.Image}
      type={item?.CategoryName}
      price={item?.AvgPrice}
    />
  );

  const rendertypes = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(index);
        scrollTo(dataSourceCords[index + 1] - scalableheight.twenty, true);

        let data = [...restrauntmenu];
        for (const index in data) {
          data[index].visible = false;
        }
        data[index].visible = true;
      dispatch(updatedmenuselection(data))
      }}
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: scalableheight.three,
        alignItems: 'center',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          dataSourceCordsHorizontal[index] = layout.x; // we store this offset values in an array
        }}
        style={{
          fontFamily: 'Inter-SemiBold',
          color: item.visible ? '#E14E4E' : 'rgba(211,211,211, 0.9)',
          fontSize: fontSize.fifteen,
          paddingVertical: scalableheight.one,
          borderBottomWidth: item.visible ? 1 : 0,
          borderColor: '#E14E4E',
        }}>
        {item?.CategoryName}
      </Text>
    </TouchableOpacity>
  );

  function updateservingstate(index, arrindex) {
    console.log(arrindex)

    let arr = retaurantmenucategorydataoption;
   
    for (const key in arr.MenuItemOptions) {

      if(key == arrindex){
        for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
          if (item == index) {
            console.log("hello")
                    if (arr.MenuItemOptions[key].MenuItemOptionValues[item].selected == true) {
                      
                      arr.MenuItemOptions[key].MenuItemOptionValues[item].selected = false;
                    } else {
                      arr.MenuItemOptions[key].MenuItemOptionValues[item].selected = true;
                    }
                  } else {
                    console.log("bye")
                    arr.MenuItemOptions[key].MenuItemOptionValues[item].selected = false;
                  }
        }
      }

    }
    // setmodaldataoptions(arr);
    dispatch(savemenucategoryoptiondetailsdata(arr))
    console.log('modaldataoptions' + JSON.stringify(arr));
    // console.log('arr' + JSON.stringify(arr.MenuItemOptions.MenuItemOptionValues));
  }

  function updateflavourstate(index) {
    let arr = [...flavours];
    for (const key in arr) {
      if (key == index) {
        if (arr[key].selected == true) {
          arr[key].selected = false;
        } else {
          arr[key].selected = true;
        }
      } else {
        arr[key].selected = false;
      }
    }
    setflavours(arr);
    console.log('arr' + JSON.stringify(arr));
  }

  const toggleSwitch = async () => {
    setisEnabled(!isEnabled);
  };

  return (
    <ScreenWrapper drawer={drawerAnimationStyle} style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
        backgroundColor="transparent"
      />
      {/* <StatusBar barStyle="light-content" /> */}
      {modalVisible && (
        <Animatable.View
          animation={animationstate ? animationtype : null}
          onAnimationEnd={() => {
            setanimationstate(false);
            if (animationtype == 'fadeOutDownBig') {
              setanimationtype('fadeInUpBig');

              setmodalVisible(false);
            }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{elevation: 4, zIndex: 4}}>
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  height: '90%',
                  borderRadius: fontSize.eleven,
                  backgroundColor: 'white',
                  overflow:"hidden"
                }}>
                <View style={{width: '100%', height: '30%'}}>
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{uri: selecteditemimage}}
                  />
                  {renderIf(
                    serving?.filter(item => item.selected == true) != '',
                  )(
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: scalableheight.two,
                        height: scalableheight.four,
                        backgroundColor: '#E14E4E',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderTopLeftRadius: fontSize.eleven,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Inter-SemiBold',
                          fontSize: fontSize.ten,
                        }}>
                        AED{' '}
                      </Text>

                      {serving
                        ?.filter(function (item) {
                          return item.selected == true;
                        })
                        .map(function ({price}) {
                          return (
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Inter-SemiBold',
                                fontSize: fontSize.fourteen,
                              }}>
                              {price}
                            </Text>
                          );
                        })}
                    </View>,
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      clearandclose();
                    }}
                    style={{
                      position: 'absolute',
                      top: scalableheight.one,
                      right: scalableheight.one,
                    }}>
                    <Ionicons
                      name="close-circle"
                      color={'#E14E4E'}
                      // '#F5F5F5'
                      size={fontSize.thirtyseven}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '53%',
                    padding: scalableheight.two,
                    
                  }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: retaurantmenucategorydataoption.MenuItemOptions.length > 0 ?'space-evenly' : null,
                    }}>
                      <View>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: fontSize.sixteen,
                        color: 'black',
                      }}>
                   {retaurantmenucategorydataoption?.Name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: fontSize.fourteen,
                        color: 'black',
                      }}>
                       {retaurantmenucategorydataoption?.Description}
                    </Text>
                    <View style={{height: scalableheight.one}} />
                    </View>
                    {retaurantmenucategorydataoption?.MenuItemOptions?.length > 0 &&
                  
                  retaurantmenucategorydataoption.MenuItemOptions?.map((item, key) => {
                      return (
                        item?.MenuItemOptionValues[0].Price != 0.00 ? 
                        <>
                          
                        <MultiChoiceDropDown
                        title={item?.Title}
                        data={item?.MenuItemOptionValues}
                        index={key}
                        update={updateservingstate}
                      />
                         <View style={{height: scalableheight.one}} />
                      </>
                        : 
                        <>

                 
                        <Mltichoicehorizontallist
                        title={item?.Title}
                        data={item?.MenuItemOptionValues}
                        index={key}
                        update={updateservingstate}
                      />
                         <View style={{height: scalableheight.one}} />
                      </>
                      )})
                 
}

                   
<View>
                    <View style={{height: scalableheight.one}} />
                    <Text
                      style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: fontSize.thirteen,
                        color: 'black',
                        opacity: 0.4,
                      }}>
                      Special Instructions
                    </Text>
                    <View style={{height: scalableheight.one}} />
                    <TextInput
                      multiline
                      value={specialinstructions}
                      onChangeText={text => setspecialinstructions(text)}
                      placeholder={'Type here'}
                      style={{
                        ...styleSheet.shadow,
                        width: '98%',
                        height: scalableheight.fifteen,
                        fontSize: fontSize.fifteen,
                        backgroundColor: '#F9F9F9',
                        alignSelf: 'center',
                        borderRadius: fontSize.borderradiusmedium,
                        paddingHorizontal: '5%',
            
                        textAlignVertical: 'top',
                      }}
                    />
</View>
                    {keyboardopen ? (
                      <View style={{height: scalableheight.two}} />
                    ) : null}
                  </ScrollView>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: scalableheight.two,
                    width: '100%',
                    paddingHorizontal: scalableheight.two,
                  }}>
                  {keyboardopen != true ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                        justifyContent: 'space-evenly',
                        alignSelf: 'center',
                        marginBottom: scalableheight.two,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          count > 1 ? setcount(count - 1) : null;
                        }}>
                        <AntDesign
                          name="minuscircle"
                          color={'#E14E4E'}
                          size={fontSize.twentyseven}
                          style={{}}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#F5F5F5',
                          width: scalableheight.six,
                          height: scalableheight.four,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: fontSize.eight,
                        }}>
                        <Text>{count}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setcount(count + 1);
                        }}>
                        <AntDesign
                          name="pluscircle"
                          color={'#E14E4E'}
                          size={fontSize.twentyseven}
                          style={{}}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <MYButton
                    color={'#E14E4E'}
                    title={'Add To Cart'}
                    textcolor={'white'}
                    onPress={() => {
                   additemtocart()
                    }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animatable.View>
      )}

      {modalVisible && animationtype == 'fadeInUpBig' && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 2,
            elevation: 2,
          }}></View>
      )}

      {cartvisible && (
        <Animatable.View
          animation={'fadeInUpBig'}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{
            bottom: scalableheight.two,
            position: 'absolute',
            width: '90%',
            backgroundColor: '#E14E4E',
            zIndex: 2,
            alignSelf: 'center',
            borderRadius: fontSize.eleven,
            paddingVertical: scalableheight.one,
            paddingHorizontal: scalableheight.two,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Checkout');
            }}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: scalableheight.four,
                    height: scalableheight.four,
                    backgroundColor: 'white',
                    borderRadius: fontSize.circle,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.fourteen,
                    }}>
                    {cartdata?.length}
                  </Text>
                </View>
                <Text
                  style={{
                    marginLeft: scalableheight.one,
                    color: 'white',
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.fourteen,
                  }}>
                  Items in Cart
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.twelve,
                  opacity: 0.6,
                }}>
                AED {price}
              </Text>
            </View>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: fontSize.fifteen,
                }}>
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}
      <View
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 10,
          alignSelf: 'center',
          zIndex: 1,
          elevation: 1,
          position: 'absolute',
        }}>
        <CollapsibleContainer style={{}}>
          <CollapsibleHeaderContainer>
            <StickyView>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#201F1F',
                  position: 'absolute',
                  top: 0,
                  elevation: -10,
                  zIndex: -10,
                  height:
                    scalableheight.seven +
                    getStatusBarHeight() +
                    scalableheight.seven,
                }}>
                {/* <HeaderComponentRestaurant newNotificationCount={newNotificationCount}  isEnabled={isEnabled}
                       toggleSwitch={toggleSwitch}/>  */}
              </View>
            </StickyView>
            <ImageBackground
              resizeMode="cover"
              style={{
                width: '100%',
                height: scalableheight.twenty + getStatusBarHeight(),
                zIndex: 2000,
                elevation: 2000,
                // scalableheight.twenty + getStatusBarHeight()
              }}
              imageStyle={{
                borderBottomLeftRadius: fontSize.twenty,
                borderBottomRightRadius: fontSize.twenty,
              }}
              source={require('../Resources/images/homebackground.png')}>
              <StickyView
                style={{
                  backgroundColor: 'transparent',
                  paddingTop: getStatusBarHeight(),
                }}>
                <HeaderComponentRestaurant
                  // newNotificationCount={newNotificationCount}
                  isEnabled={isEnabled}
                  toggleSwitch={toggleSwitch}
                />
              </StickyView>

              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  height: scalableheight.tweleve,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  paddingHorizontal: scalableheight.one,
                }}>
                <View style={{width: '95%'}}>
                  <Infobar
                    Heading={'Home'}
                    Details={'Clifton block 2, plot no 245, near bilawal house'}
                    onPress={() => {
                      setshowbottomsheet(true);
                    }}
                  />
                </View>
              </View>
            </ImageBackground>

            <Reviewscontainer
            token= {AuthToken}
              rating={restrauntdetails?.AvgRating}
              reviews={restrauntdetails?.RatingCount}
              title={restrauntdetails?.BranchName}
              description={'Its the food you love'}
              onPress={() => {
                // console.log(JSON.stringify(restrauntdetails.RestaurantBranchId))
                // console.log( restrauntdetails?.Isfavourite)

                 dispatch(markfavourite(restrauntdetails?.RestaurantBranchId, restrauntdetails?.Isfavourite ? "DELETE" : "POST", AuthToken))
              }}
              Isfavourite = {restrauntdetails?.Isfavourite}
              image={restrauntdetails?.Logo}
            />

            <View style={{paddingHorizontal: scalableheight.one}}>
              <Animatable.View
                animation="bounceInRight"
                easing="ease"
                // iterationCount="infinite"
                iterationCount={1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: scalableheight.two,
                  justifyContent: 'flex-start',
                  width: '100%',
                }}>
                <View
                  style={{
                    width: scalableheight.three,
                    height: scalableheight.three,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E14E4E',
                    borderRadius: fontSize.borderradius,
                  }}>
                  <MaterialIcons
                    name="local-fire-department"
                    color={'white'}
                    size={fontSize.fifteen}
                  />
                </View>
                <Text
                  style={{
                    marginLeft: scalableheight.one,
                    fontFamily: 'Inter-Bold',
                    color: 'black',
                    fontSize: fontSize.twenty,
                  }}>
                  Popular Categories
                </Text>
              </Animatable.View>

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularcategories}
                renderItem={renderpopularcategories}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />

              <SearchBar
                search={search}
                onchange={val => {
                  setsearch(val);
                }}
              />
            </View>
            <StickyView style={{backgroundColor: 'transparent'}}>
              {/* <AnimatedScrollView
  // ref={scrollviewhorizontalref}
overflow={"hidden"}
  horizontal
  showsHorizontalScrollIndicator ={false}
  style={{ width: "100%", height: scalableheight.seven, flexDirection: "row", backgroundColor:"transparent"}}>
  {types.map((item, key) => {
          return (
            <TouchableOpacity 
           
            onPress={() => {   
             console.log(scrollY)
            scrollTo(dataSourceCords[key + 1] - 150, true)
         
             let data = [...types]
             for(const index in data){
              data[index].visible = false
             }
             data[key].visible = true
             settypes(data)
              }}
            style={{ backgroundColor:"transparent", paddingHorizontal: scalableheight.five, alignItems:"center", height: "100%", alignItems: "center", justifyContent:"center"}}>
       <Text 
  onLayout={event => {
    const layout = event.nativeEvent.layout;
    dataSourceCordsHorizontal[key] = layout.x; // we store this offset values in an array
    }}
       style={{fontFamily: 'Inter-SemiBold', color: item.visible? "#E14E4E" : 'rgba(211,211,211, 0.9)', fontSize: fontSize.fifteen, paddingVertical: scalableheight.one, borderBottomWidth: item.visible? 1 : 0, borderColor: "#E14E4E"  }}>{item.title}</Text>
          </TouchableOpacity>
          );
        })}
   
  </AnimatedScrollView> */}
              <FlatList
              key={"1"}
                keyExtractor={(item, index) => index.toString()}
                refs={scrollviewhorizontalref}
                overflow={'hidden'}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                style={{
                  width: '100%',
                  height: scalableheight.seven,
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                }}
                data={restrauntmenu}
                renderItem={rendertypes}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />
            </StickyView>
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
              keyExtractor={(item, index) => index.toString()}
            refs={scrollviewref}
            scrollEventThrottle={16}
            onMomentumScrollEnd={event => {
              // console.log("3eeee" + event.nativeEvent?.contentOffset?.y)
              // let num = scrollOffsetY
              // console.log("a" + JSON.stringify(dataSourceCords) )
              // console.log("a" + JSON.stringify(dataSourceCords) )
             
              let y = event.nativeEvent.contentOffset.y;
              // console.log("y" + JSON.stringify(y) )



let closest = dataSourceCords[1];
  for(let item of dataSourceCords){
    if(Math.abs(item - y)<Math.abs(closest - y)){
      closest = item;
    }
  }
for(const index in dataSourceCords){
  if(dataSourceCords[index] == closest){
    if (restrauntmenu[index - 1]?.visible != true) {
            let data = [...restrauntmenu];
            for (const index in data) {
              data[index].visible = false;
            }
            data[index - 1].visible = true;



            dispatch(updatedmenuselection(data))
            scrollviewhorizontalref.current?.scrollToIndex({
              index: index - 1 ,
              animated: true,
            });
            //  scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[0], animated: true });
          }
   
  }
}
              // if (y < dataSourceCords[2] - 150) {
              //   if (types[0].visible != true) {
              //     let data = [...types];
              //     for (const index in data) {
              //       data[index].visible = false;
              //     }
              //     data[0].visible = true;
              //     settypes(data);
              //     scrollviewhorizontalref.current?.scrollToIndex({
              //       index: 0,
              //       animated: true,
              //     });
              //     //  scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[0], animated: true });
              //   }
              //   // console.log(JSON.stringify(scrollOffsetY))
              //   // console.log("helle")
              // } else if (
              //   y > dataSourceCords[2] - 150 &&
              //   y < dataSourceCords[3] - 150
              // ) {
              //   if (types[1].visible != true) {
              //     let data = [...types];
              //     for (const index in data) {
              //       data[index].visible = false;
              //     }
              //     data[1].visible = true;
              //     settypes(data);
              //     scrollviewhorizontalref.current?.scrollToIndex({
              //       index: 1,
              //       animated: true,
              //     });
              //     //  scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[1], animated: true });
              //   }
              //   // console.log(JSON.stringify(scrollOffsetY))
              //   // console.log("helle")
              // } else if (
              //   y > dataSourceCords[3] - 150 &&
              //   y < dataSourceCords[4] - 150
              // ) {
              //   if (types[2].visible != true) {
              //     let data = [...types];
              //     for (const index in data) {
              //       data[index].visible = false;
              //     }
              //     data[2].visible = true;
              //     settypes(data);
              //     scrollviewhorizontalref.current?.scrollToIndex({
              //       index: 2,
              //       animated: true,
              //     });
              //     //  scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[2], animated: true });
              //   }
              //   // console.log(JSON.stringify(scrollOffsetY))
              //   // console.log("helle")
              // } else if (y > dataSourceCords[4] - 150) {
              //   if (types[3].visible != true) {
              //     let data = [...types];
              //     for (const index in data) {
              //       data[index].visible = false;
              //     }
              //     data[3].visible = true;
              //     settypes(data);

              //     //  scrollviewhorizontalref.current.scrollTo({ y: scalableheight.fifteen, animated: true });
              //     // scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[3], animated: true });
              //     scrollviewhorizontalref.current?.scrollToIndex({
              //       index: 3,
              //       animated: true,
              //     });
              //   }
              //   // console.log(JSON.stringify(scrollOffsetY))
              //   // console.log("helle")
              // }
            }}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: 'white',
              paddingHorizontal: scalableheight.one,
            }}>
             
             {restrauntmenu.map((item, key) => {
              return (
               <>
               {search == "" &&
                <Text
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                dataSourceCords[key + 1] = layout.y; // we store this offset values in an array
              }}
              style={styleSheet.heading}>
              {item?.CategoryName}{' '}
            </Text>
             }
            {item?.Items?.map((item, key) => {
              return (
                item?.Name.toLowerCase().includes(search.trim().toLowerCase()) ? 
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Starters
                    image={item?.Image}
                    title={item?.Name}
                    description={
                     item?.Description
                    }
                    price={item?.Price}
                    onPress={() => {
                      setselecteditemimage(item?.Image)
                      setmodaldataoptions(item)
                      setmodaldataoptionsindex(key)
                      dispatch(savemenucategoryoptiondetailsdata(item))
                      setspecialinstructions("")
                      setcount(1)
                      setmodalVisible(true);
                    }}
                  />
                </View> : null
              );
            })}
               </>
              );
            })}

           

         
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </View>
      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPress={() => {
          setshowbottomsheet(false);
        }}
        onPressnewlocation={() => {
          getnewlocation();
        }}
       setlocation = {false}
        latitude={lat}
        longitude={long}
      />
       <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />



    </ScreenWrapper>
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
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  newsshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 3,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: fontSize.twenty,
    paddingVertical: scalableheight.one,
  },
});
export default withCollapsibleContext(Restaurantpage);
