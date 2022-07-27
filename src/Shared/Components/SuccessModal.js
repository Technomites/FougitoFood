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
import {useSelector} from 'react-redux';
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
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: '100%',
                height: '5%',
                alignItems: 'center',
              }}></View>
            <View style={{width: '100%', height: '35%', alignItems: 'center'}}>
              <FontAwesome5 name="check-circle" size={70} color={'#F9B35E'} />
            </View>
            <View
              style={{
                width: '100%',
                height: '25%',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              {props.msg ? (
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {props.msg}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {Lang == 'en'
                    ? 'Appointment has been booked  \n successfully'
                    : 'تم تسجيل الحساب بنجاح'}
                </Text>
              )}
            </View>

            <View
              style={{
                width: '100%',
                height: '40%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '70%',
                  height: '47%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#B10071',
                }}
                onPress={props.onClose}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontFamily: 'Rubik-SemiBold',
                  }}>
                  {Lang == 'en' ? 'OK' : 'نعم'}
                </Text>
              </TouchableOpacity>
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
    marginTop: 22,
  },
  modalView: {
    height: 250,
    width: '90%',

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
