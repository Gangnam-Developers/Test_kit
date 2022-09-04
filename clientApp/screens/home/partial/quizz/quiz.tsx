import React, { useEffect, useMemo } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { AnswerList } from "../../../../components/main/quizz_comp/options.list";
import { QuestionDisplay } from "../../../../components/main/quizz_comp/question.card";
import { gql, useQuery } from "@apollo/client";

const Quizz = () => {
  const [checkMode, setCheckMode] = React.useState<any>("question");

  const [shuf, setShuf] = React.useState<boolean>(false);

  const [test, setTest] = React.useState<any>();

  const { data, refetch, loading } = useQuery(
    gql`
      query Question($shuffle: Boolean!) {
        questions(shuffle: $shuffle) {
          id
          question
          options
        }
      }
    `,
    {
      variables: {
        shuffle: shuf,
      },
    }
  );

  console.log(loading)

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
    if (data !== undefined) {
      setTest(data);
    }
  }, [data]);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <QuestionDisplay
        mode={checkMode}
        data={test}
        shuffle={() => {
          setShuf(true);
          refetch();
        }}
      />
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
