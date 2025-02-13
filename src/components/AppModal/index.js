import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';

const AppModal = ({ 
  animationType = 'slide', 
  handleClose, 
  layout, 
  styleModal, 
  innerViewStyle, 
  children, 
  ...props 
}) => {
  return (
    <Modal
      style={{ flex: 1, margin: 0 }}
      transparent={true}
      animationType={animationType}
      onRequestClose={handleClose}
      {...props}
    >
      <TouchableOpacity
        onPress={!layout ? handleClose : null}
        style={styles.outSideModal}
      />

      <View style={[styles.centeredView, { ...styleModal }]}>
        <View style={[styles.innerView, { ...innerViewStyle }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;
