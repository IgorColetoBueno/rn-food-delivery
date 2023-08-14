import React from "react";
import { Animated, StyleSheet } from "react-native";

import Theme from "../../theme";

interface ShimmerSquareProps {
  opacity: Animated.Value;
  size: number;
}

const ShimmerSquare = ({ opacity, size }: ShimmerSquareProps) => {
  const shimmerStyle = {
    opacity,
  };

  return (
    <Animated.View
      style={[styles.square, shimmerStyle, { width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    backgroundColor: Theme.colors["dark-gray"],
  },
});

export default ShimmerSquare;
