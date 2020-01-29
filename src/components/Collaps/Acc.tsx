import React from 'react';
import { View } from 'react-native';
import Item from './Item';

interface IAccProps<T> {
  data: T[];
  renderHeader: (item: T) => React.ReactElement;
  renderContent: (item: T) => React.ReactElement;
}

const Acc = <T extends {}>(props: IAccProps<T>) => {
  const { data, renderHeader, renderContent } = props;

  if (!data) {
    throw new Error('data is required');
  }

  const renderItems = (item: T, index: number) => {
    return (
      <Item
        key={index}
        data={{ item, index }}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
    );
  };

  return <View>{data.map(renderItems)}</View>;
};

export default Acc;
