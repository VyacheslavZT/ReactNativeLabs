import "react-native-reanimated";

import { LogLevel, OneSignal } from "react-native-onesignal";
import React from "react";
import HomeScreen, { load } from "./HomeScreen";
import { PermissionsAndroid, Platform } from "react-native";

export const APP_ID = "645d4666-66cb-4310-b7cd-ea853afd6538";
export const API_KEY = "os_v2_app_mroumztgznbrbn6n5kctv7lfhc6hq7k7pece3xvfpna62qqn3znw3oc5pvwbusg5akhqworfi4ctmt7lllpmn5l7zpfqdt3w2cfu6vq"


export default function RootLayout() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(APP_ID);
  OneSignal.Notifications.requestPermission(true)
    .then((event) => {
      console.log("permission:", event);
    })
    .catch((error) => {
      console.log("permission error:", error);
    });
  OneSignal.login("ipz233_vvv");
  OneSignal.User.pushSubscription.optIn();

  requestNotificationPermission();
  load();

  OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
    event.preventDefault();
    event.notification.display();
  });

  return <HomeScreen />;
}

const requestNotificationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS")
        .then((response) => {
          if (!response) {
            PermissionsAndroid.request(
              "android.permission.POST_NOTIFICATIONS",
              {
                title: "Notification",
                message:
                  "App needs access to your notification " +
                  "so you can get Updates",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
              }
            );
          }
        })
        .catch((err) => {
          console.log("Notification Error=====>", err);
        });
    } catch (err) {
      console.log(err);
    }
  }
};

