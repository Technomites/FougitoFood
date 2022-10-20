import React, {useState, useEffect, useRef} from 'react';
import { LayoutAnimation, ImageBackground, Text, View, StyleSheet, Image, FlatList, Animated, Touchable } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import Reviewscontainer from './Reviewscontainer';
import Categoriescard from './Categoriescard';
import SearchBar from './SearchBar';
import Infobar from './Infobar';

import HeaderComponentRestaurant from './HeaderComponentRestaurant';
import AnimatableRestaurantContainer from './AnimatableRestaurantContainer';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import renderIf from 'render-if';
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
  clearfavourite
} from '../../Actions/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
const DynamicHeader = ( props) => {

  const {
    restrauntdetails,
    popularcategories,
    restrauntmenu,
    retaurantmenucategorydataoption,
    cartdata,
    price,
    AuthToken,
    addedtofavourite,
    Selectedcurrentaddress
 
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const Max_Header_Height = props.pickupstate == false ? scalableheight.sixtyfive + getStatusBarHeight() : scalableheight.sixtyfour + getStatusBarHeight();
  //const Max_Header_Height = scalableheight.ninety  + getStatusBarHeight();
  // LayoutAnimation.easeInEaseOut();
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height
const [search, setsearch] = useState('');
const animatedHeaderHeight =  props.animHeaderValue.interpolate({
  
  inputRange: [0,Max_Header_Height, Max_Header_Height],
  //outputRange: [Max_Header_Height , Min_Header_Height],
  outputRange: [Max_Header_Height,0,0],
  extrapolate: 'clamp',
  useNativeDriver: true 
})
const animateHeaderBackgroundColor = props.animHeaderValue.interpolate({
  inputRange: [0, Max_Header_Height - Min_Header_Height],
  outputRange: ['white', "white"],
  extrapolate: 'clamp',
  useNativeDriver: true 
})

const renderpopularcategories = ({item, index}) => (
  <TouchableOpacity 
  activeOpacity={0.9}
  onPress={() => props.scrollmeto(index, item)}>
  <Categoriescard
    image={item?.Image}
    type={item?.CategoryName}
    price={item?.AvgPrice}

  />
</TouchableOpacity>
);


  return (
    <>
   
     
    <Animated.View 
    
    style={[
      styles.header,
      {
        // height: animatedHeaderHeight,
        height: props.pickupstate == false ? scalableheight.sixtyfive + getStatusBarHeight() : scalableheight.sixtyfour + getStatusBarHeight(),
        backgroundColor: animateHeaderBackgroundColor,
        elevation: 3000, zIndex:3000
     // transform: [{translateY: animatedHeaderHeight}]
      }

    ]}
  >


          
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
              source={require('../../Resources/images/homebackground.png')}>
                <View style={{backgroundColor: "transparent", paddingTop: getStatusBarHeight(), elevation: 3000, zIndex:3000}}>
              <HeaderComponentRestaurant
                  // newNotificationCount={newNotificationCount}
                  isEnabled={props.isEnabled}
                  toggleSwitch={props.toggleSwitch}
                />
                </View>

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
                  bottom: scalableheight.onepointfive,
                  position:"absolute"
                }}>
                <View style={{width: '95%'}}>
                  <Infobar
                      Heading={Selectedcurrentaddress?.length > 0 ? Selectedcurrentaddress[0].place : 'Current Location'}
                      Details={Selectedcurrentaddress?.length > 0 ? Selectedcurrentaddress[0].address :  props.pinlocation}
                    onPress={
                      props.showlocation
                    }
                  />
                </View>
              </View>
            </ImageBackground>
            <Reviewscontainer
            token= {AuthToken}
              rating={restrauntdetails?.AvgRating?.toFixed(2)}
              reviews={restrauntdetails?.RatingCount}
              title={restrauntdetails?.BranchName}
              Address={restrauntdetails?.Address}
              openbranchlist={props.openbranchlist}
              pickupstate ={props.pickupstate}
              description={'Its the food you love, delivered'}
              onPress={() => {
                // console.log(JSON.stringify(restrauntdetails.RestaurantBranchId))
                // console.log( restrauntdetails?.Isfavourite)

                 dispatch(markfavourite(restrauntdetails?.RestaurantBranchId, restrauntdetails?.Isfavourite ? "DELETE" : "POST", AuthToken))
              }}
              Isfavourite = {restrauntdetails?.Isfavourite}
              image={restrauntdetails?.Logo}
            />
             <View style={{paddingHorizontal: scalableheight.one,   backgroundColor: '#F6F6F6', width:"100%"}}>
          
              {/* <Animatable.View
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
            
                }}> */}
                  <View
                
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
                    fontSize: fontSize.sixteen,
                  }}>
                  CATEGORIES
                </Text>
                </View>

              {/* //</Animatable.View> */}

              <FlatList
                key = "2"
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
               data={popularcategories}
                // data={restrauntmenu}
                
                renderItem={renderpopularcategories}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />
              <SearchBar
                // search={search}
                onchange={val => {
                  props.search(val)
                  // setsearch(val);
                }}
              /> 
   
            </View> 
     
           
</Animated.View>
</>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',      
    // borderBottomLeftRadius: fontSize.twenty,
    //           borderBottomRightRadius: fontSize.twenty,
            overflow:"hidden"
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default DynamicHeader;