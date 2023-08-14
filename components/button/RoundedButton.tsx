import { PropsWithChildren } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import Theme from "../../theme";

const RoundedButton = ({
  children,
  style,
  ...rest
}: PropsWithChildren<PressableProps & React.RefAttributes<View>>) => {
  return (
    <Pressable {...rest} style={[styles.container, style as ViewStyle]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.black,
    opacity: 0.8,
    padding: Theme.spacing.sm,
    borderRadius: 999,
  },
});
export default RoundedButton;
