import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ColorCodes from '../../utilities/ColorCodes';

const Button = ({ name, variant, disabled, containerStyle, textContainerStyle, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[styles.button, containerStyle,
    variant === 'primary'
      ? {
        backgroundColor: disabled
          ? ColorCodes.disableButtonColor
          : ColorCodes.primaryColor,
        borderColor: ColorCodes.white,
      } : {
        backgroundColor: 'transparent',
        borderColor: ColorCodes.primaryColor,
        borderWidth: 1,
      }
    ]}
    disabled={disabled}
    onPress={onPress}
  >
    <Text
      style={[styles.buttonText, textContainerStyle, {
        color: variant === 'primary' ? ColorCodes.white : ColorCodes.primaryColor
      }]}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default Button;
