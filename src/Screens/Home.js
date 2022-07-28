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
  Keyboard
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {getblogshome, getnewsfeedshome, getpopularserviceshome, changelang, seticonfocus, getProfileInformation, getbanner, getcategories, getcategoriesbyid, getNewNotificationCount} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import { SliderBox } from "react-native-image-slider-box";
import ImagesSwiper from "react-native-image-swiper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import BookingHeader from '../Shared/Components/BookingHeader';
import HeaderComponent from '../Shared/Components/HeaderComponent';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Line from '../Shared/Components/Line';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createDrawerNavigator, DrawerItemList, useIsDrawerOpen} from '@react-navigation/drawer';
import listeners from '../Listener/Listener';
import {createConfigItem} from '@babel/core';
import { fontSize, scalableheight } from '../Utilities/fonts'
import moment from 'moment';
import renderIf from 'render-if';
const Home = ({navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [Data, setData] = useState([
    {
      name: 'cars',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
    {
      name: 'cleaning',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
    {
      name: 'car wash',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
    {
      name: 'hair cut',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
    {
      name: 'driver',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
    {
      name: 'maid',
      image: require('../Resources/images/CategoriesIcon.png'),
    },
  ]);
  const [Populardata, setPopulardata] = useState([
    {
      name: 'cars',
      image: require('../Resources/images/popularservice.png'),
    },
    {
      name: 'cleaning',
      image: require('../Resources/images/popularservice.png'),
    },
    {
      name: 'car wash',
      image: require('../Resources/images/popularservice.png'),
    },
    {
      name: 'hair cut',
      image: require('../Resources/images/popularservice.png'),
    },
    {
      name: 'driver',
      image: require('../Resources/images/popularservice.png'),
    },
    {
      name: 'maid',
      image: require('../Resources/images/popularservice.png'),
    },
  ]);

  const [popu, setpopu] = useState([
  require('../Resources/images/popularservice.png'),
   require('../Resources/images/popularservice.png'),
   require('../Resources/images/popularservice.png'),
 
  ]);

  const [BrowseServices, setBrowseServices] = useState([
    {
      name: 'cars service',
      image: require('../Resources/images/browseservices.png'),
    },
    {
      name: 'cleaning service',
      image: require('../Resources/images/browseservices.png'),
    },
    {
      name: 'car wash service',
      image: require('../Resources/images/browseservices.png'),
    },
    {
      name: 'hair cut service',
      image: require('../Resources/images/browseservices.png'),
    },
    {
      name: 'driver service',
      image: require('../Resources/images/browseservices.png'),
    },
    {
      name: 'maid service',
      image: require('../Resources/images/browseservices.png'),
    },
  ]);
  const {blogsdatahome, newsfeedshomedata, Lang, ProfileInfo, profileimage, bannerarray, categories, newNotificationCount, popularservicedatahome} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    dispatch(seticonfocus('home'));
    // listeners()
  }, []);
  useEffect(() => {
    
     listeners()
  }, []);

  useEffect(() => {
    dispatch(getNewNotificationCount());
  }, [newNotificationCount]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideNavigationBar()
        console.log('Keyboard is open')
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideNavigationBar()
        console.log('Keyboard is closed')
      }
    );
  
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(getProfileInformation())
    dispatch(getbanner())

    
  }, []);


  useEffect(() => {
    dispatch(getcategories(Lang))
    dispatch(getpopularserviceshome(Lang))
    dispatch(getnewsfeedshome(Lang))
    dispatch(getblogshome(Lang))
  }, [Lang]);

  function onRefresh() {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true && state.isInternetReachable == true) {
        dispatch(getProfileInformation())
        dispatch(getbanner())
        dispatch(getcategories(Lang))
        dispatch(getpopularserviceshome(Lang))
        dispatch(getnewsfeedshome(Lang))
        dispatch(getblogshome(Lang))
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
  const renderItem = ({item}) => (
  
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // navigation.navigate('PopularServices');


        navigation.navigate('CleaningService', {
          data: item.id,
        });
      }}
      style={{
        height: '100%',
        width: Dimensions.get('window').width / 5,
        alignItems: 'center',
        justifyContent: 'center',
    
      }}>
      <Image
        resizeMode="stretch"
        style={{width: scalableheight.seven, height: scalableheight.seven, borderRadius: fontSize.circle}}
        source={{uri: item.icon}}
      />
      <Text
      numberOfLines={1}
        style={{
          color: 'black',
          opacity: 0.3,
          fontSize: fontSize.eleven,
          fontFamily: 'Rubik-Medium',
          marginTop: '5%',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity> 
  );

  const renderpopularservices = ({item}) => (
   
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        
        navigation.navigate('PopularServicceDetails', {
          data: item.id,
          categoryid: item.serviceCategoryID
        });
      }}
      style={{
        height: '100%',
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <>
        <View
          style={{
            ...styleSheet.shadow,
            width: '95%',
            height: '80%',
            borderRadius: fontSize.eleven,
          }}>
          <Image
            resizeMode="stretch"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: fontSize.eleven,
            }}
            source={{uri: item.image}}
          />
        </View>
        <Text
          style={{
            color: 'black',
            opacity: 0.3,
            fontSize: fontSize.eleven,
            fontFamily: 'Rubik-Medium',
            marginTop: '5%',
          }}>
          {item.name}
        </Text>
      </>
    </TouchableOpacity>
  );

  const renderItemnewsfeeds = ({item, index}) => {

    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => {
                navigation.navigate("NewsFeedDetail", {
                    feedID: item.id,
                })
            }}
            style={{
                ...styleSheet.shadow,
                backgroundColor: "#FFF",
                borderRadius: fontSize.eleven,
                width: Dimensions.get('window').width / 1.25,
          
                height:"95%",
                marginRight:scalableheight.two
            }}
        >
     
             <View style={{ width:"100%", height: "70%", borderRadius:fontSize.eleven,marginBottom:scalableheight.one}}>
                  <Image
                     resizeMode= "stretch"
                    style={{width:"100%", height: "100%", borderRadius:fontSize.eleven}}
                     source={ {uri: item.image}}
                 />  
            </View>
                       <View style={{paddingHorizontal: scalableheight.two}}>
                <Text style={{color:"#C59E6E", fontSize:fontSize.twelve, fontFamily:"Rubik-Medium", marginTop:"2%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                    {moment(item.date).format("D, MMM, YYYY")}
                </Text>
                <Text numberOfLines={2} style={{color:"#113038", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                    {item.name}
                </Text>
            </View>
            <View style={{backgroundColor:"#C59E6E",paddingHorizontal:scalableheight.two,paddingVertical:scalableheight.onepointfive,borderRadius:8,position:'absolute',top:scalableheight.tweleve,left:Lang==="ar"?scalableheight.two:null,right:Lang==="en"?scalableheight.two:null}}>
                <Text style={{color:"#fff", fontSize:fontSize.eightteen, fontFamily:"Rubik-Bold", textAlign:'center'}}>
                    {moment(item.date).format("D")}
                </Text>
                <Text style={{color:"#fff", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium", textAlign:'center',marginTop:"1%"}}>
                    {moment(item.date).format("MMM")}
                </Text>
            </View> 
        </TouchableOpacity>
    )
};
const renderItemblogs = ({item, index}) => {

  return (
      <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("BlogDetail", {
              blogID: item.id
          });
          }}
          style={{
              ...styleSheet.shadow,
              backgroundColor: "#FFF",
              borderRadius: fontSize.eleven,
              width: Dimensions.get('window').width / 1.25,
        
              height:"95%",
              marginRight:scalableheight.two
          }}
      >
   
           <View style={{ width:"100%", height: "65%", borderRadius:fontSize.eleven,marginBottom:scalableheight.one}}>
                <Image
                   resizeMode= "stretch"
                  style={{width:"100%", height: "100%", borderRadius:fontSize.eleven}}
                   source={ {uri: item.bannerImage}}
               />  
          </View>
                     <View style={{paddingHorizontal: scalableheight.two}}>
          
              <Text numberOfLines={2} style={{color:"#113038", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                  {item.title}
              </Text>
              <Text numberOfLines={2} style={{color:"#113038", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                  {item.description}
              </Text>
              {/* <Text style={{color:"#C59E6E", fontSize:fontSize.twelve, fontFamily:"Rubik-Medium", marginTop:"2%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                  {moment(item.date).format("D, MMM, YYYY")}
              </Text> */}
          
          </View>
          {/* <View style={{backgroundColor:"#C59E6E",paddingHorizontal:scalableheight.two,paddingVertical:scalableheight.onepointfive,borderRadius:8,position:'absolute',top:scalableheight.tweleve,left:Lang==="ar"?scalableheight.two:null,right:Lang==="en"?scalableheight.two:null}}>
              <Text style={{color:"#fff", fontSize:fontSize.eightteen, fontFamily:"Rubik-Bold", textAlign:'center'}}>
                  {moment(item.date).format("D")}
              </Text>
              <Text style={{color:"#fff", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium", textAlign:'center',marginTop:"1%"}}>
                  {moment(item.date).format("MMM")}
              </Text>
          </View>  */}
      </TouchableOpacity>
  )
};
  return (
    <Animated.View style={{flex: 1, ...drawerAnimationStyle}}>
      <StatusBar barStyle={useIsDrawerOpen() ? "light-content" : "dark-content"} />
  
      <View style={{flex: 12, backgroundColor: '#303030', borderRadius:10}}>
        <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          showsVerticalScrollIndicator={false}
          style={{
           
            alignSelf: 'center',
            backgroundColor: 'white',
            marginTop: getStatusBarHeight(),
          }}>
          <HeaderComponent newNotificationCount={newNotificationCount} />
   <View style={{ width: '100%',
    alignSelf: 'center',
    height: scalableheight.fourteen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030',}}>

      <View style={{...styleSheet.shadow, flexDirection:"row", width:"90%", height:scalableheight.ten, backgroundColor:"white", borderRadius: fontSize.borderradiusmedium}}>
      <View style={{height: "100%", width: "20%", borderWidth:1, borderColor:"red", alignItems:"center", justifyContent:"center"}}>
<View style={{height:"80%", width: "80%", backgroundColor:"#00000029",  borderRadius: fontSize.borderradiusmedium, alignItems:"center", justifyContent:"center"}}>
<MaterialIcons 
              name="location-pin"
              color={'#F55050'}
              size={fontSize.thirtyeight}
            />
</View>
      </View>
   
      <View style={{height: "100%", width: "60%", borderWidth:1, borderColor:"red"}}>

      </View>
    
      <View style={{height: "100%", width: "20%", borderWidth:1, borderColor:"red"}}>

      </View>
  

</View>
   </View>
      
          <View
            style={{
              width: '100%',
              height: Dimensions.get('window').height / 4,
            }}>
       
       <Animatable.View
        animation="zoomIn"
             easing="ease"
             //  iterationCount="infinite"
             iterationCount={1}
              style={{
                flexDirection: Lang == 'en' ? 'row' : 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '20%',
              }}>
              <Text
                style={{
                  fontFamily: 'Rubik-Medium',
                  fontSize: fontSize.eightteen,
                  color: 'black',
                }}>
                {Lang == 'en' ? 'Popular Services' : 'الخدمات الشعبية'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: '30%',
                  alignItems: Lang == 'en' ? 'flex-end' : 'flex-start',
                }}
                onPress={() => {
                  navigation.navigate('PopularServices');
                }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: fontSize.twelve,
                    color: 'black',
                    opacity: 0.4,
                  }}>
                  {Lang == 'en' ? 'View All' : 'مشاهدة الكل'}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80%',
                width: '100%',
              }}>
              
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularservicedatahome}
                renderItem={renderpopularservices}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />
            </View>
          </View>
        

         

        </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  newsshadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 3,
  },
});
export default Home;
