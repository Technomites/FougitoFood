import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Linking,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import renderIf from 'render-if';
import {
  filteredcatdata,
  storecartprice,
  createorder,
  verifycoupon,
  clearcouponresponse,
  clearorderplacementstatus,
  cleancart,
  CartDetails,
  updatepriceafterdiscount,
  clearcardorderplacementstatus,
  storeorderid,
} from '../Actions/actions';
import Toast from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Validations from '../Validations/Validations';
import {fontSize, scalableheight} from '../Utilities/fonts';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import ItemDetails from '../Shared/Components/ItemDetails';
import Addresstile from '../Shared/Components/Addresstile';
import Bll from '../Shared/Components/Bll';
import MYButton from '../Shared/Components/MYButton';

import ItemDetailsModel from '../Shared/Components/ItemDetailsModel';
import AuthenticationModel from '../Shared/Components/AuthenticationModel';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
import PaymentOptions from '../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';
const Checkout = ({navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const [modalVisible, setmodalVisible] = useState(false);
  const [itemmodalVisible, setitemmodalVisible] = useState(false);
  const [itemmodaldata, setitemmodaldata] = useState([]);
  const [number, setnumber] = useState('');
  const [fullname, setfullname] = useState('');
  const [password, setpassword] = useState('');
  const [newpasswordshow, setnewpasswordshow] = useState(false);
  const [loginvisible, setloginvisible] = useState(true);
  const [signupvisible, setsignupvisible] = useState(false);
  const [otpvisible, setotpvisible] = useState(false);
  const [timeractive, settimeractive] = useState(false);
  const [couponvalue, setcouponvalue] = useState('');
  const [forgetpasswordvisible, setforgetpasswordvisible] = useState(false);
  const [animationstate, setanimationstate] = useState(true);
  const [codeOneActive, setCodeOneActive] = useState(false);
  const [codeTwoActive, setCodeTwoActive] = useState(false);
  const [codeThreeActive, setCodeThreeActive] = useState(false);
  const [codeFourActive, setCodeFourActive] = useState(false);
  const [codeOne, setCodeOne] = useState('');
  const [codeTwo, setCodeTwo] = useState('');
  const [codeThree, setCodeThree] = useState('');
  const [notetorider, setnotetorider] = useState('');
  const [buildingdetails, setbuildingdetails] = useState('');
  const [plotnodetails, setplotnodetails] = useState('');
  const [pinlatitude, SetPinLatitude] = useState(0);
  const [pinLongitude, SetPinLongitude] = useState(0);
  const [hidemarker, sethidemarker] = useState(false);
  const [pinlocation, setpinlocation] = useState('');
  const [couponloader, setcouponloader] = useState(false);

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [couponvisible, setcouponvisible] = useState(false);
  const [modalVisiblepayment, setmodalVisiblepayment] = useState(false);

  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);

  const [codeFour, setCodeFour] = useState('');
  const input_1 = useRef();
  const input_2 = useRef();
  const input_3 = useRef();
  const input_4 = useRef();

  const {
    cartdata,
    price,
    AuthToken,
    restrauntdetails,
    restrauntdistance,
    currentRestrauntid,
    restrauntbasicdata,
    pickuporder,
    couponresponsestatus,
    couponresponsemessage,
    ProfileName,
    ProfileContact,
    ProfileEmail,
    Selectedcurrentaddress,
    orderplacementstatus,
    origin,
    couponresponseresult,
    discount,
    orderdetails,
    cardorderplacementstatus,
    orderdetailslink,
  } = useSelector(state => state.userReducer);
  const refMap = useRef(null);
  const toast = useRef();

  const customStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },

    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffb606',
        },
      ],
    },

    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#b6b4b4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ];

  const [payment, setpayment] = useState([
    {
      type: 'Credit/Debit Card',
      payment: 'Pay Online',
      selected: false,
      icon: 1,
      name: 'Card',
    },
    {
      type: 'COD',
      payment: 'Cash On Delivery',
      selected: false,
      icon: 2,
      name: 'Cash',
    },
  ]);

  // let currentprice = price + restrauntdetails?.VAT +  restrauntdetails?.DeliveryCharges
  // dispatch(storecartprice(currentprice))
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (couponresponsestatus != '' && couponresponsemessage != '') {
      setcouponloader(false);
      toast.current.show(couponresponsemessage, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });

      if (couponresponseresult != undefined) {
        console.log(
          'this is the result' + JSON.stringify(couponresponseresult),
        );
        let newprice = price;
        let discountedamount = 0;
        if (couponresponseresult.Type == 'Percentage') {
          if (newprice > couponresponseresult.MaxAmount) {
            let subtractibleamount =
              (couponresponseresult.MaxAmount / 100) *
              couponresponseresult.Value;
            discountedamount = subtractibleamount;
            newprice = newprice - subtractibleamount;
          } else {
            let subtractibleamount =
              (newprice / 100) * couponresponseresult.Value;
            discountedamount = subtractibleamount;
            newprice = newprice - subtractibleamount;
          }
        } else {
          discountedamount = couponresponseresult.Value;
          newprice = newprice - couponresponseresult.Value;
        }

        console.log(
          'this is the discountedamount price' +
            JSON.stringify(discountedamount),
        );
        console.log('this is the new price' + JSON.stringify(newprice));
        dispatch(updatepriceafterdiscount(newprice, discountedamount));
      }
      dispatch(clearcouponresponse());
    }
  }, [couponresponsestatus, couponresponsemessage]);

  useEffect(() => {
    setloader2(false);
    setloader1(false);
    console.log('this is the id ' + orderdetails);
    console.log('this is the link ' + orderdetailslink);
    if (orderplacementstatus != '' || cardorderplacementstatus != '') {
      console.log('1 if');
      if (
        orderplacementstatus == 'success' ||
        cardorderplacementstatus == 'success'
      ) {
        console.log('2 if');
        if (orderdetails != 0) {
          toast.current.show('Order Placed', {
            type: 'normal',
            placement: 'bottom',
            duration: 4000,
            offset: 10,
            animationType: 'slide-in',
            zIndex: 2,
          });
          dispatch(CartDetails(cartdata));
          dispatch(cleancart());
          console.log('PreparingFood');
          navigation.replace('PreparingFood');
        } else if (orderdetailslink != '') {
          dispatch(CartDetails(cartdata));
          // dispatch(cleancart());
          console.log('PAYMENT GATEWAY');
          console.log(orderdetailslink);
          setmodalVisiblepayment(true);
        }
      } else {
        toast.current.show(orderplacementstatus, {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 10,
          animationType: 'slide-in',
          zIndex: 2,
        });
      }
    }
    dispatch(clearorderplacementstatus());
    dispatch(clearcardorderplacementstatus());
  }, [orderplacementstatus, cardorderplacementstatus]);

  function placeorder() {
    if (pinlocation == '' && AuthToken == '') {
      toast.current.show('Please select a location', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (buildingdetails == '' && AuthToken == '') {
      toast.current.show('Please Building & Street details', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (plotnodetails == '' && AuthToken == '') {
      toast.current.show('Please Flat no & Floor details', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (firstname == '' && AuthToken == '') {
      toast.current.show('Please fill out your first name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (lastname == '' && AuthToken == '') {
      toast.current.show('Please fill out your last name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (email == '' && AuthToken == '') {
      toast.current.show('Please enter your email', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (!Validations.validateEmail(email) && AuthToken == '') {
      toast.current.show('You have entered an invalid email', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (phonenumber == '' && AuthToken == '') {
      toast.current.show('Please enter your phone number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (!payment.find(data => data?.selected === true)) {
      toast.current.show('Please select a payment method', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (cartdata.length == 0) {
      toast.current.show('Your cart is empty please add an item', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (Selectedcurrentaddress?.length == 0 && AuthToken != '') {
      toast.current.show('Please Select a Delivery Address', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else {
      let order = [];
      for (const key in cartdata) {
        let options = [];
        for (const index in cartdata[key]?.MenuItemOptions) {
          let menuItemOptionValueId = null;
          for (const item in cartdata[key]?.MenuItemOptions[index]
            ?.MenuItemOptionValues) {
            if (
              cartdata[key]?.MenuItemOptions[index]?.MenuItemOptionValues[item]
                ?.selected == true
            ) {
              menuItemOptionValueId =
                cartdata[key]?.MenuItemOptions[index]?.MenuItemOptionValues[
                  item
                ]?.Id;
            }
          }
          options.push({
            menuItemOptionId: cartdata[key]?.MenuItemOptions[index]?.Id,
            menuItemOptionValueId: menuItemOptionValueId,
          });
        }
        order.push({
          menuItemId: cartdata[key]?.Id,
          quantity: cartdata[key]?.Qty,
          customerNote: cartdata[key]?.SpecialInstructios,
          orderItemOptions: options,
        });
        // != undefined ?  cartdata[key].MenuItemOptions[index].MenuItemOptionValues[item]?.find(data => data.selected == true).Id : 0
      }

      let data = {
        restaurantBranchId: restrauntbasicdata.Id,
        discountPercentage: 0, // to be decided
        discountAmount: 0, // to be decided
        couponCode: '', // to be decided
        paymentMethod: payment.find(data => data?.selected === true).name, //Cash, Card(Online)
        address:
          AuthToken != '' ? Selectedcurrentaddress[0].address : pinlocation,
        customerName:
          AuthToken != '' ? ProfileName : firstname + ' ' + lastname,
        customerContact: AuthToken != '' ? ProfileContact : phonenumber,
        customerEmail: AuthToken != '' ? ProfileEmail : email, //"mailto:customer@fougito.com"
        floor:
          AuthToken != '' ? Selectedcurrentaddress[0].Floor : plotnodetails,
        latitude:
          AuthToken != '' ? Selectedcurrentaddress[0].Latitude : pinlatitude,
        longitude:
          AuthToken != '' ? Selectedcurrentaddress[0].Longitude : pinLongitude,
        noteToRider:
          AuthToken != '' ? Selectedcurrentaddress[0].note : notetorider,
        street:
          AuthToken != '' ? Selectedcurrentaddress[0].Street : buildingdetails,
        type: pickuporder ?  'Delivery' : 'Pickup' ,
        orderItems: order,
      };

      console.log('all data-----' + JSON.stringify(data));
      if (AuthToken == '') {
        setloader1(true);
      } else {
        setloader2(true);
      }

      dispatch(createorder(AuthToken, data));
    }
  }
  function selectpaymentmethod(index) {
    console.log('index' + index);
    let data = [...payment];
    for (const key in payment) {
      if (key == index) {
        data[key].selected = true;
      } else {
        data[key].selected = false;
      }
    }
    setpayment(data);
  }
  const renderpayment = ({item, index}) => (
    <PaymentOptions
      option={item.icon}
      index={index}
      title={item.type}
      payment={item.payment}
      selected={item.selected}
      onPress={() => {
        selectpaymentmethod(index);
      }}
    />
  );

  const renderHiddenItem = ({item, index}) => (
    <View style={styleSheet.rowBack}>
      <TouchableOpacity
        style={[styleSheet.actionButton, styleSheet.deleteBtn]}
        onPress={() => {
          let data = [...cartdata];
          let reducepriced = data[index].completeitemorderprice;
          data.splice(index, 1);

          dispatch(storecartprice(price - reducepriced));
          dispatch(filteredcatdata(data));

          console.log(data);
        }}>
        <Text style={styleSheet.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  function applycoupon() {
    Keyboard.dismiss();
    if (couponvalue == '') {
      toast.current.show('Please enter a coupon code', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    }
    //  else if(phonenumber == ""){
    //   toast.current.show('Please enter your phone number before applying for a coupon discount', {
    //     type: 'normal',
    //     placement: 'bottom',
    //     duration: 4000,
    //     offset: 10,
    //     animationType: 'slide-in',
    //     zIndex: 2,
    //   });
    //  }
    else {
      setcouponloader(true);
      dispatch(
        verifycoupon(
          couponvalue,
          AuthToken != '' ? ProfileContact : phonenumber,
          origin,
        ),
      );
    }
  }
  /////////guest/////
  useEffect(() => {
    Geocoder.init('AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso');
    Geolocation.getCurrentPosition(info => {
      SetPinLatitude(info?.coords?.latitude);
      SetPinLongitude(info?.coords?.longitude);
      console.log('info?.coords?.latitude' + info?.coords?.latitude);
      console.log('info?.coords?.longitude' + info?.coords?.longitude);
    });

    getLocation();
  }, []);

  useEffect(() => {
    if (pinlatitude != null && pinLongitude != null) {
      Geocoder.from(pinlatitude, pinLongitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          setpinlocation(addressComponent);
        })
        .catch(error => console.warn(error));
    }
  }, [pinlatitude, pinLongitude]);

  function getnewlocation() {
    Geocoder.from(pinlatitude, pinLongitude)
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
  //////////////////////////////////////

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Modal
        transparent
        style={{
          width: '100%',
          height: '100%',
        }}
        statusBarTranslucent
        visible={modalVisiblepayment}
        onRequestClose={() => setmodalVisiblepayment(false)}>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            width: '100%',
            height: '100%',
          }}>
          {orderdetailslink != '' && (
            <>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("Home")
                  setmodalVisiblepayment(false);
                }}
                style={{
                  height: scalableheight.seven,
                  width: scalableheight.five,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: scalableheight.six,
                  left: scalableheight.one,
                  zIndex: 10,
                }}>
                {/* <View style={styleSheet.backButtonMain}> */}
                <AntDesign
                  style={{alignSelf: 'center'}}
                  name="arrowleft"
                  color={'black'}
                  size={fontSize.twentyfour}
                />
                {/* </View> */}
              </TouchableOpacity>
              <WebView
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{uri: orderdetailslink}}
                onMessage={event => {
                  let newdata = JSON.parse(event.nativeEvent.data);
                  console.log(newdata.data);
                  if (event.nativeEvent.data == 'Exit') {
                    setmodalVisiblepayment(false);
                    toast.current.show(
                      'There was an network failure while processing your payment. Please tru again later',
                      {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 10,
                        animationType: 'slide-in',
                        zIndex: 2,
                      },
                    );
                  } else if (newdata.data.Result.paymentStatus == 'Failed') {
                    setmodalVisiblepayment(false);
                    toast.current.show(
                      'There was an network failure while processing your payment. Please tru again later',
                      {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 10,
                        animationType: 'slide-in',
                        zIndex: 2,
                      },
                    );
                  } else if (newdata.data.Result.paymentStatus == 'Paid') {
                    dispatch(storeorderid(newdata.data.Result.orderId));
                    orderdetails;
                    toast.current.show('Order Placed', {
                      type: 'normal',
                      placement: 'bottom',
                      duration: 4000,
                      offset: 10,
                      animationType: 'slide-in',
                      zIndex: 2,
                    });
                    dispatch(CartDetails(cartdata));
                    dispatch(cleancart());
                    console.log('PreparingFood');
                    navigation.replace('PreparingFood');
                  }
                }}
              />
            </>
          )}
        </View>
      </Modal>

      <View
        style={{
          height: '100%',
          width: '100%',
          elevation: 1,
          zIndex: 1,
          alignSelf: 'center',

          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'Cart'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          style={{
            width: '100%',
            paddingHorizontal: scalableheight.one,
            marginTop: scalableheight.two,
            marginBottom: scalableheight.one,
          }}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}>
          <View
            style={{flexDirection: 'row', marginBottom: scalableheight.one}}>
            <Text
              style={{...styleSheet.Text2, width: '15%', textAlign: 'center'}}>
              QTY
            </Text>
            <Text
              style={{
                ...styleSheet.Text2,
                width: '55%',
                paddingHorizontal: scalableheight.two,
              }}>
              ITEM
            </Text>
            <Text
              style={{
                ...styleSheet.Text2,
                width: '30%',
                paddingHorizontal: scalableheight.two,
              }}>
              Price
            </Text>
          </View>
          <SwipeListView
            key={'1'}
            data={cartdata}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(data, index) => {
              return (
                // <SwipeRow >
                // {/* {swipeAction} */}
                <View style={{alignItems: 'center'}}>
                  <ItemDetails
                    qty={data?.item?.Qty}
                    title={data?.item?.Name}
                    index={data?.index}
                    price={data?.item?.completeitemorderprice}
                    onPress={() => {
                      setitemmodaldata(data?.item);
                      setitemmodalVisible(true);
                    }}
                  />
                </View>
                // {/* </SwipeRow> */}
              );
            }}
            renderHiddenItem={renderHiddenItem}
            // leftOpenValue={0}
            disableRightSwipe={true}
            rightOpenValue={-scalableheight.tweleve}
            previewRowKey={'0'}
            previewOpenValue={-40}
            // previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
          />
          {/* {cartdata.map(item => {
            return (
              <View style={{alignItems: 'center'}}>
                <ItemDetails
                qty = {item?.Qty} 
                title={item?.Name}
                  price={item?.completeitemorderprice}
                  onPress={() => {
                    setmodalVisible(true);
                  }}
                />
              </View>
            );
          })} */}
          {AuthToken == '' && (
            <>
              <View style={{height: scalableheight.two}} />
              <Text style={styleSheet.Text1}>Payment Method</Text>
              <View style={{height: scalableheight.one}} />
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={payment}
                renderItem={renderpayment}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />

              <View style={{height: scalableheight.two}} />
              <Text style={styleSheet.Text1}>Delivery Details</Text>
              <View style={{height: scalableheight.one}} />

              <GooglePlacesAutocomplete
                suppressDefaultStyles={false}
                //  styles ={{

                //   ...styleSheet.shadow,
                //   width: '100%',
                //   height: scalableheight.six,
                //   fontSize: fontSize.fifteen,
                //   backgroundColor: '#F9F9F9',
                //   alignSelf: 'center',
                //   borderRadius: fontSize.borderradiusmedium,
                //   paddingHorizontal: '5%',
                //   marginHorizontal: '0.4%',
                // }}
                styles={{
                  textInput: {
                    ...styleSheet.shadow,
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                    marginBottom: scalableheight.two,
                  },
                }}
                placeholder="Search"
                onPress={(data, details = null) => {
                  setpinlocation(data.description);
                  Geocoder.from(data.description)
                    .then(json => {
                      var location = json.results[0].geometry.location;
                      SetPinLatitude(location.lat);
                      SetPinLongitude(location.lng);
                    })
                    .catch(error => console.warn(error));
                }}
                query={{
                  key: 'AIzaSyCB15FNPmpC70o8dPMjv2cH8qgRUHbDDso',
                  language: 'en',
                  components: 'country:ae',
                }}
              />

              <View
                style={{
                  height: scalableheight.twentysix,
                  borderRadius: fontSize.eight,
                  overflow: 'hidden',
                  marginBottom: scalableheight.two,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {hidemarker == false ? (
                  <MaterialIcons
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      alignContent: 'center',
                      zIndex: 3,
                      elevation: 3,
                    }}
                    name="location-pin"
                    color={'#F55050'}
                    size={scalableheight.six}
                  />
                ) : (
                  <Entypo
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      alignContent: 'center',
                      zIndex: 3,
                      elevation: 3,
                    }}
                    name="dot-single"
                    color={'#F55050'}
                    size={scalableheight.six}
                  />
                )}
                <MapView
                  // provider={PROVIDER_GOOGLE}
                  customMapStyle={customStyle}
                  ref={refMap}
                  showsUserLocation
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: fontSize.fifteen,
                  }}
                  region={{
                    latitude: pinlatitude,
                    longitude: pinLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  initialRegion={{
                    latitude: pinlatitude,
                    longitude: pinLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onRegionChange={region => {
                    //  console.log(region)
                    if (
                      region.latitude.toFixed(6) === pinlatitude.toFixed(6) &&
                      region.longitude.toFixed(6) === pinLongitude.toFixed(6)
                    ) {
                      return;
                    } else {
                      sethidemarker(true);
                    }
                  }}
                  onRegionChangeComplete={region => {
                    // console.log(region)

                    if (
                      region.latitude.toFixed(6) === pinlatitude.toFixed(6) &&
                      region.longitude.toFixed(6) === pinLongitude.toFixed(6)
                    ) {
                      return;
                    } else {
                      sethidemarker(false);
                      SetPinLatitude(region.latitude),
                        SetPinLongitude(region.longitude);
                    }
                  }}>
                  {/* <Marker
                    draggable
                    onDragEnd={e => (
                      SetPinLatitude(e.nativeEvent.coordinate.latitude),
                      SetPinLongitude(e.nativeEvent.coordinate.longitude)
                    )}
                    coordinate={{
                      latitude: pinlatitude,
                      longitude: pinLongitude,
                    }}
                    //  description={props?.pinlocation}
                    onPress={() => console.log('hello')}>
                    <MaterialIcons
                      name="location-pin"
                      color={'#F55050'}
                      size={scalableheight.six}
                    />
                  </Marker> */}
                </MapView>
              </View>
              <View
                style={{
                  ...styleSheet.shadow,
                  width: '99%',
                  height: scalableheight.eight,
                  fontSize: fontSize.fifteen,
                  backgroundColor: '#F9F9F9',
                  alignSelf: 'center',
                  borderRadius: fontSize.borderradiusmedium,
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                  marginBottom: scalableheight.two,
                }}>
                <Text numberOfLines={2}>{pinlocation}</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: scalableheight.two,
                }}>
                <TextInput
                  value={buildingdetails}
                  onChangeText={text => setbuildingdetails(text)}
                  placeholder={'Building and Street'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
                <TextInput
                  value={plotnodetails}
                  onChangeText={text => setplotnodetails(text)}
                  placeholder={'Flat no & Floor'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
              </View>
              <TextInput
                multiline
                value={notetorider}
                onChangeText={text => setnotetorider(text)}
                placeholder={'Note to Rider'}
                style={{
                  ...styleSheet.shadow,
                  width: '99%',
                  height: scalableheight.fifteen,
                  fontSize: fontSize.fifteen,
                  backgroundColor: '#F9F9F9',
                  alignSelf: 'center',
                  borderRadius: fontSize.borderradiusmedium,
                  paddingHorizontal: '5%',
                  textAlignVertical: 'top',
                }}
              />
              <View style={{height: scalableheight.two}} />
              <Text style={styleSheet.Text1}>Personal Details</Text>
              <View style={{height: scalableheight.one}} />

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: scalableheight.two,
                }}>
                <TextInput
                  value={firstname}
                  onChangeText={text => setfirstname(text)}
                  placeholder={'First Name'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
                <TextInput
                  value={lastname}
                  onChangeText={text => setlastname(text)}
                  placeholder={'Last Name'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: scalableheight.two,
                }}>
                <TextInput
                  value={email}
                  onChangeText={text => setemail(text)}
                  placeholder={'Email Address'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
                <TextInput
                  value={phonenumber}
                  onChangeText={text => setphonenumber(text)}
                  keyboardType={'number-pad'}
                  placeholder={'Phone Number'}
                  style={{
                    ...styleSheet.shadow,
                    width: '48.5%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
              </View>
              <View style={{height: scalableheight.three}} />
              <Bll label={'Sub Total'} price={price} />
              <Bll
                label={'Delivery Charges'}
                price={
                  restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                    ? restrauntdetails?.DeliveryCharges
                    : restrauntdetails?.DeliveryCharges * restrauntdistance
                }
              />

              <View style={styleSheet.Container}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styleSheet.Text3}>Vat Amount </Text>
                  <Text
                    style={
                      styleSheet.Text4
                    }>{`(${restrauntdetails?.VAT}%)`}</Text>
                </View>
                <Text style={styleSheet.Text3}>
                  AED{' '}
                  {((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                    100}
                </Text>
              </View>

              {discount > 0 && (
                <View style={styleSheet.Container}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styleSheet.Text3}>Coupon Discount</Text>
                  </View>
                  <Text style={{...styleSheet.Text3, color: '#E14E4E'}}>
                    AED{' -'}
                    {discount}
                  </Text>
                </View>
              )}
              <View style={{height: scalableheight.one}} />

              {couponvisible == false ? (
                <TouchableOpacity
                  onPress={() => {
                    setcouponvisible(true);
                  }}>
                  <Text style={{...styleSheet.Text4, textAlign: 'right'}}>
                    I HAVE A COUPON
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginVertical: scalableheight.two}}>
                  <TextInput
                    editable={couponloader || discount > 0 ? false : true}
                    value={couponvalue}
                    onChangeText={text => setcouponvalue(text)}
                    placeholder={'Enter Code'}
                    style={{
                      ...styleSheet.shadow,
                      width: '99%',
                      height: scalableheight.six,
                      fontSize: fontSize.fifteen,
                      backgroundColor: '#F9F9F9',
                      alignSelf: 'center',
                      borderRadius: fontSize.borderradiusmedium,
                      paddingHorizontal: '5%',
                      marginHorizontal: '0.4%',
                    }}
                  />
                  {couponloader ? (
                    <View
                      style={{
                        height: scalableheight.six,
                        width: scalableheight.ten,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: fontSize.borderradiusmedium,

                        position: 'absolute',
                        right: 2,
                      }}>
                      <ActivityIndicator size={'small'} color="#E14E4E" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={discount > 0 ? true : false}
                      onPress={() => {
                        applycoupon();
                      }}
                      style={{
                        height: scalableheight.six,
                        width: scalableheight.ten,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: fontSize.borderradiusmedium,

                        backgroundColor:
                          discount > 0 ? 'transparent' : '#E14E4E',
                        position: 'absolute',
                        right: 2,
                      }}>
                      <Text
                        style={{
                          ...styleSheet.Text4,
                          color: discount > 0 ? '#E14E4E' : 'white',
                        }}>
                        {discount > 0 ? 'Applied' : 'Apply'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View
                style={{
                  borderTopColor: 'rgba(211,211,211, 0.5)',
                  borderTopWidth: scalableheight.borderTopWidth,
                  marginVertical: scalableheight.one,
                }}></View>
              <Bll
                label={'Total'}
                price={
                  price +
                  (restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                    ? restrauntdetails?.DeliveryCharges
                    : restrauntdetails?.DeliveryCharges * restrauntdistance) +
                  ((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                    100
                }
              />
              <View style={{height: scalableheight.two}} />
            </>
          )}

          {/* <View style={{height: scalableheight.ten}} /> */}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: scalableheight.one,
            // position: 'absolute',
            bottom: scalableheight.two,
            width: '100%',
          }}>
          {AuthToken != '' && (
            <>
              <View style={{height: scalableheight.two}} />
              <Text style={styleSheet.Text1}>Payment Method</Text>
              <View style={{height: scalableheight.one}} />
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={payment}
                renderItem={renderpayment}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />

              <View style={{height: scalableheight.two}} />
              {Selectedcurrentaddress?.length > 0 ? (
                <>
                  <Text style={styleSheet.Text1}>Delivery Address</Text>
                  <View style={{height: scalableheight.one}} />

                  <Addresstile
                    icon={Selectedcurrentaddress[0].icon}
                    place={Selectedcurrentaddress[0].place}
                    address={Selectedcurrentaddress[0].address}
                    note={Selectedcurrentaddress[0].note}
                    onPress={() => {
                      navigation.navigate('MyAddresses', {
                        screenname: 'checkout',
                      });
                    }}
                    screenname={''}
                  />
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyAddresses', {
                      screenname: 'checkout',
                    });
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{...styleSheet.Text4}}>SELECT ADDRESS</Text>
                  <AntDesign
                    style={{
                      marginLeft: scalableheight.two,
                    }}
                    name="pluscircle"
                    color={'#F55050'}
                    size={scalableheight.three}
                  />
                  <View style={{height: scalableheight.one}} />
                </TouchableOpacity>
              )}
            </>
          )}
          {AuthToken != '' && (
            <>
              <View style={{height: scalableheight.three}} />
              <Bll label={'Sub Total'} price={price} />
              <Bll
                label={'Delivery Charges'}
                price={
                  restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                    ? restrauntdetails?.DeliveryCharges
                    : restrauntdetails?.DeliveryCharges * restrauntdistance
                }
              />

              <View style={styleSheet.Container}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styleSheet.Text3}>Vat Amount </Text>
                  <Text
                    style={
                      styleSheet.Text4
                    }>{`(${restrauntdetails?.VAT}%)`}</Text>
                </View>
                <Text style={styleSheet.Text3}>
                  AED{' '}
                  {((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                    100}
                </Text>
              </View>

              {discount > 0 && (
                <View style={styleSheet.Container}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styleSheet.Text3}>Coupon Discount</Text>
                  </View>
                  <Text style={{...styleSheet.Text3, color: '#E14E4E'}}>
                    AED{' -'}
                    {discount}
                  </Text>
                </View>
              )}
              <View style={{height: scalableheight.one}} />

              {couponvisible == false ? (
                <TouchableOpacity
                  onPress={() => {
                    setcouponvisible(true);
                  }}>
                  <Text style={{...styleSheet.Text4, textAlign: 'right'}}>
                    I HAVE A COUPON
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginVertical: scalableheight.two}}>
                  <TextInput
                    editable={couponloader || discount > 0 ? false : true}
                    value={couponvalue}
                    onChangeText={text => setcouponvalue(text)}
                    placeholder={'Enter Code'}
                    style={{
                      ...styleSheet.shadow,
                      width: '99%',
                      height: scalableheight.six,
                      fontSize: fontSize.fifteen,
                      backgroundColor: '#F9F9F9',
                      alignSelf: 'center',
                      borderRadius: fontSize.borderradiusmedium,
                      paddingHorizontal: '5%',
                      marginHorizontal: '0.4%',
                    }}
                  />
                  {couponloader ? (
                    <View
                      style={{
                        height: scalableheight.six,
                        width: scalableheight.ten,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: fontSize.borderradiusmedium,

                        position: 'absolute',
                        right: 2,
                      }}>
                      <ActivityIndicator size={'small'} color="#E14E4E" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={discount > 0 ? true : false}
                      onPress={() => {
                        applycoupon();
                      }}
                      style={{
                        height: scalableheight.six,
                        width: scalableheight.ten,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: fontSize.borderradiusmedium,

                        backgroundColor:
                          discount > 0 ? 'transparent' : '#E14E4E',
                        position: 'absolute',
                        right: 2,
                      }}>
                      <Text
                        style={{
                          ...styleSheet.Text4,
                          color: discount > 0 ? '#E14E4E' : 'white',
                        }}>
                        {discount > 0 ? 'Applied' : 'Apply'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View
                style={{
                  borderTopColor: 'rgba(211,211,211, 0.5)',
                  borderTopWidth: scalableheight.borderTopWidth,
                  marginVertical: scalableheight.one,
                }}></View>
              <Bll
                label={'Total'}
                price={
                  price +
                  (restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                    ? restrauntdetails?.DeliveryCharges
                    : restrauntdetails?.DeliveryCharges * restrauntdistance) +
                  ((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                    100
                }
              />
              <View style={{height: scalableheight.two}} />
            </>
          )}
          {AuthToken == '' &&
            (loader1 == true ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: scalableheight.seven,

                  borderRadius: fontSize.borderradiusmedium,

                  marginTop: '1%',
                  marginBottom: '1%',
                }}>
                <ActivityIndicator size={'large'} color="#E14E4E" />
              </View>
            ) : cartdata.length > 0 ? (
              <MYButton
                title={'Proceed as Guest'}
                onPress={() => {
                  placeorder();
                }}
                color="black"
                textcolor="white"
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: scalableheight.seven,
                  borderRadius: fontSize.borderradiusmedium,
                  marginTop: '1%',
                  marginBottom: '1%',
                }}>
                <View style={{marginRight: scalableheight.one}}>
                  <MaterialCommunityIcons
                    name="cart-remove"
                    color={'#F55050'}
                    size={scalableheight.three}
                  />
                </View>
                <Text style={{...styleSheet.Text4}}>Cart cannot be empty</Text>
              </View>
            ))}

          {loader2 == true ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: scalableheight.seven,

                borderRadius: fontSize.borderradiusmedium,

                marginTop: '1%',
                marginBottom: '1%',
              }}>
              <ActivityIndicator size={'large'} color="#E14E4E" />
            </View>
          ) : cartdata.length > 0 ? (
            <MYButton
              title={AuthToken != '' ? 'Place Order' : 'Login to Place Order'}
              onPress={() => {
                AuthToken != ''
                  ? placeorder()
                  : // ( setmodalVisible(true))
                    setmodalVisible(true);
              }}
              color="#E14E4E"
              textcolor="white"
            />
          ) : (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                height: scalableheight.seven,
                flexDirection: 'row',
                borderRadius: fontSize.borderradiusmedium,
                marginTop: '1%',
                marginBottom: '1%',
              }}>
              <View style={{marginRight: scalableheight.one}}>
                <MaterialCommunityIcons
                  name="cart-remove"
                  color={'#F55050'}
                  size={scalableheight.three}
                />
              </View>
              <Text style={{...styleSheet.Text4}}>Cart cannot be empty</Text>
            </View>
          )}
        </View>
      </View>

      <AuthenticationModel
        state={modalVisible}
        togglemodel={() => {
          setmodalVisible(false);
        }}
      />

      <ItemDetailsModel
        state={itemmodalVisible}
        data={itemmodaldata}
        togglemodel={() => {
          setitemmodalVisible(false);
        }}
      />
      <Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: 'black',
  },
  Text2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.ten,
    color: '#29262A',
    opacity: 0.4,
  },
  Text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'black',
  },
  Text4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color: '#E14E4E',
  },
  Text4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fifteen,
    color: '#E14E4E',
  },
  Text5: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.thirteen,
    color: 'black',
    opacity: 0.4,
  },

  Text6: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.fourteen,
    color: 'black',
    opacity: 0.8,
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twenty,
    color: '#000000',
    borderRadius: fontSize.eleven,

    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: scalableheight.borderTopWidth,
    padding: scalableheight.onepointfive,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.twelve,
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

    marginTop: scalableheight.two,
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
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
    elevation: 3,
  },
  scrollcontainer: {flexGrow: 1, paddingVertical: scalableheight.two},
  // TextInput: {
  //   width: '95%',
  //   backgroundColor: '#F5F5F5',
  //   fontSize: fontSize.fifteen,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: fontSize.eleven,
  //   height: scalableheight.seven,
  //   color: '#8c8c8c',

  //   paddingHorizontal: scalableheight.two,
  //   alignSelf: 'center',
  //   marginTop: '4%',
  // },
  TextInput: {
    width: '100%',
    backgroundColor: 'white',
    fontSize: fontSize.fifteen,
    color: '#8c8c8c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,
    height: scalableheight.seven,

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: scalableheight.one,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
    fontSize: fontSize.fifteen,

    fontFamily: 'Inter-SemiBold',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'lightcoral',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: '98%',
    paddingRight: scalableheight.four,
    marginBottom: scalableheight.one,
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: scalableheight.borderwidth,
  },
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: '#E14E4E',
    right: scalableheight.pointfive,
  },
});
export default Checkout;
