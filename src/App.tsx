import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm, IForms } from './hooks';
import { Form } from './components/Form';
import { config } from './config';
import { Input } from './components/Input/Input';
import { KeyboardAvoid } from './components/Keyboard';

const App = () => {
  const { values, onChange, onSubmit, errors } = useForm(config);
  const formSelector = useCallback((forms: IForms) => console.log(forms), []);
  const handleSubmit = useCallback(() => onSubmit(formSelector), [values]);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoid>
        <Form>
          <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('email', text)} style={styles.input} />
          <TextInput onChangeText={(text) => onChange('name', text)} style={styles.input} />
          <Input onChangeText={(text) => onChange('name', text)} style={styles.input} />
        </Form>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </KeyboardAvoid>
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
  }
});
