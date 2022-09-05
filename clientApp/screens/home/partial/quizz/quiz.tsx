import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { AnswerList } from "../../../../components/main/quizz_comp/options.list";
import { QuestionDisplay } from "../../../../components/main/quizz_comp/question.card";
import { gql, useQuery } from "@apollo/client";

const Quizz = () => {
  const [checkMode, setCheckMode] = React.useState<any>("question");

  const [display, setDipslay] = React.useState(false);

  const [shuf, setShuf] = React.useState<boolean>(false);

  const [question, setQuestion] = React.useState<{
    id: string;
    question: any;
    options: any;
  }>();

  const { refetch } = useQuery(
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
      fetchPolicy: "network-only",
      onCompleted(data) {
        if (data.questions.length > 0) {
          setQuestion({
            id: data.questions[0].id,
            question: data.questions[0].question,
            options: data.questions[0].options,
          });
          setDipslay(true);
        } else {
          setDipslay(false);
        }
      },
    }
  );

  const clearUp = async (settime: number) => {
    try {
      await new Promise((resolve) => setInterval(resolve, settime));
    } catch (error) {
      console.warn(error);
    } finally {
      setCheckMode("question");

      if (checkMode === "correct") {
        refetch();
      }
    }
  };

  useEffect(() => {
    if (checkMode === "incorrect" || "correct") {
      clearUp(1000);
    }
  }, [checkMode]);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      {display ? (
        <>
          <QuestionDisplay
            mode={checkMode}
            data={question?.question}
            shuffle={() => {
              setShuf(true);
              refetch();
            }}
          />
          <AnswerList
            answerOpts={question?.options}
            action={{
              correct: () => setCheckMode("correct"),
              incorrect: () => setCheckMode("incorrect"),
            }}
            mode={checkMode}
            id={question?.id}
          />
        </>
      ) : (
        <View style={style.innerView}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              fontVariant: ["oldstyle-nums"],
              color: "rgb(63, 68, 92)",
            }}
          >
            No Questions
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(38, 42, 57)",
    height: "100%",
  },
  innerView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
export default Quizz;
