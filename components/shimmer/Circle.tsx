import React from "react";
import { Animated, StyleSheet } from "react-native";

import Theme from "../../theme";

interface ShimmerCircleProps {
  opacity: Animated.Value;
  size: number;
}

const ShimmerCircle = ({ opacity, size }: ShimmerCircleProps) => {
  const shimmerStyle = {
    opacity,
  };

  return (
    <Animated.View
      style={[styles.circle, shimmerStyle, { width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Theme.colors["dark-gray"],
    borderRadius: 999,
  },
});

export default ShimmerCircle;
