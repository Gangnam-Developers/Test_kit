import AntDesign from "@expo/vector-icons/build/AntDesign";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import React, { useEffect, useMemo, useState } from "react";
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
  const [answers, setAnswers] = useState<any>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [pickedOpt, setPickedOpt] = useState<any>();
  const [disabled, setDisable] = useState<boolean>(false);

  const ListRender = ({ item }: any) => {
    const selected = (value: number, isCorrect: any) => {
      setPickedOpt(value);
      setIsCorrect(isCorrect);
    };

    const changeStyle = (option: string): StyleProp<ViewStyle> => {
      if (isCorrect !== undefined) {
        if (pickedOpt === option && isCorrect) {
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
        onPress={() => {selected(item.option, item.isCorrect); console.log(item.isCorrect)}}
      >
        <View style={changeStyle(item.option)}>
          <View style={style.optionInner}>
            <View style={{ flex: 0.5 }}>
              {isCorrect === true && pickedOpt === item.option && (
                <AntDesign
                  style={{
                    marginHorizontal: 12,
                  }}
                  name="checkcircle"
                  size={24}
                  color="white"
                />
              )}
              {isCorrect === false && pickedOpt === item.option && (
                <MaterialIcons
                  style={{
                    marginHorizontal: 12,
                  }}
                  name="cancel"
                  size={26}
                  color="white"
                />
              )}
              {isCorrect === undefined && null}
            </View>
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

  useMemo(() => {
    if (answerOpts !== undefined) {
      setAnswers(answerOpts);
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
