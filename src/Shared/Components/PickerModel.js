import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthButton from '../../Shared/Components/AuthButton';
const App = props => {
  const [text, settext] = useState('');
  return (
    <View style={{flex: 1}}>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={props.modalPopUp}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#20232a45',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '90%',
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{height: '90%', width: '90%'}}>
              <View style={{marginVertical: 5}}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Search
                </Text>
              </View>
              {/* INPUT */}
              <View
                style={{
                  height: 50,
                  width: '100%',
                  borderRadius: 5,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  flexDirection: 'row',
                }}>
                <View style={{width: '85%'}}>
                  <TextInput
                    onChangeText={props.pickerSearch}
                    style={{flex: 1}}
                    placeholder="Type here"
                  />
                </View>

                <View
                  style={{
                    height: 50,
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="search" size={15} color="gray" />
                </View>
              </View>
              <View style={{height: '90%', width: '100%', marginTop: 10}}>
                {props.children}
                <View style={{marginTop: 10}}>
                  <AuthButton title="Cancel" onPress={props.onCancel} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
