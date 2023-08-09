import { PropsWithChildren, useMemo } from "react";
import { NativeMethods, ScrollView, ScrollViewProps, View } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import { NativeProps } from "react-native-safe-area-context/lib/typescript/src/specs/NativeSafeAreaView";
import KeyboardAvoidingWrapper from "../keyboard-avoiding";
import Theme from "../../theme";

interface BaseScreenProps extends ScrollViewProps {
  scrollable?: boolean;
  safeAreaProps?: NativeSafeAreaViewProps &
    React.RefAttributes<
      React.Component<NativeProps, {}, any> & Readonly<NativeMethods>
    >;
  noSpacing?: boolean;
}

const BaseScreen = ({
  children,
  scrollable,
  safeAreaProps,
  noSpacing,
  ...rest
}: PropsWithChildren<BaseScreenProps>) => {
  const Component = useMemo(
    () => (scrollable ? ScrollView : View),
    [scrollable]
  );

  if (noSpacing) {
    return (
      <KeyboardAvoidingWrapper>
        <Component
          scrollEnabled
          alwaysBounceVertical={false}
          {...rest}
          style={{ flex: 1 }}
        >
          {children}
        </Component>
      </KeyboardAvoidingWrapper>
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView
        {...safeAreaProps}
        style={[{ flex: 1 }, safeAreaProps?.style]}
      >
        <Component
          alwaysBounceVertical={false}
          style={{
            paddingHorizontal: Theme.spacing.md,
          }}
          {...rest}
        >
          {children}
        </Component>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default BaseScreen;
