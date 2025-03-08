import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from ".";
import GalleryScreen from "./gallery";
import ProfileScreen from "./profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//MaterialTopTabNavigator чомусь не працює в IOS симуляторі
const Tab =
  Platform.OS == "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <>
      <View
        style={{ flexDirection: "row", marginTop: useSafeAreaInsets().top }}
      >
        <Image
          source={require("../../assets/images/politeh.png")}
          style={{ height: 40, width: 100 }}
          resizeMode="contain"
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            FirstMobileApp
          </Text>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#777",
          tabBarInactiveTintColor: "#ccc",
          tabBarStyle: { backgroundColor: "#eee" },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <View style={{ flexDirection: "row", justifyContent:'center' }}>
        <Text>Вандалович В`ячеслав ІПЗ-23-3</Text>
      </View>
    </>
  );
}
