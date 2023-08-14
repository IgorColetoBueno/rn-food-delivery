import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Theme from "../../theme";
import { Row } from "../flex";

interface NumberInputProps extends TextInputProps {
  flat?: boolean;
}

const NumberInput = ({
  onFocus,
  onBlur,
  flat = false,
  ...props
}: NumberInputProps) => {
  const subtract = useCallback(() => {
    props.onChangeText?.((+(props.value || "0") - 1).toString());
  }, [props]);

  const add = useCallback(() => {
    props.onChangeText?.((+(props.value || "0") + 1).toString());
  }, [props]);

  const operatorStyle: StyleProp<ViewStyle> = {
    padding: flat ? Theme.spacing.xxs : Theme.spacing.xs,
  };

  return (
    <Row
      backgroundColor={Theme.colors.white}
      alignItems="center"
      borderRadius={8}
      borderWidth={1}
      borderColor={Theme.colors["dark-gray"]}
    >
      <TouchableOpacity style={operatorStyle} onPress={subtract}>
        <MaterialIcons
          color={Theme.colors.black}
          size={Theme.spacing.lg}
          name="remove"
        />
      </TouchableOpacity>
      <TextInput style={[styles.input, Theme.typography.body]} {...props} />
      <TouchableOpacity
        hitSlop={Theme.spacing.sm}
        style={operatorStyle}
        onPress={add}
      >
        <MaterialIcons
          color={Theme.colors.black}
          size={Theme.spacing.lg}
          name="add"
        />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlign: "center",
    color: "black",
  },
});

export default NumberInput;
