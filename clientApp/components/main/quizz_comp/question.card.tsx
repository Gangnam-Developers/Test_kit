import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  mode?: "correct" | "incorrect" | "question" | undefined;
  data?: any;
  shuffle: Function;
}

const QuestionDisplay = ({ mode, data, shuffle }: Props): JSX.Element => {

  const [question, setQuestions] = React.useState<any>();

  const shake = React.useRef(new Animated.Value(0.3)).current;

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS];

  const translateXAnim = shake.interpolate({
    inputRange: [0, 1],
    outputRange: [mode === "incorrect" ? -6 : -9, mode === "correct" ? 6 : 9],
  });

  const getAnimationStyles = () => ({
    transform: [
      {
        translateX: translateXAnim,
      },
    ],
  });

  const runAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, {
        delay: 300,
        toValue: 1,
        duration: mode === "incorrect" ? 300 : 200,
        easing: Easing.out(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: mode === "incorrect" ? 300 : 100,
        easing: Easing.in(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 1,
        duration: mode === "incorrect" ? 300 : 100,
        easing: Easing.in(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: mode === "incorrect" ? 200 : 100,
        easing: Easing.in(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0.5,
        duration: mode === "incorrect" ? 300 : 200,
        easing: Easing.in(Easing.sin),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (mode === "incorrect") runAnimation();
    });
  };

  useEffect(() => {
    if (mode === "incorrect") {
      Vibration.vibrate(PATTERN)
      runAnimation();
    }
  }, [mode]);

  useMemo(() => {
    if (data !== undefined) {
      setQuestions(data)
    }
  }, [data])

  if (mode === "incorrect") {
    return (
      <Animated.View style={[getAnimationStyles()]}>
        <LinearGradient
          style={style.session}
          colors={["#5b4040", "#41242e", "#ac2727"]}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: 30,
                paddingVertical: 9,
              }}
            >
              FAILED
            </Text>
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: 60,
                paddingVertical: 6,
              }}
            >
              ❌
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  }

  if (mode === "correct") {
    return (
      <LinearGradient
        style={style.session}
        colors={["#61cd51", "#31402f", "#60ff45"]}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#00ffa0",
              fontWeight: "bold",
              fontSize: 30,
              paddingVertical: 9,
            }}
          >
            Success
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 60,
              paddingVertical: 6,
            }}
          >
            🎉
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={style.mainArea}>
      <ScrollView style={style.questionArea}>
        <Text style={style.text}>{question}</Text>
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 50,
          backgroundColor: "rgb(86, 95, 124)",
          marginHorizontal: 18,
          borderBottomLeftRadius: 9,
          borderBottomRightRadius: 9,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 9,
          }}
          onPress={() => shuffle()}
        >
          <Ionicons name="reload" size={18} color="white" />
          <Text style={{ marginLeft: 3, color: "white" }}>건너뛰기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(38, 42, 57)",
    height: "100%",
  },

  mainArea: {
    marginVertical: 9,
  },

  questionArea: {
    backgroundColor: "rgb(63, 68, 92)",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    height: 150,
    marginHorizontal: 18,
  },

  text: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    color: "white",
    fontSize: 14.33,
  },

  session: {
    marginVertical: 9,
    borderRadius: 9,
    height: 180,
    marginHorizontal: 18,
  },
});

export { QuestionDisplay };
