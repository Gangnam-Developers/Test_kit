import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

const Ranking = () => {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(38, 42, 57)",
    height: "100%",
  },
});

export default Ranking;
