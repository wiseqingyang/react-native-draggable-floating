import * as React from 'react';

import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';
import DraggableView from 'react-native-draggable-floating';

export default function App() {
  const [stickyLeft, setStickyLeft] = React.useState(true);
  const [negative, setNegative] = React.useState(false);

  const offsetY = 50;
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
      <DraggableView
        stickyLeft={stickyLeft}
        initialOffsetY={negative ? -offsetY : offsetY}
      >
        <Pressable style={styles.floatBtn}>
          <Text>Debug</Text>
        </Pressable>
      </DraggableView>
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
    paddingVertical: 4,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#998877',
    borderBottomWidth: 1,
  },
  floatBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
