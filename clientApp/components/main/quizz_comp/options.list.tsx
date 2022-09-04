import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  FlatList,
} from "react-native";
import "react-native-get-random-values";

interface Props {
  answerOpts: any;
  action: {
    incorrect: Function;
    correct: Function;
  };
  mode?: "correct" | "incorrect" | "question";
}

const AnswerList = ({ answerOpts, action, mode }: Props): JSX.Element => {
  const [answers, setAnswers] = useState<Array<any>>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [pickedOpt, setPickedOpt] = useState<any>();
  const [disabled, setDisable] = useState<boolean>(false);

  const ListRender = ({ item }: any) => {
    const selected = (value: number, isCorrect: any) => {
      setPickedOpt(value);
      setIsCorrect(isCorrect === "true" ? true : false);
    };

    const changeStyle = (option: string): StyleProp<ViewStyle> => {
      if (isCorrect !== undefined) {
        if (pickedOpt === option && isCorrect) {
          // setDisable(false);
          action.correct();
          return {
            ...style.main,
            backgroundColor: "green",
          };
        } else if (option === pickedOpt && !isCorrect) {
          setDisable(true);
          action.incorrect();
          return {
            ...style.main,
            backgroundColor: "red",
          };
        }
      }
      return style.main;
    };

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => selected(item.option, item.isCorrect)}
      >
        <View style={changeStyle(item.option)}>
          <View style={style.optionInner}>
            <View style={{ flex: 0.5 }}></View>
            <View>
              <Text style={style.text}>{item.option}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (mode === "question") {
      setIsCorrect(undefined);
      setDisable(false);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "incorrect") {
      setDisable(true);
    }
  }, [mode]);

  useEffect(() => {
    if (answerOpts !== undefined) {
      setAnswers(answerOpts.questions[0].options);
    }
  }, [answerOpts]);

  return (
    <FlatList
      data={answers}
      renderItem={ListRender}
      keyExtractor={(_, index) => index.toString()}
    />
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

  optionInner: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },

  text: {
    color: "white",
  },
});

export { AnswerList };
