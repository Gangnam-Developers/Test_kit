import React from "react";
import { Text } from "react-native";

interface HeaderProps {
  title: string;
  textSize: number;
}
const CustomHeader = (props: HeaderProps) => {
  return <Text style={{ fontSize: props.textSize }}>{props.textSize}</Text>;
};

export default CustomHeader;
