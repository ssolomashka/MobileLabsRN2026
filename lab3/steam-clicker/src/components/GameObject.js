import React, { useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { theme } from '../theme/theme';

export default function GameObject({
  onTap, onDoubleTap, onLongPress,
  onPan, onFlingRight, onFlingLeft, onPinch,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const posX = useRef(0);
  const posY = useRef(0);
  const panFired = useRef(false);
  const pinchFired = useRef(false);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(300)
    .runOnJS(true)
    .onEnd(() => onDoubleTap());

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .runOnJS(true)
    .onEnd(() => onTap());

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .runOnJS(true)
    .onEnd((_, success) => {
      if (success) onLongPress();
    });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      panFired.current = false;
    })
    .onUpdate((e) => {
      translateX.setValue(posX.current + e.translationX);
      translateY.setValue(posY.current + e.translationY);
    })
    .onEnd((e) => {
      posX.current = posX.current + e.translationX;
      posY.current = posY.current + e.translationY;
      if (!panFired.current) {
        panFired.current = true;
        onPan();
      }
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .runOnJS(true)
    .onEnd(() => onFlingRight());

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .runOnJS(true)
    .onEnd(() => onFlingLeft());

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate((e) => {
      const s = Math.max(0.5, Math.min(3, e.scale));
      scale.setValue(s);
    })
    .onEnd(() => {
      if (!pinchFired.current) {
        pinchFired.current = true;
        onPinch();
      }
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        pinchFired.current = false;
      });
    });

  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, singleTap),
    longPress,
    pan,
    Gesture.Exclusive(flingRight, flingLeft),
    pinch,
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[
        styles.obj,
        { transform: [{ translateX }, { translateY }, { scale }] },
      ]}>
        <Text style={styles.emoji}>🎮</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  obj: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 24,
    elevation: 10,
  },
  emoji: { fontSize: 56 },
});
