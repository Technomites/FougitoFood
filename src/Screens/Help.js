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
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
import {fontSize, scalableheight} from '../Utilities/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Settingscomponent from '../Shared/Components/Settingscomponent';
// import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
const Help = ({navigation, drawerAnimationStyle}) => {
  const {Lang} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(seticonfocus('home'));
  }, []);

  return (
    <Animated.View style={[styleSheet.maincontainerview, drawerAnimationStyle]}>
      <View style={styleSheet.innerview}>
        <PlainHeader title={Lang == 'en' ? 'Help' : 'مساعدة'} />
        <View style={styleSheet.heightthree}></View>
        <View style={styleSheet.paddinghorizontaltwo}>
          <Settingscomponent
            title={Lang == 'en' ? 'Terms & Conditions' : 'البنود و الظروف'}
            icon={'file'}
          />
          <Settingscomponent
            title={Lang == 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            icon={'eye'}
          />
          <Settingscomponent
            title={Lang == 'en' ? 'FAQs' : 'أسئلة وأجوبة'}
            icon={'question'}
          />
        </View>
      </View>
      <View style={styleSheet.innerview5}>
        <BottomTab />
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  innerview5: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  paddinghorizontaltwo: {paddingHorizontal: scalableheight.two},
  heightthree: {height: scalableheight.three},
  innerview: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    paddingTop: getStatusBarHeight(),
    flex: 12,
  },

  maincontainerview: {
    flex: 1,
    backgroundColor: 'white',
  },
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
});
export default Help;
