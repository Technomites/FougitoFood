import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlainHeader from '../Shared/Components/PlainHeader';
import Whyuscomponent from '../Shared/Components/Whyuscomponent';
import BottomTab from '../Shared/Components/BottomTab';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';

const Aboutus = ({navigation, drawerAnimationStyle}) => {
  const [LocationData, setLocationData] = useState([
    {
      name: 'Jhon Doe',
      designation: 'Room Cleaner',

      image: require('../Resources/images/person.jpg'),
    },
    {
      name: 'Jhon Doe',
      designation: 'Room Cleaner',

      image: require('../Resources/images/person.jpg'),
    },
    {
      name: 'Jhon Doe',
      designation: 'Room Cleaner',

      image: require('../Resources/images/person.jpg'),
    },
    {
      name: 'Jhon Doe',
      designation: 'Room Cleaner',

      image: require('../Resources/images/person.jpg'),
    },
  ]);
  const {Lang} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    dispatch(seticonfocus('home'));
  }, []);

  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={'About Us'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: scalableheight.three,
          }}>
          <View>
            <View
              style={{
                ...styleSheet.shadow,
                ...styleSheet.MainContainer,
              }}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: scalableheight.twenty}}
                source={require('../Resources/images/fougitocover.png')}
              />
            </View>
            <View style={{marginVertical: scalableheight.one}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: fontSize.fourteen,
                    fontFamily: 'Inter-Bold',
                    color: '#29262A',
                    alignSelf: 'flex-start',
                  }}>
                  Welcome to Fougito!
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.twelve,
                    fontFamily: 'Inter-Medium',
                    color: 'rgba(41, 38, 42, 0.5)',
                    textAlign: 'justify',
                  }}>
                  You can refer to a specific region of Mexico where your food
                  comes from, or use some common Mexican terms in your tagline.
                  Make sure that they’re terms most people would know, to avoid
                  confusionSo encourage them to think of your restaurant as a
                  place where they can enjoy a delicious meal that won’t derail
                  their fitness goals
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: scalableheight.one,
                }}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize.fourteen,
                      fontFamily: 'Inter-Bold',
                      color: '#29262A',
                      alignSelf: 'flex-start',
                    }}>
                    Come Sit With Us
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.twelve,
                      fontFamily: 'Inter-Medium',
                      color: 'rgba(41, 38, 42, 0.5)',
                      // alignSelf: 'flex-start',
                      textAlign: 'justify',
                    }}>
                    You could also draw attention to an open-fire grill or
                    unique cooking method, or your particularly speedy service.
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Whyuscomponent text={'Amet curabitur loborti'} />
                    <Whyuscomponent text={'Purus purus'} />
                    <Whyuscomponent text={'Malesuada nisl'} />
                    <Whyuscomponent text={'Morbi proin'} />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: scalableheight.two,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#e4e4e4',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'facebook'}
                  color={'#1980e7'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#e4e4e4',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'instagram'}
                  color={'#d72e75'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#e4e4e4',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'twitter'}
                  color={'#7fcdf8'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#e4e4e4',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'linkedin'}
                  color={'#1980e7'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#e4e4e4',
                  borderRadius: scalableheight.one,
                  width: scalableheight.six,
                  height: scalableheight.six,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  style={{alignSelf: 'center'}}
                  name={'whatsapp'}
                  color={'#26c54b'}
                  size={fontSize.twentysix}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: fontSize.eightteen,
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
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    borderRadius: fontSize.eleven,
    paddingVertical: fontSize.fifteen,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: 'white',
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
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
    color: '#000000',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 1,
  },
  placeholderStyle: {
    color: '#818181',
    fontFamily: 'Rubik-Regular',
    fontSize: fontSize.twelve,
  },
  inputIconStyle: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
export default Aboutus;
