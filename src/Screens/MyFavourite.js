import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getmyfavourites
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Favourites from '../Shared/Components/Favourites';

import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';


const MyFavourite = ({navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {
    storedlat,
    storedlong,
    AuthToken,
    favouriterestuarants
  } = useSelector(
    state => state.userReducer,
  );

  useEffect(() => {
 dispatch(getmyfavourites(storedlat, storedlong, AuthToken ))
  }, [storedlat, storedlong]);

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

  const renderItem = ({item, index}) => (
    <Favourites
      image={item.Logo}
      title={item.NameAsPerTradeLicense}
      reviews={`${item.AvgRating} (${item.RatingCount} reviews)`}
      time={`${item.OpeningTime} AM - ${item.ClosingTime}PM`}
      onPress={() => {}}
      distance={`${item.Distance}KM AWAY`}
    />
  );

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
        <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          height: '100%',
          width: '100%',

          alignSelf: 'center',

          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'My Favourites'} />
    
        <View style={{width: '100%', paddingHorizontal: scalableheight.two}}>
          <FlatList
            data={favouriterestuarants}
            renderItem={renderItem}
            // ListFooterComponent={renderFooter}
            // onEndReached={loadMoreNotifications}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 54}}
            keyExtractor={(item, index) => index.toString()}
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
    color: 'black',
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

    marginTop: '4%',
    height: scalableheight.six,
    paddingHorizontal: scalableheight.two,
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
  TextInput: {
    width: '95%',
    backgroundColor: '#F5F5F5',
    fontSize: fontSize.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.eleven,
    height: scalableheight.seven,
    color: '#8c8c8c',

    paddingHorizontal: scalableheight.two,
    alignSelf: 'center',
    marginTop: '4%',
  },
  RenderItemView: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
    paddingVertical: scalableheight.two,
    paddingHorizontal: scalableheight.one,
  },
});
export default MyFavourite;
