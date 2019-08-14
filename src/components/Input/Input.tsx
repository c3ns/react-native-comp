import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export const Input = React.forwardRef<TextInputProps, TextInput>(
  (props, ref: any) => {
    return(
      <View>
        <Text>blablabla</Text>
        <TextInput {...props} ref={ref}/>
      </View>
    );
  }
);