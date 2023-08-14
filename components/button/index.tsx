import { Pressable, StyleSheet, TouchableOpacityProps } from "react-native";

import Theme, { Color } from "../../theme";
import { TextBody } from "../typography";

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: Color;
  color?: Color;
  title: string;
}

const Button = ({
  children,
  style,
  backgroundColor = "black",
  color = "white",
  title,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      {...rest}
      style={(e) => {
        return [
          style,
          styles.button,
          { backgroundColor, opacity: e.pressed ? 0.8 : 1 },
        ];
      }}
    >
      <TextBody color={color}>{title}</TextBody>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.spacing["sm"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
