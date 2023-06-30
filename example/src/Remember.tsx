import React, { FC } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import DraggableView from 'react-native-draggable-floating';

interface IProps {
  onClose: () => void;
  stickyLeft: boolean;
  initialOffsetY: number;
  onPositionChange: (offsetX: number, offsetY: number) => void;
}

const Remember: FC<IProps> = ({
  onClose,
  stickyLeft,
  initialOffsetY,
  onPositionChange,
}) => {
  return (
    <View style={styles.container}>
      <Button title="close" onPress={onClose} />
      <Text>close and reopen this to see the remember effect</Text>
      <DraggableView
        stickyLeft={stickyLeft}
        initialOffsetY={initialOffsetY}
        onPositionChange={onPositionChange}
      >
        <Pressable style={styles.floatBtn}>
          <Text>Drag Me2</Text>
        </Pressable>
      </DraggableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FEDCBA',
    top: 100,
    alignItems: 'center',
  },
  floatBtn: {
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: '#4444ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Remember;
