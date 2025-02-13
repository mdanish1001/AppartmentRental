import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import ColorCodes from '../../utilities/ColorCodes';

const Input = ({ label, value, onChangeText, leftIcon, style, keyboardType, multiline }) => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  return (
    <View>
      <TextInput
        theme={{ roundness: 10 }}
        style={[style, {
          marginVertical: 10,
          backgroundColor: isTextInputFocused ? ColorCodes.lightPrimaryColor : ColorCodes.white
        }]}
        activeOutlineColor={ColorCodes.primaryColor}
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        onFocus={() => setIsTextInputFocused(true)}
        onBlur={() => setIsTextInputFocused(false)}
        autoCapitalize="none"
        keyboardType={keyboardType ?? 'default'}
        textColor={ColorCodes.textColor}
        multiline={multiline}
        left={
          leftIcon && (
            <TextInput.Icon
              icon={leftIcon}
              color={isTextInputFocused === true && ColorCodes.primaryColor}
              size={28}
            />
          )
        }
      />
    </View>
  );
};

export default Input;
