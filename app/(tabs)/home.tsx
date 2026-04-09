import { Button } from "@/components/Button";
import ProfileCart from "@/components/ProfileCart";
import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { AdminContext } from "@/context/AdminContext";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileText}>{PLAINTEXT.home.profiles}</Text>
        <View style={styles.profilesDetailsConatiner}>
          <View style={styles.dotAndProfilesCount}>
            <Text style={styles.profileCountText}>3 Profiles</Text>
            <Text style={styles.dot}>.</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainConatiner}>
        {isAdmin && (
          <Button onPress={() => router.push(`/${ROUTES.AddProfile}`)}>
            Add New Profile
          </Button>
        )}
        <Text style={styles.userText}>{PLAINTEXT.home.Users}</Text>
        <View style={styles.profilesRenderConatiner}>
          <Link
            href={{ pathname: `/${ROUTES.SingleUset}`, params: { userId: 1 } }}
          >
            <ProfileCart />
          </Link>
          <ProfileCart />
          <ProfileCart />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingBottom: 20,
  },
  profileHeader: {
    backgroundColor: COLORS.card,
    padding: 14,
    paddingHorizontal: 30,
  },
  profileText: {
    fontSize: 29,
    fontWeight: "bold",
  },
  profilesDetailsConatiner: {
    flexDirection: "row",
    gap: 8,
    color: COLORS.text,
  },
  dotAndProfilesCount: {
    height: "100%",
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    position: "relative",
    top: -6,
    color: COLORS.muted,
  },
  profileCountText: {
    color: COLORS.muted,
  },
  mainConatiner: {
    padding: 25,
  },
  profilesRenderConatiner: {
    marginTop: 20,
    gap: 20,
  },
  userText: {
    color: COLORS.muted,
    fontSize: 25,
    fontWeight: "400",
    marginTop: 20,
  },
});
