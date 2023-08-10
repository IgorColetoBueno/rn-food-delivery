import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import Theme from "../../theme";
import { Row } from "../flex";

interface SearchInputProps extends TextInputProps {}

const SearchInput = ({ onFocus, onBlur, ...props }: SearchInputProps) => {
  const handleClearSearch = () => {
    props.onChangeText?.("");
  };

  return (
    <Row
      backgroundColor={Theme.colors["light-gray"]}
      alignItems="center"
      borderRadius={8}
    >
      <TextInput
        style={[styles.searchInput, Theme.typography.body]}
        {...props}
      />
      {props.value !== "" && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearSearch}
        >
          <MaterialIcons
            color={Theme.colors["dark-gray"]}
            size={Theme.spacing.md}
            name="close"
          />
        </TouchableOpacity>
      )}
    </Row>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: Theme.spacing["2xl"],
    paddingHorizontal: Theme.spacing.xs,
  },
  clearButton: {
    paddingVertical: Theme.spacing.xs,
    paddingRight: Theme.spacing.md,
  },
});

export default SearchInput;
