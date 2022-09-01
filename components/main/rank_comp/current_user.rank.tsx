import React from "react";
import { Image, StyleSheet, View, Text, Touchable, TouchableOpacity } from "react-native";
import { EmptyAvartar } from "../../icons/app_icons";

interface Props {
  avatar?: string | any;
  username?: string;
  rate?: number;
  rank?: number;
  navigate: Function
}
const Bullentin = (props: Props) => {
  const { avatar, username, rate, rank, navigate } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate()}>
      <View style={styles.avatar}>
        <Image
          style={{
            borderRadius: 50,
          }}
          source={{
            height: 100,
            width: 100,
            uri: avatar !== undefined ? avatar : EmptyAvartar(),
          }}
        />
        <View style={styles.user}>
          <Text
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "600",
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: "white",
              fontWeight: "600",
              marginVertical: 2,
            }}
          >
            {rate}%
          </Text>
        </View>
      </View>
      <View
        style={{
          ...styles.user,
          display: "flex",
          justifyContent: "center",
          marginHorizontal: 60,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "#52dba6",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          RANK
        </Text>
        <Text
          style={{
            fontSize: 40,
            color: "#52dba6",
            fontWeight: "600",
            marginVertical: 2,
            textAlign: "center",
          }}
        >
          {rank}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 140,
    backgroundColor: "rgb(63, 68, 92)",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  user: {
    marginHorizontal: 30,
    marginVertical: 9,
  },
});

export { Bullentin };
