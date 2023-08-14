import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, View, ViewProps } from "react-native";

import Theme from "../../theme";

const KeyboardAvoidingWrapper = ({
  children,
  style,
}: PropsWithChildren<ViewProps>) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Theme.colors.white }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
