import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import {
  AppColors,
  Radius,
  Shadow,
} from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor:
          AppColors.primary,

        tabBarInactiveTintColor:
          AppColors.textSecondary,

        tabBarStyle: {
          position: "absolute",

          left: 16,
          right: 16,
          bottom: 18,

          height: 72,

          borderRadius: Radius.xl,

          backgroundColor:
            AppColors.card,

          borderTopWidth: 0,

          ...Shadow.card,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },

        tabBarIconStyle: {
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: "Post",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
            <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="compass"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
  name="profile"
  options={{
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="person-circle-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>
    </Tabs>
  );
}