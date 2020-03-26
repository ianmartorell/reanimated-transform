import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function App() {
  return (
    <View>
      <Animated.View style={{ transform: [{ rotateZ: "-10deg" }] }}>
        <View style={{ width: 100, height: 100, backgroundColor: "blue" }} />
      </Animated.View>
      <View style={{ transform: [{ rotateZ: "-10deg" }] }}>
        <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
      </View>
    </View>
  );
}
