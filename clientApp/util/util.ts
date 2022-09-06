import { ItemsProps } from "../components/main/rank_comp/rank.list";

class Util {
  static statical = (data: Array<any>) => {
    if (data.length !== 0) {
      const first_attempt =
        100 *
        (data.filter((el) => el.attempts.attempt_count === 1).length /
          data.length);
      const second_attempt =
        100 *
        (data.filter((el) => el.attempts.attempt_count === 2).length /
          data.length);

      const failed_attempt = 100 - (first_attempt + second_attempt);

      return {
        first_attempt: first_attempt,
        second_attempt: second_attempt,
        failed_attempt: failed_attempt,
      };
    }
    return {
      first_attempt: 0,
      second_attempt: 0,
      failed_attempt: 0,
    };
  };

  static sumGained = (input: Array<any>): number => {
    if (input.length !== 0) {
      const reducer = (accumulator: any, currentValue: any) =>
        accumulator + parseFloat(currentValue.gained);
      return Math.ceil(input.reduce(reducer, 0) / input.length);
    }
    return 0;
  };

  static handleCompetitors = (data: Array<any>) => {
    if (data.length !== 0 && data !== undefined) {
      return data.map<ItemsProps>((el: any, index: number) => {
        const data = {
          rank: {
            digit: index + 1,
            color: "#C0C6D7",
          },
          avatar: el.picture,
          name: {
            label: el.name,
            color: "#C0C6D7",
          },
          rate: {
            digit: el.rate,
            color: "#C0C6D7",
          },
        };

        if (index === 0) {
          return {
            ...data,
            rank: {
              ...data.rank,
              color: "#52dba6",
            },
            name: {
              ...data.name,
              color: "#52dba6",
            },
            rate: {
              ...data.rate,
              color: "#52dba6",
            },
          };
        }

        if (index === 1) {
          return {
            ...data,
            rank: {
              ...data.rank,
              color: "yellow",
            },
            name: {
              ...data.name,
              color: "yellow",
            },
            rate: {
              ...data.rate,
              color: "yellow",
            },
          };
        }

        if (index === 2) {
          return {
            ...data,
            rank: {
              ...data.rank,
              color: "#FC7CF5",
            },
            name: {
              ...data.name,
              color: "#FC7CF5",
            },
            rate: {
              ...data.rate,
              color: "#FC7CF5",
            },
          };
        }

        return data;
      });
    }
    return {};
  };
}

export { Util };
