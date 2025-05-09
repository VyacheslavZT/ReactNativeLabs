import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { IconMessageCircle, IconShield, IconShoppingBag, IconUser } from 'tabler-icons-react-native';
import { useColors } from '@/hooks/useThemeColor';
import HomeScreen from '.';
import ExploreScreen from './explore';
import ChatScreen from './chat';
import SecurityScreen from './security';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colors = useColors();

  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.tabIconSelected,
          tabBarInactiveTintColor: colors.tabIconDefault,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: colors.tabBackground },
        }}
      >
        <Tab.Screen
          name="Index"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <IconShoppingBag size={28} color={color} />, 
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color }) => <IconUser size={28} color={color} />, 
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color }) => <IconMessageCircle size={28} color={color} />, 
          }}
        />
        <Tab.Screen
          name="Security"
          component={SecurityScreen}
          options={{
            tabBarIcon: ({ color }) => <IconShield size={28} color={color} />, 
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ width: 28, height: 28, borderRadius: 100, backgroundColor: color }} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
