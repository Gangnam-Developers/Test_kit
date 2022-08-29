import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";


interface Props {
  answerOpts: Array<any>;
  action: {
    incorrect: Function
    correct: Function
  }
}
const AnswerList = ({ answerOpts, action }: Props): JSX.Element => {

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>()


  const checkAnswer = useCallback(() => {
    if (isCorrect) {
      action.correct()
    }else{
      action.incorrect()
    }
  }, [isCorrect])

  return (
    <ScrollView>
        {answerOpts.map((el, index: number) => (
          <Pressable style={style.main} key={index} onPress={checkAnswer}>
            <Text style={style.text}>{el}</Text>
          </Pressable>
        ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  main: {
    marginHorizontal: 18,
    borderRadius: 9,
    marginVertical: 6,
    paddingVertical: 20,
    backgroundColor: "rgb(63, 68, 92)",
  },
  text: {
    color: "white",
    textAlign: "center",
  },

  incorrect: {
    backgroundColor: "red",
    borderRadius: 9,
    marginVertical: 6,
    paddingVertical: 20,
  }
});

export { AnswerList };
