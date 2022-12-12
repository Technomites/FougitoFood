import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function HeaderComponent(props) {
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
  const navigation = useNavigation();
  const openMenu = () => {
    console.log('hello');
    navigation.openDrawer();
  };

  return (
    <View style={styleSheet.header}>
      <View style={styleSheet.container}>
        <TouchableOpacity onPress={openMenu} style={styleSheet.menu}>
          <MaterialCommunityIcons
            name="menu"
            color={'white'}
            size={fontSize.twentyeight}
          />
        </TouchableOpacity>

        <Image
          resizeMode="contain"
          style={styleSheet.logo}
          source={require('../../Resources/images/logo.png')}
        />

        {/* <View style={{flexDirection: 'row',justifyContent:"flex-end"}}>
       
        <MaterialIcons 
              name="location-pin"
              color={'white'}
              size={fontSize.twentyeight}
            />
        <AntDesign 
              name="hearto"
              color={'white'}
              style={{marginLeft: scalableheight.two, marginRight: scalableheight.two,}}
              size={fontSize.twentyeight}
            />
           
        </View> */}
      </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: scalableheight.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'red',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  menu: {
    height: scalableheight.seven,
    width: scalableheight.five,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },

  text: {
    fontSize: 20,
  },
  icon: {
    position: 'absolute',
    left: '-1%',
  },
  videocall: {
    flexDirection: 'row',
    position: 'absolute',
    right: '-1%',
  },
  logo: {
    alignSelf: 'center',
    width: scalableheight.thirteen,
    height: scalableheight.four,
  },
});

{
  /* <View style={styleSheet.header}>
<View
  style={{
    width: '91%',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <MaterialCommunityIcons
    name="menu"
    onPress={openMenu}
    size={28}
    style={styleSheet.icon}
  />
  {/* <View>
    <Image source={require('../../Resources/images/light.png')} />
  </View> */
}
{
  /* <View style={styleSheet.videocall}>
    <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
      <Image
        style={{right: 14}}
        source={require('../../Resources/images/video/video.png')}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
      <Image source={require('../../Resources/images/Phone/phone.png')} />
    </TouchableOpacity>
  </View> 
</View>
</View> */
}
