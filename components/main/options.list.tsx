import AntDesign from "@expo/vector-icons/build/AntDesign";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface Props {
  answerOpts: Array<any>;
  action: {
    incorrect: Function;
    correct: Function;
  };
}
const AnswerList = ({ answerOpts, action }: Props): JSX.Element => {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [pickedOpt, setPickedOpt] = useState<number | undefined>();
  const [icon, setIcon] = useState<{
    correctIcon: boolean;
    incorrectIcon: boolean;
  }>({
    correctIcon: false,
    incorrectIcon: false,
  });

  const checkAnswer = useCallback(
    (index: number) => {
      setPickedOpt(index);

      if (isCorrect) {
        setIcon({
          correctIcon: true,
          incorrectIcon: false,
        });
        action.correct();
      } else {
        setIcon({
          correctIcon: false,
          incorrectIcon: true,
        });
        action.incorrect();
      }
    },
    [isCorrect]
  );

  const handleSelectedItem = (pickedAt: number): StyleProp<ViewStyle> => {
    if (pickedAt === pickedOpt && !isCorrect) {
      return { ...style.main, backgroundColor: "red" };
    } else if (pickedAt === pickedOpt && isCorrect) {
      return { ...style.main, backgroundColor: "green" };
    }
    return style.main;
  };

  return (
    <ScrollView>
      {answerOpts.map((el, index: number) => (
        <TouchableOpacity key={uuidv4()} onPress={() => checkAnswer(index)}>
          <View style={handleSelectedItem(index)} key={index}>
            <View style={style.optionInner}>
              <View style={{ flex: 0.5 }}>
                {icon.correctIcon && index === pickedOpt && (
                  <AntDesign style={{
                    marginHorizontal: 12
                  }} name="checkcircle" size={24} color="white" />
                )}
                {icon.incorrectIcon && index === pickedOpt && (
                  <MaterialIcons style={{
                    marginHorizontal: 12
                  }} name="cancel" size={26} color="white" />
                )}
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={style.text}>{el}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
