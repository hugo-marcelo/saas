import React from 'react';
import Proptypes from 'prop-types';

import {
  View,
  Platform,
  KeyboardAvoidingView,
  Modal as RNModal,
} from 'react-native';

import styles from './styles';

const Modal = ({ visible, children, onRequestClose }) => (
  <RNModal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onRequestClose}
  >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.content}>{children}</View>
    </KeyboardAvoidingView>
  </RNModal>
);

Modal.propTypes = {
  visible: Proptypes.bool.isRequired,
  onRequestClose: Proptypes.func.isRequired,
  children: Proptypes.oneOfType([
    Proptypes.element,
    Proptypes.arrayOf(Proptypes.element),
  ]).isRequired,
};

export default Modal;
