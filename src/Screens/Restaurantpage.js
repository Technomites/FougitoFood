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
} from 'react-native';
// import Animated from 'react-native-reanimated';
import HeaderComponentRestaurant from '../Shared/Components/HeaderComponentRestaurant';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DynamicHeader from '../Shared/Components/DynamicHeader';
import DynamicScrolledupheader from '../Shared/Components/DynamicScrolledupheader';
import BranchListed from '../Shared/Components/BranchListed';
import FastImage from 'react-native-fast-image'
import MultiChoiceDropDownWithMultipleSelection from '../Shared/Components/MultiChoiceDropDownWithMultipleSelection';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontSize, scalableheight} from '../Utilities/fonts';
import renderIf from 'render-if';
import Starters from '../Shared/Components/Starters';
import ScreenWrapper from '../Shared/Components/ScreenWrapper';
import Infobar from '../Shared/Components/Infobar';
import Toast from 'react-native-toast-notifications';
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
// import  {Animated as DrawerAnimated} from 'react-native-reanimated';
// import Animated,{interpolate} from 'react-native-reanimated';

import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MultiChoiceDropDown from '../Shared/Components/MultiChoiceDropDown';
import MYButton from '../Shared/Components/MYButton';
import Custombottomsheet from '../Shared/Components/Custombottomsheet';
import Mltichoicehorizontallist from '../Shared/Components/Mltichoicehorizontallist';
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
  clearmenu
} from '../Actions/actions';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
  const [SelectBranchVisible, setSelectBranchVisible] = useState(false);
  const [count, setcount] = useState(1);
  const [lat, setlat] = useState(route?.params?.latitude);
  const [long, setlong] = useState(route?.params?.longitude);
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [pinlocation, setpinlocation] = useState('');

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
    currentRestrauntid
 
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const animatedtop =  scrollOffsetY.interpolate({
      inputRange: [0, getStatusBarHeight() + scalableheight.tweleve],
      outputRange: [0 , getStatusBarHeight() + scalableheight.tweleve],
      extrapolate: 'clamp',
      useNativeDriver: true 
    })
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
   
  


    useEffect(() => {
     
      if(AuthToken != ""){
        dispatch(getallrestrauntsbyid(restrauntdetails?.RestaurantBranchId, AuthToken));
      }
   
  
    }, [AuthToken]);

    useEffect(() => {
      if(addedtofavourite == "Success"){
       
        toast.current.show(restrauntdetails?.Isfavourite ? "Removed From Whishlist" : "Added To Whishlist", {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
        });
        dispatch(getallrestrauntsbyid(restrauntdetails?.RestaurantBranchId, AuthToken));
    dispatch(clearfavourite())
        
      }
     
  
    }, [addedtofavourite]);

   
  
    useEffect(() => {
      if(restrauntdetails?.RestaurantBranchId != undefined){
        dispatch(getpopularcategoriesbyid(restrauntdetails?.RestaurantBranchId))
        dispatch(getrestrauntmenubyid(restrauntdetails?.RestaurantBranchId))
        dispatch(getallrestaurantbranches(restrauntdetails?.RestaurantId))
        
      }
     
  
    }, [restrauntdetails]);
  
    useEffect(() => {
     
      if(cartdata.length > 0 || restrauntdetails?.IsClose == true){
        setcartvisible(true)
      }else{
        setcartvisible(false)
     
      }

    }, [cartdata, restrauntdetails]);
  
    useEffect(() => {
      if(restrauntmenu.length > 0){
        setscreenloader(false)
    
        
      }
     
  
    }, [restrauntmenu]);


 

  useEffect(() => {
    if (restrauntdetails?.RestaurantBranchId != undefined) {
      dispatch(getpopularcategoriesbyid(restrauntdetails?.RestaurantBranchId));
      dispatch(getrestrauntmenubyid(restrauntdetails?.RestaurantBranchId));
    }
  }, [restrauntdetails]);

 

 

  
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
      if(retaurantmenucategorydataoption?.Price != undefined){
        setcurrentitemprice(retaurantmenucategorydataoption?.Price)
      }
 

    
    }, [retaurantmenucategorydataoption]);
  
  
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
     
        scrollviewref.current.scrollTo({ y: 0 , animated: true, });
      });
      return unsubscribe;
    }, [navigation]);
    
  
   
  
 
    useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // hideNavigationBar();
        setkeyboardopen(true)
        console.log('Keyboard is open');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // hideNavigationBar();
        setkeyboardopen(false)
        console.log('Keyboard is closed');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  
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
  
    function toggleanimation() {
      setmodalVisible(false)
      if (animationtype == 'fadeInUpBig') {
        setanimationtype('fadeOutDownBig');
      } else {
        setanimationtype('fadeInUpBig');
      }
    }
  
    function clearandclose() {
     
      toggleanimation();
      setanimationstate(true);
      setcurrentitemprice(0)
      resetMultiChoiceDropDown()
      scrollviewref.current.scrollTo({ y: dataSourceCords[1] , animated: true, });
      Keyboard.dismiss();
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
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setpinlocation(addressComponent);
      })
      .catch(error => console.warn(error));
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

  // const rendertypes = ({item, index}) => (
  //   <TouchableOpacity
  //     onPress={() => {
  //       console.log(dataSourceCords[index]);

  //       scrollviewref.current.scrollTo({
  //         y: dataSourceCords[index + 1],
  //         animated: true,
  //       });

  //       let data = [...restrauntmenu];
  //       for (const index in data) {
  //         data[index].visible = false;
  //       }
  //       data[index].visible = true;
  //       dispatch(updatedmenuselection(data));
  //     }}
  //     style={{
  //       backgroundColor: 'transparent',
  //       paddingHorizontal: scalableheight.three,
  //       alignItems: 'center',
  //       height: '100%',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}>
  //     <Text
  //       onLayout={event => {
  //         const layout = event.nativeEvent.layout;
  //         dataSourceCordsHorizontal[index] = layout.x; // we store this offset values in an array
  //       }}
  //       style={{
  //         fontFamily: 'Inter-SemiBold',
  //         color: item.visible ? '#E14E4E' : 'rgba(211,211,211, 0.9)',
  //         fontSize: fontSize.fifteen,
  //         paddingVertical: scalableheight.one,
  //         borderBottomWidth: item.visible ? 1 : 0,
  //         borderColor: '#E14E4E',
  //       }}>
  //       {item?.CategoryName}
  //     </Text>
  //   </TouchableOpacity>
  // );

  function resetMultiChoiceDropDown(){
   
    let arr = retaurantmenucategorydataoption;

    for (const key in arr.MenuItemOptions) {
   
        for (const item in arr.MenuItemOptions[key].MenuItemOptionValues) {
     
   
      
            arr.MenuItemOptions[key].MenuItemOptionValues[
              item
            ].selected = false;
       
        }
      
    }
  
    dispatch(savemenucategoryoptiondetailsdata(arr));

  }
  function updateservingstate(index, arrindex) {
    console.log(arrindex);
    let selectedprice = currentitemprice
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
               selectedprice = selectedprice - arr.MenuItemOptions[key].MenuItemOptionValues[item].Price
            } else {
              arr.MenuItemOptions[key].MenuItemOptionValues[
                item
              ].selected = true;
              selectedprice= selectedprice + arr.MenuItemOptions[key].MenuItemOptionValues[item].Price
            }
          } else {
            console.log('bye');
            if( arr.MenuItemOptions[key].MenuItemOptionValues[
              item
            ].selected == true){
              selectedprice = selectedprice - arr.MenuItemOptions[key].MenuItemOptionValues[item].Price
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
    setcurrentitemprice(selectedprice)
    dispatch(savemenucategoryoptiondetailsdata(arr));
    console.log('modaldataoptions' + JSON.stringify(arr));
    // console.log('arr' + JSON.stringify(arr.MenuItemOptions.MenuItemOptionValues));
  }

  function updateservingstatemultiple(index, arrindex) {
    console.log(arrindex);
    let selectedprice = currentitemprice
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
              selectedprice= selectedprice - arr.MenuItemOptions[key].MenuItemOptionValues[item].Price
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
                selectedprice= selectedprice + arr.MenuItemOptions[key].MenuItemOptionValues[item].Price
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
    setcurrentitemprice(selectedprice)
    dispatch(savemenucategoryoptiondetailsdata(arr));
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

  }

  const toggleSwitch = async () => {
    if(isEnabled == true){
      setSelectBranchVisible(true)
    }
    setisEnabled(!isEnabled);

  };
  return (
    <ScreenWrapper drawer={drawerAnimationStyle} style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={
          useIsDrawerOpen()
            ? 'light-content'
            : screenloader == true
            ? 'dark-content'
            : modalVisible == true
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor="transparent"
      />
      {/* {modalVisible && animationtype == 'fadeInUpBig' && ( */}
      {modalVisible && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 2,
            elevation: 2,
          }}></View>
      )}

      <Modal
        transparent
        style={{
          width: '100%',
          height: '100%',
          // zIndex: 1,
          // elevation: 1,
          // position: 'absolute',
        }}
        statusBarTranslucent
        animationType="slide"
        visible={screenloader}
        onRequestClose={() => setscreenloader(false)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <ActivityIndicator size="small" color={'red'} />
          </View>
        </Modal>


        <Modal
        transparent
        style={{
          width: '100%',
          height: '100%',
          // zIndex: 1,
          // elevation: 1,
          // position: 'absolute',
        }}
        statusBarTranslucent
        animationType="fade"
        visible={SelectBranchVisible}
        onRequestClose={() => setSelectBranchVisible(false)}>
          <View style={{height:"100%", width:"100%", justifyContent:"center", alignItems:"center", backgroundColor:'rgba(0,0,0,0.8)', }}>
          <View
              style={{
                width: '90%',
                //   height: '40%',
                maxHeight: '40%',
                borderRadius: fontSize.eleven,
                backgroundColor: 'white',
                paddingVertical: scalableheight.one,
                paddingHorizontal: scalableheight.two,
              
              }}>
          <View style={{width:"100%", height: scalableheight.five,  alignItems:"center", justifyContent:"space-between", flexDirection:"row" }}> 
          <Text style={{

fontFamily: 'Inter-Medium',
fontSize: fontSize.sixteen,
color: '#111111',
          }}>Select Branch</Text>
          <TouchableOpacity
                    onPress={() => {
                      setSelectBranchVisible(false)
                    
                    }}
                    style={{
                      // position: 'absolute',
                      // top: scalableheight.one,
                      // right: scalableheight.one,
                    }}>
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
               
            
                   
                        {branchlist.map(inneritem => {
                          return  (
                        <BranchListed
                        image={inneritem.Restaurant?.Logo}
                        title={inneritem?.NameAsPerTradeLicense}
                        Address={inneritem?.Address}
                 


                      
                        onPress={() => {


if (currentRestrauntid != inneritem?.Id) {
 
  // console.log("hello")
  // console.log(inneritem?.Distance + "tr")
  // console.log(inneritem)
  setDataSourceCords([])
  dispatch(clearmenu())  
  setscreenloader(true)


  dispatch(storerestrauntbasicdata(inneritem));
dispatch(storedistance(inneritem?.Distance));
  dispatch(storecartprice(0));

   dispatch(storerestrauntid(inneritem?.Id));
  dispatch(getallrestrauntsbyid(inneritem?.Id, AuthToken));
 dispatch(getpopularcategoriesbyid(inneritem?.Id))
  dispatch(getrestrauntmenubyid(inneritem?.Id))
  dispatch(cleancart());
}

                        setSelectBranchVisible(false)
                        }}
                    
                      />
                          ) 
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
          <View style={{elevation: 4000, zIndex: 4000}}>
            <KeyboardAvoidingView
              style={{width: '100%', height: '100%'}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: getStatusBarHeight()
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: fontSize.eleven,
                    backgroundColor: 'white',
                    overflow: 'hidden',
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

                    {/* <View
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
                      <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Inter-SemiBold',
                                fontSize: fontSize.fourteen,
                              }}>
                              {(currentitemprice * count).toFixed(2)}
                            </Text>
                    
                    </View> */}

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
                        justifyContent:
                          retaurantmenucategorydataoption.MenuItemOptions
                            .length > 0
                            ? 'space-evenly'
                            : null,
                      }}>
                      <View>
                        <View style={{alignItems: "center", justifyContent:"space-between", flexDirection:"row", marginBottom:scalableheight.one}}>
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
                            fontFamily: 'Inter-Bold',
                            fontSize: fontSize.thirteen,
                         
                            color: '#E14E4E',
                          }}>
                    { "AED "}{(currentitemprice * count).toFixed(2)}
                         {/* { retaurantmenucategorydataoption?.Price.toFixed(2)} */}
                        </Text>
                        </View>
                        
                        <Text
                          style={{
                            fontFamily: 'Inter-Medium',
                            fontSize: fontSize.fourteen,
                            color: 'black',
                            textAlign:"justify"
                          }}>
                          {retaurantmenucategorydataoption?.Description.trim()}
                        </Text>
                        <View style={{height: scalableheight.one}} />
                      </View>
                      {retaurantmenucategorydataoption?.MenuItemOptions
                        ?.length > 0 &&
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
                                  <View style={{height: scalableheight.one}} />
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
                                  <View style={{height: scalableheight.one}} />
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
                                <View style={{height: scalableheight.one}} />
                              </View>
                            );
                          },
                        )}

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
                         <View style={{height: scalableheight.three, }} />
                      </View>
                      {keyboardopen ? (
                        <View style={{height: scalableheight.three}} />
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
                          <Text style={{
  fontFamily: 'Inter-SemiBold',
  fontSize: fontSize.thirteen,
  color: 'black',


                          }}>{count}</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                          
                            setcount( count + 1);
                          }}>
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
                      onPress={() => {
                        additemtocart();
                      }}
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
        <View
          style={{
            bottom: scalableheight.two,
            position: 'absolute',
            width: '95%',
            backgroundColor: '#E14E4E',
            zIndex: 2,
            alignSelf: 'center',
            borderRadius: fontSize.eleven,
            paddingVertical: scalableheight.two,
            paddingHorizontal: scalableheight.two,
          }}>
          <TouchableOpacity
          disabled={restrauntdetails?.IsClose}
            onPress={() => {
              navigation.navigate('Checkout');
            }}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {restrauntdetails?.IsClose != true ?
              <>
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
                <View>
                <Text
                  style={{
                    marginLeft: scalableheight.one,
                    color: 'white',
                    fontFamily: 'Inter-Bold',
                    fontSize: fontSize.fourteen,
                  }}>
                  Items in Cart
                </Text>
                <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Medium',
                  fontSize: fontSize.twelve,
                  opacity: 0.6,
                  marginLeft: scalableheight.one,
                }}>
                AED {price?.toFixed(2)}
              </Text>
              </View>
              </View>
             
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
            </>
            :
            <View style={{
              alignItems:"center",
  width:"100%"
            }}>
            <Text 
            style={{
              color: 'white',
              fontFamily: 'Inter-Medium',
              fontSize: fontSize.fourteen,
              textAlign:"center",
             
            }}
            >{restrauntdetails?.ClosingTimeSpan == null ? "Currently restaurant is closed for online order." : `Currently restaurant is closed! Online order will start at ${restrauntdetails?.ClosingTimeSpan}`}</Text>
            </View>
            }
          </TouchableOpacity>
        </View>
        // </Animatable.View>
      )}

      {/* <View style={{position:"absolute",backgroundColor: "transparent", paddingTop: getStatusBarHeight(), elevation: 3000, zIndex:3000}}>
     
         <HeaderComponentRestaurant
                  // newNotificationCount={newNotificationCount}
                  isEnabled={isEnabled}
                  toggleSwitch={toggleSwitch}
                />
          </View> */}

      <AnimatedScrollView
      key = "1"
        bounces={false}
        useNativeDriver={true}
        keyExtractor={(item, index) => index.toString()}
        ref={scrollviewref}

