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
  Platform
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus, getProfileInformation, getbanner, getcategories, getcategoriesbyid} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import renderIf from 'render-if';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../Shared/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BottomTab from '../Shared/Components/BottomTab';
import { fontSize, scalableheight } from '../Utilities/fonts'
import PlainHeader from '../Shared/Components/PlainHeader';


const AllCategories = ({navigation, drawerAnimationStyle}) => {
  const [searchText, setSearchText] = useState('');
  const [Populardata, setPopulardata] = useState([
    {
      name: 'cars',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'cleaning',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'car wash',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'hair cut',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'driver',
      image: require('../Resources/images/pservice.png'),
    },
    {
      name: 'maid',
      image: require('../Resources/images/pservice.png'),
    },
  ]);
  const {Lang, categories} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {

        StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
 StatusBar.setBarStyle('dark-content');
  }, []);

  const renderpopularservices = ({item}) => (
    
  
    item.name.includes(searchText.trim()) ? 
    <TouchableOpacity
    onPress={() => {
      navigation.navigate('CleaningService');
      navigation.navigate('CleaningService', {
        data: item.id,
      });
    }}
    style={{
  
 height: scalableheight.twentysix, width: "100%",
    alignItems:"center",
    justifyContent:"center"
    , borderRadius:fontSize.eleven

    }}>
      <View style={{...styleSheet.shadow,  width:"100%", height: "80%", borderRadius:fontSize.eleven}}>
         <Image
  resizeMode= "stretch"
    style={{  
      width:"100%", height: "100%", borderRadius:fontSize.eleven}}
    source={{uri: item.image}}/>
    </View>
    <Text style={{color:"black", fontSize:fontSize.twelve
    , fontFamily:"Rubik-Medium", marginTop:"2%", alignSelf:"flex-start", marginLeft:"1%" }}>{item.name}</Text>
  </TouchableOpacity>
  : null

  );

  return (

   <Animated.View style={{flex: 1, backgroundColor: 'white',...drawerAnimationStyle}}>
      <View
        style={{
          height: '100%',
          width: '100%',
  
          alignSelf: 'center',
           paddingTop: getStatusBarHeight(), flex:12
        }}>
        <Header title={Lang == "en" ? "All Categories" : "جميع الفئات"} />

<View style={{      paddingHorizontal:scalableheight.one}}>
        <View
          style={{
            ...styleSheet.shadow,
            width: '99%',
            height: Dimensions.get('window').height / 15,
            justifyContent: 'center',
            borderRadius: fontSize.twenty,
            marginTop: '3%',
            alignSelf: 'center',
            marginBottom: '3%',
         
          }}>
          <TextInput
            onChangeText={text => setSearchText(text)}
            placeholder={  Lang == "en" ? "Search here" : "ابحث هنا" }
            style={{
              width: '100%',
              height: '100%',
fontSize:fontSize.fifteen,
              backgroundColor: '#F9F9F9',
              alignSelf: 'center',
              borderRadius: fontSize.twenty,
              paddingLeft: '5%',
              paddingRight: '5%',
            }}
            value={searchText}
          />
             {renderIf(Lang == "en")(

<Ionicons
name="search"
color={'grey'}
size={ fontSize.twenty}
style={{position: 'absolute', right: '5%'}}
/>
             )}
                   {renderIf(Lang != "en")(

<Ionicons
name="search"
color={'grey'}
size={ fontSize.twenty}
style={{position: 'absolute', left: '5%'}}
/>
             )}
         
        </View>
        </View>
        <View
          style={{
            height: '83%',
            width: '100%',
           alignSelf:"center",
            paddingBottom:scalableheight.one,
            paddingHorizontal:scalableheight.one
          }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{alignSelf: 'center', height: '100%', width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={renderpopularservices}
            // onEndReached={() => LoadFeaturedProjectPagination()}
            // onEndReachedThreshold={0.1}
          />
          
        </View>
        </View>

      <View  style={{  flex: 1, backgroundColor: 'white',        borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
<BottomTab/>
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
export default AllCategories;
