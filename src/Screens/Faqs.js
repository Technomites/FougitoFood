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
// import changeNavigationBarColor, {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';
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
  const [search, setsearch] = useState('');
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
    <Animated.View style={[styles.maincontainerview, drawerAnimationStyle]}>
      <FocusAwareStatusBar
        barStyle={useIsDrawerOpen() ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View style={styles.maincontainterview2}>
        <PlainHeader title={'FAQs'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.paddinghorizontal2}>
          <View style={[styles.shadow, styles.container]}>
            <View style={styles.innerview}>
              <FontAwesome
                style={styles.alignselfcenter}
                name="search"
                color={'rgba(41, 38, 42, 0.5)'}
                size={fontSize.fifteen}
              />
            </View>
            <View style={styles.innerview2}>
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
          {Faqs.map((item, index) => {
            return item.question.includes(search.trim()) ||
              item.answer.includes(search.trim()) ? (
              <Faqtitle key={index.toString()} data={item} />
            ) : null;
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
  maincontainerview: {
    flex: 1,
    backgroundColor: 'white',
  },
  maincontainterview2: {
    alignSelf: 'center',
    paddingTop: getStatusBarHeight(),
    flex: 12,
  },
  paddinghorizontal2: {
    paddingHorizontal: scalableheight.two,
  },
  innerview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  alignselfcenter: {alignSelf: 'center'},
  innerview2: {
    height: '100%',
    width: '90%',
    justifyContent: 'center',
  },
});
export default Faqs;
