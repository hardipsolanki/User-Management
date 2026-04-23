import AddProfileForm from "@/components/AddProfileForm";
import { COLORS } from "@/constants/color";
import { UserContext } from "@/context/UserContext";
import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const editProfile = () => {
  const { userId } = useLocalSearchParams();
  const normalizedId = Array.isArray(userId) ? userId[0] : userId;
  const { profiles } = useContext(UserContext);
  const user = profiles.find((p) => p.userId === normalizedId);

  return (
    <SafeAreaView style={styles.container}>
      <AddProfileForm user={user} />
    </SafeAreaView>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
});
