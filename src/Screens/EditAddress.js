import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  readallnotifications,
  addReadNotifications,
  clearNotificationCount,
  clearNotifications,
  getAllNotifications,
  GetNotifications,
  notificationCountHandle,
  readNotification,
  seticonfocus,
} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import Favourites from '../Shared/Components/Favourites';
import Addresstile from '../Shared/Components/Addresstile';
import MYButton from '../Shared/Components/MYButton';
import Addressplace from '../Shared/Components/Addressplace';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const EditAddress = ({props, navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const [lat, setlat] = useState(24.8607);
  const [long, setlong] = useState(67.0011);
  const customStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },

    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffb606',
        },
      ],
    },

    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d8d8d8',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#b6b4b4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ];
  const [place, Setplace] = useState([
    {
      icon: 'home',
      title: 'Home',
    },
    {
      icon: 'briefcase',
      title: 'Work',
    },
    {
      icon: 'building',
      title: 'Other',
    },
  ]);
  const refMap = useRef(null);
  const {notificationList, notificationCount} = useSelector(
    state => state.userReducer,
  );

  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
        }}>
        <PlainHeader title={'My Address'} />
        <View style={{height: scalableheight.three}} />
        <View style={{width: '100%', paddingHorizontal: scalableheight.two}}>
          <View style={styleSheet.container}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '10%',
              }}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name="search"
                color={'rgba(41, 38, 42, 0.5)'}
                size={fontSize.fifteen}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '80%',
                justifyContent: 'center',
              }}>
              <TextInput
                returnKeyType="next"
                // numberOfLines={props.inputLine}
                //value={props.value}
                // onChangeText={props.onChangeText}
                placeholderTextColor={'lightgray'}
                placeholder={'Search'}
                style={styleSheet.textInput}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '10%',
              }}>
              <MaterialIcons
                style={{alignSelf: 'center'}}
                name="my-location"
                color={'#F55050'}
                size={fontSize.fifteen}
              />
            </View>
          </View>
          <View
            style={{
              height: scalableheight.twentysix,
              borderRadius: fontSize.eight,
              overflow: 'hidden',
              marginTop: scalableheight.two,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              customMapStyle={customStyle}
              ref={refMap}
              style={{
                width: '100%',
                height: '100%',
              }}
              showsUserLocation
              region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
          </View>
          <View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  color: 'rgba(41, 38, 42, 0.6)',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Street
              </Text>
            </View>
            <View style={styleSheet.container}>
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  returnKeyType="next"
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  //value={props.value}
                  // onChangeText={props.onChangeText}
                  placeholderTextColor={'lightgray'}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}
                  style={styleSheet.textInput}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  color: 'rgba(41, 38, 42, 0.6)',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Floor (Optional)
              </Text>
            </View>
            <View style={styleSheet.container}>
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  returnKeyType="next"
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  //value={props.value}
                  // onChangeText={props.onChangeText}
                  placeholderTextColor={'lightgray'}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}
                  style={styleSheet.textInput}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  color: 'rgba(41, 38, 42, 0.6)',
                  fontFamily: 'Inter-Bold',
                  fontSize: fontSize.fifteen,
                }}>
                Note To Rider (Optional)
              </Text>
            </View>
            <View
              style={{...styleSheet.container, height: scalableheight.tweleve}}>
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  returnKeyType="next"
                  // numberOfLines={props.inputLine}
                  // keyboardType={props.keyboardType}
                  //value={props.value}
                  // onChangeText={props.onChangeText}
                  placeholderTextColor={'#000'}
                  // secureTextEntry={props.secure}
                  // placeholder={props.placeHolder}
                  style={styleSheet.textInput}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {place.map(item => {
              return <Addressplace data={item} />;
            })}

            {/* <Addressplace
              Icon={icon}
              place={title}
            <Addresstile
              //   onPress={() =>
              //     navigation.navigate('OrderDetails', {
              //       orderId: item.OrderNo,
              //       completedetails: Order,
              //     })
              //   }
              //   // onModelPopUp={changestatus}
            /> */}
            {/* <FlatList 
              data={place}
              // showsHorizontalScrollIndicatorScrollIndicator={false}
              horizontal={true}
              style={{
                width: '100%',
                //   justifyContent: 'center',
                //   alignItems: 'center'
                //   marginBottom: 20,
              }}
              renderItem={({item, i}) => {
                return (
                 
                );
              }}
            /> */}
          </View>

          <View style={{marginBottom: scalableheight.six}}>
            <MYButton
              onPress={() => {
                // navigation.navigate("Home")
                navigation.goBack();
              }}
              color={'rgba(225, 78, 78, 1)'}
              title={'ADD'}
              textcolor={'white'}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    height: scalableheight.six,
    backgroundColor: 'rgba(42, 28, 28, 0.1)',
    width: '100%',
    flexDirection: 'row',
    borderRadius: fontSize.eight,
  },
  textInput: {
    marginLeft: scalableheight.one,

    width: '100%',
    color: 'black',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000075',
    paddingHorizontal: 30,
  },
  modalView: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#29262A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
});
export default EditAddress;
