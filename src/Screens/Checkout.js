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

import {fontSize, scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlainHeader from '../Shared/Components/PlainHeader';
import ItemDetails from '../Shared/Components/ItemDetails';
import Addresstile from '../Shared/Components/Addresstile';
import Bll from '../Shared/Components/Bll';
import MYButton from '../Shared/Components/MYButton';

import PaymentOptions from '../Shared/Components/PaymentOptions';
import Animated from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import NetInfo from '@react-native-community/netinfo';
import { ScrollView } from 'react-native-gesture-handler';

const Checkout = ({navigation, drawerAnimationStyle}) => {
  const dispatch = useDispatch();
  const {notificationList, notificationCount} = useSelector(
    state => state.userReducer,
  );

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

  const [payment, setpayment] = useState([
    {
      type: "Credit/Debit Card",
      payment: 'Pay Online',
      selected: false,
      icon: 1
    },
    {
        type: "Credit/Debit Card",
        payment: 'Cash On Delivery',
        selected: false,
        icon: 2
    },
   
  ]);

  function selectpaymentmethod(index){
console.log("ee" + index)
let data = [...payment]
for(const key in payment){
    if(key == index){
        data[key].selected = true
    }else{
        data[key].selected = false
    }

}
setpayment(data)
  }
  const renderpayment = ({item, index}) => (
    
    <PaymentOptions option ={item.icon} index= {index} title={item.type} payment = {item.payment} selected={item.selected} onPress={()=>{selectpaymentmethod(index)}}/>
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
        <PlainHeader title={'Cart'} />
        <View style={{height: scalableheight.three}} />
     <ScrollView 
     showsVerticalScrollIndicator={false}
     style={{ paddingHorizontal: scalableheight.one}}>
        <View style = {{flexDirection:"row", marginBottom: scalableheight.one}}>
        <Text style={{...styleSheet.Text2, width: "15%", textAlign:"center"}}>QTY</Text>
       <Text style={{...styleSheet.Text2, width: "55%", paddingHorizontal: scalableheight.two}}>ITEM</Text>
       <Text style={{...styleSheet.Text2, width: "30%",paddingHorizontal: scalableheight.two}}>Price</Text>
        </View>
        {serving.map(item => {
             
                return (
                    <View style={{alignItems:"center"}}>
     <ItemDetails title={"Mexican Enchiladas"} price={159.40} onPress={()=>{setmodalVisible(true)}}/>
     </View>
                  )})}
                    <View style={{height: scalableheight.two}} />
                    <Text style={styleSheet.Text1}>Payment Method</Text>
                    <View style={{height: scalableheight.one}} />
                    <FlatList
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={payment}
        
              renderItem={renderpayment}
              // onEndReached={() => LoadFeaturedProjectPagination()}
              // onEndReachedThreshold={0.1}
            />
                        <View style={{height: scalableheight.two}} />
                    <Text style={styleSheet.Text1}>Delivery Address</Text>
                    <View style={{height: scalableheight.one}} />
                    
                  <Addresstile
                                    icon={require('../Resources/images/Homeicon.png')}
                                    place={'Home'}
                                    address={'7399 Stefan Trace Joanne Ligh Street No.85'}
                                    note={'4th floor, Take a left, 2nd brown Door on your right'}

                        
                        />
                             <View style={{height: scalableheight.three}} />
                        <Bll label={"Sub Total"} price={"AED 209.00"}/>
                        <Bll label={"Delivery Charges"} price={"AED 209.00"}/>
                     
                        
                          <View style={styleSheet.Container}>
                            <View style={{flexDirection:"row"}}>
                          <Text style={styleSheet.Text3}>Vat Amount</Text>
                          <Text style={styleSheet.Text4}>{"(4%)"}</Text>
                          </View>
                          <Text style={styleSheet.Text3}>AED 209.00</Text>
                          </View>
                          <View style={{height: scalableheight.one}} />
                          <Text style={{...styleSheet.Text4, textAlign:"right"}} >I HAVE A COUPON</Text>
                         <View style={{borderTopColor: "rgba(211,211,211, 0.5)", borderTopWidth: scalableheight.borderTopWidth, marginVertical: scalableheight.one}}></View>
                          <Bll label={"Total"} price={"AED 222.00"}/>
                          <View style={{height: scalableheight.two}} />
                          <MYButton   title={'Login to Place Orderx'}
                    color="#E14E4E"
                    textcolor="white"/>
                        <View style={{height: scalableheight.three}} />
     </ScrollView>
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fifteen,
    color:"black"
  },
  Text2: {
     fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.ten,
    color:"#29262A", opacity: 0.4
  },
  Text3: {
    fontFamily: 'Inter-Bold',
   fontSize: fontSize.fourteen,
   color:"black"
 },
 Text4: {
    fontFamily: 'Inter-SemiBold',
   fontSize: fontSize.fourteen,
   color:"#E14E4E"
 },
 Text4: {
    fontFamily: 'Inter-SemiBold',
   fontSize: fontSize.fifteen,
   color:"#E14E4E"
 },
 Container:{
    flexDirection:"row", alignItems:"center", justifyContent:"space-between"
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
export default Checkout;