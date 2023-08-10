import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import Theme from "../../theme";
import { Row } from "../flex";

interface NumberInputProps extends TextInputProps {}

const NumberInput = ({ onFocus, onBlur, ...props }: NumberInputProps) => {
  const subtract = useCallback(() => {
    props.onChangeText?.((+(props.value || "0") - 1).toString());
  }, [props]);

  const add = useCallback(() => {
    props.onChangeText?.((+(props.value || "0") + 1).toString());
  }, [props]);

  return (
    <Row
      backgroundColor={Theme.colors.white}
      alignItems="center"
      borderRadius={8}
      borderWidth={1}
      borderColor={Theme.colors["dark-gray"]}
    >
      <TouchableOpacity style={styles.operators} onPress={subtract}>
        <MaterialIcons
          color={Theme.colors.black}
          size={Theme.spacing.lg}
          name="remove"
        />
      </TouchableOpacity>
      <TextInput style={[styles.input, Theme.typography.body]} {...props} />
      <TouchableOpacity
        hitSlop={Theme.spacing.sm}
        style={styles.operators}
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
  },
  operators: {
    padding: Theme.spacing.xs,
  },
});

export default NumberInput;
