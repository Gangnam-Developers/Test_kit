import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Quizz = () => {
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
export default Quizz;
