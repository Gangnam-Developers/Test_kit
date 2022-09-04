import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { BASE_URL } from "react-native-dotenv";
import { AnswerList } from "../../../../components/main/quizz_comp/options.list";
import { QuestionDisplay } from "../../../../components/main/quizz_comp/question.card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Quizz = () => {
  const [checkMode, setCheckMode] = React.useState<any>("question");

  const [test, setTest] = React.useState<any>();

  const clearUp = async () => {
    try {
      await new Promise((resolve) => setInterval(resolve, 1000));
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

  useMemo(async () => {
    try {
      const getToken = await AsyncStorage.getItem("access_token");

      if (getToken === null) return;

      const questions = await axios.post(
        `${BASE_URL}`,
        {
          query: `query{
          questions{
            id
            question
            options
          }
        }`,
          variables: {},
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      if (questions.status === 200) {
        setTest(questions.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // console.log(test.questions[0].options)
  // console.log(test);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <QuestionDisplay mode={checkMode} data={test} />
      <AnswerList
        answerOpts={test}
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
