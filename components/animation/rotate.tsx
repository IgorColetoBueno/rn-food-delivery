import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

interface RotatingComponentProps extends ViewProps {}

const RotatingComponent = ({
  children,
  style,
  ...rest
}: RotatingComponentProps) => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = () => {
    Animated.timing(rotationValue, {
      toValue: 1, // 1 represents 100% of rotation
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  useEffect(() => {
    startRotationAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Interpolate the rotation value for the animated style
  const rotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      {...rest}
      style={[{ transform: [{ rotate: rotation }] }, style]}
    >
      {children}
    </Animated.View>
  );
};

export default RotatingComponent;
