import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changelang, seticonfocus} from '../Actions/actions';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Animated from 'react-native-reanimated';
import PlainHeader from '../Shared/Components/PlainHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fontSize, scalableheight} from '../Utilities/fonts';
import Faqtitle from '../Shared/Components/Faqtitle';
import {
  createDrawerNavigator,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import FocusAwareStatusBar from '../../src/component/StatusBar/customStatusBar';

const Faqs = ({navigation, drawerAnimationStyle}) => {
  const [search, setsearch] = useState("")
  const [Faqs, SetFaqs] = useState([
    {
      question: 'Curabitur vulputate arcu odio, ac facilisis diam accumsan ut',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'urabitur vulputate arcu odio, ac facilisis di',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'Cras eu elit congue, placerat dui u',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'Phasellus risus turpis, pretium sit a',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'Curabitur vulputate arcu odio, ac facilisis diam accumsan ut',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'urabitur vulputate arcu odio, ac facilisis di',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'Cras eu elit congue, placerat dui u',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
    {
      question: 'Phasellus risus turpis, pretium sit a',
      answer:
        'enables the sports choice to all individuals irrespective of their identities. It connects customers individuals and corporates with partners sport venues, coaches, trainers and sport equipment suppliers.',
    },
  ]);
  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', ...drawerAnimationStyle}}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          alignSelf: 'center',
          paddingTop: getStatusBarHeight(),
          flex: 12,
        }}>
        <PlainHeader title={'FAQs'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: scalableheight.two,
          }}>
          <View style={{...styles.shadow, ...styles.container}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '10%',
              }}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name="search"
                color={'rgba(41, 38, 42, 0.5)'}
                size={fontSize.fifteen}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '90%',
                justifyContent: 'center',
              }}>
              <TextInput
                returnKeyType="next"
                // numberOfLines={props.inputLine}
                //value={props.value}
                // onChangeText={props.onChangeText}
                value={search}
                onChangeText={text => setsearch(text)}
               
                placeholderTextColor={'lightgray'}
                placeholder={'Search'}
                style={styles.textInput}
              />
            </View>
          </View>
          {Faqs.map(item => {
            return (
              item.question.includes(search.trim()) || item.answer.includes(search.trim()) ? 
            <Faqtitle data={item} /> : null )
          })}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: fontSize.eleven,
    width: '99%',
    alignSelf: 'center',
    marginVertical: scalableheight.one,
    backgroundColor: '#e8e8e8',
  },
  container: {
    height: scalableheight.six,
    backgroundColor: '#F5F5F5',
    width: '99.5%',
    flexDirection: 'row',
    borderRadius: fontSize.eleven,
    marginBottom: scalableheight.one,
    alignSelf: 'center',
  },
  textInput: {
    marginLeft: scalableheight.one,
    width: '100%',
    color: 'black',
  },
  shadow: {
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 2,
    // borderWidth:scalableheight.borderTopWidth, borderColor:'rgba(211,211,211, 0.6)'
  },
});
export default Faqs;
