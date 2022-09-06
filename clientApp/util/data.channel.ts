import React from "react";

interface RankChannelProps {
  currentUserData: any;
  competitorsData: any;
  rank: {
    currentUser: number;
  };
}

const RankChannel = React.createContext<RankChannelProps>({
  currentUserData: {},
  competitorsData: null,
  rank: {
    currentUser: 0,
  },
});

export { RankChannel };
