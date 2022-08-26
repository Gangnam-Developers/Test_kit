import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import My from "./my/my";
import Quizz from "./quizz/quiz";
import Ranking from "./rank/ranking";

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
          justifyContent: "center",
          marginHorizontal: 28,
          marginVertical: 9,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowRadius: 3,
          shadowOffset: {
            width: 3,
            height: 3,
          },
        },
        tabBarStyle: {
          height: 90,
          backgroundColor: "rgb(63,68,92)",
          alignItems: "center",
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "rgb(38, 42, 57)",
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          borderBottomWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="RANK"
        component={Ranking}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "#52dba6",
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="QUIZ"
        component={Quizz}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "#52dba6",
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
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
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeScreen;
