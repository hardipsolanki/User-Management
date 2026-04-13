import { Button } from "@/components/Button";
import ProfileCart from "@/components/ProfileCart";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Index = () => {
  const { user, profiles } = useContext(UserContext);
  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        {user.role === "ADMIN" ? (
          <Text style={styles.profileText}>{PLAINTEXT.home.profiles}</Text>
        ) : (
          <Text style={[styles.profileText, { textAlign: "center" }]}>
            {user.fullName}
          </Text>
        )}

        <View style={styles.profilesDetailsConatiner}>
          <View style={styles.dotAndProfilesCount}>
            {user.role === "ADMIN" ? (
              <Text style={styles.profileCountText}>
                {profiles?.length} {PLAINTEXT.home.profiles}
              </Text>
            ) : (
              <Text
                style={[
                  styles.profileCountText,
                  { textAlign: "center", width: "100%" },
                ]}
              >
                {user.email}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.mainConatiner}>
        {user?.role === "ADMIN" && (
          <Button onPress={() => router.push(`/${ROUTES.AddProfile}`)}>
            {PLAINTEXT.home.addProfileBtn}
          </Button>
        )}

        <Text style={styles.userText}>{PLAINTEXT.home.Users}</Text>

        <View style={styles.profilesRenderConatiner}>
          <FlatList
            data={profiles.filter((p) => p.email !== user?.email) || []}
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
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    profileHeader: {
      backgroundColor: COLORS.card,
      padding: 14,
      paddingHorizontal: 30,
    },

    profileText: {
      fontSize: 29,
      fontWeight: "bold",
      color: COLORS.text,
    },

    profilesDetailsConatiner: {
      flexDirection: "row",
    },

    dotAndProfilesCount: {
      flexDirection: "row",
      gap: 7,
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
      flex: 1,
      padding: 25,
      paddingTop: 0,
      paddingBottom: 0,
    },

    profilesRenderConatiner: {
      flex: 1,
      marginTop: 20,
    },

    userText: {
      color: COLORS.muted,
      fontSize: 25,
      fontWeight: "400",
      marginTop: 20,
    },
  });
