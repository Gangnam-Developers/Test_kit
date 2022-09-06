import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";
import { Util } from "../../../util/util";
import { AndroidStatusBar } from "../../system_comp/android.status";
import { Header } from "../profile_comp/header";

interface Props {
  name: string;
  data: any;
  goBack: Function;
  isDetailBoard: boolean
}

const Competitors = ({ name, data, goBack, isDetailBoard }: Props) => {
  const [competitorInfo, setCompetitorInfo] = React.useState<any>();

  const [rank, setRank] = React.useState<number>(0);

  const [quizzes, setQuizzes] = React.useState<number>(0);

  const [avatar, setAvatar] = React.useState<string>();

  const [analyze, setAnalyze] = React.useState<{
    first_attempt: number;
    second_attempt: number;
    failed_attempt: number;
  }>({
    first_attempt: 0,
    second_attempt: 0,
    failed_attempt: 100,
  });

  useEffect(() => {
    if (name !== undefined && Array.isArray(data)) {
      setCompetitorInfo(
        data.filter((el: { name: string }) => el.name === name)[0]
      );

      setRank(data.findIndex((el: { name: string }) => el.name === name) + 1);
    }
  }, [name, data]);

  useEffect(() => {
    if (competitorInfo !== undefined) {
      setQuizzes(competitorInfo.quizzes.length);
      setAnalyze({ ...Util.statical(competitorInfo.quizzes) });
      setAvatar(competitorInfo.picture)
    }
  }, [competitorInfo]);

  return (
    <SafeAreaView style={style.statusBar}>
      <SafeAreaView style={style.container}>
        <AndroidStatusBar
          backroundColor={"rgb(63, 68, 92)"}
          barStyle="light-content"
        />
        <Header
          avatar={avatar}
          currentUser={false}
          title={{
            label: name,
          }}
          infoBoard={{
            rank: rank,
            quizzes: quizzes,
          }}
          navigate={goBack}
          logout={() => {}}
          competitorBoard={isDetailBoard}
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
            data={[
              { y: analyze.failed_attempt },
              { y: analyze.second_attempt },
              { y: analyze.first_attempt },
            ]}
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
                ${analyze.first_attempt}%
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
              <Text style={{ color: "#FFEE68", fontSize: 18 }}>
                ${analyze.second_attempt}%
              </Text>
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
                ${analyze.failed_attempt === 100 ? 0 : analyze.failed_attempt}%
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
export { Competitors };
