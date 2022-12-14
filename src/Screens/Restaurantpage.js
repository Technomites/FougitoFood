import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  LogBox,
  LayoutAnimation,
  Animated,
  Modal,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Keyboard,
  ImageBackground,
  Platform,
  PermissionsAndroid
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DynamicHeader from '../Shared/Components/DynamicHeader';
import DynamicScrolledupheader from '../Shared/Components/DynamicScrolledupheader';
import BranchListed from '../Shared/Components/BranchListed';
import FastImage from 'react-native-fast-image';
import MultiChoiceDropDownWithMultipleSelection from '../Shared/Components/MultiChoiceDropDownWithMultipleSelection';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Starters from '../Shared/Components/Starters';
import ScreenWrapper from '../Shared/Components/ScreenWrapper';
import Toast from 'react-native-toast-notifications';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MultiChoiceDropDown from '../Shared/Components/MultiChoiceDropDown';
import MYButton from '../Shared/Components/MYButton';
import Custombottomsheet from '../Shared/Components/Custombottomsheet';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
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
  clearfavourite,
  getallrestaurantbranches,
  cleancart,
  storerestrauntid,
  storerestrauntbasicdata,
  storedistance,
  clearmenu,
  getdistancevalidation,
  cleardistancevalidation,
  storecurrentaddress,
} from '../Actions/actions';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
import {StickyView} from '@r0b0t3d/react-native-collapsible';
import NetInfo from '@react-native-community/netinfo';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Restaurantpage = ({navigation, drawerAnimationStyle, props, route}) => {
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [animationtype, setanimationtype] = useState('fadeInUpBig');
  const [animationstate, setanimationstate] = useState(false);
  const [selecteditemimage, setselecteditemimage] = useState('');
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
  const [temporarycoordinates, settemporarycoordinates] = useState(null);
  const [SelectBranchVisible, setSelectBranchVisible] = useState(false);
  const [count, setcount] = useState(1);
  const [lat, setlat] = useState(route?.params?.latitude);
  const [long, setlong] = useState(route?.params?.longitude);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [pinlocation, setpinlocation] = useState('');
  const [intructionslayout, setintructionslayout] = useState([]);
  const [modaldataoptions, setmodaldataoptions] = useState([]);
  const [modaldataoptionsindex, setmodaldataoptionsindex] = useState();
  const [search, setsearch] = useState('');
  const [isEnabled, setisEnabled] = useState(true);
  const [inlat, setinlat] = useState();
  const [screenloader, setscreenloader] = useState(true);
  const [inlong, setinlong] = useState();
  const [currentitemprice, setcurrentitemprice] = useState(0);
  const scrollviewhorizontalref = useRef();
  const scrollviewref = useRef();
  const drinksref = useRef();
  const toast = useRef();
  const cartitemref = useRef();

  const {
    restrauntdetails,
    popularcategories,
    restrauntmenu,
    retaurantmenucategorydataoption,
    cartdata,
    price,
    AuthToken,
    addedtofavourite,
    Selectedcurrentaddress,
    branchlist,
    currentRestrauntid,
    validdistance,
    dinein
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        if (AuthToken != '') {
          dispatch(
            getallrestrauntsbyid(
              restrauntdetails?.RestaurantBranchId,
              AuthToken,
            ),
          );
        }
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
  }, [AuthToken]);

  useEffect(() => {
    if (addedtofavourite == 'Success') {
      toast.current.show(
        restrauntdetails?.Isfavourite
          ? 'Removed From Whishlist'
          : 'Added To Whishlist',
        {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        },
      );

      NetInfo.fetch().then(state => {
        if (state.isConnected == true && state.isInternetReachable == true) {
          dispatch(
            getallrestrauntsbyid(
              restrauntdetails?.RestaurantBranchId,
              AuthToken,
            ),
          );
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

      dispatch(clearfavourite());
    }
  }, [addedtofavourite]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        if (restrauntdetails?.RestaurantBranchId != undefined) {
          dispatch(
            getpopularcategoriesbyid(restrauntdetails?.RestaurantBranchId),
          );
          dispatch(getrestrauntmenubyid(restrauntdetails?.RestaurantBranchId));
          dispatch(getallrestaurantbranches(restrauntdetails?.RestaurantId));
        }
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
  }, [restrauntdetails]);

  useEffect(() => {
    if (cartdata.length > 0 || restrauntdetails?.IsClose == true) {
      setcartvisible(true);
    } else {
      setcartvisible(false);
    }
  }, [cartdata, restrauntdetails]);

  useEffect(() => {
    setscreenloader(true);
    if (restrauntmenu.length > 0) {
      setscreenloader(false);
    }
  }, [restrauntmenu]);

  useEffect(() => {
    // hideNavigationBar();
    if (modalVisible == true) {
      setanimationstate(true);
    }
  }, [modalVisible]);

  useEffect(() => {
    StatusBar.setHidden(false);
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  useEffect(() => {
    if (retaurantmenucategorydataoption?.Price != undefined) {
      setcurrentitemprice(retaurantmenucategorydataoption?.Price);
    }
  }, [retaurantmenucategorydataoption]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scrollviewref.current.scrollTo({y: 0, animated: true});
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setkeyboardopen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setkeyboardopen(false);
        console.log('Keyboard is closed' + modalVisible);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (modalVisible == true && keyboardopen == true) {
      LayoutAnimation.easeInEaseOut();
      cartitemref.current.scrollTo({y: 1000, animated: true});
    } else if (modalVisible == true && keyboardopen == false) {
      LayoutAnimation.easeInEaseOut();

      cartitemref.current.scrollTo({y: intructionslayout[1], animated: true});
    }
  }, [keyboardopen]);

  useEffect(() => {
    if (validdistance == false) {
      toast.current.show(
        'Sorry for the inconvenience. We are currently not delivering to your area. Kindly select another address.',
        {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        },
      );
      dispatch(cleardistancevalidation());
    } else if (validdistance == true && temporarycoordinates != null) {
      setlat(temporarycoordinates?.Latitude);
      setlong(temporarycoordinates?.Longitude);
      setinlat(temporarycoordinates?.Latitude);
      setinlong(temporarycoordinates?.Longitude);
      settemporarycoordinates(null);
    }
  }, [validdistance]);

  useEffect(() => {
    dispatch(pickupstate(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        if (lat != null && long != null) {
          Geocoder.from(lat, long)
            .then(json => {
              var addressComponent = json.results[0].formatted_address;
              console.log(addressComponent);
              setpinlocation(addressComponent);
              let currentaddress = [
                {
                  Latitude: lat,
                  Longitude: long,
                  icon: 'Others',
                  place: 'Others',
                  address: addressComponent,
                  note: '',
                  Street: '',
                  Floor: '',
                },
              ];

              dispatch(storecurrentaddress(currentaddress));
            })
            .catch(error => console.warn(error));
        }
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
  }, [lat, long]);

  function toggleanimation() {
    setmodalVisible(false);
    if (animationtype == 'fadeInUpBig') {
      setanimationtype('fadeOutDownBig');
    } else {
      setanimationtype('fadeInUpBig');
    }
  }

  function clearandclose() {
    // toggleanimation();
    // setanimationstate(true);
    setmodalVisible(!modalVisible);
    setcurrentitemprice(0);
    resetMultiChoiceDropDown();
    scrollviewref.current.scrollTo({y: dataSourceCords[1], animated: true});
    Keyboard.dismiss();
  }

  function updatecoordinates(lat, long) {
    setlat(lat);
    setlong(long);
    setinlat(lat);
    setinlong(long);
    getLocation();
  }
  function additemtocart() {
    let errorcaused = false;
    let arr = retaurantmenucategorydataoption;

    for (const key in arr.MenuItemOptions) {
      // console.log("yo yo" + JSON.stringify(arr.MenuItemOptions[key]))
      let found = 0;

      for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
        if (
          arr.MenuItemOptions[key].MenuItemOptionValues[item].selected == true
        ) {
          // console.log("yo yo" + JSON.stringify(arr.MenuItemOptions[key].MenuItemOptionValues))
          found = 1;
        }
      }
      if (found == 0 && arr.MenuItemOptions[key].IsRequired == true) {
        errorcaused = true;
        toast.current.show(
          arr.MenuItemOptions[key].Title + ' is a required field',
          {
            type: 'normal',
            placement: 'bottom',
            duration: 4000,
            offset: 10,
            animationType: 'slide-in',
          },
        );
      }
    }

    if (errorcaused == true) {
    } else {
      let a = [];
      arr['SpecialInstructios'] = specialinstructions;
      arr['Qty'] = count;

      a.push(arr);

      let addedprice = arr.Price;
      for (const priceindex in arr.MenuItemOptions) {
        for (const i in arr.MenuItemOptions[priceindex].MenuItemOptionValues) {
          if (
            arr.MenuItemOptions[priceindex].MenuItemOptionValues[i].selected ==
            true
          ) {
            addedprice =
              addedprice +
              arr.MenuItemOptions[priceindex].MenuItemOptionValues[i].Price;
          }
        }
      }
      arr['priceperitem'] = addedprice;
      addedprice = addedprice * count;
      arr['completeitemorderprice'] = addedprice;
      addedprice = price + addedprice;
      dispatch(storecartprice(addedprice));
      dispatch(storecartdata(a));
      console.log('this is the price' + JSON.stringify(addedprice));
      console.log('this is the data going into the cart' + JSON.stringify(arr));
      clearandclose();
      setcartvisible(true);
    }
  }

  function getnewlocation() {
    Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');

    Geolocation.getCurrentPosition(info => {
      let temporycordinates = [
        {
          Latitude: info?.coords?.latitude,
          Longitude: info?.coords?.longitude,
        },
      ];

      settemporarycoordinates(temporycordinates);

      dispatch(
        getdistancevalidation(
          restrauntdetails?.RestaurantBranchId,
          info?.coords?.latitude,
          info?.coords?.longitude,
        ),
      );
    });
  }
  const getLocation = async () => {
    const hasLocationPermission = await hasLocationPermissions();
    if (!hasLocationPermission) {
      return;
    }
  };
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

  function resetMultiChoiceDropDown() {
    let arr = retaurantmenucategorydataoption;

    for (const key in arr.MenuItemOptions) {
      for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
        arr.MenuItemOptions[key].MenuItemOptionValues[item].selected = false;
      }
    }

    dispatch(savemenucategoryoptiondetailsdata(arr));
  }
  function updateservingstate(index, arrindex) {
    console.log(arrindex);
    let selectedprice = currentitemprice;
    let arr = retaurantmenucategorydataoption;

    for (const key in arr.MenuItemOptions) {
      if (key == arrindex) {
        for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
          if (item == index) {
            console.log('hello');
            if (
              arr.MenuItemOptions[key].MenuItemOptionValues[item].selected ==
              true
            ) {
              arr.MenuItemOptions[key].MenuItemOptionValues[
                item
              ].selected = false;
              selectedprice =
                selectedprice -
                arr.MenuItemOptions[key].MenuItemOptionValues[item].Price;
            } else {
              arr.MenuItemOptions[key].MenuItemOptionValues[
                item
              ].selected = true;
              selectedprice =
                selectedprice +
                arr.MenuItemOptions[key].MenuItemOptionValues[item].Price;
            }
          } else {
            console.log('bye');
            if (
              arr.MenuItemOptions[key].MenuItemOptionValues[item].selected ==
              true
            ) {
              selectedprice =
                selectedprice -
                arr.MenuItemOptions[key].MenuItemOptionValues[item].Price;
              arr.MenuItemOptions[key].MenuItemOptionValues[
                item
              ].selected = false;
            }
            arr.MenuItemOptions[key].MenuItemOptionValues[
              item
            ].selected = false;
          }
        }
      }
    }
    // setmodaldataoptions(arr);
    setcurrentitemprice(selectedprice);
    dispatch(savemenucategoryoptiondetailsdata(arr));
    console.log('modaldataoptions' + JSON.stringify(arr));
    // console.log('arr' + JSON.stringify(arr.MenuItemOptions.MenuItemOptionValues));
  }

  function updateservingstatemultiple(index, arrindex) {
    console.log(arrindex);
    let selectedprice = currentitemprice;
    let arr = retaurantmenucategorydataoption;

    for (const key in arr.MenuItemOptions) {
      if (key == arrindex) {
        for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
          if (item == index) {
            if (
              arr.MenuItemOptions[key].MenuItemOptionValues[item].selected ==
              true
            ) {
              arr.MenuItemOptions[key].MenuItemOptionValues[
                item
              ].selected = false;
              selectedprice =
                selectedprice -
                arr.MenuItemOptions[key].MenuItemOptionValues[item].Price;
            } else {
              let count = 0;
              for (const countindex in arr.MenuItemOptions[key]
                .MenuItemOptionValues) {
                if (
                  arr.MenuItemOptions[key].MenuItemOptionValues[countindex]
                    .selected == true
                ) {
                  count = count + 1;
                }
              }

              if (
                count < arr.MenuItemOptions[key].MaxLimit ||
                arr.MenuItemOptions[key].MaxLimit == 0
              ) {
                arr.MenuItemOptions[key].MenuItemOptionValues[
                  item
                ].selected = true;
                selectedprice =
                  selectedprice +
                  arr.MenuItemOptions[key].MenuItemOptionValues[item].Price;
              }
            }
          } else {
            // console.log("bye")
            // arr.MenuItemOptions[key].MenuItemOptionValues[item].selected = false;
          }
        }
      }
    }
    // setmodaldataoptions(arr);
    setcurrentitemprice(selectedprice);
    dispatch(savemenucategoryoptiondetailsdata(arr));
    console.log('modaldataoptions' + JSON.stringify(arr));
    // console.log('arr' + JSON.stringify(arr.MenuItemOptions.MenuItemOptionValues));
  }

  const toggleSwitch = async () => {
    if (isEnabled == true) {
      setSelectBranchVisible(true);
    }
    setisEnabled(!isEnabled);
  };

  function changebranch(inneritem, key) {
    if (currentRestrauntid != inneritem?.Id) {
      // console.log("hello")
      // console.log(inneritem?.Distance + "tr")
      // console.log(inneritem)
      setDataSourceCords([]);
      dispatch(clearmenu());
      setscreenloader(true);

      dispatch(storerestrauntbasicdata(inneritem));
      dispatch(storedistance(inneritem?.Distance));
      dispatch(storecartprice(0));

      dispatch(storerestrauntid(inneritem?.Id));
      dispatch(getallrestrauntsbyid(inneritem?.Id, AuthToken));
      dispatch(getpopularcategoriesbyid(inneritem?.Id));
      dispatch(getrestrauntmenubyid(inneritem?.Id));
      dispatch(cleancart());
    }

    setSelectBranchVisible(false);
  }

  function updatespecialinstructtions(text) {
    setspecialinstructions(text);
  }

  const decrementcount = () => {
    count > 1 ? setcount(count - 1) : null;
  };

  const incrementcount = () => {
    setcount(count + 1);
  };

  const togglebranchvisible = () => {
    setSelectBranchVisible(false);
  };

  function gotocheckout() {
  

    navigation.navigate('Checkout')




  }

  function selectionofitem(item, key) {
    setmodalVisible(true);
    setselecteditemimage(item?.Image);
    setmodaldataoptions(item);
    setmodaldataoptionsindex(key);
    dispatch(savemenucategoryoptiondetailsdata(item));
    setspecialinstructions('');
    setcount(1);

   
  }

  function closebottomsheet() {
    if (Platform.OS == 'ios') {
      LayoutAnimation.spring();
    }

    setshowbottomsheet(false);
  }

  return (
    <ScreenWrapper drawer={drawerAnimationStyle} style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={
          useIsDrawerOpen()
            ? 'light-content'
            : screenloader == true
            ? 'light-content'
            : modalVisible == true
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor="transparent"
      />
      {/* {modalVisible && animationtype == 'fadeInUpBig' && ( */}
      {modalVisible && <View style={styleSheet.modalcontainer}></View>}

      <Modal
        transparent
        style={styleSheet.modalinnerview}
        statusBarTranslucent
        animationType="none"
        visible={screenloader}
        onRequestClose={() => setscreenloader(false)}>
        {/* <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <ActivityIndicator size="small" color={'red'} />
          </View> */}
        <ImageBackground
          resizeMode="stretch"
          style={styleSheet.modalinnerbackground}
          source={require('../Resources/images/restaurantloader.gif')}></ImageBackground>
      </Modal>

      <Modal
        transparent
        style={styleSheet.modalinnerview}
        statusBarTranslucent
        animationType="fade"
        visible={SelectBranchVisible}
        onRequestClose={togglebranchvisible}>
        <View style={styleSheet.modalview}>
          <View style={styleSheet.modalview2}>
            <View style={styleSheet.modalview3}>
              <Text style={styleSheet.branchtext}>Select Branch</Text>
              <TouchableOpacity onPress={togglebranchvisible}>
                <Ionicons
                  name="close-circle"
                  color={'#E14E4E'}
                  // '#F5F5F5'
                  size={fontSize.thirty}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            {/* //  branchlist */}
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              {branchlist.map((inneritem, key) => {
                return (
                  <BranchListed
                    key={key.toString()}
                    image={inneritem.Restaurant?.Logo}
                    title={inneritem?.NameAsPerTradeLicense}
                    Address={inneritem?.Address}
                    onPress={() => changebranch(inneritem, key)}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {modalVisible && (
        // <Animatable.View

        //   animation={animationstate ? animationtype : null}
        //   onAnimationEnd={() => {
        //     setanimationstate(false);

        //     if (animationtype == 'fadeOutDownBig') {

        //       setmodalVisible(false);
        //       setanimationtype('fadeInUpBig');

        //     }
        //   }}
        //   easing="ease"
        //   //  iterationCount="infinite"
        //   iterationCount={1}
        //   style={{elevation: 4000, zIndex: 4000}}
        //   >
        <View style={styleSheet.modalvisiblecontainer}>
          <KeyboardAvoidingView
            style={styleSheet.keyboardavoidingcontainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <View style={styleSheet.modalVisibleinnercontainer}>
              <View style={styleSheet.imagecontainer}>
                <View style={styleSheet.imageinnercontainer}>
                  <FastImage
                    style={styleSheet.keyboardavoidingcontainer}
                    source={{
                      uri: selecteditemimage,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                  <TouchableOpacity
                    onPress={() => clearandclose()}
                    style={styleSheet.closemodalbutton}>
                    <Ionicons
                      name="close-circle"
                      color={'#E14E4E'}
                      size={fontSize.thirtyseven}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styleSheet.modalcontentview}>
                  <AnimatedScrollView
                    keyExtractor={(item, index) =>
                      index.toString() + 'keyExtractor'
                    }
                    ref={cartitemref}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent:
                        retaurantmenucategorydataoption.MenuItemOptions.length >
                        0
                          ? 'space-evenly'
                          : null,
                    }}>
                    <View>
                      <View style={styleSheet.modalinnermostview}>
                        <Text
                          onLayout={event => {
                            const layout = event.nativeEvent.layout;

                            intructionslayout[1] = layout.y;
                          }}
                          style={styleSheet.text3}>
                          {retaurantmenucategorydataoption?.Name}
                        </Text>
                        <Text style={styleSheet.text4}>
                          {'AED '}
                          {(currentitemprice * count).toFixed(2)}
                          {/* { retaurantmenucategorydataoption?.Price.toFixed(2)} */}
                        </Text>
                      </View>

                      <Text style={styleSheet.text5}>
                        {retaurantmenucategorydataoption?.Description.trim()}
                      </Text>
                      <View style={styleSheet.modaltextview} />
                    </View>
                    {retaurantmenucategorydataoption?.MenuItemOptions?.length >
                      0 &&
                      retaurantmenucategorydataoption.MenuItemOptions?.map(
                        (item, key) => {
                          return item?.IsRadioButton == true ? (
                            item?.MenuItemOptionValues[0].Price != 0.0 ? (
                              <View key={key.toString()}>
                                <MultiChoiceDropDown
                                  title={item?.Title}
                                  IsRequired={item?.IsRequired}
                                  data={item?.MenuItemOptionValues}
                                  index={key}
                                  update={updateservingstate}
                                />
                                <View style={styleSheet.modaltextview} />
                              </View>
                            ) : (
                              <View key={key.toString()}>
                                {/* <Mltichoicehorizontallist
                                    title={item?.Title}
                                    IsRequired={item?.IsRequired}
                                    data={item?.MenuItemOptionValues}
                                    index={key}
                                    update={updateservingstate}
                                  /> */}
                                <MultiChoiceDropDown
                                  title={item?.Title}
                                  IsRequired={item?.IsRequired}
                                  data={item?.MenuItemOptionValues}
                                  index={key}
                                  update={updateservingstate}
                                />
                                <View style={styleSheet.modaltextview} />
                              </View>
                            )
                          ) : (
                            /////////////// multiple selection data
                            <View key={key.toString()}>
                              <MultiChoiceDropDownWithMultipleSelection
                                title={item?.Title}
                                MaxLimit={item?.MaxLimit}
                                IsRequired={item?.IsRequired}
                                data={item?.MenuItemOptionValues}
                                index={key}
                                update={updateservingstatemultiple}
                              />
                              <View style={styleSheet.modaltextview} />
                            </View>
                          );
                        },
                      )}

                    <View>
                      <View style={styleSheet.modaltextview} />
                      <Text style={styleSheet.text8}>Special Instructions</Text>
                      <View style={styleSheet.modaltextview} />
                      <TextInput
                        multiline
                        value={specialinstructions}
                        onChangeText={text => updatespecialinstructtions(text)}
                        placeholder={'Type here'}
                        style={styleSheet.specialinstructionstextstyle}
                      />
                      <View style={styleSheet.space3} />
                      <Text
                        onLayout={event => {
                          const layout = event.nativeEvent.layout;

                          intructionslayout[0] = layout.y;
                        }}
                        style={styleSheet.textcolorwhite}>
                        {' '}
                        {retaurantmenucategorydataoption?.Name}
                      </Text>
                    </View>
                    {keyboardopen ? <View style={styleSheet.space3} /> : null}
                  </AnimatedScrollView>
                </View>
                <View style={styleSheet.keyboardopenview}>
                  {keyboardopen != true ? (
                    <View style={styleSheet.keyboardclosedview}>
                      <TouchableOpacity
                        disabled={count > 1 ? false : true}
                        onPress={decrementcount}>
                        <AntDesign
                          name="minuscircle"
                          color={
                            count > 1 ? '#E14E4E' : 'rgba(128, 128,128, 0.4)'
                          }
                          size={fontSize.thirty}
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
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: fontSize.thirteen,
                            color: 'black',
                          }}>
                          {count}
                        </Text>
                      </View>

                      <TouchableOpacity onPress={incrementcount}>
                        <AntDesign
                          name="pluscircle"
                          color={'#E14E4E'}
                          size={fontSize.thirty}
                          style={{}}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <MYButton
                    color={'#E14E4E'}
                    title={'Add To Cart'}
                    textcolor={'white'}
                    onPress={additemtocart}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        //  </Animatable.View>
      )}

      {cartvisible && (
        // <Animatable.View
        //   animation={'fadeInUpBig'}
        //   easing="ease"
        //   //  iterationCount="infinite"
        //   iterationCount={1}
        //   style={{
        //     bottom: scalableheight.two,
        //     position: 'absolute',
        //     width: '90%',
        //     backgroundColor: '#E14E4E',
        //     zIndex: 2,
        //     alignSelf: 'center',
        //     borderRadius: fontSize.eleven,
        //     paddingVertical: scalableheight.one,
        //     paddingHorizontal: scalableheight.two,
        //   }}>
        <View style={styleSheet.cartview}>
          <TouchableOpacity
            disabled={restrauntdetails?.IsClose}
            onPress={gotocheckout}
            style={styleSheet.innercartview}>
            {restrauntdetails?.IsClose != true ? (
              <>
                <View>
                  <View style={styleSheet.innercartview2}>
                    <View style={styleSheet.cartviewcontainer}>
                      <Text style={styleSheet.text9}>{cartdata?.length}</Text>
                    </View>
                    <View>
                      <Text style={styleSheet.carttext}>Items in Cart</Text>
                      <Text style={styleSheet.cartpricetext}>
                        AED {price?.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styleSheet.cartcontainer2}>
                  <Text style={styleSheet.text10}>Checkout</Text>
                </View>
              </>
            ) : (
              <View style={styleSheet.cartcontainerview3}>
                <Text style={styleSheet.text11}>
                  {restrauntdetails?.ClosingTimeSpan == null
                    ? 'Currently restaurant is closed for online order.'
                    : `Currently restaurant is closed! Online order will start at ${restrauntdetails?.ClosingTimeSpan}`}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        // </Animatable.View>
      )}

      <AnimatedScrollView
        key="1"
        bounces={false}
        useNativeDriver={true}
        keyExtractor={(item, index) => index.toString() + 'keyExtractor'}
        ref={scrollviewref}
        scrollEventThrottle={1}
        snapToOffsets={[
          0,
          isEnabled
            ? getStatusBarHeight() + scalableheight.fourtysix
            : getStatusBarHeight() + scalableheight.fourtyseven,
        ]}
        snapToEnd={false}
        //   snapToAlignment="start"
        decelerationRate={'normal'}
        //  snapToInterval={isEnabled ? getStatusBarHeight() + scalableheight.fourtysix :  getStatusBarHeight() + scalableheight.fourtyseven}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            listener: event => {
              //  LayoutAnimation.easeInEaseOut();
              let y = event.nativeEvent.contentOffset.y;
              if (dataSourceCords.length > 0) {
                let closest = dataSourceCords[1];
                for (let item of dataSourceCords) {
                  if (
                    Math.abs(item - (y - scalableheight.sixtyfive)) <
                    Math.abs(closest - (y - scalableheight.sixtyfive))
                  ) {
                    closest = item;
                  }
                }

                for (const index in dataSourceCords) {
                  if (dataSourceCords[index] == closest) {
                    if (restrauntmenu[index - 1]?.visible != true) {
                      let data = [...restrauntmenu];
                      for (const index in data) {
                        data[index].visible = false;
                      }
                      data[index - 1].visible = true;

                      dispatch(updatedmenuselection(data));
                      scrollviewhorizontalref.current?.scrollToIndex({
                        index: index - 1,
                        animated: true,
                      });
                      // scrollviewhorizontalref.current?.scrollToIndex({
                      //   index: inreview,
                      //   animated: true,
                      // })
                      //  scrollviewhorizontalref.current.scrollTo({ y: dataSourceCordsHorizontal[0], animated: true });
                    }
                  }
                }
              }
            },
          },
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}
        style={styleSheet.mainscrollviewcontainer}>
        <>
          <DynamicHeader
            pinlocation={pinlocation}
            showlocation={() => {
              if (Platform.OS == 'ios') {
                LayoutAnimation.spring();
              }
              setshowbottomsheet(!showbottomsheet);
            }}
            search={val => {
              setsearch(val);
            }}
            animHeaderValue={scrollOffsetY}
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
            openbranchlist={() => {
              setSelectBranchVisible(true);
            }}
            pickupstate={isEnabled}
            scrollmeto={(index, item) => {
              console.log(index);
              console.log(item?.CategoryId);
              console.log(item?.CategoryName);

              for (const key in restrauntmenu) {
                if (restrauntmenu[key].CategoryId == item?.CategoryId) {
                  console.log(key + 'found');
                  console.log(dataSourceCords[key] + 'found');

                  scrollviewref.current.scrollTo({
                    y:
                      dataSourceCords[parseInt(key) + 1] +
                      scalableheight.fourtynine,
                    animated: true,
                  });
                }
              }
            }}
          />

          <View
            style={{
              paddingHorizontal: scalableheight.one,
              paddingBottom: cartvisible ? scalableheight.tweleve : null,
            }}>
            {restrauntmenu.length > 0
              ? restrauntmenu.map((item, key) => {
                  return (
                    <View
                      key={key.toString()}
                      onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[key + 1] = layout.y; // we store this offset values in an array
                      }}>
                      {/* <> */}
                      {search == '' && (
                        <Text style={styleSheet.heading}>
                          {item?.CategoryName}{' '}
                        </Text>
                      )}
                      {item?.Items?.map((item, key) => {
                        return item?.Name.toLowerCase().includes(
                          search.trim().toLowerCase(),
                        ) ? (
                          <View
                            key={key.toString() + item?.Name}
                            style={{width: '100%', alignItems: 'center'}}>
                            <Starters
                              image={item?.Image}
                              title={item?.Name}
                              description={item?.Description}
                              price={item?.Price}
                              onPress={() => selectionofitem(item, key)}
                            />
                          </View>
                        ) : null;
                      })}
                      {/* </> */}
                    </View>
                  );
                })
              : null}
          </View>
        </>
      </AnimatedScrollView>
      {restrauntmenu.length > 0 ? (
        <DynamicScrolledupheader
          scrollviewhorizontalref={scrollviewhorizontalref}
          //    pinlocation ={pinlocation}
          // showlocation={() => {
          //   setshowbottomsheet(true)
          //  }}
          scrolltocategory={index => {
            if (dataSourceCords.length > 0) {
              console.log(dataSourceCords[index]);

              scrollviewref.current.scrollTo({
                y: dataSourceCords[index + 1] + scalableheight.fourtynine,
                animated: true,
              });

              let data = [...restrauntmenu];

              for (const index in data) {
                data[index].visible = false;
              }
              data[index].visible = true;
              dispatch(updatedmenuselection(data));
            }
          }}
          animHeaderValue={scrollOffsetY}
          dataSourceCordsHorizontal={dataSourceCordsHorizontal}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        />
      ) : null}

      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPressnewCoordinates={(a, b) => updatecoordinates(a, b)}
        onPress={closebottomsheet}
        onPressnewlocation={getnewlocation}
        latitude={lat}
        longitude={long}
        withvalidation={true}
        branchid={restrauntdetails?.RestaurantBranchId}
      />
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </ScreenWrapper>
  );
};

const styleSheet = StyleSheet.create({
  modalcontainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F6F6',
    zIndex: 1200,
    elevation: 1200,
  },
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
    fontSize: fontSize.sixteen,
    paddingTop: scalableheight.one,
    paddingBottom: scalableheight.two,
    marginLeft: scalableheight.one,
  },
  modalinnerview: {
    width: '100%',
    height: '100%',
    // zIndex: 1,
    // elevation: 1,
    // position: 'absolute',
  },
  modalinnerbackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  modalview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalview2: {
    width: '90%',
    //   height: '40%',
    maxHeight: '40%',
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    paddingVertical: scalableheight.one,
    paddingHorizontal: scalableheight.two,
  },
  modalview3: {
    width: '100%',
    height: scalableheight.five,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  branchtext: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.sixteen,
    color: '#111111',
  },
  modalvisiblecontainer: {elevation: 4000, zIndex: 4000},
  keyboardavoidingcontainer: {width: '100%', height: '100%'},
  modalVisibleinnercontainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: getStatusBarHeight()
  },
  imagecontainer: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.eleven,
    backgroundColor: '#F6F6F6',
    overflow: 'hidden',
  },
  imageinnercontainer: {width: '100%', height: '30%'},
  closemodalbutton: {
    position: 'absolute',

    right: scalableheight.one,
    top: getStatusBarHeight(),
  },
  modalcontentview: {
    width: '100%',
    height: '53%',
    padding: scalableheight.two,
  },
  modalinnermostview: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: scalableheight.one,
  },
  text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: 'black',
  },
  text4: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.thirteen,

    color: '#E14E4E',
  },
  text5: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.fourteen,
    color: 'black',
    textAlign: 'justify',
  },
  modaltextview: {height: scalableheight.one},
  text8: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.thirteen,
    color: 'black',
    opacity: 0.4,
  },
  specialinstructionstextstyle: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '98%',
    height: scalableheight.fifteen,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',

    textAlignVertical: 'top',
  },
  space3: {height: scalableheight.three},
  textcolorwhite: {color: '#F6F6F6'},
  keyboardopenview: {
    position: 'absolute',
    bottom: scalableheight.two,
    width: '100%',
    paddingHorizontal: scalableheight.two,
  },
  keyboardclosedview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginBottom: scalableheight.two,
  },
  cartview: {
    bottom: scalableheight.two,
    position: 'absolute',
    width: '95%',
    backgroundColor: '#E14E4E',
    zIndex: 2,
    alignSelf: 'center',
    borderRadius: fontSize.eleven,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.two,
  },
  innercartview: {flexDirection: 'row', justifyContent: 'space-between'},
  innercartview2: {flexDirection: 'row', alignItems: 'center'},
  cartviewcontainer: {
    width: scalableheight.four,
    height: scalableheight.four,
    backgroundColor: 'white',
    borderRadius: fontSize.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text9: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
  },
  carttext: {
    marginLeft: scalableheight.one,
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
  },
  cartpricetext: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    opacity: 0.6,
    marginLeft: scalableheight.one,
  },
  cartcontainer2: {height: '100%', justifyContent: 'center'},
  text10: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
  },
  cartcontainerview3: {
    alignItems: 'center',
    width: '100%',
  },
  text11: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.fourteen,
    textAlign: 'center',
  },
  mainscrollviewcontainer: {
    backgroundColor: '#F6F6F6',
    marginBottom: Platform.OS == 'ios' ? scalableheight.two : null,
  },
});
export default Restaurantpage;
