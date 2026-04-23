import { Button } from "@/components/Button";
import GenerateUserLogo from "@/components/GenerateUserLogo";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { Color } from "@/types/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const setting = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { COLORS, theme, toggleTheme } = useContext(ThemeContext);
  const styles = createStyles(COLORS);
  const appVersion = Constants.expoConfig?.version;

  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      return router.replace(`/${ROUTES.Login}`);
    } catch (error) {
      console.error("Error fetching logged-in user data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.settingText}>{PLAINTEXT.setting.setting}</Text>
        <Text style={styles.settingBioText}>{PLAINTEXT.setting.text}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User */}
        <View style={styles.userDetails}>
          <View style={styles.logoAndUserTextCoantiner}>
            <GenerateUserLogo
              bgColor={user?.bgColor || COLORS.primary}
              fullName={user?.fullName || ""}
              layoutSize={80}
              fontSize={30}
            />
            <View style={styles.userDetailsConatiner}>
              <Text style={styles.userName}>{user?.fullName}</Text>
              <Text style={styles.profileCountText}>{user?.email}</Text>
            </View>
          </View>
        </View>
        {/* Account */}
        {user?.role !== "ADMIN" && (
          <View style={styles.account}>
            <Text style={styles.headingTwo}>
              {PLAINTEXT.setting.account.account}
            </Text>

            <View style={styles.innerSectionContainer}>
              <Link
                href={{
                  pathname: `/${ROUTES.EdtiProfile}`,
                  params: { userId: user?.userId },
                }}
              >
                <View style={styles.innerIconAndTextContainer}>
                  <View style={styles.innerTextConatiner}>
                    <Ionicons
                      name="person-circle"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.itemText}>
                      {PLAINTEXT.setting.account.editProfile}
                    </Text>
                  </View>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={COLORS.muted}
                  />
                </View>
              </Link>

              <Link
                href={{
                  pathname: `/${ROUTES.ChangePassword}`,
                  params: { userId: user?.userId },
                }}
              >
                <View
                  style={[
                    styles.innerIconAndTextContainer,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View style={styles.innerTextConatiner}>
                    <Ionicons
                      name="lock-closed"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.itemText}>
                      {PLAINTEXT.setting.account.changePassword}
                    </Text>
                  </View>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={COLORS.muted}
                  />
                </View>
              </Link>
            </View>
          </View>
        )}

        {/* App Info */}
        <View style={styles.account}>
          <Text style={styles.headingTwo}>
            {PLAINTEXT.setting.appInfo.apInfo}
          </Text>

          <View style={styles.innerSectionContainer}>
            <View style={styles.innerIconAndTextContainer}>
              <View style={styles.innerTextConatiner}>
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={COLORS.text}
                />
                <Text style={styles.itemText}>
                  {PLAINTEXT.setting.appInfo.version}
                </Text>
              </View>
              <Text style={styles.settingBioText}>{appVersion}</Text>
            </View>

            <View
              style={[
                styles.innerIconAndTextContainer,
                { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.innerTextConatiner}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color={COLORS.text}
                />
                <Text style={styles.itemText}>
                  {PLAINTEXT.setting.appInfo.pricacyPolicy}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color={COLORS.muted} />
            </View>
          </View>
        </View>
        {/* Theme */}
        <View style={styles.account}>
          <Text style={styles.headingTwo}>Appearance</Text>

          <View style={styles.innerSectionContainer}>
            <View
              style={[
                styles.innerIconAndTextContainer,
                { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.innerTextConatiner}>
                <Ionicons
                  name={theme === "dark" ? "moon" : "sunny"}
                  size={24}
                  color={COLORS.text}
                />
                <Text style={styles.itemText}>
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </Text>
              </View>

              {/* ✅ Toggle Switch */}
              <Switch
                value={theme === "dark"} // ON when dark
                onValueChange={toggleTheme}
                thumbColor={theme === "dark" ? COLORS.primary : "#f4f3f4"}
                trackColor={{
                  false: "#ccc",
                  true: COLORS.primary,
                }}
              />
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logOutBtnConatiner}>
          <Button
            onPress={logoutHandler}
            style={{ backgroundColor: user?.bgColor }}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default setting;
const createStyles = (COLORS: Color) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: 25,
    },

    settingText: {
      fontSize: 29,
      fontWeight: "bold",
      color: COLORS.text,
    },

    settingBioText: {
      color: COLORS.muted,
    },

    logoAndUserTextCoantiner: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },

    userName: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.text,
    },

    itemText: {
      color: COLORS.text,
    },

    profileCountText: {
      color: COLORS.muted,
    },

    userDetailsConatiner: {
      gap: 2,
    },

    userDetails: {
      flexDirection: "row",
      padding: 14,
      alignItems: "center",
      backgroundColor: COLORS.card,
      borderRadius: 20,
      marginTop: 30,
    },

    account: {
      marginTop: 20,
    },

    headingTwo: {
      fontSize: 17,
      fontWeight: "bold",
      color: COLORS.text,
    },

    innerSectionContainer: {
      marginTop: 10,
      backgroundColor: COLORS.card,
      borderRadius: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: COLORS.muted,
      width: "100%",
    },

    innerTextConatiner: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },

    innerIconAndTextContainer: {
      width: "100%",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.muted,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    switchText: {
      color: COLORS.primary,
      fontWeight: "bold",
    },

    logOutBtnConatiner: {
      marginTop: 30,
    },
  });
