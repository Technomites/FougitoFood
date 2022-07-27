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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

  const renderItem = ({item}) => (
    <View
      //   activeOpacity={0.9}
      //   onPress={() => {
      //     navigation.navigate('PopularServices');
      //   }}
      style={{
        height: '100%',
        width: Dimensions.get('window').width / 2.1,
        alignItems: 'center',

        marginRight: Dimensions.get('window').width / 25,

        borderRadius: 10,
      }}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 2,
          backgroundColor: 'white',
          width: '100%',
          height: '95%',
          borderRadius: 10,
        }}>
        <Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            borderRadius: 10,
          }}
          source={item.image}
        />

        <Text
          style={{
            color: 'white',

            fontSize: fontSize.fourteen,
            fontFamily: 'Rubik-Medium',
            bottom: '15%',
            position: 'absolute',
            alignSelf: 'center',
            width: '90%',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',

            fontSize:  fontSize.twelve,
            fontFamily: 'Rubik-Regular',
            bottom: '5%',
            position: 'absolute',
            alignSelf: 'center',
            width: '90%',
          }}>
          {item.designation}
        </Text>
      </View>
    </View>
  );
  return (
    <Animated.View style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={Lang == 'en' ? 'About Us' : 'معلومات عنا'} />
        <ScrollView showsVerticalScrollIndicator={false}
        style={{     paddingHorizontal: scalableheight.one}}>
          <View
            style={{
              width: '100%',
              height: Dimensions.get('window').height / 4,

              alignItems: 'center',
              justifyContent: 'center',
         
         
            }}>
            <Image
              resizeMode="cover"
              style={{width: '95%', height: '90%', borderRadius: 15}}
              source={require('../Resources/images/aboutusbanner.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              // height: Dimensions.get('window').height / 4,

              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '3%',
              paddingRight: '3%',
            }}>
            <Text
              style={{
                fontSize:  fontSize.thirty,
                fontFamily: 'Rubik-Medium',
                color: 'black',
                alignSelf: Lang == 'en' ? 'flex-start' : 'flex-end',
              }}>
              {Lang == 'en' ? 'ORO 24' : 'أورو 24'}{' '}
            </Text>
            <Text
              style={{
                fontSize:  fontSize.thirty,
                fontFamily: 'Rubik-Medium',
                color: '#C59E6E',
                alignSelf: Lang == 'en' ? 'flex-start' : 'flex-end',
              }}>
              {Lang == 'en' ? 'FACILITIES' : 'خدمات'}
            </Text>
            <Text
              style={{
                fontSize:  fontSize.fourteen,
                fontFamily: 'Rubik-Medium',
                color: 'black',
                alignSelf: Lang == 'en' ? 'flex-start' : 'flex-end',
                marginTop: Dimensions.get('window').height / 150,
              }}>
              {Lang == 'en' ? 'Few Words Our Company' : 'بضع كلمات شركتنا'}
            </Text>
            <Text
              style={{
                fontSize:  fontSize.twelve,
                fontFamily: 'Rubik-Regular',
                color: '#797979',
                alignSelf: 'flex-start',
                marginTop: Dimensions.get('window').height / 150,
              }}>
              {Lang == 'en'
                ? "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n\nThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages"
                : "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على تخطيطها.  n  n الهدف من استخدام لوريم إيبسوم هو أن له توزيعًا طبيعيًا إلى حد ما للأحرف مثل يعارض استخدام 'يوجد محتوى هنا ، يوجد محتوى هنا' ، مما يجعلها تبدو سهلة القراءة بالإنجليزية. العديد من حزم النشر المكتبي "}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              // height: Dimensions.get('window').height / 4,

              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '3%',
              paddingRight: '3%',
              marginTop: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                width: '100%',
                justifyContent: Lang == 'en' ? 'flex-start' : 'flex-end',
              }}>
              <Text
                style={{
                  fontSize:  fontSize.eightteen,
                  fontFamily: 'Rubik-Medium',
                  color: 'black',
                }}>
                {Lang == 'en' ? 'Why' : 'لماذا'}
              </Text>
              <Text
                style={{
                  fontSize:  fontSize.eightteen,
                  fontFamily: 'Rubik-Medium',
                  color: '#C59E6E',
                  marginLeft: '1%',
                }}>
                {Lang == 'en' ? 'Us' : 'نحن'}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: Lang == 'en' ? 'row' : 'row-reverse',
              }}>
              <View style={{width: '65%'}}>
                <Whyuscomponent
                  text={
                    Lang == 'en'
                      ? 'The customer is why we exist'
                      : 'الزبون هو سبب وجودنا'
                  }
                />
                <Whyuscomponent
                  text={
                    Lang == 'en' ? 'Take no short cuts' : 'لا تتخذ طرق مختصرة'
                  }
                />
                <Whyuscomponent
                  text={
                    Lang == 'en'
                      ? 'Maintain accurate records'
                      : 'الاحتفاظ بسجلات دقيقة'
                  }
                />
                <Whyuscomponent
                  text={
                    Lang == 'en'
                      ? 'Leave work area clean'
                      : 'اترك منطقة العمل نظيفة'
                  }
                />
                <Whyuscomponent
                  text={
                    Lang == 'en'
                      ? 'Meet obligations no matter what'
                      : 'الوفاء بالالتزامات مهما كانت'
                  }
                />
              </View>
              <View style={{width: '35%'}}>
                <Whyuscomponent
                  text={Lang == 'en' ? 'Arrive on time' : 'الوصول في الموعد'}
                />
                <Whyuscomponent
                  text={Lang == 'en' ? 'Be trustful' : 'كن واثقا'}
                />
                <Whyuscomponent
                  text={
                    Lang == 'en' ? 'Finish on time' : 'الانتهاء في الوقت المحدد'
                  }
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              // height: Dimensions.get('window').height / 4,

              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '3%',
              paddingRight: '3%',
              marginTop: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                width: '100%',
                justifyContent: Lang == 'en' ? 'flex-start' : 'flex-end',
              }}>
              <Text
                style={{
                  fontSize:  fontSize.eightteen,
                  fontFamily: 'Rubik-Medium',
                  color: 'black',
                }}>
                {Lang == 'en' ? 'OUR' : 'لنا'}
              </Text>
              <Text
                style={{
                  fontSize:  fontSize.eightteen,
                  fontFamily: 'Rubik-Medium',
                  color: '#C59E6E',
                  marginLeft: '1%',
                }}>
                {Lang == 'en' ? 'TEAM' : 'فريق'}
              </Text>
            </View>

            <View
              style={{
                height: Dimensions.get('window').height / 5,
                marginTop: '3%',
              }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={LocationData}
                renderItem={renderItem}
                // onEndReached={() => LoadFeaturedProjectPagination()}
                // onEndReachedThreshold={0.1}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1, backgroundColor: 'white',        borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
        <BottomTab />
      </View>
    </Animated.View>
  );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize:  fontSize.eightteen,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize:  fontSize.eightteen,
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
  inputStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize:  fontSize.twelve,
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
    fontSize:  fontSize.twelve,
  },
  inputIconStyle: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
export default Aboutus;
