import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../../../components/main/profile_comp/header";
import { AndroidStatusBar } from "../../../../components/system_comp/android.status";

const My = (props: any) => {
  return (
    <SafeAreaView style={style.statusBar}>
      <SafeAreaView style={style.container}>
        <AndroidStatusBar
          backroundColor={"rgb(63, 68, 92)"}
          barStyle="light-content"
        />
        <Header
          currentUser={true}
          title={{
            label: "Aria",
          }}
          infoBoard={{
            rank: 32,
            quizzes: 51
          }}
          navigate={() => props.navigation.navigate("RANK")}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: "rgb(63, 68, 92)",
  },
  container: {
    backgroundColor: "rgb(38, 42, 57)",
    height: "100%",
  },
  header: {
    backgroundColor: "rgb(63, 68, 92)",
  },
});
export default My;
