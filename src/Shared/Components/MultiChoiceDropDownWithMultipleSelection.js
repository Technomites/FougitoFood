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
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MultiChoiceDropDownWithMultipleSelection(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function select(index) {
    props.update(index, props.index);
  }
  return (
    <View style={styleSheet.mainviewcontainer}>
      <View style={styleSheet.innermainviewcontainer}>
        <Text style={styleSheet.text1}>{props?.title} </Text>
        <View
          style={{
            backgroundColor: props?.IsRequired == true ? '#E14E4E' : 'grey',
            ...styleSheet.requiredview,
          }}>
          <Text style={styleSheet.text2}>
            {props?.IsRequired == true ? 'Required' : 'Optional'}
          </Text>
        </View>
      </View>
      <Text style={styleSheet.text3}>
        {props?.MaxLimit > 0 ? 'Max ' : null}
        {props?.MaxLimit > 0 ? props?.MaxLimit : null}{' '}
      </Text>

      {props?.data?.map((item, index) => {
        return (
          <TouchableOpacity
            // activeOpacity={1}
            key={index.toString()}
            onPress={() => select(index)}
            style={styleSheet.listview}>
            <View style={styleSheet.innerlistview}>
            {item?.selected == true &&
                <MaterialIcons
                  name="check-box"
                  color={'#E14E4E'}
                  size={fontSize.twenty}
                />
      }
         {item?.selected == false &&
            
                <MaterialIcons
                  name="check-box-outline-blank"
                  color={'grey'}
                  size={fontSize.twenty}
                />
           
      }

              <Text numberOfLines={1} style={styleSheet.text4}>
                {item?.Value}
              </Text>
            </View>
            <View style={styleSheet.textview}>
              <Text style={styleSheet.text5}>
                AED {item?.Price?.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  mainviewcontainer: {
    width: '100%',

    justifyContent: 'center',

    alignSelf: 'center',
    marginTop: scalableheight.one,
  },
  innermainviewcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'black',
  },
  requiredview: {
    paddingVertical: scalableheight.pointfive,
    paddingHorizontal: scalableheight.one,
    borderRadius: fontSize.borderradius,
  },
  text2: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'black',
    color: 'white',
  },
  text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.twelve,
    opacity: 0.4,
    color: 'black',
  },
  listview: {
    flexDirection: 'row',
    marginTop: scalableheight.two,
    alignItems: 'center',
  },
  innerlistview: {width: '50%', flexDirection: 'row', alignItems: 'center'},
  text4: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.fifteen,

    color: 'black',
    marginLeft: scalableheight.one,
  },
  textview: {width: '50%', justifyContent: 'center'},
  text5: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.thirteen,
    color: 'black',
    position: 'absolute',
    right: 0,
  },
});
