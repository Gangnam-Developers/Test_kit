import AntDesign from "@expo/vector-icons/build/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { My, Quizz, QuizzCreate, Ranking } from "./partial";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="QUIZ"
      screenOptions={{
        tabBarActiveBackgroundColor: "rgb(39,44,59)",
        tabBarActiveTintColor: "#52dba6",
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontWeight: "900",
          fontSize: 18,
        },
        tabBarItemStyle: {
          borderRadius: 9,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 26,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowRadius: 3,
          shadowOffset: {
            width: 3,
            height: 3,
          },
        },
        tabBarStyle: {
          display: "flex",
          flexDirection: "row",
          height: "12%",
          backgroundColor: "rgb(63,68,92)",
          alignItems: "center",
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "transparent"
        }
      }}
    >
      <Tab.Screen
        name="RANK"
        component={Ranking}
        options={{
          headerTitle: "RANKING",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "#52dba6",
            fontSize: 30,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 90,
            backgroundColor: "rgb(63, 68, 92)",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name="QUIZ"
        component={Quizz}
        options={({ navigation }) => ({
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "#52dba6",
            fontSize: 30,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 90,
            backgroundColor: "rgb(38, 42, 57)",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={style.addQuizz}
                onPress={() => navigation.navigate("퀴즈 만들기")}
              >
                <AntDesign
                  style={{ alignItems: "center", marginRight: 6 }}
                  name="plus"
                  size={16}
                  color="rgb(255,228,0)"
                />
                <Text style={style.addQuizzText}>문제 추가</Text>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="MY"
        component={My}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "#52dba6",
            fontSize: 30,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 90,
            backgroundColor: "rgb(63, 68, 92)",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: false
        }}
      />
      <Tab.Screen
        name="퀴즈 만들기"
        component={QuizzCreate}
        options={({ navigation }) => ({
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("QUIZ")}>
                <Text style={{color: "gray", marginHorizontal: 18}}>취소</Text>
              </TouchableOpacity>
            )
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
          },
          headerStyle: {
            height: 90,
            backgroundColor: "rgb(63, 68, 92)",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
          },
        })}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  addQuizz: {
    backgroundColor: "rgb(54, 59, 79)",
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginHorizontal: 14,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  addQuizzText: {
    color: "rgb(255,228,0)",
    fontSize: 14.33,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
