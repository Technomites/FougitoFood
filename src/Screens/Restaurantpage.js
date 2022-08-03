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
  RefreshControl,
  TextInput,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Vibration,
  ActivityIndicator,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import renderIf from 'render-if';
// import Modal from "react-native-modal";
import {
  getblogshome,
  getnewsfeedshome,
  getpopularserviceshome,
  changelang,
  seticonfocus,
  getProfileInformation,
  getbanner,
  getcategories,
  getcategoriesbyid,
  getNewNotificationCount,
} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {SliderBox} from 'react-native-image-slider-box';
import ImagesSwiper from 'react-native-image-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import HeaderComponentRestaurant from '../Shared/Components/HeaderComponentRestaurant';
import HeaderComponent from '../Shared/Components/HeaderComponent';
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
  StickyView
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { styles } from 'react-native-element-dropdown/src/components/TextInput/styles';

const Restaurantpage = ({navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [specialinstructions, setspecialinstructions] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartvisible, setcartvisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [search, setsearch] = useState('');
  const [isEnabled, setisEnabled] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);
  const Top = createMaterialTopTabNavigator();
  const [count, setcount] = useState(0);
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
  const {
    blogsdatahome,
    newsfeedshomedata,
    Lang,
    ProfileInfo,
    profileimage,
    bannerarray,
    categories,
    newNotificationCount,
    popularservicedatahome,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const {
    collapse,   // <-- Collapse header
    expand,     // <-- Expand header
    scrollY,    // <-- Animated scroll position. In case you need to do some animation in your header or somewhere else
  } = useCollapsibleContext();
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    dispatch(seticonfocus('home'));
    // listeners()
  }, []);
  useEffect(() => {
    listeners();
  }, []);

  useEffect(() => {
    dispatch(getNewNotificationCount());
  }, [newNotificationCount]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideNavigationBar();
        console.log('Keyboard is open');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideNavigationBar();
        console.log('Keyboard is closed');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(getProfileInformation());
    dispatch(getbanner());
  }, []);

  useEffect(() => {
    dispatch(getcategories(Lang));
    dispatch(getpopularserviceshome(Lang));
    dispatch(getnewsfeedshome(Lang));
    dispatch(getblogshome(Lang));
  }, [Lang]);

  useEffect(() => {
   
        hideNavigationBar();
       
   
  }, [modalVisible]);

  
  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
      } else {
        showToast('No Internet Connection', {
          duration: 500,
        });
      }
    });
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(seticonfocus('home'));
      StatusBar.setHidden(false);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const renderpopularcategories = ({item}) => (
    <Categoriescard
      image={require('../Resources/images/food.png')}
      type={'Pizza'}
      price={20}
    />
  );
  const starters = ({item}) => (
<View style={{width:"100%", alignItems:"center"}}>
    <Starters image={require('../Resources/images/food.png')} title={"Mexican Enchiladas"} description={"The original French toast! Thick slices of our signature jumbo..."} price={9.40} onPress={()=>{setmodalVisible(true)}}/>
  </View>
    );
 
  

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

  const Starterslabel =  props => {
    return(
      <View style={{width: "100%", marginTop: scalableheight.one, paddingHorizontal: scalableheight.one,   }}>
      <FlatList
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      data={popularservicedatahome}
      renderItem={starters}
      // onEndReached={() => LoadFeaturedProjectPagination()}
      // onEndReachedThreshold={0.1}
    /> 
    </View>
    )
   };
 
   const MainCourselabel = props => {
     return (
      <View style={{width: "100%", marginTop: scalableheight.one, paddingHorizontal: scalableheight.one}}>
      <FlatList
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      data={popularservicedatahome}
      renderItem={starters}
      // onEndReached={() => LoadFeaturedProjectPagination()}
      // onEndReachedThreshold={0.1}
    /> 
    </View>
    )
     
   };

   const Desert = props => {
    return (
     <View style={{width: "100%", marginTop: scalableheight.one, paddingHorizontal: scalableheight.one}}>
     <FlatList
     keyExtractor={(item, index) => index.toString()}
     showsVerticalScrollIndicator={false}
     data={popularservicedatahome}
     renderItem={starters}
     // onEndReached={() => LoadFeaturedProjectPagination()}
     // onEndReachedThreshold={0.1}
   /> 
   </View>
   )
    
  };

  const Drinks = props => {
    return (
     <View style={{width: "100%", marginTop: scalableheight.one, paddingHorizontal: scalableheight.one}}>
     <FlatList
     keyExtractor={(item, index) => index.toString()}
     showsVerticalScrollIndicator={false}
     data={popularservicedatahome}
     renderItem={starters}
     // onEndReached={() => LoadFeaturedProjectPagination()}
     // onEndReachedThreshold={0.1}
   /> 
   </View>
   )
    
  };
  const toggleSwitch = async () => {

    setisEnabled(!isEnabled)
  };

  return (
    <Animated.View style={{flex: 1, ...drawerAnimationStyle}}>
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
   {modalVisible  &&  (  <Animatable.View
              animation={'fadeInUpBig'}
   
                   easing="ease"
                   //  iterationCount="infinite"
                   iterationCount={1}
                   style={{elevation: 4, zIndex:4}}>
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
              <View style={{width: '100%', height: '35%'}}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../Resources/images/food.png')}
                />
                {renderIf(serving?.filter(item => item.selected == true) != '')(
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
                  height: '65%',
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
                  Special mouth watering Chicken Fillet served with fresh vegies
                  and special sauce.
                </Text>
                <View style={{height: scalableheight.one}} />
                <MultiChoiceDropDown
                  title={'Choose Serving'}
                  data={serving}
                  update={updateservingstate}
                />
                <View style={{height: scalableheight.one}} />
                <MultiChoiceDropDown
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
                    backgroundColor: '#F5F5F5',
                    alignSelf: 'center',
                    borderRadius: fontSize.borderradiusmedium,
                    paddingHorizontal: '5%',
                    textAlignVertical: 'top',
                  }}
                />
                <View style={{height: scalableheight.one}} />
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
                <View style={{height: scalableheight.one}} />
                <MYButton
                  color={'#E14E4E'}
                  title={'Add To Cart'}
                  textcolor={'white'}
                  onPress={() => {
                    setmodalVisible(false);
                    setcartvisible(true)
                  }}
                />

                <View style={{height: scalableheight.three}} />
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>)}
      <StatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'light-content'}
      />
  

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
          onPress={() => {navigation.navigate("Checkout")}}
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
      <View style={{flex: 1, backgroundColor: '#303030', borderRadius: 10}}>
        <View style={{flex: 1, marginTop: getStatusBarHeight(), }}>
        <CollapsibleContainer>   
        <CollapsibleHeaderContainer>
    <StickyView>
          <HeaderComponentRestaurant newNotificationCount={newNotificationCount}  isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}/>
          </StickyView>
       
   <View style={{ width: '100%',
    alignSelf: 'center',
    height: scalableheight.tweleve,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030',
    paddingHorizontal: scalableheight.one,
  }}>
 <Infobar Heading ={"Home"} Details ={"Clifton block 2, plot no 245, near bilawal house"}/>
   </View>
  
