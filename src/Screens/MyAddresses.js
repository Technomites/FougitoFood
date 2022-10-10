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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {getalladdresses, storecurrentaddress} from '../Actions/actions';
import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Favourites from '../Shared/Components/Favourites';
import Addresstile from '../Shared/Components/Addresstile';
import MYButton from '../Shared/Components/MYButton';
import BottomTab from '../Shared/Components/BottomTab';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-notifications';
import NetInfo from '@react-native-community/netinfo';
import {styles} from 'react-native-element-dropdown/src/components/TextInput/styles';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';
import {
  deleteaddress
} from '../Actions/actions';


const MyAddresses = ({props, navigation, drawerAnimationStyle, route}) => {
  const dispatch = useDispatch();
  const [screenname, setscreenname] = useState('');
  const {AuthToken, alladdresses, addressdeletionstatus} = useSelector(state => state.userReducer);
  const toast = useRef();
  const [addresses, Setaddresses] = useState([
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Home',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Work',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Othericon.png'),
      Place: 'Other',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Home',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Work',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Othericon.png'),
      Place: 'Other',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Home',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Homeicon.png'),
      Place: 'Work',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
    {
      Icon: require('../Resources/images/Othericon.png'),
      Place: 'Other',
      address: '7399 Stefan Trace Joanne Ligh Street No.85',
      Note: '4th floor, Take a left, 2nd brown Door on your right',
    },
  ]);

 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getalladdresses(AuthToken));
      setscreenname('');
      console.log(route?.params?.screenname + 'name');
      if (route?.params?.screenname != undefined) {
        setscreenname(route?.params?.screenname);
      }
    });

    //  Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, route]);

  useEffect(() => {
    if(addressdeletionstatus != ""){
      toast.current.show(addressdeletionstatus, {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 10,
        animationType: 'slide-in',
        zIndex: 2,
      });
      dispatch(getalladdresses(AuthToken));
    }
  }, [addressdeletionstatus]);

  const renderHiddenItem = ({item, index}) => (
    <View style={styleSheet.rowBack}>
      <TouchableOpacity
        style={[styleSheet.actionButton, styleSheet.deleteBtn]}
        onPress={() => {
    
          dispatch(deleteaddress(alladdresses[index].Id, AuthToken))
         
        }}>
        {/* <Text style={styleSheet.btnText}>Delete</Text> */}
        <MaterialCommunityIcons
                            style={{alignSelf: 'center'}}
                            name={'delete'}
                            color={'white'}
                            size={fontSize.thirty}
                          />
      </TouchableOpacity>
    </View>
  );

  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };
  return (
    <Animated.View
      style={{flex: 1, ...drawerAnimationStyle, backgroundColor: 'white', overflow:"hidden"}}>
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
        <PlainHeader title={'My Addresses'} />

        <View
          style={{
            width: '100%',
            paddingHorizontal: scalableheight.two,
            paddingBottom: '5%',
          }}>
          {/* <FlatList
            data={alladdresses}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: scalableheight.twentytwo}}
            renderItem={({item, i}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    let currentaddress = [
                      {
                        Latitude: item.Latitude,
                        Longitude: item.Longitude,
                        icon: item.Type,
                        place: item.Type,
                        address: item.Address,
                        note: item.NoteToRider,
                        Street: item.Street,
                        Floor: item.Floor,
                      },
                    ];
                    console.log(currentaddress);
                    dispatch(storecurrentaddress(currentaddress));
                    navigation.goBack();
                  }}
                  disabled={screenname == 'checkout' ? false : true}
                  style={{marginTop: '5%'}}>
                  <Addresstile
                    disabled={screenname == 'checkout' ? false : true}
                    onPress={() => {
                      navigation.navigate('EditAddress', {
                        // orderId: item.OrderNo,
                        // completedetails: Order,
                      });
                    }}
                    //   // onModelPopUp={changestatus}
                    icon={item.Type}
                    place={item.Type}
                    address={item.Address}
                    note={item.NoteToRider}
                    screenname={screenname}
                  />
                </TouchableOpacity>
              );
            }}
          /> */}

<SwipeListView
            key={'1'}
            data={alladdresses}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: scalableheight.twentytwo}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, i}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    let currentaddress = [
                      {
                        Latitude: item.Latitude,
                        Longitude: item.Longitude,
                        icon: item.Type,
                        place: item.Type,
                        address: item.Address,
                        note: item.NoteToRider,
                        Street: item.Street,
                        Floor: item.Floor,
                      },
                    ];
                    console.log(currentaddress);
                    dispatch(storecurrentaddress(currentaddress));
                    navigation.goBack();
                  }}
                  disabled={screenname == 'checkout' ? false : true}
                  style={{marginTop: '5%'}}>
                  <Addresstile
                    disabled={screenname == 'checkout' ? false : true}
                    onPress={() => {
                      navigation.navigate('EditAddress', {
                        // orderId: item.OrderNo,
                        // completedetails: Order,
                      });
                    }}
                    //   // onModelPopUp={changestatus}
                    icon={item.Type}
                    place={item.Type}
                    address={item.Address}
                    note={item.NoteToRider}
                    screenname={screenname}
                  />
                </TouchableOpacity>
              );
            }}
            renderHiddenItem={renderHiddenItem}
            // leftOpenValue={0}
            disableRightSwipe={true}
            rightOpenValue={-scalableheight.tweleve}
            previewRowKey={'0'}
            previewOpenValue={-80}
            // previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
          />
        </View>
      </View>
      {screenname != 'checkout' && (
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
            paddingHorizontal: scalableheight.two,
            backgroundColor: 'white',
            height: scalableheight.fifteen,
            justifyContent: 'center',
          }}>
          <MYButton
            onPress={() => {
              navigation.navigate('EditAddress');
              // navigation.goBack();
            }}
            color={'rgba(225, 78, 78, 1)'}
            title={'ADD NEW'}
            textcolor={'white'}
          />
        </View>
      )}

<Toast
        ref={toast}
        style={{marginBottom: scalableheight.ten, justifyContent: 'center'}}
      />
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    marginTop: '5%'
   
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: '98%',
    paddingRight: scalableheight.four,
    marginBottom: scalableheight.one,
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: scalableheight.borderwidth,
  },
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: '#E14E4E',
    right: scalableheight.pointfive,
  },
  btnText: {
    color: '#FFF',
    fontSize: fontSize.fifteen,

    fontFamily: 'Inter-SemiBold',
  },
});
export default MyAddresses;
