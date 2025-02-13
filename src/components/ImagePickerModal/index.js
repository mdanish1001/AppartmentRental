import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import AppModal from '../AppModal';
import Button from '../Button';
import ColorCodes from '../../utilities/ColorCodes';
const { width } = Dimensions.get('window');

const ImagePickerModal = ({ showModal, setShowModal, onPress }) => {

  return (
    <AppModal
      visible={showModal}
      handleClose={() => setShowModal(false)}
      styleModal={styles.modalStyle}>
      <View style={{ width: width, flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Upload Images</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{ alignItems: 'flex-end', marginRight: '2%' }}>
            <AntDesign name={'close'} size={20} color={ColorCodes.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            name="Take Photo"
            variant={'primary'}
            onPress={() => {
              onPress('Camera');
            }}
          />

          <Button
            name="Pick from Gallery"
            onPress={() => {
              onPress('Gallery');
            }}
          />
        </View>
      </View>
    </AppModal>
  );
};

export default ImagePickerModal;
