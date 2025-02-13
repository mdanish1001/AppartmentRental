import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import ColorCodes from '../../utilities/ColorCodes';

const InputPassword = ({ label, value, onChangeText, leftIcon }) => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <View>
      <TextInput
        theme={{ roundness: 10 }}
        style={{ marginTop: 10, backgroundColor: isTextInputFocused ? ColorCodes.lightPrimaryColor : ColorCodes.white }}
        activeOutlineColor={ColorCodes.primaryColor}
        secureTextEntry={show}
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        onFocus={() => setIsTextInputFocused(true)}
        onBlur={() => setIsTextInputFocused(false)}
        autoCapitalize="none"
        accessibilityHint=""
        textColor={ColorCodes.textColor}
        left={
          leftIcon && (
            <TextInput.Icon
              icon={leftIcon}
              color={isTextInputFocused === true && ColorCodes.primaryColor}
            />
          )
        }
        right={
          <TextInput.Icon
            icon={show ? 'eye-off' : 'eye'}
            onPress={() => setShow(!show)}
            color={isTextInputFocused === true && ColorCodes.textColor}
          />
        }
      />
    </View>
  );
};

export default InputPassword;
