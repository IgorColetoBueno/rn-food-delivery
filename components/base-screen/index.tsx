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
}

const BaseScreen = ({
  children,
  scrollable,
  safeAreaProps,
  ...rest
}: PropsWithChildren<BaseScreenProps>) => {
  const Component = useMemo(() => (scrollable ? ScrollView : View), []);

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
