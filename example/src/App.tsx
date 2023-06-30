import * as React from 'react';

import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';
import DraggableView from 'react-native-draggable-floating';
import Remember from './Remember';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [stickyLeft, setStickyLeft] = React.useState(true);
  const [negative, setNegative] = React.useState(false);
  const savedOffset = React.useRef<{ x?: number; y?: number }>({
    x: undefined,
    y: undefined,
  });

  const offsetY = 50;
  const initialOffsetY = negative ? -offsetY : offsetY;

  return (
    <View style={styles.container}>
      <View style={styles.cellContainer}>
        <Text>props</Text>
        <Text>value</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text>stickyLeft</Text>
        <Switch
          value={stickyLeft}
          onChange={(e) => setStickyLeft(e.nativeEvent.value)}
        />
      </View>
      <View style={styles.cellContainer}>
        <Text>offsetY: {negative ? -offsetY : offsetY}</Text>
        <Switch
          value={negative}
          onChange={(e) => setNegative(e.nativeEvent.value)}
        />
      </View>
      <Pressable onPress={() => setVisible(true)}>
        <Text>show remember position demo</Text>
      </Pressable>
      <DraggableView stickyLeft={stickyLeft} initialOffsetY={initialOffsetY}>
        <Pressable style={styles.floatBtn}>
          <Text>Drag Me1</Text>
        </Pressable>
      </DraggableView>
      {visible && (
        <Remember
          onClose={() => setVisible(false)}
          stickyLeft={
            savedOffset.current.x === undefined
              ? stickyLeft
              : savedOffset.current.x === 0
          }
          initialOffsetY={savedOffset.current.y ?? initialOffsetY}
          onPositionChange={(x, y) => {
            savedOffset.current = { x, y };
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContainer: {
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#998877',
    borderBottomWidth: 1,
  },
  floatBtn: {
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
