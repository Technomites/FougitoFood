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
  Switch,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
// import ToggleSwitch from 'toggle-switch-react-native';
export default function HeaderComponentRestaurant(props) {
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
    dinein
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const openMenu = () => {
    console.log('hello');
    navigation.openDrawer();
  };

  return (
    <View style={styleSheet.header}>
      <View style={styleSheet.innerheader}>
        <TouchableOpacity
          onPress={openMenu}
          style={styleSheet.innerheadertouch}>
          <MaterialCommunityIcons
            name="menu"
            color={'white'}
            size={fontSize.twentyeight}
          />
        </TouchableOpacity>

        <Image
          resizeMode="contain"
          style={styleSheet.innerimage}
          source={require('../../Resources/images/logo.png')}
        />


        <View style={{...styleSheet.innerview, backgroundColor: dinein ? '#E14E4E' : null, borderRadius: dinein ? fontSize.borderradius : null, padding: dinein ? scalableheight.pointfive : null,}}>
          {dinein ? 
             <Text style={{...styleSheet.text1, marginRight:0}}>Dine in</Text>
           :
           <>
          <Text style={styleSheet.text1}>
            {props.isEnabled ? 'Delivery' : 'Pickup'}{' '}
          </Text>
          {/* <ToggleSwitch
  style={{}}
              isOn={props.isEnabled}
              thumbOnStyle={{backgroundColor: 'white'}}
              thumbOffStyle={{backgroundColor: 'white'}}
              trackOnStyle={{backgroundColor: "#E14E4E"}}
              trackOffStyle={{backgroundColor: "grey"}}
              onToggle={props.toggleSwitch}
              size="medium"
            /> */}

          <Switch
            trackColor={{false: 'grey', true: '#E14E4E'}}
            thumbColor={props.toggleSwitch ? 'white' : 'white'}
            ios_backgroundColor="grey"
            onValueChange={props.toggleSwitch}
            value={props.isEnabled}
          />
          </>}
        </View>

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
    zIndex: 1,
    elevation: 1,
    // backgroundColor: '#303030',
    backgroundColor: 'transparent',
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
  innerheader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  innerheadertouch: {
    padding: scalableheight.one,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerimage: {
    marginLeft: scalableheight.one,
    alignSelf: 'center',
    width: scalableheight.thirteen,
    height: scalableheight.four,
  },
  innerview: {
    position: 'absolute',
    right: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'white',
    marginRight: scalableheight.one,
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
