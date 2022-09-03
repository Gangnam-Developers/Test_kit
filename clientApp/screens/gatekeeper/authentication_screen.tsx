import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Text,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { app_logos, Google, Kakao } from "../../components/icons/brand_logos";

const AuthenticateScreen = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaView style={style.safeViewArea}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View style={style.container} onLayout={onLayoutRootView}>
        <View style={{width: "100%", height: "60%", justifyContent: "center", alignItems:"center"}}>
          <Image style={{width: "100%", height: "60%", transform: [{scale: 0.9}]}} source={{uri: app_logos()}} />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            right: 9,
            left: 9,
            margin: "auto",
          }}
        >
          <View style={{ paddingBottom: 6, width: "100%" }}>
            <Pressable
              onPress={() => console.log("logged with kakao")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 15,
                paddingHorizontal: 6,
                backgroundColor: "rgb(255,228,0)",
                borderRadius: 9,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 25, height: 25, transform: [{translateX: -103}] }}
                  source={{ uri: Kakao() }}
                />
                <Text style={{ color: "black" }}>카카오로 시작하기</Text>
              </View>
            </Pressable>
          </View>
          <View style={{ width: "100%" }}>
            <Pressable
              onPress={() => console.log("logged with google")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 15,
                paddingHorizontal: 6,
                backgroundColor: "white",
                borderRadius: 9,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 25, height: 25, transform: [{translateX: -111}] }}
                  source={{ uri: Google() }}
                />
                <Text style={{ color: "black" }}>구글로 시작하기</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewArea: {
    color: "white",
    backgroundColor: "black",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  groupButton: {},
});

export default AuthenticateScreen;
