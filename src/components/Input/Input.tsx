import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export const Input = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  console.log('adasdasd');
  return (
    <View>
      <Text>blablabla</Text>
      <TextInput {...props} ref={ref} />
    </View>
  );
});
