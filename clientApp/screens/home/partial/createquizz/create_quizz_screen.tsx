import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { QuizzCreatedForm } from "../../../../components/main/create_quizz_comp/form.quizz";

const QuizzCreate = (props: any) => {
  return (
    <View style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <QuizzCreatedForm goBack={() => props.navigation.navigate("QUIZ")} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(63, 68, 92)",
    height: "100%",
  },
});

export default QuizzCreate;
