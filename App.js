import React from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

const {
  Value,
  concat,
  block,
  cond,
  set,
  timing,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  debug,
  useCode
} = Animated;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 100,
    height: 100,
    margin: 100,
  }
});

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 5000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}

export default function App() {
  const translateX = new Value(0);
  const rotateZ1 = new Value(0);
  const rotateZ2 = runTiming(new Clock(), 0, 360);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { backgroundColor: 'blue' },
          {
            transform: [
              { translateX },
              { rotateZ: concat(rotateZ1, "deg") }
            ]
          }
        ]}
      />
      <Button
        title="Set translateX to 0"
        onPress={() => translateX.setValue(0)}
      />
      <Button
        title="Set translateX to 100"
        onPress={() => translateX.setValue(100)}
      />
      <Button title="Set rotateZ to 0" onPress={() => rotateZ1.setValue(0)} />
      <Button
        title="Set rotateZ to 45deg"
        onPress={() => rotateZ1.setValue(45)}
      />
      <Animated.View
        style={[
          styles.box,
          { backgroundColor: 'red'},
          {
            transform: [
              { rotateZ: concat(rotateZ2, "deg") }
            ]
          }
        ]}
      />
    </SafeAreaView>
  );
}
