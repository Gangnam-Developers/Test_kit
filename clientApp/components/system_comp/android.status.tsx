import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

const BAR_HEIGHT = StatusBar.currentHeight;

const AndroidStatusBar = ({ backgroundColor, ...props }: any) => {
  return (
    <View style={[style.statusBar, backgroundColor]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const style = StyleSheet.create({
  statusBar: {
    height: BAR_HEIGHT,
  },
});

export { AndroidStatusBar };
