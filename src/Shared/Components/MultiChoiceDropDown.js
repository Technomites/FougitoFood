import React, {useEffect} from 'react';
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

export default function MultiChoiceDropDown(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function select(index) {
    props.update(index, props.index);
  }

  return (
    <View style={styleSheet.maincontainer}>
      <View style={styleSheet.submaincontainer}>
        <Text style={styleSheet.text3}>{props?.title}</Text>
        <View
          style={{
            backgroundColor: props?.IsRequired == true ? '#E14E4E' : 'grey',
            ...styleSheet.submaininnercontainer,
          }}>
          <Text style={{...styleSheet.text3, color: 'white'}}>
            {props?.IsRequired == true ? 'Required' : 'Optional'}
          </Text>
        </View>
      </View>

      {props?.data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => select(index)}
            style={styleSheet.listview}>
            <View style={styleSheet.listinnerview}>

              {item?.selected == true &&
                <MaterialIcons
                  name="radio-button-checked"
                  color={'#E14E4E'}
                  size={fontSize.twenty}
                />
      }
          {item?.selected == false &&
                <MaterialIcons
                  name="radio-button-unchecked"
                  color={'grey'}
                  size={fontSize.twenty}
                  style={{}}
                />
          }

              <Text style={styleSheet.text6}>{item?.Value}</Text>
            </View>
            <View style={styleSheet.maplistinnerview}>
              <Text style={styleSheet.text7}>
                {item?.Price > 0 ? 'AED ' : null}{' '}
                {item?.Price > 0 ? item?.Price?.toFixed(2) : null}
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
  maincontainer: {
    width: '100%',

    justifyContent: 'center',

    alignSelf: 'center',
    marginTop: scalableheight.one,
  },
  submaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text3: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.fourteen,
    color: 'black',
  },
  submaininnercontainer: {
    paddingVertical: scalableheight.pointfive,
    paddingHorizontal: scalableheight.one,
    borderRadius: fontSize.borderradius,
  },
  listview: {
    flexDirection: 'row',
    marginTop: scalableheight.two,
    alignItems: 'center',
    width: '100%',
  },
  listinnerview: {width: '50%', flexDirection: 'row', alignItems: 'center'},
  text6: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.fifteen,

    color: 'black',
    marginLeft: scalableheight.one,
  },
  maplistinnerview: {width: '50%', justifyContent: 'center'},
  text7: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.thirteen,
    color: 'black',
    position: 'absolute',
    right: 0,
  },
});
