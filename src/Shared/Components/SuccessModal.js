import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {fontSize, scalableheight} from '../../Utilities/fonts';
import MYButton from './MYButton';
const SuccessModal = props => {
  const {FeaturedProjectHome, EventsHome, Lang} = useSelector(
    state => state.userReducer,
  );
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.successModalShown}
      onRequestClose={() => {}}>
      <View
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', height: '100%'}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                // backgroundColor: 'red',
                height: scalableheight.three,
              }}></View>
            <View
              style={{
                width: '100%',
                height: scalableheight.thirteen,
                alignItems: 'center',
              }}>
              <FontAwesome5
                name="check-circle"
                size={scalableheight.thirteen}
                color={'#000'}
              />
            </View>
            <View
              style={{
                width: '100%',
                //    height: scalableheight.thirteen,
                alignItems: 'center',
                paddingTop: fontSize.ten,
              }}>
              {props.msg ? (
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: fontSize.fifteen,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {props.msg}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: fontSize.twentytwo,
                    color: 'rgba(41, 38, 42, 1)',
                    textAlign: 'center',
                  }}>
                  Your Address has been Saved Successfully.
                </Text>
              )}
            </View>

            <View
              style={{
                width: '90%',
                height: scalableheight.thirteen,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MYButton
                onPress={props.onNoPress}
                color={'rgba(225, 78, 78, 1)'}
                title={'ADD NEW'}
                textcolor={'white'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scalableheight.ten,
  },
  modalView: {
    height: scalableheight.fourty,
    width: '90%',
    margin: scalableheight.two,
    backgroundColor: 'white',
    borderRadius: fontSize.twentyfive,
    padding: scalableheight.one,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SuccessModal;
