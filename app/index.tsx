import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
          router.replace(`/${ROUTES.Login}`);
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    })();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileText}>Profile</Text>
        <View>
          <Text>3 Profile</Text>
          <Text>1 Active</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  profileHeader: {
    // height: 60,
    backgroundColor: COLORS.card,
    padding: 14,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
