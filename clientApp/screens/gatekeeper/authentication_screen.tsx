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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app_logos, Google, Kakao } from "../../components/icons/brand_logos";
import * as WebBrowser from "expo-web-browser";
import * as google from "expo-auth-session/providers/google";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALL_BACK,
  BASE_URL,
} from "react-native-dotenv";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const KakaoLogin = () => {
  return (
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
            style={{
              width: 25,
              height: 25,
              transform: [{ translateX: -103 }],
            }}
            source={{ uri: Kakao() }}
          />
          <Text style={{ color: "black" }}>카카오로 시작하기</Text>
        </View>
      </Pressable>
    </View>
  );
};

const GoogleLogin = ({ action }: { action: Function }) => {
  const [request, response, promptAsync] = google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_CALL_BACK,
  });

  const Authorize = async (authentication: any) => {
    let jwt_token = await axios.post(
      `${BASE_URL}`,
      {
        query: `mutation auth($access_token: String!){
         auth(access_token: $access_token){
            access_token
         }
      }`,
        variables: {
          access_token: authentication.accessToken,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return jwt_token;
  };

  React.useMemo(async () => {
    if (response?.type === "success") {
      const { authentication } = response;

      if (authentication !== undefined) {
        const reponse = await Authorize(authentication);

        console.log(reponse.data.data.auth.access_token)

        try {
          await AsyncStorage.setItem(
            "access_token",
            reponse.data.data.auth.access_token
          )
            .then(() => action())
        } catch (error) {
          console.warn(error);
        }
      }
    }
  }, [response]);

  return (
    <View style={{ width: "100%" }}>
      <Pressable
        onPress={() => promptAsync()}
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
            style={{
              width: 25,
              height: 25,
              transform: [{ translateX: -111 }],
            }}
            source={{ uri: Google() }}
          />
          <Text style={{ color: "black" }}>구글로 시작하기</Text>
        </View>
      </Pressable>
    </View>
  );
};

const AuthenticateScreen = ({ action }: { action: Function }) => {
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
        <View
          style={{
            width: "100%",
            height: "60%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "60%",
              transform: [{ scale: 0.9 }],
            }}
            source={{ uri: app_logos() }}
          />
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
          <KakaoLogin />
          <GoogleLogin action={() => action()} />
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
