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
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function UpcomingBookingCard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {Lang} = useSelector(state => state.userReducer);

  return (
    <>
      <View
        style={{
          flexDirection: Lang == 'en' ? 'row' : 'row-reverse',

          width: '94%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2%',
          marginTop: '5%',
        }}>
        <View style={{flexDirection: Lang == 'en' ? 'row' : 'row-reverse'}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>
            {Lang == 'en' ? 'Book ID:' : 'معرف الكتاب:'}
          </Text>
          <Text
            style={{
              color: '#C59E6E',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
              marginLeft: Lang == 'en' ? '3%' : '0%',
              marginRight: Lang == 'en' ? '0%' : '3%',
            }}>
            {props.bookingid}
          </Text>
        </View>
        <Text
          style={{
            color: '#C59E6E',
            fontFamily: 'Rubik-Regular',
            fontSize: fontSize.twelve,
          }}>
          {props.bookingdate}
        </Text>
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.35,
          shadowRadius: 4.5,

          elevation: 2,

          width: '95%',
          height: Dimensions.get('window').height / 4.5,
          backgroundColor: 'white',
          borderRadius: fontSize.borderradiuslarge,

          borderWidth: 1,
          borderColor: '#C59E6E',
        }}>
        <View style={{width: '100%', height: '75%', alignItems: 'center'}}>
          <View
            style={{
              width: '95%',
              height: '33.33%',
              flexDirection: Lang == 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
              }}>
              {props.category}
            </Text>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
              }}>
              {props.subcategory}
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              height: '33.33%',
              flexDirection: Lang == 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
              }}>
              {Lang == 'en' ? 'Address' : 'عنوان'}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: '#C59E6E',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
                width: '83%',
                marginLeft: Lang == 'en' ? '4%' : '0%',
                marginRight: Lang == 'en' ? '0%' : '4%',

                textAlign: Lang == 'en' ? 'left' : 'right',
              }}>
              {props.address}
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              height: '33.33%',
              flexDirection: Lang == 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
              }}>
              {Lang == 'en' ? 'Status' : 'حالة'}
            </Text>
            <Text
              style={{
                color: '#C59E6E',
                fontFamily: 'Rubik-Regular',
                fontSize: fontSize.twelve,
                marginLeft: Lang == 'en' ? '4%' : '0%',
                marginRight: Lang == 'en' ? '0%' : '4%',
              }}>
              {props.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity
        disabled={props.status == "Pending" || props.status == "Inprocess" || props.status == "Cancelled" || props.status == "Completed" ? true : false}
          onPress={() => {
            props.bookingdetails(props.id, props.status, props.Index);
          }}
          style={{
            width: '99.8%',
            height: '25%',
            backgroundColor: props.status == "Pending" || props.status == "Inprocess" || props.status == "Cancelled" || props.status == "Completed" ? "white" : '#EEEBE7',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: fontSize.borderradiuslarge,
            borderBottomRightRadius:fontSize.borderradiuslarge,
     
          }}>
          <Text
            style={{
              color: props.status == "Cancelled"  ?  "red" : props.status == "Completed"  ?  "green" : 'black',
              fontFamily: 'Rubik-Regular',
              fontSize: fontSize.twelve,
            }}>
               {props.status == "Cancelled" ? Lang == 'en' ? 'Vendor Request Rejected' : "تم رفض طلب البائع" : props.status == "Completed" ? Lang == 'en' ? 'Invoice Paid' : 'فاتورة المدفوعة' : props.status == "Pending" ? Lang == 'en' ? 'Invoice Generation in progress' : "إنشاء الفاتورة قيد التقدم" : props.status == "Inprocess" ? Lang == 'en' ? 'Waiting for vendor approval' : "في انتظار موافقة البائع" : props.status == "Invoiced" ? Lang == 'en' ? 'Proceed To Invoice Payment' : "متابعة دفع الفاتورة"  : Lang == 'en' ? 'View All Details' : "عرض كافة التفاصيل"} 
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styleSheet = StyleSheet.create({
  header: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
});
