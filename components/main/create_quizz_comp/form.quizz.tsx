import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const QuizzCreatedForm = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: "",
      correctAnswer: "",
      opts1: "",
      opts2: "",
    },
  });

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
                  numberOfLines={4}
                />
              )}
              name={"questions"}
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
                  }}
                  placeholder={"ex. 바나나의 색상은?"}
                  inputAccessoryViewID={"questionID"}
                  placeholderTextColor={"gray"}
                  onBlur={onBlur}
                />
              )}
              name={"correctAnswer"}
            />
          </View>
          <View style={{
            display: "flex",
            flexDirection: "column",
            marginVertical: 18
          }}>
            <Text style={styles.label}>오답을 적어주세요</Text>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={{
                      ...styles.container,
                      height: 52,
                      paddingHorizontal: 18,
                    }}
                    placeholder={"ex. 빨간색"}
                    placeholderTextColor={"gray"}
                    onBlur={onBlur}
                  />
                )}
                name={"opts1"}
              />
            </View>
            <View style={{marginVertical: 9}}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={{
                      ...styles.container,
                      height: 52,
                      paddingHorizontal: 18,
                    }}
                    placeholder={"ex. 빨간색"}
                    placeholderTextColor={"gray"}
                    onBlur={onBlur}
                  />
                )}
                name={"opts2"}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.submit}>
          <TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>퀴즈 등록하기</Text>
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
    paddingVertical :9,
    backgroundColor: "rgb(39, 49, 59)",
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  question: {
    height: 180,
    maxHeight: 180,
    paddingHorizontal: 18,
    paddingVertical :18,
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
    alignItems: "center"
  }
});

export { QuizzCreatedForm };
