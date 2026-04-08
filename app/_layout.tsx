import { ROUTES } from "@/constants/routesName";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name={ROUTES.Login} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.Index} options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
