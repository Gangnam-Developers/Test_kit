import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/main/profile_comp/header";
import { AndroidStatusBar } from "../../../../components/system_comp/android.status";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const My = ({ props, logout }: { props: any; logout: Function }) => {
  const onLogout = React.useCallback(async () => {
    try {
      await AsyncStorage.removeItem("access_token").then(() => logout());
    } catch (error) {
      console.warn(error)
    }
  }, []);

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
            quizzes: 51,
          }}
          navigate={() => props.navigation.navigate("RANK")}
          logout={onLogout}
        />
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <VictoryPie
            width={Dimensions.get("window").width}
            height={288}
            padding={30}
            colorScale={["#FC7CF5", "#FFEE68", "#40E3AF"]}
            data={[{ y: 10 }, { y: 20 }, { y: 70 }]}
            animate={{
              duration: 2000,
            }}
          />
          <View style={style.details}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ ...style.dot, backgroundColor: "#40E3AF" }} />
              <Text
                style={{
                  color: "#40E3AF",
                  fontSize: 18,
                  marginVertical: 18,
                  flex: 1,
                }}
              >
                한번에 맞춘 확률
              </Text>
              <Text
                style={{ color: "#40E3AF", fontSize: 18, textAlign: "right" }}
              >
                70%
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ ...style.dot, backgroundColor: "#FFEE68" }} />
              <Text style={{ color: "#FFEE68", fontSize: 18, flex: 1 }}>
                두번에 맞춘 확률
              </Text>
              <Text style={{ color: "#FFEE68", fontSize: 18 }}>20%</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ ...style.dot, backgroundColor: "#FC7CF5" }} />
              <Text
                style={{
                  color: "#FC7CF5",
                  fontSize: 18,
                  marginVertical: 18,
                  flex: 1,
                }}
              >
                오답률
              </Text>
              <Text
                style={{ color: "#FC7CF5", fontSize: 18, marginVertical: 18 }}
              >
                10%
              </Text>
            </View>
          </View>
        </View>
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
  details: {
    width: "100%",
    paddingHorizontal: 18,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 30,
    transform: [
      {
        scale: 0.3,
      },
    ],
  },
});
export default My;
