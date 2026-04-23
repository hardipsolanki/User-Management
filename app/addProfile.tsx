import AddProfileForm from "@/components/AddProfileForm";
import { COLORS } from "@/constants/color";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddProfileForm />
    </SafeAreaView>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
});
