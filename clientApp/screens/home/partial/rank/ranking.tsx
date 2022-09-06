import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Competitors } from "../../../../components/main/rank_comp/competitors.rank";
import { Bullentin } from "../../../../components/main/rank_comp/current_user.rank";
import { CompeteList } from "../../../../components/main/rank_comp/rank.list";
import { Util } from "../../../../util/util";

const Ranking = ({
  route,
  navigation,
  data,
  hideHeader,
  showHeader,
}: {
  route: any;
  navigation: any;
  data: {
    currentUserData: any;
    competitorsData: any;
    rank: number;
  };
  hideHeader: Function;
  showHeader: Function;
}) => {
  const [competitor, setCompetitor] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      {!competitor ? (
        <>
          <Bullentin
            username={`${data.currentUserData.name}`}
            avatar={`${data.currentUserData.avatar}`}
            rate={Util.sumGained(data.currentUserData.quizzes)}
            rank={data.rank}
            navigate={() => navigation.navigate("MY")}
          />
          <CompeteList
            data={data.competitorsData.brief}
            navigation={navigation}
            onDisPlay={() => {
              setCompetitor(true);
              hideHeader();
            }}
          />
        </>
      ) : (
        <Competitors
          name={route.params.name.label}
          goBack={() => {
            setCompetitor(false);
            navigation.setParams(undefined);
            showHeader();
          }}
          data={data.competitorsData.raw}
          isDetailBoard={competitor}
        />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(38, 42, 57)",
    height: "100%",
  },
});

export default Ranking;
