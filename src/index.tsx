import React, { FC, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LayoutMeasurer from './LayoutMeasurer';

interface IProps {
  stickyLeft?: boolean;
  initialOffsetY?: number;
  onPositionChange?: (offsetX: number, offsetY: number) => void;
  children: React.ReactNode;
}

const between = (min: number, max: number, value: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const DraggableView: FC<IProps> = ({
  stickyLeft,
  initialOffsetY = 0,
  children,
  onPositionChange,
}) => {
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
  });

  const [draggableLayout, setDraggableLayout] = useState({
    width: 0,
    height: 0,
  });

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const savedOffset = useSharedValue({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    const yPosition =
      initialOffsetY >= 0
        ? initialOffsetY
        : containerLayout.height - draggableLayout.height + initialOffsetY;

    if (stickyLeft) {
      offsetX.value = 0;
      offsetY.value = yPosition;
      savedOffset.value = {
        x: 0,
        y: yPosition,
      };
    } else {
      offsetX.value = containerLayout.width - draggableLayout.width;
      offsetY.value = yPosition;
      savedOffset.value = {
        x: containerLayout.width - draggableLayout.width,
        y: yPosition,
      };
    }
  }, [
    containerLayout,
    draggableLayout,
    initialOffsetY,
    offsetX,
    offsetY,
    savedOffset,
    stickyLeft,
  ]);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((e) => {
          offsetX.value = between(
            0,
            containerLayout.width - draggableLayout.width,
            e.translationX + savedOffset.value.x
          );
          offsetY.value = between(
            0,
            containerLayout.height - draggableLayout.height,
            e.translationY + savedOffset.value.y
          );
        })
        .onFinalize(() => {
          if (offsetX.value < containerLayout.width / 2) {
            offsetX.value = withTiming(0);
            savedOffset.value = {
              x: 0,
              y: offsetY.value,
            };
          } else {
            offsetX.value = withTiming(
              containerLayout.width - draggableLayout.width
            );
            savedOffset.value = {
              x: containerLayout.width - draggableLayout.width,
              y: offsetY.value,
            };
          }
          if (onPositionChange) {
            runOnJS(onPositionChange)(savedOffset.value.x, savedOffset.value.y);
          }
        }),
    [
      offsetX,
      offsetY,
      savedOffset,
      containerLayout,
      draggableLayout,
      onPositionChange,
    ]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offsetX.value,
      },
      {
        translateY: offsetY.value,
      },
    ],
  }));

  return (
    <>
      <LayoutMeasurer onLayout={setContainerLayout} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
          {!!containerLayout.width && React.Children.only(children)}
          <LayoutMeasurer onLayout={setDraggableLayout} />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default DraggableView;
