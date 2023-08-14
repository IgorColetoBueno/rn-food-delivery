import React from "react";
import { Animated, StyleSheet } from "react-native";

import Theme from "../../theme";

interface ShimmerRectangleProps {
  opacity: Animated.Value;
}

const ShimmerRectangle = ({ opacity }: ShimmerRectangleProps) => {
  const shimmerStyle = {
    opacity,
  };

  return <Animated.View style={[styles.rectangle, shimmerStyle]} />;
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: Theme.colors["dark-gray"],
    flex: 1,
    borderRadius: Theme.spacing.xs,
  },
});

export default ShimmerRectangle;
