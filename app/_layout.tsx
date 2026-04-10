import { ROUTES } from "@/constants/routesName";
import AppProvider from "@/context/Provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack>
          <Stack.Screen name={ROUTES.Index} options={{ headerShown: false }} />
          <Stack.Screen name={ROUTES.Login} options={{ headerShown: false }} />
          <Stack.Screen name={ROUTES.Tabs} options={{ headerShown: false }} />
          <Stack.Screen
            name={ROUTES.AddProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.EdtiProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.SingleUset}
            options={{ headerShown: false }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
