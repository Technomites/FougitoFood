import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
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
} from 'react-native';
import HeaderComponentRestaurant from '../Shared/Components/HeaderComponentRestaurant';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DynamicHeader from '../Shared/Components/DynamicHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontSize, scalableheight} from '../Utilities/fonts';

import Starters from '../Shared/Components/Starters';
import ScreenWrapper from '../Shared/Components/ScreenWrapper';

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
import Geolocation from 'react-native-geolocation-service';
import MultiChoiceDropDown from '../Shared/Components/MultiChoiceDropDown';
import MYButton from '../Shared/Components/MYButton';
import Custombottomsheet from '../Shared/Components/Custombottomsheet';
import Mltichoicehorizontallist from '../Shared/Components/Mltichoicehorizontallist';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const RestaurantpageAnimation = ({navigation, drawerAnimationStyle}) => {
  const [specialinstructions, setspecialinstructions] = useState('');
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [count, setcount] = useState(0);
  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [showbottomsheet, setshowbottomsheet] = useState(false);
  const [level, setlevel] = useState(4);
  const [pinlocation, setpinlocation] = useState('');

  const [isEnabled, setisEnabled] = useState(false);
  const [yposition, setyposition] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollviewref = useRef();
  const scrollviewhorizontalref = useRef();
  const drinksref = useRef();
  let y = 0;
  const animatedtop = scrollOffsetY.interpolate({
    inputRange: [0, getStatusBarHeight() + scalableheight.three],
    outputRange: [0, getStatusBarHeight() + scalableheight.three],
    extrapolate: 'clamp',
  });
  const [types, settypes] = useState([
    {
      title: 'Starters',
      visible: false,
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
    {
      selected: false,
      serving: 'Onion',
    },
    {
      selected: false,
      serving: 'Lettuce',
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
  const toggleSwitch = async () => {
    setisEnabled(!isEnabled);
  };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       // hideNavigationBar();
  //       console.log('Keyboard is open');
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       // hideNavigationBar();
  //       console.log('Keyboard is closed');
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    // hideNavigationBar();
  }, [modalVisible]);

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

  function updateservingstate(index) {
    let arr = [...serving];
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
    setserving(arr);
    console.log('arr' + JSON.stringify(arr));
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
  return (
    <ScreenWrapper drawer={drawerAnimationStyle} style={{flex: 1}}>
      {modalVisible && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 1,
          }}></View>
      )}
      {modalVisible && (
        <Animatable.View
          animation={'fadeInUpBig'}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={{elevation: 4000, zIndex: 4000}}>
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
                }}>
                <View style={{width: '100%', height: '30%'}}>
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={require('../Resources/images/food.jpg')}
                  />
                  {serving?.filter(item => item.selected == true) != '' &&
             
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
                  }
                  <TouchableOpacity
                    onPress={() => {
                      setmodalVisible(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: scalableheight.one,
                      right: scalableheight.one,
                    }}>
                    <Ionicons
                      name="close-circle"
                      color={'#F5F5F5'}
                      size={fontSize.thirtyseven}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: '100%',
                    height: '70%',
                    padding: scalableheight.two,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: fontSize.sixteen,
                      color: 'black',
                    }}>
                    Chicken Shawarma
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: fontSize.fourteen,
                      color: 'black',
                    }}>
                    Special mouth watering Chicken Fillet served with fresh
                    vegies and special sauce.
                  </Text>
                  <View style={{height: scalableheight.one}} />
                  <MultiChoiceDropDown
                    title={'Choose Serving'}
                    data={serving}
                    update={updateservingstate}
                  />
                  <View style={{height: scalableheight.one}} />
                  <Mltichoicehorizontallist
                    title={'Choose Serving'}
                    data={flavours}
                    update={updateflavourstate}
                  />

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
                  <View style={{height: scalableheight.three}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                      justifyContent: 'space-evenly',
                      alignSelf: 'center',
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
                  <View style={{height: scalableheight.three}} />
                  <MYButton
                    color={'#E14E4E'}
                    title={'Add To Cart'}
                    textcolor={'white'}
                    onPress={() => {
                      setmodalVisible(false);
                      setcartvisible(true);
                    }}
                  />

                  <View style={{height: scalableheight.three}} />
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animatable.View>
      )}
      {/* <StatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
      /> */}

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
            zIndex: 1,
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
                    1
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
                AED 175.00
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
          position: 'absolute',
          backgroundColor: 'transparent',
          paddingTop: getStatusBarHeight(),
          elevation: 3000,
          zIndex: 3000,
        }}>
        <HeaderComponentRestaurant
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        />
      </View>
      <DynamicHeader
        showlocation={() => {
          setshowbottomsheet(true);
        }}
        animHeaderValue={scrollOffsetY}
      />

      {/* <Animated.View
  style={{width:"100%", height: 100, backgroundColor:"red", marginTop: animatedtop}}>

  </Animated.View> */}
      <AnimatedScrollView
        ref={scrollviewhorizontalref}
        key={'scroller'}
        overflow={'hidden'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
          height: scalableheight.sixteen,
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginTop: animatedtop,
        }}>
        {types.map((item, key) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // scrollviewref?.scrollTo({
                //   x: 0,
                //   y: dataSourceCords[1], //we get the offset value from array based on key
                //   animated: true,});

                scrollviewref.current.scrollTo({
                  y: dataSourceCords[key + 1],
                  animated: true,
                });

                let data = [...types];
                for (const index in data) {
                  data[index].visible = false;
                }
                data[key].visible = true;
                settypes(data);
              }}
              style={{
                backgroundColor: 'transparent',
                paddingHorizontal: scalableheight.five,
                alignItems: 'center',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  color: item.visible ? '#E14E4E' : 'rgba(211,211,211, 0.9)',
                  fontSize: fontSize.fifteen,
                  paddingVertical: scalableheight.one,
                  borderBottomWidth: item.visible ? 1 : 0,
                  borderColor: '#E14E4E',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </AnimatedScrollView>

      <AnimatedScrollView
        ref={scrollviewref}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            listener: event => {
              let y = event.nativeEvent.contentOffset.y;

              // let num = scrollOffsetY
              console.log('a' + JSON.stringify(dataSourceCords));
              console.log('a' + JSON.stringify(types));

              if (y < dataSourceCords[2]) {
                if (types[0].visible != true) {
                  let data = [...types];
                  for (const index in data) {
                    data[index].visible = false;
                  }
                  data[0].visible = true;
                  settypes(data);
                  scrollviewhorizontalref.current.scrollTo({
                    y: dataSourceCords[1],
                    animated: true,
                  });
                }
                // console.log(JSON.stringify(scrollOffsetY))
                // console.log("helle")
              } else if (y > dataSourceCords[2] && y < dataSourceCords[3]) {
                if (types[1].visible != true) {
                  let data = [...types];
                  for (const index in data) {
                    data[index].visible = false;
                  }
                  data[1].visible = true;
                  settypes(data);
                  scrollviewhorizontalref.current.scrollTo({
                    y: dataSourceCords[1],
                    animated: true,
                  });
                }
                // console.log(JSON.stringify(scrollOffsetY))
                // console.log("helle")
              } else if (y > dataSourceCords[3] && y < dataSourceCords[4]) {
                if (types[2].visible != true) {
                  let data = [...types];
                  for (const index in data) {
                    data[index].visible = false;
                  }
                  data[2].visible = true;
                  settypes(data);
                  scrollviewhorizontalref.current.scrollTo({
                    y: dataSourceCords[2],
                    animated: true,
                  });
                }
                // console.log(JSON.stringify(scrollOffsetY))
                // console.log("helle")
              } else if (y > dataSourceCords[4]) {
                if (types[3].visible != true) {
                  let data = [...types];
                  for (const index in data) {
                    data[index].visible = false;
                  }
                  data[3].visible = true;
                  settypes(data);
                  scrollviewhorizontalref.current.scrollTo({
                    y: dataSourceCords[3],
                    animated: true,
                  });
                }
                // console.log(JSON.stringify(scrollOffsetY))
                // console.log("helle")
              }
            },
          },
          {useNativeDriver: true},
        )}
        //  ref ={scrollviewref}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
          paddingHorizontal: scalableheight.one,
          zIndex: -2,
          elevation: -2,
        }}>
        <Text
          // key={1}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[1] = layout.y; // we store this offset values in an array
          }}
          style={styleSheet.heading}>
          Starters{' '}
        </Text>
        {dished.map((item, key) => {
          return (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Starters
                image={require('../Resources/images/food.jpg')}
                title={'Mexican Enchiladas'}
                description={
                  'The original French toast! Thick slices of our signature jumbo...'
                }
                price={9.4}
                onPress={() => {
                  setmodalVisible(true);
                }}
              />
            </View>
          );
        })}

        <Text
          // key={2}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[2] = layout.y; // we store this offset values in an array
          }}
          style={styleSheet.heading}>
          Main Meal{' '}
        </Text>
        {dished.map((item, key) => {
          return (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Starters
                image={require('../Resources/images/food.jpg')}
                title={'Mexican Enchiladas'}
                description={
                  'The original French toast! Thick slices of our signature jumbo...'
                }
                price={9.4}
                onPress={() => {
                  setmodalVisible(true);
                }}
              />
            </View>
          );
        })}

        <Text
          // key={3}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[3] = layout.y; // we store this offset values in an array
          }}
          style={styleSheet.heading}>
          Desert{' '}
        </Text>
        {dished.map((item, key) => {
          return (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Starters
                image={require('../Resources/images/food.jpg')}
                title={'Mexican Enchiladas'}
                description={
                  'The original French toast! Thick slices of our signature jumbo...'
                }
                price={9.4}
                onPress={() => {
                  setmodalVisible(true);
                }}
              />
            </View>
          );
        })}

        <Text
          style={styleSheet.heading}
          // key={4}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[4] = layout.y; // we store this offset values in an array
          }}>
          Drinks{' '}
        </Text>
        {dished.map((item, key) => {
          return (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Starters
                image={require('../Resources/images/food.jpg')}
                title={'Mexican Enchiladas'}
                description={
                  'The original French toast! Thick slices of our signature jumbo...'
                }
                price={9.4}
                onPress={() => {
                  setmodalVisible(true);
                }}
              />
            </View>
          );
        })}
      </AnimatedScrollView>
      <View
        style={{
          backgroundColor: '#201F1F',
          position: 'absolute',
          top: 0,
          width: '100%',
          height: scalableheight.fourteen + getStatusBarHeight(),
          zIndex: -2,
          elevation: -2,
          paddingTop: getStatusBarHeight() + scalableheight.ten,
        }}></View>

      <Custombottomsheet
        state={showbottomsheet}
        locationpin={pinlocation}
        onPress={() => {
          setshowbottomsheet(false);
        }}
        onPressnewlocation={() => {
          getnewlocation();
        }}
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
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: fontSize.twenty,
    paddingVertical: scalableheight.one,
  },
});
export default RestaurantpageAnimation;
