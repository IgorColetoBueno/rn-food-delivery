import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

import Theme, { Color, Typography as TypographyType } from "../../theme";

interface TypographyProps {
  family?: "poppins" | "garamond";
  weight?: "bold" | "regular" | "semibold";
  size?: TypographyType;
  color?: Color;
}

const Typography = ({
  family = "poppins",
  weight = "regular",
  children,
  size = "body",
  color = "black",
}: PropsWithChildren<TypographyProps>) => {
  const fontSizeStyle = Theme.typography[size];

  const style: StyleProp<TextStyle> = {
    fontFamily: `${family}-${weight}`,
    flexShrink: 1,
    color: Theme.colors[color],
  };

  return <Text style={[style, fontSizeStyle]}>{children}</Text>;
};

export const TextH1 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h1" family="garamond" weight="bold" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH2 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h2" family="garamond" weight="semibold" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH3 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h3" weight="semibold" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH4 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h4" weight="semibold" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody2 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="body2" weight="regular" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="body" weight="regular" {...rest}>
      {children}
    </Typography>
  );
};
