import React, {useRef} from 'react';
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
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchref = useRef();
  function clear() {
    searchref.current.clear();
    props.onchange('');
    Keyboard.dismiss();
  }
  return (
    <View style={styleSheet.searchcontainer}>
      <TextInput
        ref={searchref}
        value={props.search}
        onChangeText={text => props.onchange(text)}
        placeholder={'Search here'}
        placeholderTextColor={'grey'}
        style={styleSheet.textinputstyle}
      />

      <Ionicons
        name="search"
        color={'grey'}
        size={fontSize.twenty}
        style={styleSheet.iconstyle}
      />

      {/* {searchref.current.Value != "" && */}
      <TouchableOpacity onPress={clear} style={styleSheet.touchstyle}>
        <Entypo
          name="circle-with-cross"
          color={'grey'}
          size={fontSize.twenty}
        />
      </TouchableOpacity>
      {/* } */}
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
  searchcontainer: {
    // ...styleSheet.shadow,
    // borderWidth:1,
    // borderColor:'rgba(128, 128,128, 0.6)',
    width: '100%',
    height: Dimensions.get('window').height / 15,
    justifyContent: 'center',
    borderRadius: fontSize.borderradius,
    marginTop: '3%',
    alignSelf: 'center',
    marginBottom: '2%',
  },
  textinputstyle: {
    width: '100%',
    height: '98%',
    fontSize: fontSize.fifteen,
    backgroundColor: 'rgba(211,211,211, 0.3)',

    alignSelf: 'center',
    borderRadius: fontSize.borderradius,
    paddingHorizontal: scalableheight.seven,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconstyle: {position: 'absolute', left: '5%', alignSelf: 'center'},
  touchstyle: {
    position: 'absolute',
    right: '1%',
    alignSelf: 'center',
    height: '98%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
