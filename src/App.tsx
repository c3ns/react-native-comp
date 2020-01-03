import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import Slider from './components/Slider/Slider';

const App = () => {
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <Slider min={1} max={10} step={0.5} value={3} onValueChange={index => console.log(index)} />
    </View>
  );
};

export default App;
