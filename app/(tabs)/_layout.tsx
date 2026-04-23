import { ROUTES } from "@/constants/routesName";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React, { useContext } from "react";

export default function TabLayout() {
  const { COLORS, theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.muted,
        },

        tabBarActiveTintColor: user.bgColor,
        tabBarInactiveTintColor: COLORS.muted,

        // optional: better spacing
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name={ROUTES.Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.Setting}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
