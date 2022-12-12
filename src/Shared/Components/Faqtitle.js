import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Fntaw from 'react-native-vector-icons/FontAwesome5';
import {fontSize, scalableheight} from '../../Utilities/fonts';

export default function Faqtitle(props) {
  //  console.log(props?.data.question)
  const handleAccordian = index => {
    selectedFaq === index ? setSelectedFaq(null) : setSelectedFaq(index);
  };
  const [selectedFaq, setSelectedFaq] = useState(1);
  return (
    <Collapse
      onToggle={() => handleAccordian(0)}
      isExpanded={selectedFaq === 0 ? true : false}>
      <CollapseHeader style={styles.flexrow}>
        <View style={styles.width95}>
          <Text style={[styles.subheading, {borderTopWidth: 0}]}>
            {props?.data.question}
          </Text>
        </View>
        <View style={{width: '5%'}}>
          <Text style={styles.textview}>
            <Fntaw
              name={selectedFaq === 0 ? 'angle-up' : 'angle-down'}
              size={scalableheight.two}
              color="#1A1818"
            />
          </Text>
        </View>
      </CollapseHeader>
      <CollapseBody style={styles.flexrow}>
        <Collapse style={styles.flexrow}>
          <CollapseHeader>
            <Text style={styles.content}>{props?.data.answer}</Text>
          </CollapseHeader>
        </Collapse>
      </CollapseBody>
    </Collapse>
  );
}

const styles = StyleSheet.create({
  subheading: {
    fontSize: fontSize.thirteen,
    color: '#000',
    paddingVertical: scalableheight.one,
    borderColor: 'rgba(0,0,0,0.1)',
    fontFamily: 'Inter-Bold',
  },

  content: {
    textAlign: 'justify',
    marginTop: scalableheight.pointfive,
    fontSize: fontSize.twelve,
    fontFamily: 'Inter-Medium',
  },
  flexrow: {
    flexDirection: 'row',
  },
  width95: {width: '95%'},
  textview: {alignSelf: 'center', marginTop: scalableheight.one},
});
