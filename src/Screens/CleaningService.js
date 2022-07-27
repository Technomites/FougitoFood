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
  FlatList
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PlainHeader from '../Shared/Components/PlainHeader';
import Animated from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {changelang, seticonfocus, getProfileInformation, getbanner, getcategories, getcategoriesbyid, getservicedetailsbyid} from '../Actions/actions';
import { fontSize, scalableheight } from '../Utilities/fonts'
const CleaningService = ({navigation, drawerAnimationStyle, route}) => {
  const {Lang, categories,categoryservices} = useSelector(state => state.userReducer);
  const [displaytext, setdisplaytext] = useState('');
  const [categoryid, setcategoryid] = useState('');
  const dispatch = useDispatch();
    const [Populardata, setPopulardata] = useState([ 
        {
          name: "cars",
          image: require('../Resources/images/pservice.png')
        },
        {
         name: "cleaning",
         image: require('../Resources/images/pservice.png')
       },
       {
         name: "car wash",
         image: require('../Resources/images/pservice.png')
       },
       {
         name: "hair cut",
         image: require('../Resources/images/pservice.png')
       },
       {
         name: "driver",
         image: require('../Resources/images/pservice.png')
       },
       {
         name: "maid",
         image: require('../Resources/images/pservice.png')
       },
      
      ])


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // let id = route?.params?.data;
      console.log(route?.params?.data)
      setcategoryid(route?.params?.data)
      dispatch(getcategoriesbyid(Lang, route?.params?.data))
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [route, navigation, Lang]);

  const renderpopularservices = ({item}) => (
    <TouchableOpacity

    
 
    onPress={()=> { 
      navigation.navigate('PopularServicceDetails', {
        data: item.id,
        categoryid: categoryid
      });
    }}
      style={{
    


        height: scalableheight.twentysix, width: Dimensions.get('window').width / 1.05,
        alignItems:"center",
        justifyContent:"center"
        , borderRadius:fontSize.eleven

      }}>
        <View style={{ width:"100%", height: "80%", borderRadius:fontSize.eleven}}>
           <Image
    resizeMode= "stretch"
      style={{  
        ...styleSheet.shadow, 
        width:"100%", height: "100%", borderRadius:fontSize.eleven}}
      source={{uri: item.image}}/>
      </View>
      <Text 
      numberOfLines={1}
      style={{color:"black", fontSize:fontSize.twelve, fontFamily:"Rubik-Medium", marginTop:"2%", alignSelf:Lang == "en" ? "flex-start" :  "flex-end", marginLeft:"1%" }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderservicetypes = ({item}) => (
    <TouchableOpacity
    onPress={()=>{
      dispatch(getcategoriesbyid(Lang, item.id))
    }}
      style={{
    


   height: "100%", width: Dimensions.get('window').width / 4,
      alignItems:"center",
      justifyContent:"center",
    


      }}>
        <View style={{  width:scalableheight.ten, height: scalableheight.ten, borderRadius:200}}>
           <Image
    resizeMode= "cover"
      style={{  
        ...styleSheet.shadow,
        width:"100%", height: "100%", borderRadius:fontSize.circle}}
      source={{uri: item.icon}}/>
      </View>
      <Text 
      numberOfLines={1}
      style={{opacity: 0.3, color:"black", fontSize:fontSize.eleven, fontFamily:"Rubik-Medium", marginTop:"5%", }}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    
  
    <Animated.View style={{flex: 1, backgroundColor: 'white',...drawerAnimationStyle}}>
   <View  style={{height:"100%",width: '100%', alignSelf:"center", paddingTop: getStatusBarHeight()}}>
 
     {/* <Header title={Lang == "en" ? "Cleaning Services" : "خدمات التنظيف"}/> */}
     <PlainHeader 
                    title={Lang == "en" ? "Cleaning Services" : "خدمات التنظيف"}/>
     <View  style={{height:"14%", width:"100%", paddingHorizontal:scalableheight.one}}>
     <FlatList
       keyExtractor={(item, index) => index.toString()}
  style={{alignSelf:"center"}}
  horizontal
       showsHorizontalScrollIndicator={false}
       data={categories}
       renderItem={renderservicetypes}
       // onEndReached={() => LoadFeaturedProjectPagination()}
       // onEndReachedThreshold={0.1}
     />
         </View>


              <View  style={{height:"78%", width:"100%",  paddingBottom:scalableheight.one, paddingHorizontal:scalableheight.one}}>

     <FlatList
       keyExtractor={(item, index) => index.toString()}
  style={{alignSelf:"center"}}
       showsVerticalScrollIndicator={false}
       data={categoryservices}
       renderItem={renderpopularservices}
       // onEndReached={() => LoadFeaturedProjectPagination()}
       // onEndReachedThreshold={0.1}
     />
        
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
    color:"black"
  },
  Image: {
 
    width:241,
    height:104,
    marginBottom:"10%"
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 3,
    shadowRadius :18

 
  },
});
export default CleaningService;
