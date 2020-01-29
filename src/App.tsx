import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import Slider from './components/Slider/Slider';
import Acc from './components/Collaps/Acc';

interface IItems {
  id: number;
}

const initData: IItems[] = [
  { id: 0 },
  // { id: 1 },
];

const App = () => {
  const renderHeader = (item: IItems) => {
    return (
      <View style={styles.header}>
        <Text>asd</Text>
      </View>
    );
  };

  const renderContent = () => {
    return <View style={{ width: '100%', height: 200 }} />;
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Acc renderHeader={renderHeader} renderContent={renderContent} data={initData} />
      {/* <Slider min={1} max={10} step={1} value={3} onValueChange={index => console.log(index)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 30,
    borderWidth: 1,
  },
});

export default App;
