import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BASE_URL } from "react-native-dotenv";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Question {
  question: string;
  correctAnswer: string;
  opts1: string;
  opts2: string;
}

const QuizzCreatedForm = ({ goBack }: { goBack: Function }): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      correctAnswer: "",
      opts1: "",
      opts2: "",
    },
  });

  const createQuestion: SubmitHandler<Question> = async (data) => {
    const question = data.question;
    const options = [
      {
        option: data.correctAnswer,
        isCorrect: true,
      },
      {
        option: data.opts1,
        isCorrect: false,
      },
      {
        option: data.opts2,
        isCorrect: false,
      },
    ];

    const shuffle = options.sort(() => Math.random() - 0.5);

    const getToken = await AsyncStorage.getItem("access_token");

    return await axios
      .post(
        `${BASE_URL}`,
        {
          query: `mutation CreateQuestion($make: CreateQuestion!){
          createQuestion(make: $make){
            message
        }
      }`,
          variables: {
            make: {
              question: question,
              options: shuffle,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          goBack();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          scrollEnabled
        >
          <Text style={styles.label}>문제를 적어주세요</Text>
          <ScrollView style={styles.container}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  multiline={true}
                  placeholder={"ex. 바나나의 색상은?"}
                  placeholderTextColor={"gray"}
                  style={styles.question}
                  value={value}
                  onChangeText={onChange}
                  numberOfLines={4}
                />
              )}
              name={"question"}
            />
          </ScrollView>
          <Text style={{ ...styles.label, marginTop: 33 }}>
            정답을 적어주세요
          </Text>
          <View>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    ...styles.container,
                    height: 52,
                    paddingHorizontal: 18,
                    color: "white",
                  }}
                  placeholder={"ex. 바나나의 색상은?"}
                  inputAccessoryViewID={"questionID"}
                  placeholderTextColor={"gray"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name={"correctAnswer"}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginVertical: 18,
            }}
          >
            <Text style={styles.label}>오답을 적어주세요</Text>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onBlur, value, onChange } }) => (
                  <TextInput
                    style={{
                      ...styles.container,
                      height: 52,
                      paddingHorizontal: 18,
                      color: "white",
                    }}
                    placeholder={"ex. 빨간색"}
                    placeholderTextColor={"gray"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name={"opts1"}
              />
            </View>
            <View style={{ marginVertical: 9 }}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onBlur, value, onChange } }) => (
                  <TextInput
                    style={{
                      ...styles.container,
                      height: 52,
                      paddingHorizontal: 18,
                      color: "white",
                    }}
                    placeholder={"ex. 빨간색"}
                    placeholderTextColor={"gray"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name={"opts2"}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.submit}>
          <TouchableOpacity onPress={handleSubmit(createQuestion)}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              퀴즈 등록하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    maxHeight: 180,
    marginHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "rgb(39, 49, 59)",
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  question: {
    height: 180,
    maxHeight: 180,
    paddingHorizontal: 18,
    paddingVertical: 18,
    color: "white",
  },
  label: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 14,
    marginVertical: 12,
  },
  submit: {
    width: "100%",
    height: "10%",
    backgroundColor: "rgb(64, 227, 175)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { QuizzCreatedForm };