<Reviewscontainer rating={"8.9"} reviews={"350"} title={"Perfect Grill"} description={"Its the food you love"} image={require('../Resources/images/grill.png')}/>
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
                  fontFamily: 'Inter-ExtraBold',
                  fontSize: fontSize.sixteen,
                  color: '#29262A',
                }}>
                Popular Categories
              </Text>
            </Animatable.View>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={popularservicedatahome}
              renderItem={renderpopularcategories}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />

<SearchBar search={search} onchange={(val) => {setsearch(val)}}/>
</View>

        </CollapsibleHeaderContainer>
      
<CollapsibleScrollView
       
          showsVerticalScrollIndicator={false}
         
          style={{  width:"100%", backgroundColor:"white"}}

       >

<Top.Navigator
     
  
          screenOptions={{
            tabBarActiveTintColor: "#E14E4E",
            tabBarInactiveTintColor: 'grey',
            tabBarPressColor: 'white',
          
    
          }}
          tabBarOptions={{
            activeTintColor: "#E14E4E",
         
            tabStyle: {height: scalableheight.nine},
            labelStyle: {fontSize: fontSize.twelve, fontWeight: 'bold'},
            indicatorStyle: {
              height: scalableheight.borderwidth,
              backgroundColor: "#E14E4E",
              borderRadius: 5,
            },
          }}>
          <Top.Screen
            name={'Starters'}
            component={Starterslabel}
          />
          <Top.Screen
          
            name={'Main Course'}
            component={MainCourselabel}
          />

<Top.Screen
            name={'Desert'}
            component={Desert}
          />
          <Top.Screen
          
            name={'Drinks'}
            component={Drinks}
          />
        </Top.Navigator> 


{/* <Animatable.View
        animation="zoomIn"
             easing="ease"
             //  iterationCount="infinite"
             iterationCount={1}
             
  style={{ flexDirection:"row", alignItems:"center",paddingTop: scalableheight.pointfive, paddingBottom: scalableheight.one, justifyContent:"flex-start", width:"100%"}}>
 
<Text style={{
                fontFamily: 'Inter-ExtraBold',
                fontSize: fontSize.sixteen,
                color:"#29262A"
              }}>STARTERS</Text>
              </Animatable.View>
              <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={popularservicedatahome}
              renderItem={starters}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            /> */}
             
          
       
          </CollapsibleScrollView>
        
          </CollapsibleContainer>   

        </View>
        
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
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#470000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.2,
  elevation: 2
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
});
export default withCollapsibleContext(Restaurantpage);
