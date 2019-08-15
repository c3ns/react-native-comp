import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useForm, IForms } from './hooks';
import { Form } from './components/Form';
import { config } from './config';
import { Input } from './components/Input/Input';
import { KeyboardAvoid } from './components/Keyboard';
import { FormKeyboardProvider } from './contexts/FormKeyboardContext';
const { height } = Dimensions.get('window');
const App = () => {
  const { values, onChange, onSubmit, errors } = useForm(config);
  const formSelector = useCallback((forms: IForms) => console.log(forms), []);
  const handleSubmit = useCallback(() => onSubmit(formSelector), [values]);

  return (
    <View style={{ flex: 1 }}>
      <FormKeyboardProvider>
        <KeyboardAvoid style={styles.cont}>
          <Form>
            <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
            <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
            <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
            <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
            <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
            <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
            <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
            <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
          </Form>
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAvoid>
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
    width: '100%',
    height,
    backgroundColor: 'white',
  }
});
