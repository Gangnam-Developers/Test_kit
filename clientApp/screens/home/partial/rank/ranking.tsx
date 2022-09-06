import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { BASE_URL } from "react-native-dotenv";
import { Competitors } from "../../../../components/main/rank_comp/competitors.rank";
import { Bullentin } from "../../../../components/main/rank_comp/current_user.rank";
import {
  CompeteList,
  ItemsProps,
} from "../../../../components/main/rank_comp/rank.list";

const Ranking = ({
  route,
  navigation,
  hideHeader,
  showHeader,
}: {
  route: any;
  navigation: any;
  hideHeader: Function;
  showHeader: Function;
}) => {
  const [competitor, setCompetitor] = React.useState<boolean>(false);

  const [currentUser, setCurrentUser] = React.useState<{
    avatar?: string;
    name?: string;
    gained: number;
  }>({
    gained: 0,
  });

  const {} = useQuery(
    gql`
      query {
        getCurrentUser {
          name
          email
          picture
          quizzes
        }
        getCompetitors {
          name
          email
          picture
          quizzes
        }
      }
    `,
    {
      onCompleted(data) {
        if (data !== undefined) {
          setCurrentUser({
            avatar: data.getCurrentUser.picture,
            name: data.getCurrentUser.name,
            gained: sumGained(data.getCurrentUser.quizzes),
          });
          getAction()
        }
      },
    }
  );

  const [getAction, {}] = useMutation(
    gql`
      mutation ScoreSummary($rate: ScoreSummary!) {
        scoreSummary(rate: $rate) {
          message
        }
      }
    `,
    {
      variables: {
        rate: {
          rate: currentUser.gained
        }
      },
    }
  );

  const sumGained = (input: Array<any>): number => {
    if (input.length !== 0) {
      const reducer = (accumulator: any, currentValue: any) =>
        accumulator + parseFloat(currentValue.gained);
      return Math.ceil(input.reduce(reducer, 0) / input.length);
    }
    return 0;
  };

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
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      {!competitor ? (
        <>
          <Bullentin
            username={`${currentUser?.name}`}
            avatar={`${currentUser?.avatar}`}
            rate={currentUser?.gained !== undefined ? currentUser.gained : 0}
            rank={32}
            navigate={() => navigation.navigate("MY")}
          />
          <CompeteList
            data={mock}
            navigation={navigation}
            onDisPlay={() => {
              setCompetitor(true);
              hideHeader();
            }}
          />
        </>
      ) : (
        <Competitors
          data={route.params.name.label}
          goBack={() => {
            setCompetitor(false);
            navigation.setParams(undefined);
            showHeader();
          }}
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
