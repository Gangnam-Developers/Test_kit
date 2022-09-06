import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { ReactNode } from "react";
import { RankChannel } from "../../util/data.channel";
import { Util } from "../../util/util";
import { ItemsProps } from "../main/rank_comp/rank.list";

const DataChannelHOC = ({ children }: { children: ReactNode }) => {
  const context = React.useContext(RankChannel);

  const [rate, setRate] = React.useState(0);

  const [competitors, setCompetitors] = React.useState<any>();

  const [rawDataCompetitors, setRawDataCompetitor] = React.useState<any>();

  const {} = useQuery(
    gql`
      query {
        getCurrentUser {
          name
          picture
          quizzes
          rate
        }
        getCompetitors {
          name
          picture
          quizzes
          rate
        }
      }
    `,
    {
      onCompleted(data) {
        if (data !== undefined) {
          context.currentUserData = {
            avatar: data.getCurrentUser.picture,
            name: data.getCurrentUser.name,
            quizzes: data.getCurrentUser.quizzes,
          };

          setRawDataCompetitor(data.getCompetitors)

          setRate(Util.sumGained(data.getCurrentUser.quizzes));

          setCompetitors(Util.handleCompetitors(data.getCompetitors));

          getAction();
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
          rate: rate,
        },
      },
    }
  );

  useMemo(() => {
    if (competitors !== undefined) {
      context.competitorsData = {
        raw: rawDataCompetitors,
        brief: competitors
      };
      context.rank.currentUser =
        competitors.findIndex(
          (el: { name: { label: string | undefined } }) =>
            el.name.label === context.currentUserData.name
        ) + 1;
    }
  }, [competitors]);

  return <>{children}</>;
};
export { DataChannelHOC };
