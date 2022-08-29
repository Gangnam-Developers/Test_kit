import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { AnswerList } from "../../../components/main/quizz_comp/options.list";
import { QuestionDisplay } from "../../../components/main/quizz_comp/question.card";

const Quizz = () => {
  const [checkMode, setCheckMode] = React.useState<any>("question");

  const clearUp = async () => {
    try {
      await new Promise((resolve) => setInterval(resolve, 2000));
    } catch (error) {
      console.warn(error);
    } finally {
      setCheckMode("question");
    }
  };

  useEffect(() => {
    if (checkMode === "incorrect") {
      clearUp();
    }
  }, [checkMode]);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <QuestionDisplay mode={checkMode} />
      <AnswerList
        answerOpts={[1, 2, 3, 4]}
        action={{
          correct: () => setCheckMode("correct"),
          incorrect: () => setCheckMode("incorrect"),
        }}
        mode={checkMode}
      />
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
