import { Button } from "@/components/Button";
import ProfileCart from "@/components/ProfileCart";
import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const { user, profiles } = useContext(UserContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileText}>{PLAINTEXT.home.profiles}</Text>
        <View style={styles.profilesDetailsConatiner}>
          <View style={styles.dotAndProfilesCount}>
            <Text style={styles.profileCountText}>
              {profiles?.length} {PLAINTEXT.home.profiles}
            </Text>
            <Text style={styles.dot}>.</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainConatiner}>
        {user.role === "ADMIN" && (
          <Button onPress={() => router.push(`/${ROUTES.AddProfile}`)}>
            {PLAINTEXT.home.addProfileBtn}
          </Button>
        )}
        <Text style={styles.userText}>{PLAINTEXT.home.Users}</Text>
        <View style={styles.profilesRenderConatiner}>
          <FlatList
            data={profiles}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: `/${ROUTES.SingleUset}`,
                  params: { userId: item.userId },
                }}
              >
                <ProfileCart
                  fullName={item.fullName}
                  age={item?.age}
                  profession={item.profession}
                  bgColor={item.bgColor}
                />
              </Link>
            )}
            keyExtractor={(item) => item.userId}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
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
