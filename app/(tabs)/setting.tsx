import { Button } from "@/components/Button";
import GenerateUserLogo from "@/components/GenerateUserLogo";
import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const setting = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");

      return router.push(`/${ROUTES.Login}`);
    } catch (error) {
      console.error("Error fetching logged-in user data:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.settingText}>{PLAINTEXT.setting.setting}</Text>
        <Text style={styles.settingBioText}>{PLAINTEXT.setting.text}</Text>
      </View>
      <View style={styles.userDetails}>
        <View style={styles.logoAndUserTextCoantiner}>
          <GenerateUserLogo
            bgColor={user.bgColor ? user.bgColor : COLORS.primary}
            fullName={user.fullName}
            layoutSize={80}
            fontSize={30}
          />
          <View style={styles.userDetailsConatiner}>
            <Text style={styles.userName}>{user.fullName}</Text>
            {/* <View style={styles.dotAndProfilesCount}> */}
            <Text style={styles.profileCountText}>{user.email}</Text>
            {/* </View> */}
          </View>
        </View>
      </View>
      {user.role !== "ADMIN" && (
        <View style={styles.account}>
          <Text style={styles.headingTwo}>
            {PLAINTEXT.setting.account.account}
          </Text>
          <View style={styles.innerSectionContainer}>
            <Link
              href={{
                pathname: `/${ROUTES.EdtiProfile}`,
                params: { userId: user.userId },
              }}
            >
              <View style={styles.innerIconAndTextContainer}>
                <View style={styles.innerTextConatiner}>
                  <Ionicons name="person-circle" size={24} color="black" />
                  <Text>{PLAINTEXT.setting.account.editProfile}</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color={COLORS.muted} />
              </View>
            </Link>
            <Link
              href={{
                pathname: `/${ROUTES.ChangePassword}`,
                params: { userId: user.userId },
              }}
            >
              <View
                style={[
                  styles.innerIconAndTextContainer,
                  { borderBottomWidth: 0 },
                ]}
              >
                <View style={styles.innerTextConatiner}>
                  <Ionicons name="lock-closed" size={24} color="black" />
                  <Text>{PLAINTEXT.setting.account.changePassword}</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color={COLORS.muted} />
              </View>
            </Link>
          </View>
        </View>
      )}
      <View style={styles.account}>
        <Text style={styles.headingTwo}>
          {PLAINTEXT.setting.appInfo.apInfo}
        </Text>
        <View style={styles.innerSectionContainer}>
          <View style={styles.innerIconAndTextContainer}>
            <View style={styles.innerTextConatiner}>
              <Ionicons name="information-circle" size={24} color="black" />
              <Text>{PLAINTEXT.setting.appInfo.version}</Text>
            </View>
            <Text style={styles.settingBioText}>1.0.0</Text>
          </View>
          <View
            style={[styles.innerIconAndTextContainer, { borderBottomWidth: 0 }]}
          >
            <View style={styles.innerTextConatiner}>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color="black"
              />
              <Text>{PLAINTEXT.setting.appInfo.pricacyPolicy}</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.muted} />
          </View>
        </View>
      </View>
      <View style={styles.logOutBtnConatiner}>
        <Button
          onPress={logoutHandler}
          style={{ backgroundColor: user.bgColor }}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
  },
  settingText: {
    fontSize: 29,
    fontWeight: "bold",
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
    flexDirection: "row",
    gap: 7,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  profileCountText: {
    color: COLORS.muted,
  },
  userDetailsConatiner: {
    gap: 2,
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  innerSectionContainer: {
    marginTop: 10,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  innerTextConatiner: {
    flexDirection: "row",
    gap: 10,
  },
  innerIconAndTextContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  logOutBtnConatiner: {
    marginTop: 30,
  },
});
