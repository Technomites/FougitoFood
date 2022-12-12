import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
  LayoutAnimation,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import HeaderComponentRestaurant from './HeaderComponentRestaurant';
import Categoriescard from './Categoriescard';
import SearchBar from './SearchBar';
import Infobar from './Infobar';

import AnimatableInfoBar from './AnimatableInfoBar';
import AnimatableRestaurantContainer from './AnimatableRestaurantContainer';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
} from '../../Actions/actions';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DynamicScrolledupheader = props => {
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
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const Max_Header_Height = scalableheight.tweleve + getStatusBarHeight();
  const OldMax_Header_Height =
    scalableheight.sixtyone - scalableheight.tweleve - getStatusBarHeight();
  // LayoutAnimation.easeInEaseOut();
  const Min_Header_Height = 0;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height;
  const [search, setsearch] = useState('');
  const animatedHeaderHeight = props.animHeaderValue.interpolate({
    //   inputRange: [OldMax_Header_Height - Max_Header_Height, OldMax_Header_Height  + Max_Header_Height, OldMax_Header_Height  + Max_Header_Height],
    inputRange: [
      OldMax_Header_Height,
      OldMax_Header_Height + 1,
      OldMax_Header_Height + 1,
    ],
    //outputRange: [Max_Header_Height , Min_Header_Height],
    outputRange: [0, Max_Header_Height, Max_Header_Height],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const animateHeaderBackgroundColor = props.animHeaderValue.interpolate({
    inputRange: [0, Max_Header_Height - Min_Header_Height],
    outputRange: ['white', 'white'],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const rendertypes = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        props.scrolltocategory(index);
      }}
      style={styles.renderitemview}>
      <Text
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          props.dataSourceCordsHorizontal[index] = layout.x; // we store this offset values in an array
        }}
        style={{
          ...styles.renderitemtext,
          color: item.visible ? '#E14E4E' : 'rgba(211,211,211, 0.9)',
        }}>
        {item?.CategoryName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            height: animatedHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
            //  transform: [{translateY: animatedHeaderHeight}]
          },
        ]}>
        <View style={styles.innerview}>
          <HeaderComponentRestaurant
            // newNotificationCount={newNotificationCount}
            isEnabled={props.isEnabled}
            toggleSwitch={props.toggleSwitch}
          />
        </View>
        <View style={styles.viewcontainer}>
          {/* <View style={{backgroundColor: "transparent", paddingTop: getStatusBarHeight(), elevation: 3000, zIndex:3000}}>
              <HeaderComponentRestaurant
                  // newNotificationCount={newNotificationCount}
                  isEnabled={props.isEnabled}
                  toggleSwitch={props.toggleSwitch}
                />
                </View> */}

          <AnimatedFlatList
            key={'1'}
            keyExtractor={(item, index) => index.toString()}
            ref={props.scrollviewhorizontalref}
            overflow={'hidden'}
            useNativeDriver={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            style={styles.flatlistview}
            data={restrauntmenu}
            renderItem={rendertypes}

            // onEndReached={() => LoadFeaturedProjectPagination()}
            // onEndReachedThreshold={0.1}
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
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerview: {backgroundColor: 'transparent', paddingTop: getStatusBarHeight()},
  viewcontainer: {
    backgroundColor: '#201F1F',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    elevation: -2,
    paddingTop: getStatusBarHeight() + scalableheight.ten,
  },
  flatlistview: {
    width: '100%',
    //  height: scalableheight.fourteen,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    //  marginTop: animatedtop ,
    position: 'absolute',
    top:
      Platform.OS == 'ios'
        ? getStatusBarHeight() + scalableheight.seven
        : getStatusBarHeight() + scalableheight.seven,
    // backgroundColor: '#F6F6F6',
    // borderWidth:1, borderColor:"red"
  },
  renderitemview: {
    backgroundColor: 'transparent',
    paddingHorizontal: scalableheight.three,
    alignItems: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderitemtext: {
    fontFamily: 'Inter-SemiBold',

    fontSize: fontSize.fifteen,
    paddingVertical: scalableheight.one,
    // borderBottomWidth: item.visible ? 1 : 0,
    // borderWidth:item.visible ? 1 : 0,

    borderColor: '#E14E4E',
  },
});

export default DynamicScrolledupheader;
