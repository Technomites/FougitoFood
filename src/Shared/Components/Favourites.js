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
  ImageBackground,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Favourites(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={styleSheet.maincontainer}>
      <View style={styleSheet.innerview}>
        <View style={styleSheet.innerview2}>
          <FontAwesome
            name={'star'}
            color={'#E14E4E'}
            style={{}}
            size={fontSize.seventeen}
          />

          <Text style={styleSheet.reviewtext}>{props.reviews}</Text>
        </View>
        <Text numberOfLines={1} style={styleSheet.text1}>
          {props.title}
        </Text>
        <View style={styleSheet.innerview3}>
          <AntDesign
            name={'clockcircle'}
            color={'black'}
            style={{opacity: 0.2}}
            size={fontSize.thirteen}
          />
          <Text style={styleSheet.text2}>{props.time}</Text>
        </View>

        <View style={styleSheet.innerview4}>
          <Entypo
            name={'location-pin'}
            color={'black'}
            style={{opacity: 0.2}}
            size={fontSize.twenty}
          />
          <Text style={styleSheet.text5}>{props.distance}</Text>
        </View>
      </View>
      <View style={styleSheet.innerview9}>
        {/* <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            width: '100%',
            height: "100%",
            borderRadius: fontSize.eleven,
            // borderWidth: 1,
            alignItems: 'center',
          }}
         
              source={  props?.image ? {uri: props.image} : null}>
          </Image> */}
        <FastImage
          style={styleSheet.fastimageview}
          source={{
            uri: props.image ? props.image : null,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = StyleSheet.create({
  fastimageview: {
    width: '100%',
    height: '100%',
    borderRadius: fontSize.eleven,
    // borderWidth: 1,
    alignItems: 'center',
  },
  innerview9: {
    height: '100%',
    width: '30%',
    //  width:''
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: scalableheight.one,
  },
  text5: {
    marginLeft: scalableheight.zeropointsix,

    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.eleven,
    color: '#111111',
    opacity: 0.4,
  },
  innerview4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -scalableheight.zeropointnine,
  },
  text2: {
    marginLeft: scalableheight.one,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.eleven,
    color: '#111111',
    opacity: 0.4,
  },
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
  maincontainer: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    height: scalableheight.fifteen,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalableheight.one,
    marginTop: scalableheight.one,
    borderRadius: fontSize.eleven,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  innerview: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    padding: scalableheight.two,
  },
  innerview2: {flexDirection: 'row', alignItems: 'center'},
  reviewtext: {
    marginLeft: scalableheight.zeropointeight,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize.twelve,
    color: '#111111',
    opacity: 0.8,
  },
  text1: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize.sixteen,
    color: '#111111',
    paddingVertical: scalableheight.pointfive,
  },
  innerview3: {flexDirection: 'row', alignItems: 'center'},
});
