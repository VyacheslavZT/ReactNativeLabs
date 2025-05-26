import React from "react";
import { Text, TextProps, useColorScheme } from "react-native";

type ISTextProps = TextProps

export const SText = (props: ISTextProps) => {
  const combinedStyles = [
    {
      color: useColorScheme() === "dark" ? "white" : "black",
      fontSize: 16,
    },
    props.style,
  ];

  return (
    <Text {...props} style={combinedStyles}>
      {props.children}
    </Text>
  );
};
