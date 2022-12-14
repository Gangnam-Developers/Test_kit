import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { EmptyAvartar } from "../../icons/app_icons";

interface HeaderProps {
  avatar?: string;
  title?: {
    label: string;
  };
  currentUser: boolean;
  competitorBoard: boolean;
  infoBoard?: {
    rank: number;
    quizzes: number | undefined;
  };
  navigate: Function;
  logout: Function;
}

const Header = ({ ...props }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <>
          {!props.currentUser && (
            <View
              style={{
                flex: 0,
                paddingHorizontal: 9,
              }}
            >
              <TouchableOpacity onPress={() => props.navigate()}>
                <Ionicons name="chevron-back-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={
              props.currentUser
                ? styles.topHeader
                : { ...styles.topHeader, justifyContent: "center", flex: 0.9 }
            }
          >
            {props.currentUser && (
              <Image
                style={{
                  borderRadius: 30,
                }}
                source={{
                  height: 40,
                  width: 40,
                  uri:
                    props.avatar !== undefined ? props.avatar : EmptyAvartar(),
                }}
              />
            )}
            <Text
              style={{
                color: props.currentUser ? "#52dba6" : "white",
                fontSize: props.currentUser ? 33 : 22,
                fontWeight: props.currentUser ? "600" : "400",
                marginHorizontal: 12,
              }}
            >
              {props.title?.label}
            </Text>
          </View>
          {props.currentUser && (
            <View
              style={{
                flex: 0.25,
              }}
            >
              <TouchableOpacity onPress={() => props.logout()}>
                <Text style={{ textAlign: "center", color: "white" }}>
                  ????????????
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      </View>
      <View style={styles.infoBoard}>
        {props.competitorBoard && (
          <View style={{
            flex: 0.6,
            transform: [{
              translateX: 24
            }, {
              translateY: -2
            }]
          }}>
            <Image
              style={{
                borderRadius: 35,
              }}
              source={{
                height: 70,
                width: 70,
                uri: props.avatar !== undefined ? props.avatar : EmptyAvartar(),
              }}
            />
          </View>
        )}
        <View
          style={{
            flex: 0.5,
            paddingHorizontal: 33,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            RANK
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: "#52dba6",
              fontWeight: "600",
            }}
          >
            {props.infoBoard?.rank}
          </Text>
        </View>
        <View
          style={{
            width: 2,
            height: 54,
            backgroundColor: "rgba(35, 36, 38, 0.746)",
            transform: [
              {
                translateY: 8,
              },
            ],
          }}
        ></View>
        <View
          style={{
            flex: 0.5,
            paddingHorizontal: 33,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            ??? ?????? ??????
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: "#52dba6",
              fontWeight: "600",
            }}
          >
            {props.infoBoard?.quizzes}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: "rgb(63, 68, 92)",
    paddingVertical: 18,
  },
  topHeader: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 18,
    flex: 0.9,
  },
  infoBoard: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginTop: 9,
    // height: 170,
    paddingVertical: 22,
  },
});

export { Header };
