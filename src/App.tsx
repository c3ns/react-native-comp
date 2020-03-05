import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm } from './hooks';
import { config } from './config';
import { Input } from './components/Input/Input';
import { FormKeyboardProvider } from './contexts/FormKeyboardContext';
import Form, { RenderData } from './components/Form/Form';
import KeyboardManager from './components/Form/KeyboardManager';

enum ETypes {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const data: IData[] = [{ key: ETypes.EMAIL, icon: 5 }, { key: ETypes.PASSWORD, icon: 6 }];

interface IData {
  icon: number;
  key: keyof Values;
}

type Values = { [K in ETypes]: string };

const App = () => {
  const { values, onChange, onSubmit, errors } = useForm<Values>(config);
  const formSelector = useCallback((forms: Values) => console.log(forms), []);
  const handleSubmit = useCallback(() => onSubmit(formSelector), [values]);

  const renderItem: RenderData<IData> = ({ key, ...restProps }, index) => {
    return (
      <Input
        onChangeText={text => onChange(key, text)}
        style={styles.input}
        key={index}
        value={values['name']}
        {...restProps}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FormKeyboardProvider>
        <KeyboardManager>
          <Form<IData> renderItem={renderItem} data={data} />
        </KeyboardManager>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </FormKeyboardProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    marginTop: 40,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
  },
  cont: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 5,
  },
});
