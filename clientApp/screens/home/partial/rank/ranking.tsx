import React, { useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Competitors } from "../../../../components/main/rank_comp/competitors.rank";
import { Bullentin } from "../../../../components/main/rank_comp/current_user.rank";
import {
  CompeteList,
  ItemsProps,
} from "../../../../components/main/rank_comp/rank.list";

const Ranking = ({ route, navigation }: any) => {
  const [competitor, setCompetitor] = React.useState<boolean>(false);

  const mock: ItemsProps[] = [
    {
      rank: {
        digit: 1,
        color: "#52dba6",
      },
      avatar: "",
      name: {
        label: "Cherry",
        color: "#52dba6",
      },
      rate: {
        digit: 90,
        color: "#52dba6",
      },
    },
    {
      rank: {
        digit: 2,
        color: "yellow",
      },
      avatar: "",
      name: {
        label: "Harry",
        color: "yellow",
      },
      rate: {
        digit: 87,
        color: "yellow",
      },
    },
    {
      rank: {
        digit: 3,
        color: "#e85ec5",
      },
      avatar: "",
      name: {
        label: "Lisa",
        color: "#e85ec5",
      },
      rate: {
        digit: 87,
        color: "#e85ec5",
      },
    },
  ];

  return (
    <SafeAreaView style={style.container}>
      {!competitor ? (
        <>
          <Bullentin
            username="Aria"
            rate={70}
            rank={32}
            navigate={() => navigation.navigate("MY")}
          />
          <CompeteList
            data={mock}
            navigation={navigation}
            onDisPlay={() => setCompetitor(true)}
          />
        </>
      ) : (
        <Competitors data={route.params.name.label} goBack={() => {
          setCompetitor(false);
          navigation.setParams(undefined);
        }}/>
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