//         slideStyle={{ width: viewportWidth }}
// inactiveSlideOpacity={1}
// inactiveSlideScale={1}
        scrollEventThrottle={1}
        snapToAlignment="start"
        decelerationRate={'normal'}
    
        snapToInterval={isEnabled ? getStatusBarHeight() + scalableheight.fourtysix :  getStatusBarHeight() + scalableheight.fourtyseven}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            listener: event => {
              //  LayoutAnimation.easeInEaseOut();
              let y = event.nativeEvent.contentOffset.y;
              if(dataSourceCords.length > 0){
              let closest = dataSourceCords[1];
              for (let item of dataSourceCords) {
                if (
                  Math.abs(item - y) <
                  Math.abs(closest - y) - scalableheight.fourtynine
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
              }}

            },
          },
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#F6F6F6',
          // paddingHorizontal: scalableheight.one,
          //  marginTop: animatedtop
        }}>
        <>
          <DynamicHeader
            pinlocation={pinlocation}
            showlocation={() => {
              setshowbottomsheet(true);
            }}
            search={val => {
              setsearch(val);
            }}
            animHeaderValue={scrollOffsetY}
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}

        
            openbranchlist={()=>{
              setSelectBranchVisible(true)
            }}
            pickupstate ={isEnabled}
            scrollmeto={(index, item)=>{
           console.log(index)
           console.log(item?.CategoryId)
           console.log(item?.CategoryName)
           
          
           for (const key in restrauntmenu){
            if(restrauntmenu[key].CategoryId == item?.CategoryId){
console.log(key + "found")
console.log(dataSourceCords[key] + "found");

scrollviewref.current.scrollTo({
  y: dataSourceCords[parseInt(key) + 1] + scalableheight.fourtynine,
  animated: true,
});

// let data = [...restrauntmenu];

// for (const index in data) {
//   data[index].visible = false;
// }
// data[key].visible = true;
// dispatch(updatedmenuselection(data));
            }
           }
           
            }}
      
          />

  


          <View style={{paddingHorizontal: scalableheight.one}}>
          {restrauntmenu.length > 0 ?
          (
          
            restrauntmenu.map((item, key) => {
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
                        key={key.toString()}
                        style={{width: '100%', alignItems: 'center'}}>
                        <Starters
                          image={item?.Image}
                          title={item?.Name}
                          description={item?.Description}
                          price={item?.Price}
                          onPress={() => {
                            setselecteditemimage(item?.Image);
                            setmodaldataoptions(item);
                            setmodaldataoptionsindex(key);
                            dispatch(savemenucategoryoptiondetailsdata(item));
                            setspecialinstructions('');
                            setcount(1);
                        
                            setmodalVisible(true);
                          }}
                        />
                      </View>
                    ) : null;
                  })}
                  {/* </> */}
                </View>
              );
            })) :null
          }
          </View>
        </>
      </AnimatedScrollView>
      {restrauntmenu.length > 0 ?
          (
      <DynamicScrolledupheader
        scrollviewhorizontalref={scrollviewhorizontalref}
        //    pinlocation ={pinlocation}
        // showlocation={() => {
        //   setshowbottomsheet(true)
        //  }}
        scrolltocategory={index => {
          if(dataSourceCords.length > 0){
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
      ) :null}
      
      {/* <View style={{backgroundColor:"#201F1F", position:"absolute", top: 0, width:"100%", height: scalableheight.tweleve + getStatusBarHeight() , zIndex: -2, elevation:-2, paddingTop: getStatusBarHeight() + scalableheight.ten}}>
<AnimatedFlatList
              key={"1"}
                keyExtractor={(item, index) => index.toString()}
                ref={scrollviewhorizontalref}
                overflow={'hidden'}
                useNativeDriver = {true}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                style={{
                  width: '100%',
                  //  height: scalableheight.fourteen,
                  flexDirection: 'row',
                   backgroundColor: 'transparent',
                    //  marginTop: animatedtop ,
                  position:"absolute", top: scalableheight.tweleve,
                  // backgroundColor: '#F6F6F6',
                  // borderWidth:1, borderColor:"red"
             
                }}
                data={restrauntmenu}
                renderItem={rendertypes}
                
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              /> 
</View> */}

      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPressnewCoordinates={(a, b) => {
          updatecoordinates(a, b);
        }}
        onPress={() => {
          setshowbottomsheet(false);
        }}
        onPressnewlocation={() => {
          getnewlocation();
        }}
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
    fontSize: fontSize.sixteen,
    paddingTop: scalableheight.one,
    paddingBottom: scalableheight.two,
    marginLeft: scalableheight.one,
    // borderWidth:1, borderColor:"red"
  },
});
export default Restaurantpage;
