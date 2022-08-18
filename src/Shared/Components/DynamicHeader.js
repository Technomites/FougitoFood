import React, {useState, useEffect, useRef} from 'react';
import { ImageBackground, Text, View, StyleSheet, Animated, Image, FlatList } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import Reviewscontainer from './Reviewscontainer';
import Categoriescard from './Categoriescard';
import SearchBar from './SearchBar';
import Infobar from './Infobar';
import AnimatableInfoBar from './AnimatableInfoBar';
import AnimatableRestaurantContainer from './AnimatableRestaurantContainer';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import renderIf from 'render-if';

const DynamicHeader = ( props) => {
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
  ])
  const Max_Header_Height = scalableheight.sixtythree  + getStatusBarHeight();
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height
const [search, setsearch] = useState('');
const animatedHeaderHeight =  props.animHeaderValue.interpolate({
  inputRange: [ 0, Scroll_Distance],
  outputRange: [Max_Header_Height , Min_Header_Height],
  extrapolate: 'clamp',
  useNativeDriver: true 
})
const animateHeaderBackgroundColor = props.animHeaderValue.interpolate({
  inputRange: [0, Max_Header_Height - Min_Header_Height],
  outputRange: ['white', "white"],
  extrapolate: 'clamp',
  useNativeDriver: true 
})

const renderpopularcategories = ({item}) => (
  <Categoriescard
    image={require('../../Resources/images/food.png')}
    type={'Pizza'}
    price={20}
  />
);

  return (
    <>
   
     
    <Animated.View 
    style={[
      styles.header,
      {
        height: animatedHeaderHeight,
        backgroundColor: animateHeaderBackgroundColor,
       
   
      }

    ]}
  >
{/*   
          // height:"33%"
         // eight: "21%", */}

              <View style={{width: "100%", height:scalableheight.twentythree,}}>
              <ImageBackground
            resizeMode="stretch"
            style={{
              width: '100%',
              height: "100%" ,
           
   justifyContent:"flex-end",

            
              // scalableheight.twenty + getStatusBarHeight()
            }}
            imageStyle={{
              borderBottomLeftRadius: fontSize.twenty,
              borderBottomRightRadius: fontSize.twenty,
           
              
            }}
            source={require('../../Resources/images/homebackground.png')}>
              
             
    <View style={{width: "95%", backgroundColor:"black", height:"33%", alignSelf:"center" , marginBottom: scalableheight.onepointfive}}>
 <AnimatableInfoBar Heading ={"Home"} Details ={"Clifton block 2, plot no 245, near bilawal house"}
    onPress={
     props.showlocation
    }
 />
   </View>

  

              </ImageBackground>  
              </View>
              <View style={{height: scalableheight.fourteen, width:"100%"}}>
              <AnimatableRestaurantContainer rating={"8.9"} reviews={"350"} title={"Perfect Grill"} description={"Its the food you love"} image={require('../../Resources/images/grill.png')}/>
              </View>
     
              
              <View style={{paddingHorizontal: scalableheight.one, alignSelf: 'flex-start', width:"100%",}}>
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
              data={flavours}
              renderItem={renderpopularcategories}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />
        
</View> 

<View style={{paddingHorizontal: scalableheight.one, width:"100%",}}>
<SearchBar search={search} onchange={(val) => {setsearch(val)}}/>
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