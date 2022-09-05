import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { AnswerList } from "../../../../components/main/quizz_comp/options.list";
import { QuestionDisplay } from "../../../../components/main/quizz_comp/question.card";
import { gql, useQuery } from "@apollo/client";

const Quizz = () => {
  const [checkMode, setCheckMode] = React.useState<any>("question");

  const [display, setDipslay] = React.useState(false);

  const [shuf, setShuf] = React.useState<boolean>(false);

  const [opts, setOpts] = React.useState<any>();

  const [question, setQuestion] = React.useState<any>();

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
      onCompleted(data) {
        if (data.questions.length > 0) {
          setOpts(data.questions[0].options);
          setQuestion(data.questions[0].question);
          setDipslay(true);
        }
      },
    }
  );

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

  return (
    <SafeAreaView style={style.container}>
      {display ? (
        <>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <QuestionDisplay
            mode={checkMode}
            data={question}
            shuffle={() => {
              setShuf(true);
              refetch();
            }}
          />
          <AnswerList
            answerOpts={opts}
            action={{
              correct: () => setCheckMode("correct"),
              incorrect: () => setCheckMode("incorrect"),
            }}
            mode={checkMode}
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
