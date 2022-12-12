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
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';

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
  storecurrentaddress,
  cleardistancevalidation,
  getdistancevalidation,
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

import CountryInput from '../Shared/Components/CountryInput';

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
import Dineinoption from '../Shared/Components/Dineinoption';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import FocusAwareStatusBar from '../component/StatusBar/customStatusBar';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

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
  const [showfulllist, setshowfulllist] = useState(false);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [couponvisible, setcouponvisible] = useState(false);
  const [modalVisiblepayment, setmodalVisiblepayment] = useState(false);
  const [Dineinpopup, setDineinpopup] = useState(false);
  const [Dineincustomer, setDineincustomer] = useState(false);
  const [Dineincustomertableid, setDineincustomertableid] = useState(null);
  const [temportystoreforselectedaddress, settemportystoreforselectedaddress] =
    useState(null);
  const [gesturestate, setgesturestate] = useState(false);

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
    alladdresses,
    Profileinfo,
    validdistance,
    dinein
  } = useSelector(state => state.userReducer);



  const refMap = useRef(null);
  const toast = useRef();
  const ref = useRef();
  const scrollref = useRef();
  const flatlistref = useRef();
  const swiplistref = useRef();

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
      payment: 'Pay online using your card',
      selected: true,
      icon: 1,
      name: 'Card',
    },
    // {
    //   type: 'COD',
    //   payment: 'Cash On Delivery',
    //   selected: false,
    //   icon: 2,
    //   name: 'Cash',
    // },
  ]);

  // let currentprice = price + restrauntdetails?.VAT +  restrauntdetails?.DeliveryCharges
  // dispatch(storecartprice(currentprice))
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scrollref.current.scrollTo({y: 0, animated: true});
      StatusBar.setBarStyle('dark-content');
      setshowfulllist(false);
      dispatch(storeorderid(0));
      setgesturestate(false);
      setDineincustomer(false)
      setDineincustomertableid(null)
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setgesturestate(true);
      }, 500);
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
          navigation.replace('OrderDetails', {
            screenname: 'checkout',
          });
        } else if (orderdetailslink != '') {
          dispatch(CartDetails(cartdata));
          dispatch(cleancart());
          console.log('PAYMENT GATEWAY');
          console.log(orderdetailslink);
          setmodalVisiblepayment(true);
        }
      } else {
        scrollref.current.scrollTo({y: 0, animated: true});
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

  function placeorder(dineinallowed, idoftable) {
    if (pinlocation == '' && AuthToken == '' && dinein == false) {
      toast.current.show('Please select a location', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (buildingdetails == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please Building & Street details', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (plotnodetails == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please Flat no & Floor details', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (firstname == '' && AuthToken == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please fill out your first name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (lastname == '' && AuthToken == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please fill out your last name', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (email == '' && AuthToken == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please enter your email', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (!Validations.validateEmail(email) && AuthToken == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('You have entered an invalid email', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (phonenumber == '' && AuthToken == ''  && dinein == false && dineinallowed != true) {
      toast.current.show('Please enter your phone number', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
    } else if (payment.find(data => data?.selected === undefined  && dinein == false && dineinallowed != true)) {
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
    } else if (Selectedcurrentaddress?.length == 0 && AuthToken != ''  && dinein == false && dineinallowed != true) {
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
        paymentMethod:dinein == true || dineinallowed == true ? "Cash" : payment.find(data => data?.selected === true).name, //Cash, Card(Online)
        address: dinein == true || dineinallowed == true ? "" : AuthToken != '' ? Selectedcurrentaddress[0].address : pinlocation,
        customerName: dinein == true || dineinallowed == true ? "" : AuthToken != '' ? ProfileName : firstname + ' ' + lastname,
        customerContact: dinein == true || dineinallowed == true ? "" : AuthToken != '' ? ProfileContact : phonenumber,
        customerEmail: dinein == true || dineinallowed == true ? "" : AuthToken != '' ? ProfileEmail : email, //"mailto:customer@fougito.com"
        // floor:
        //   AuthToken != '' ? Selectedcurrentaddress[0].Floor : plotnodetails,
        floor: dinein == true || dineinallowed == true ? "" : plotnodetails,
        latitude: dinein == true || dineinallowed == true ? 0 : AuthToken != '' ? Selectedcurrentaddress[0].Latitude : pinlatitude,
        longitude: dinein == true || dineinallowed == true ? 0 : AuthToken != '' ? Selectedcurrentaddress[0].Longitude : pinLongitude,
        // noteToRider:
        //   AuthToken != '' ? Selectedcurrentaddress[0].note : notetorider,
        noteToRider: dinein == true || dineinallowed == true ? "" : notetorider,
        // street:
        //   AuthToken != '' ? Selectedcurrentaddress[0].Street : buildingdetails,
        street: dinein == true || dineinallowed == true ? "" : buildingdetails,

        DeliveryType: dinein == true || dineinallowed == true ? "DineIn" : pickuporder ? 'Delivery' : 'Pickup',
        orderItems: order,
        TableId: idoftable
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
    // <View style={{width:Dimensions.get('window').width /1.08, }}>
    <View style={{width: '100%'}}>
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
    </View>
  );

  const renderHiddenItem = ({item, index}) => (
    <View style={{...styleSheet.rowBack}}>
      <TouchableOpacity
        style={[styleSheet.actionButton, styleSheet.deleteBtn]}
        onPress={() => deleteitem(item, index)}>
        <MaterialCommunityIcons
          style={{alignSelf: 'center'}}
          name={'delete'}
          color={'white'}
          size={fontSize.twentyfive}
        />
        {/* <Text style={styleSheet.btnText}>Delete</Text> */}
      </TouchableOpacity>
    </View>
  );

  function deleteitem(item, index) {
    let lengthofcart = cartdata.length;
    let data = [...cartdata];
    let reducepriced = data[index].completeitemorderprice;
    data.splice(index, 1);

    dispatch(storecartprice(price - reducepriced));
    dispatch(filteredcatdata(data));

    console.log(data);
    if (lengthofcart == 1) {
      navigation.goBack();
    }
  }

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
    Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
    Geolocation.getCurrentPosition(
      info => {
        SetPinLatitude(info?.coords?.latitude);
        SetPinLongitude(info?.coords?.longitude);
        console.log('info?.coords?.latitude' + info?.coords?.latitude);
        console.log('info?.coords?.longitude' + info?.coords?.longitude);
      },
      error => {
        console.log('hellooo' + JSON.stringify(error));
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );

    setTimeout(() => {
      getLocation();
    }, 1500);
  }, []);

  useEffect(() => {
    if (AuthToken != '') {
      setfirstname(Profileinfo?.User?.FirstName);
      setlastname(Profileinfo?.User?.LastName);
      setemail(Profileinfo?.User?.Email);
      setphonenumber(Profileinfo?.Contact);
    } else {
      setfirstname('');
      setlastname('');
      setemail('');
      setphonenumber('');
    }
  }, [pickuporder, AuthToken]);

  useEffect(() => {
    console.log('--------------------');
    if (alladdresses.length > 0) {
      let found = 0;
      for (const index in alladdresses) {
        if (
          alladdresses[index]?.Latitude ==
            Selectedcurrentaddress[0]?.Latitude &&
          alladdresses[index]?.Longitude == Selectedcurrentaddress[0]?.Longitude
        ) {
          found = 1;
          console.log('-------------------- scrolling');
          setTimeout(() => {
            flatlistref.current?.scrollToIndex({
              index: index,
              animated: true,
            });
          }, 500);
        }
      }
      if ((found = 0)) {
        console.log('-------------------- not found');
        setTimeout(() => {
          flatlistref.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        }, 500);
      }
    }
    if (Selectedcurrentaddress.length > 0) {
      console.log(
        'Selectedcurrentaddress' + JSON.stringify(Selectedcurrentaddress),
      );
      setplotnodetails(Selectedcurrentaddress[0].Floor);
      setnotetorider(Selectedcurrentaddress[0].note);
      setbuildingdetails(Selectedcurrentaddress[0].Street);
    }
  }, [Selectedcurrentaddress]);

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
      settemportystoreforselectedaddress(null);
      dispatch(cleardistancevalidation());
    } else if (
      validdistance == true &&
      temportystoreforselectedaddress != null
    ) {
      console.log(
        'currentaddress' + JSON.stringify(temportystoreforselectedaddress),
      );
      dispatch(storecurrentaddress(temportystoreforselectedaddress));
      settemportystoreforselectedaddress(null);
      dispatch(cleardistancevalidation());
    }
  }, [validdistance]);

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

  const closemodal = () => {
    setmodalVisiblepayment(false);
  };

  const listtoggle = () => {
    setshowfulllist(!showfulllist);
  };
  const proceedtoorder = () => {
    // navigation.navigate("Home")
    setmodalVisiblepayment(false);

    navigation.navigate('MyOrders');
  };

  function getnewaddress(data, details) {
    setpinlocation(data.description);
    Geocoder.from(data.description)
      .then(json => {
        var location = json.results[0].geometry.location;
        SetPinLatitude(location.lat);
        SetPinLongitude(location.lng);
      })
      .catch(error => console.warn(error));
  }

  function regionchange(region) {
    //  console.log(region)
    if (
      region?.latitude?.toFixed(6) === pinlatitude?.toFixed(6) &&
      region?.longitude?.toFixed(6) === pinLongitude?.toFixed(6)
    ) {
      return;
    } else {
      sethidemarker(true);
    }
  }

  function regioncomplete(region) {
    // console.log(region)

    if (
      region?.latitude?.toFixed(6) === pinlatitude?.toFixed(6) &&
      region?.longitude?.toFixed(6) === pinLongitude?.toFixed(6)
    ) {
      return;
    } else {
      sethidemarker(false);
      SetPinLatitude(region.latitude), SetPinLongitude(region.longitude);
    }
  }

  function navigatetoeditaddress() {
    navigation.navigate('EditAddress', {
      screenname: 'checkout',
    });
  }

  function changeaddress(item, i) {
    let currentaddress = [
      {
        Latitude: item?.Latitude.toFixed(6),
        Longitude: item?.Longitude.toFixed(6),
        icon: item.Type,
        place: item.Type,
        address: item.Address,
        note: item.NoteToRider,
        Street: item.Street,
        Floor: item.Floor,
      },
    ];
    dispatch(
      getdistancevalidation(
        restrauntdetails?.RestaurantBranchId,
        item.Latitude,
        item.Longitude,
      ),
    );
    settemportystoreforselectedaddress(currentaddress);

    // navigation.goBack();
  }

  function navigatetocheckout() {
    navigation.navigate('MyAddresses', {
      screenname: 'checkout',
    });
  }

  function selectcounty(text) {
    setphonenumber(text.substring(1));
  }

  function showcoupon() {
    setcouponvisible(true);
  }

  function closeitemdetails() {
    setitemmodalVisible(false);
  }

  function closedinein() {
    setDineinpopup(false);
  }

  function calculateuserdistance(){
    Geocoder.init('AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8');
    Geolocation.getCurrentPosition(
      info => {
        calculateLoc(info?.coords?.latitude, info?.coords?.longitude,)
        console.log('info?.coords?.latitude' + info?.coords?.latitude);
        console.log('info?.coords?.longitude' + info?.coords?.longitude);
      },
      error => {
        console.log('hellooo' + JSON.stringify(error));
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );



 
   
  }

  const calculateLoc = (Lat1, Long1) => {
    console.log(
      Lat1,
      Long1,
      'Restaurant',
      restrauntdetails.Latitude,
      restrauntdetails.Longitude,
      'USER',
    );
    let rlat1 = (Math.PI * Lat1) / 180;
    // console.log('rlat1' + rlat1);
    let rlat2 = (Math.PI * restrauntdetails.Latitude) / 180;
    // console.log('rlat2' + rlat2);
    let theta = Long1 - restrauntdetails.Longitude;
    // console.log('theta' + theta);
    let rtheta = (Math.PI * theta) / 180;
    // console.log('rtheta' + rtheta);
    let dist =
      Math.sin(rlat1) * Math.sin(rlat2) +
      Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    dist = dist * 1000;
    // SetKmAway(dist?.toFixed(2));
    // console.log("you can dine in dist" + dist)
  if(dist < 14004157){
console.log("you can dine in")
setDineinpopup(true)
  }else{
    placeorder(false, null)
  }
  };
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: '#F6F6F6'}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Modal
        transparent
        style={styleSheet.modalview}
        statusBarTranslucent
        visible={modalVisiblepayment}
        onRequestClose={closemodal}>
        <View style={styleSheet.modalviewcontainer}>
          {orderdetailslink != '' && (
            <>
              <TouchableOpacity
                onPress={proceedtoorder}
                style={styleSheet.proceedtoorderstyle}>
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
                style={styleSheet.modalview}
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

                    console.log('PreparingFood');

                    navigation.replace('OrderDetails', {
                      screenname: 'checkout',
                    });
                  }
                }}
              />
            </>
          )}
        </View>
      </Modal>

      <View style={styleSheet.mainviewcontainer}>
        <PlainHeader title={'Cart'} />

        <AnimatedScrollView
          ref={scrollref}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          style={styleSheet.animatedscrollviewview}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 5,
            paddingHorizontal: scalableheight.two,
          }}>
          {gesturestate == true && (
            <>
              <View style={styleSheet.qtyview}>
                <Text style={{...styleSheet.Text2, ...styleSheet.qtytext}}>
                  QTY
                </Text>
                <Text
                  style={{
                    ...styleSheet.Text2,
                    ...styleSheet.itemtext,
                  }}>
                  ITEM
                </Text>
                <View style={styleSheet.priceview}>
                  <Text
                    style={{
                      ...styleSheet.Text2,

                      ...styleSheet.opacity,
                    }}>
                    PRICE
                  </Text>
                </View>
              </View>

              <SwipeListView
                key={'1'}
                data={cartdata}
                ref={swiplistref}
                // swipeGestureBegan= {gesturestate}

                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data, index) => {
                  return (showfulllist == false && data?.index < 3) ||
                    showfulllist == true ? (
                    <View style={{alignItems: 'center', width: '100%'}}>
                      <ItemDetails
                        qty={data?.item?.Qty}
                        image={data?.item?.Image}
                        title={data?.item?.Name}
                        index={data?.index}
                        price={data?.item?.completeitemorderprice}
                        onPress={() => {
                          setitemmodaldata(data?.item);
                          setitemmodalVisible(true);
                        }}
                      />
                    </View>
                  ) : (
                    <></>
                  );
                }}
                renderHiddenItem={renderHiddenItem}
                // leftOpenValue={0}
                disableRightSwipe={true}
                rightOpenValue={-scalableheight.seven}
                previewRowKey={'0'}
                previewOpenValue={-60}
                // previewOpenDelay={3000}
                onRowDidOpen={onItemOpen}
              />

              {cartdata.length > 3 && (
                <TouchableOpacity onPress={listtoggle}>
                  <Text style={{...styleSheet.Text1, ...styleSheet.text11}}>
                    {showfulllist ? 'Show less' : 'Show more'}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {dinein == false &&
          <>
          {AuthToken == '' && (
            <>
              {pickuporder == true && (
                <>
                  <View style={styleSheet.heightone} />
                  <Text style={styleSheet.Text1}>Delivery Details</Text>

                  <View>
                    <GooglePlacesAutocomplete
                      suppressDefaultStyles={false}
                      ref={ref}
                      styles={{
                        textInput: {
                          // ...styleSheet.shadow,
                          ...styleSheet.textinputstyle,
                        },
                      }}
                      placeholder="Search"
                      onPress={(data, details = null) =>
                        getnewaddress(data, details)
                      }
                      query={{
                        key: 'AIzaSyDL1Kk_B0bkRx9FmM3v-3oRn57_MzFyiM8',
                        language: 'en',
                        components: 'country:ae',
                      }}
                    />
                    {Platform.OS != 'ios' && (
                      <TouchableOpacity
                        onPress={() => ref.current?.clear()}
                        style={styleSheet.touchableview}>
                        <Ionicons
                          name="close-circle"
                          color={'rgba(211,211,211, 0.8)'}
                          size={fontSize.twenty}
                          style={{}}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styleSheet.mainviewcontainer2}>
                    {hidemarker == false ? (
                      <MaterialIcons
                        style={styleSheet.icon2}
                        name="location-pin"
                        color={'#F55050'}
                        size={scalableheight.six}
                      />
                    ) : (
                      <Entypo
                        style={styleSheet.icon2}
                        name="dot-single"
                        color={'#F55050'}
                        size={scalableheight.six}
                      />
                    )}
                    <MapView
                      showsMyLocationButton={false}
                      // provider={PROVIDER_GOOGLE}
                      customMapStyle={customStyle}
                      ref={refMap}
                      showsUserLocation
                      style={styleSheet.mapviewstyle}
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
                      onRegionChange={region => regionchange(region)}
                      onRegionChangeComplete={region => regioncomplete(region)}>
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
                  <View style={styleSheet.view3}>
                    <Text numberOfLines={2}>{pinlocation}</Text>
                  </View>
                  <View style={styleSheet.view4}>
                    <TextInput
                      value={buildingdetails}
                      onChangeText={text => setbuildingdetails(text)}
                      placeholder={'Building and Street'}
                      style={styleSheet.textinputstyle2}
                    />
                    <TextInput
                      value={plotnodetails}
                      onChangeText={text => setplotnodetails(text)}
                      placeholder={'Flat no & Floor'}
                      style={styleSheet.textinputstyle2}
                    />
                  </View>
                  <TextInput
                    multiline
                    value={notetorider}
                    onChangeText={text => setnotetorider(text)}
                    placeholder={'Note to Rider'}
                    style={styleSheet.textinputstyle3}
                  />
                </>
              )}
              <Text style={{...styleSheet.Text1, ...styleSheet.verticletwo}}>
                Personal Details
              </Text>

              <View style={styleSheet.view5}>
                <TextInput
                  value={firstname}
                  onChangeText={text => setfirstname(text)}
                  placeholder={'First Name'}
                  placeholderTextColor={'rgba(128, 128,128)'}
                  style={styleSheet.textinputstyle6}
                />
              </View>

              <View style={styleSheet.textinputview}>
                <TextInput
                  value={lastname}
                  onChangeText={text => setlastname(text)}
                  placeholder={'Last Name'}
                  placeholderTextColor={'rgba(128, 128,128)'}
                  style={styleSheet.textinputstyle8}
                />
              </View>

              <View style={styleSheet.textinputview}>
                <TextInput
                  value={email}
                  onChangeText={text => setemail(text)}
                  placeholder={'Email Address'}
                  placeholderTextColor={'rgba(128, 128,128)'}
                  style={styleSheet.textinputstyle8}
                />
              </View>

              <CountryInput Onpress={text => selectcounty(text)} />

              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: scalableheight.two,
                }}>
              
                <TextInput
                  value={phonenumber}
                  onChangeText={text => setphonenumber(text)}
                  keyboardType={'number-pad'}
                  placeholder={'Phone Number'}
                  style={{
                    ...styleSheet.shadow,
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: '#F9F9F9',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
              </View> */}
              <Text style={styleSheet.Text1}>Payment Method</Text>
              <View style={styleSheet.heightone} />

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={{width: '100%'}}
                showsHorizontalScrollIndicator={false}
                data={payment}
                renderItem={renderpayment}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />

              <View style={{height: scalableheight.onepointfive}} />
              <Bll label={'Sub Total'} price={price} />
              {pickuporder == true && (
                <Bll
                  label={'Delivery Charges'}
                  price={
                    restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                      ? restrauntdetails?.DeliveryCharges
                      : restrauntdetails?.DeliveryCharges * restrauntdistance
                  }
                />
              )}
              {/* <View style={styleSheet.Container}>
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
              </View> */}
              <Bll
                label={'VAT Amount' + ` (${restrauntdetails?.VAT}%)`}
                price={
                  ((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                  100
                }
              />

              {discount > 0 && (
                <View style={styleSheet.Container}>
                  <View style={styleSheet.flexrow}>
                    <Text style={styleSheet.Text3}>Coupon Discount</Text>
                  </View>
                  <Text style={{...styleSheet.Text3, color: '#E14E4E'}}>
                    AED{' -'}
                    {discount}
                  </Text>
                </View>
              )}
              <View style={styleSheet.heightone} />

              {couponvisible == false ? (
                <TouchableOpacity onPress={showcoupon}>
                  <Text style={{...styleSheet.Text4, ...styleSheet.textright}}>
                    I HAVE A COUPON
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styleSheet.verticletwo}>
                  <TextInput
                    editable={couponloader || discount > 0 ? false : true}
                    value={couponvalue}
                    onChangeText={text => setcouponvalue(text)}
                    placeholder={'Enter Code'}
                    style={styleSheet.textinput5}
                  />
                  {couponloader ? (
                    <View style={styleSheet.couponview}>
                      <ActivityIndicator size={'small'} color="#E14E4E" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={discount > 0 ? true : false}
                      onPress={applycoupon}
                      style={{
                        backgroundColor:
                          discount > 0 ? 'transparent' : '#E14E4E',
                        ...styleSheet.couponviewtext,
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
              <View style={styleSheet.view10}></View>
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
              <View style={styleSheet.heighttwo} />
            </>
          )}
  
          {AuthToken != '' && (
            <>
              <View style={styleSheet.heighttwo} />

              {pickuporder == true ? (
                <>
                  {Selectedcurrentaddress?.length > 0 ? (
                    <>
                      <View style={styleSheet.view13}>
                        <Text style={styleSheet.Text1}>Delivery Address</Text>

                        <TouchableOpacity
                          onPress={navigatetoeditaddress}
                          activeOpacity={0.9}>
                          <Entypo
                            style={styleSheet.alignselefcenteritem}
                            name="circle-with-plus"
                            color={'#F55050'}
                            // color={'rgba(41, 38, 42, 0.5)'}
                            size={fontSize.twentyfour}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styleSheet.heightone} />
                      <View style={styleSheet.fullwidth}>
                        {alladdresses?.find(
                          data =>
                            data?.Latitude ==
                              Selectedcurrentaddress[0]?.Latitude &&
                            data?.Longitude ==
                              Selectedcurrentaddress[0]?.Longitude,
                        ) == undefined ? (
                          <View style={styleSheet.addresstileview}>
                            <Addresstile
                              onPress={() => {
                                // navigation.navigate('EditAddress', {
                                //   // orderId: item.OrderNo,
                                //   // completedetails: Order,
                                // });
                              }}
                              //   // onModelPopUp={changestatus}
                              icon={Selectedcurrentaddress[0].place}
                              Latitude={Selectedcurrentaddress[0].Latitude}
                              Longitude={Selectedcurrentaddress[0].Longitude}
                              place={Selectedcurrentaddress[0].place}
                              address={Selectedcurrentaddress[0].address}
                              note={Selectedcurrentaddress[0].note}
                              itemfull={Selectedcurrentaddress[0]}
                            />
                          </View>
                        ) : null}
                      </View>
                      <View style={styleSheet.fullwidth}>
                        <FlatList
                          keyExtractor={(item, index) => index.toString()}
                          ref={flatlistref}
                          initialScrollIndex={0}
                          onScrollToIndexFailed={({
                            index,
                            averageItemLength,
                          }) => {
                            flatlistref.current?.scrollToOffset({
                              offset: index * averageItemLength,
                              animated: true,
                            });
                          }}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          data={alladdresses}
                          renderItem={({item, i}) => {
                            return (
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => changeaddress(item, i)}
                                style={styleSheet.addresstileview}>
                                <Addresstile
                                  onPress={() => {
                                    // navigation.navigate('EditAddress', {
                                    //   // orderId: item.OrderNo,
                                    //   // completedetails: Order,
                                    // });
                                  }}
                                  //   // onModelPopUp={changestatus}
                                  icon={item.Type}
                                  Latitude={item.Latitude}
                                  Longitude={item.Longitude}
                                  place={item.Type}
                                  address={item.Address}
                                  note={item.NoteToRider}
                                  screenname={'ckeckout'}
                                  itemfull={item}
                                />
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>

                      <View style={styleSheet.view15}>
                        <TextInput
                          value={buildingdetails}
                          onChangeText={text => setbuildingdetails(text)}
                          placeholder={'Building and Street'}
                          style={styleSheet.textinputstyle2}
                        />
                        <TextInput
                          value={plotnodetails}
                          onChangeText={text => setplotnodetails(text)}
                          placeholder={'Flat no & Floor'}
                          style={styleSheet.textinputstyle2}
                        />
                      </View>
                      <TextInput
                        multiline
                        value={notetorider}
                        onChangeText={text => setnotetorider(text)}
                        placeholder={'Note to Rider'}
                        style={styleSheet.textinput7}
                      />
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={navigatetocheckout}
                      style={styleSheet.touchableview2}>
                      <Text style={styleSheet.Text4}>SELECT ADDRESS</Text>
                      <AntDesign
                        style={styleSheet.icon3}
                        name="pluscircle"
                        color={'#F55050'}
                        size={scalableheight.three}
                      />
                      <View style={styleSheet.heightone} />
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <>
                  <Text
                    style={{...styleSheet.Text1, ...styleSheet.verticletwo}}>
                    Personal Details
                  </Text>

                  <View style={styleSheet.textinputview}>
                    <TextInput
                      value={firstname}
                      onChangeText={text => setfirstname(text)}
                      placeholder={'First Name'}
                      style={styleSheet.textinputstyle8}
                    />
                  </View>

                  <View style={styleSheet.textinputview}>
                    <TextInput
                      value={lastname}
                      onChangeText={text => setlastname(text)}
                      placeholder={'Last Name'}
                      style={styleSheet.textinputstyle8}
                    />
                  </View>

                  <View style={styleSheet.textinputview}>
                    <TextInput
                      value={email}
                      onChangeText={text => setemail(text)}
                      placeholder={'Email Address'}
                      style={styleSheet.textinputstyle8}
                    />
                  </View>
                  {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: scalableheight.two,
                }}>
              
                <TextInput
                disabled={true}
                  value={phonenumber}
                  onChangeText={text => setphonenumber(text)}
                  keyboardType={'number-pad'}
                  placeholder={'Phone Number'}
                  style={{
                    ...styleSheet.shadow,
                    width: '100%',
                    height: scalableheight.six,
                    fontSize: fontSize.fifteen,
                    backgroundColor: 'grey',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    marginHorizontal: '0.4%',
                  }}
                />
              </View> */}
                  <View style={styleSheet.justifycenter}>
                    <TextInput
                      style={styleSheet.textinputstyle9}
                      editable={false}
                      keyboardType="numeric"
                      placeholderTextColor="#8c8c8c"
                      //          placeholder={'Enter Phone Number'}
                      onChangeText={text => setphonenumber(text)}
                      defaultValue={phonenumber.substring(3)}
                    />
                    <Image
                      style={styleSheet.imageview}
                      source={require('../Resources/images/uaeFlag.png')}
                    />
                    <Text style={styleSheet.text12}>+971</Text>
                  </View>
                </>
              )}

              <View style={{height: scalableheight.two}} />
              <Text style={styleSheet.Text1}>Payment Method</Text>
              <View style={styleSheet.heightone} />

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={{width: '100%'}}
                showsHorizontalScrollIndicator={false}
                data={payment}
                renderItem={renderpayment}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />
            </>
          )}
        </>}
          {dinein == true || AuthToken != '' ? (
            <>
              <View style={{height: scalableheight.three}} />
              <Bll label={'Sub Total'} price={price} />
              {pickuporder == true && (
                <Bll
                  label={'Delivery Charges'}
                  price={
                    restrauntdetails?.RestaurantDeliveryType == 'Fixed'
                      ? restrauntdetails?.DeliveryCharges
                      : restrauntdetails?.DeliveryCharges * restrauntdistance
                  }
                />
              )}
              <Bll
                label={'VAT Amount' + ` (${restrauntdetails?.VAT}%)`}
                price={
                  ((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                  100
                }
              />
              {/* <View style={styleSheet.Container}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styleSheet.Text3}>Vat Amount </Text>
                  <Text
                    style={
                      styleSheet.Text4
                    }>{`(${restrauntdetails?.VAT}%)`}</Text>
                </View>
                <Text style={styleSheet.Text3}>
                  AED{' '}
                  {(((restrauntdetails?.DeliveryCharges + price) *
                    restrauntdetails?.VAT) /
                    100).toFixed(2)}
                </Text>
              </View> */}

              {discount > 0 && (
                <View style={styleSheet.Container}>
                  <View style={styleSheet.flexrow}>
                    <Text style={styleSheet.Text3}>Coupon Discount</Text>
                  </View>
                  <Text style={{...styleSheet.Text3, color: '#E14E4E'}}>
                    AED{' -'}
                    {discount?.toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={{height: scalableheight.one}} />

{dinein == false && 
<>
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
                <View style={styleSheet.verticletwo}>
                  <TextInput
                    editable={couponloader || discount > 0 ? false : true}
                    value={couponvalue}
                    onChangeText={text => setcouponvalue(text)}
                    placeholder={'Enter Code'}
                    style={{
                      // ...styleSheet.shadow,
                      borderWidth: 1,
                      borderColor: 'rgba(128, 128,128, 0.6)',
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
                    <View style={styleSheet.couponloaderview}>
                      <ActivityIndicator size={'small'} color="#E14E4E" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={discount > 0 ? true : false}
                      onPress={applycoupon}
                      style={{
                        backgroundColor:
                          discount > 0 ? 'transparent' : '#E14E4E',
                        ...styleSheet.applycouponview,
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
                  </>    }
              <View style={styleSheet.billview}></View>
              <Bll
                label={'Total Amount'}
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
              <View style={styleSheet.heighttwo} />
            </>
          ): null}
        </AnimatedScrollView>
        <View style={styleSheet.innerview}>
        {dinein == false && 
<>
          {AuthToken == '' &&
            (loader1 == true ? (
              <View style={styleSheet.activityindicatorview}>
                <ActivityIndicator size={'large'} color="#E14E4E" />
              </View>
            ) : cartdata.length > 0 ? (
              <MYButton
                title={'Proceed as Guest'}
                onPress={() => {
                  calculateuserdistance()
                }}
                color="black"
                textcolor="white"
              />
            ) : (
              <View style={styleSheet.cartremoveview}>
                <View style={styleSheet.marginrightone}>
                  <MaterialCommunityIcons
                    name="cart-remove"
                    color={'#F55050'}
                    size={scalableheight.three}
                  />
                </View>
                <Text style={styleSheet.Text4}>Cart cannot be empty</Text>
              </View>
            ))}
</>}
          {loader2 == true ? (
            <View style={styleSheet.activityindicatorview}>
              <ActivityIndicator size={'large'} color="#E14E4E" />
            </View>
          ) : cartdata.length > 0 ? (
            <MYButton
              title={dinein == true ? "Dine In" : AuthToken != '' ? 'Place Order' : 'Login to Place Order'}
              onPress={() => {
                AuthToken != '' || dinein == true
                  ? calculateuserdistance()
                  : // ( setmodalVisible(true))
                    setmodalVisible(true);
              }}
              color="#E14E4E"
              textcolor="white"
            />
          ) : (
            <View
              style={{
                ...styleSheet.fullwidth,
                ...styleSheet.flexrow,
                ...styleSheet.activityindicatorview,
              }}>
              <View style={styleSheet.marginrightone}>
                <MaterialCommunityIcons
                  name="cart-remove"
                  color={'#F55050'}
                  size={scalableheight.three}
                />
              </View>
              <Text style={styleSheet.Text4}>Cart cannot be empty</Text>
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
        togglemodel={closeitemdetails}
      />

<Dineinoption
        state={Dineinpopup}
        data = {(tablenumber, ordertype) => {
console.log(tablenumber)
console.log(ordertype)
setDineincustomer(true)
setDineincustomertableid(tablenumber)
placeorder(true, tablenumber)

        }}
        proceed = {()=>{
          placeorder(false, null)
        }}
        togglemodel={closedinein}
        name= {restrauntdetails.BranchName}
    
      />


      <Toast ref={toast} style={styleSheet.toast} />
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  toast: {marginBottom: scalableheight.ten, justifyContent: 'center'},
  Text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color: 'black',
  },
  Text2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.eleven,
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
    // alignItems: 'center',
    // backgroundColor: '#F6F6F6',
    // height: '98%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingLeft: 5,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: scalableheight.nine,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    // marginTop: '5%'
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,

    width: '90%',
    paddingRight: scalableheight.two,
    marginBottom: scalableheight.one,

    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: scalableheight.pointfive,
    height: '95%',
  },
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: '#E14E4E',
    right: scalableheight.pointfive,
  },
  modalview: {
    width: '100%',
    height: '100%',
  },
  modalviewcontainer: {
    paddingTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
  },
  proceedtoorderstyle: {
    height: scalableheight.seven,
    width: scalableheight.five,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scalableheight.six,
    left: scalableheight.one,
    zIndex: 10,
  },
  mainviewcontainer: {
    height: '100%',
    width: '100%',
    elevation: 1,
    zIndex: 1,
    alignSelf: 'center',

    paddingTop: getStatusBarHeight(),
  },
  animatedscrollviewview: {
    width: '100%',

    marginTop: scalableheight.two,
    marginBottom: scalableheight.one,
  },
  qtyview: {flexDirection: 'row', marginBottom: scalableheight.one},
  qtytext: {
    width: '20%',
    textAlign: 'center',
    color: 'black',
    opacity: 1,
  },
  itemtext: {
    width: '50%',

    color: 'black',
    opacity: 1,
  },
  priceview: {
    width: '30%',
    alignItems: 'flex-end',
    paddingHorizontal: scalableheight.one,
  },
  opacity: {
    color: 'black',
    opacity: 1,
  },
  text11: {
    color: '#E14E4E',
    fontSize: fontSize.twelve,
  },
  heightone: {height: scalableheight.one},
  textinputstyle: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '100%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
    marginTop: scalableheight.two,
    marginBottom: scalableheight.two,
  },
  touchableview: {
    position: 'absolute',
    height: scalableheight.six,
    marginTop: scalableheight.two,
    justifyContent: 'center',
    right: scalableheight.one,
  },
  mainviewcontainer2: {
    height: scalableheight.twentysix,
    borderRadius: fontSize.eight,
    overflow: 'hidden',
    marginBottom: scalableheight.two,

    justifyContent: 'center',
    alignItems: 'center',
  },
  icon2: {
    position: 'absolute',
    alignSelf: 'center',
    alignContent: 'center',
    zIndex: 3,
    elevation: 3,
  },
  mapviewstyle: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.fifteen,
  },
  view3: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '99%',
    height: scalableheight.eight,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    marginBottom: scalableheight.two,
  },
  view4: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalableheight.two,
  },
  textinputstyle2: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '48.5%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
  },
  textinputstyle3: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '99%',
    height: scalableheight.fifteen,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    textAlignVertical: 'top',
    paddingTop: scalableheight.one,
  },
  view5: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalableheight.two,
  },
  textinput5: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '99%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
  },
  couponview: {
    height: scalableheight.six,
    width: scalableheight.ten,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,

    position: 'absolute',
    right: 2,
  },
  couponviewtext: {
    height: scalableheight.six,
    width: scalableheight.ten,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,

    position: 'absolute',
    right: 2,
  },
  view10: {
    borderTopColor: 'rgba(211,211,211, 0.5)',
    borderTopWidth: scalableheight.borderTopWidth,
    marginVertical: scalableheight.one,
  },
  heighttwo: {
    height: scalableheight.two,
  },
  view13: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view15: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalableheight.two,
    marginTop: scalableheight.one,
    alignSelf: 'center',
  },
  textinput7: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '99%',
    height: scalableheight.fifteen,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    textAlignVertical: 'top',
    paddingTop: scalableheight.one,
  },
  touchableview2: {flexDirection: 'row', alignItems: 'center'},
  icon3: {
    marginLeft: scalableheight.two,
  },
  verticletwo: {marginVertical: scalableheight.two},
  billview: {
    borderTopColor: 'rgba(211,211,211, 0.5)',
    borderTopWidth: scalableheight.borderTopWidth,
    marginVertical: scalableheight.one,
  },
  applycouponview: {
    height: scalableheight.six,
    width: scalableheight.ten,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,

    position: 'absolute',
    right: 2,
  },
  couponloaderview: {
    height: scalableheight.six,
    width: scalableheight.ten,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.borderradiusmedium,

    position: 'absolute',
    right: 2,
  },
  textinputstyle6: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '100%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
    color: 'rgba(128, 128,128)',
  },
  textinputview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalableheight.two,
  },
  textinputstyle8: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    color: 'rgba(128, 128,128)',

    width: '100%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
  },
  textright: {
    textAlign: 'right',
  },
  alignselefcenteritem: {
    alignSelf: 'center',
  },
  fullwidth: {
    width: '100%',
  },
  addresstileview: {
    width: scalableheight.thirtyfive,
    marginRight: scalableheight.one,
    marginBottom: scalableheight.one,
    marginTop: scalableheight.one,
  },
  justifycenter: {justifyContent: 'center'},
  textinputstyle9: {
    // ...styleSheet.shadow,

    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '100%',
    height: scalableheight.six,
    fontSize: fontSize.fifteen,

    alignSelf: 'center',
    borderRadius: fontSize.borderradiusmedium,
    paddingHorizontal: '5%',
    marginHorizontal: '0.4%',
    backgroundColor: '#E1E1E1',
    paddingLeft: scalableheight.tweleve,
  },
  imageview: {
    height: scalableheight.three,
    width: scalableheight.four,
    resizeMode: 'stretch',
    position: 'absolute',
    left: scalableheight.one,
  },
  text12: {
    // color: 'rgba(41, 38, 42, 0.6)',
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    position: 'absolute',
    left: scalableheight.six,
  },
  flexrow: {
    flexDirection: 'row',
  },
  innerview: {
    paddingHorizontal: scalableheight.two,
    paddingVertical: scalableheight.two,
    // position: 'absolute',
    // bottom: scalableheight.two,
    width: '100%',
  },
  activityindicatorview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scalableheight.seven,

    borderRadius: fontSize.borderradiusmedium,

    marginTop: '1%',
    marginBottom: '1%',
  },
  cartremoveview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: scalableheight.seven,
    borderRadius: fontSize.borderradiusmedium,
    marginTop: '1%',
    marginBottom: '1%',
  },
  marginrightone: {
    marginRight: scalableheight.one,
  },
});
export default Checkout;
