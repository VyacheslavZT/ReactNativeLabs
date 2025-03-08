import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from ".";
import GalleryScreen from "./gallery";
import ProfileScreen from "./profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarIndicator } from "react-native-tab-view";
import {
  IconHome,
  IconPhoto,
  IconUser,
  TablerIcon,
  TablerIconsProps,
} from "tabler-icons-react-native";
//MaterialTopTabNavigator чомусь не працює в IOS симуляторі
const Tab =
  Platform.OS == "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default function TabLayout() {
  function IconGallery(props: TablerIconsProps): Element {
    throw new Error("Function not implemented.");
  }

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
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "#eee" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <FocusableIcon name="Home" icon={IconHome} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <FocusableIcon
                name="Gallery"
                icon={IconPhoto}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <FocusableIcon name="Profile" icon={IconUser} focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: useSafeAreaInsets().bottom,
        }}
      >
        <Text>Вандалович В`ячеслав ІПЗ-23-3</Text>
      </View>
    </>
  );
}

interface IFocusableIconProps {
  icon: TablerIcon;
  focused: boolean;
  name: string;
}

export function FocusableIcon(props: IFocusableIconProps) {
  const itemsColor = props.focused ? "#666" : "#aaa";

  return (
    <View
      style={{
        flex: 1,
        margin: -8,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <props.icon size={25} {...props} color={itemsColor} />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 10,
          color: itemsColor,
        }}
      >
        {props.name}
      </Text>
    </View>
  );
}
