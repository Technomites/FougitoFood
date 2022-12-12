import React, {useState, useEffect} from 'react';
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
  ImageBackground,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {filteredcatdata, storecartprice} from '../../Actions/actions';
import FastImage from 'react-native-fast-image';

export default function ItemDetails(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showcounter, setshowcounter] = useState(false);
  const [animationstate, setanimationstate] = useState(true);

  const {cartdata, price} = useSelector(state => state.userReducer);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('search hit ');
      setshowcounter(false);
      setanimationstate(true);

      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [cartdata, showcounter]);

  function increment() {
    console.log('hhrrnr', props.index);
    let data = [...cartdata];

    data[props.index].Qty = data[props.index].Qty + 1;
    let previousprice = data[props.index].completeitemorderprice;
    data[props.index].completeitemorderprice =
      data[props.index].priceperitem * data[props.index].Qty;
    let newprice = data[props.index].completeitemorderprice;

    let incrementedprice = newprice - previousprice;

    dispatch(storecartprice(price + incrementedprice));
    // "Qty": 1,
    // "completeitemorderprice": 22

    dispatch(filteredcatdata(data));
  }

  function decrement() {
    console.log('hhrrnr', props.index);
    let data = [...cartdata];

    if (data[props.index].Qty > 1) {
      data[props.index].Qty = data[props.index].Qty - 1;
      let previousprice = data[props.index].completeitemorderprice;
      data[props.index].completeitemorderprice =
        data[props.index].priceperitem * data[props.index].Qty;
      let newprice = data[props.index].completeitemorderprice;

      let decrementedprice = previousprice - newprice;

      dispatch(storecartprice(price - decrementedprice));
    }

    dispatch(filteredcatdata(data));
  }

  function togglecounter() {
    setanimationstate(true);
    setshowcounter(!showcounter);
  }
  return (
    <View
      // activeOpacity={1}

      style={styleSheet.itemdetailsview}>
      {showcounter ? (
        <Animatable.View
          animation={animationstate ? 'pulse' : null}
          onAnimationEnd={() => {
            setanimationstate(false);
            // if (animationtype == 'fadeOutDownBig') {
            //   setanimationtype('fadeInUpBig');

            //   props.togglemodel();
            // }
          }}
          easing="ease"
          //  iterationCount="infinite"
          iterationCount={1}
          style={styleSheet.mainview}>
          <TouchableOpacity
            onPress={increment}
            style={styleSheet.incrementicon}>
            <FontAwesome5
              name="plus-circle"
              color={'#E14E4E'}
              size={fontSize.twentyeight}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={decrement}
            style={styleSheet.incrementicon}>
            <FontAwesome5
              name="minus-circle"
              color={'#E14E4E'}
              size={fontSize.twentyeight}
            />
          </TouchableOpacity>
        </Animatable.View>
      ) : null}
      <View style={styleSheet.innerview}>
        <TouchableOpacity
          onPress={togglecounter}
          style={styleSheet.togglecounterview}>
          <Text style={styleSheet.text1}>{props.qty}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        style={styleSheet.touchableview}>
        <View style={styleSheet.innerviewcontainer}>
          {/* <Image
                    resizeMode="cover"
                    style={{
                      width: scalableheight.six,
                      height: scalableheight.six,
                      borderRadius: fontSize.borderradius
                    }}
                    source={{uri: props?.image}}
                  /> */}
          <FastImage
            style={styleSheet.fastimagestyle}
            source={{
              uri: props?.image,
              // headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styleSheet.containerview}>
          <Text numberOfLines={1} style={styleSheet.text3}>
            {props.title}
          </Text>
          <Text style={styleSheet.text4}>View Details</Text>
        </View>
      </TouchableOpacity>
      <View style={styleSheet.innerview3}>
        <Text style={styleSheet.text5}>
          {'AED '}
          {props?.price?.toFixed(2)}
        </Text>
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
    backgroundColor: 'white',
    paddingHorizontal: scalableheight.one,
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
  backButtonMain: {
    backgroundColor: '#F9F9F9',
    height: scalableheight.four,
    width: scalableheight.four,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
  itemdetailsview: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    height: scalableheight.nine,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalableheight.one,
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: scalableheight.borderwidth,

    paddingHorizontal: scalableheight.one,
  },
  mainview: {
    width: scalableheight.tweleve,
    height: '70%',
    position: 'absolute',
    left: scalableheight.seven,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: fontSize.borderradius,
    flexDirection: 'row',
    borderWidth: 0.1,
    borderColor: 'grey',
  },
  incrementicon: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerview: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglecounterview: {
    height: scalableheight.five,
    width: scalableheight.five,
    backgroundColor: '#F9F9F9',
    borderRadius: fontSize.borderradius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: '#111111',
  },
  touchableview: {
    overflow: 'hidden',
    height: '100%',
    width: '55%',
    justifyContent: 'center',
    padding: scalableheight.one,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innerviewcontainer: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fastimagestyle: {
    width: scalableheight.six,
    height: scalableheight.six,
    borderRadius: fontSize.borderradius,
  },
  containerview: {marginLeft: scalableheight.one, width: '65%'},
  text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.twelve,
    color: '#111111',
  },
  text4: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.ten,
    color: '#E14E4E',
  },
  innerview3: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text5: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.twelve,
    color: '#111111',
  },
});
