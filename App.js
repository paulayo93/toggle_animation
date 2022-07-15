import { StyleSheet, View, Animated, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import FeatherIcon from "@expo/vector-icons/Feather";

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  let animation = useRef(new Animated.Value(0)).current;

  const borderInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#BBC0C9", "#0413E7"],
  });

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#0413E7"],
  });

  const boxAnimatedStyles = {
    backgroundColor: boxInterpolation,
    borderColor: borderInterpolation,
  };

  const toggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else if (!isChecked) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isChecked]);

  let defaultStyle = {
    borderWidth: 1.5,
    width: 54,
    height: 54,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => toggle()}>
          <Animated.View style={[defaultStyle, boxAnimatedStyles]}>
            <FeatherIcon name="check" color={"#FFFFFF"} size={50} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F7",
    alignItems: "center",
    justifyContent: "center",
  },
});
