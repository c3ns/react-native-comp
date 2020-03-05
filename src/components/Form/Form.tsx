import React from 'react';
import { View } from 'react-native';

interface Data {
  key: string;
}

export type RenderData<Item> = (item: Item, index: number) => React.ReactElement;

interface FormProps<T> {
  renderItem: (item: T, index: number) => React.ReactElement;
  data: T[];
}

const Form = <T extends Data>({ renderItem, data }: FormProps<T>) => {
  const renderData: RenderData<T> = (item: T, index: number) => {
    return <View>{renderItem(item, index)}</View>;
  };

  return <View>{data.map(renderData)}</View>;
};

export default Form;
