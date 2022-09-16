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
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlainHeader from '../Shared/Components/PlainHeader';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';
import BottomTab from '../Shared/Components/BottomTab';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const PreparingFood = ({navigation}) => {

  const {Lang} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
 
  }, []);

  return (
    <View
      style={{flex: 1, backgroundColor: 'white',}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
          borderWidth:1, borderColor:"red", width:"100%"
        }}>
     
      <Text>hello</Text>
      </View>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: fontSize.eightteen,
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
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: 'white',
  },

  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
    color: '#000000',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 1,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
  },
  inputIconStyle: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
export default PreparingFood;
