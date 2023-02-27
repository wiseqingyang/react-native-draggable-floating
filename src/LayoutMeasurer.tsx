import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

interface IProps {
  onLayout: (size: { width: number; height: number }) => void;
}

const LayoutMeasurer: FC<IProps> = ({ onLayout }) => {
  return (
    <View
      style={StyleSheet.absoluteFill}
      onLayout={(e) => {
        const { layout } = e.nativeEvent;
        onLayout({ width: layout.width, height: layout.height });
      }}
      pointerEvents="box-none"
    />
  );
};

export default LayoutMeasurer;
