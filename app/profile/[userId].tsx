import { Button } from "@/components/Button";
import GenerateUserLogo from "@/components/GenerateUserLogo";
import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { deleteProfile } from "@/utils/profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const normalizedId = Array.isArray(userId) ? userId[0] : userId;
  const {
    profiles,
    user: currUser,
    deleteProfile: deleteFromState,
  } = useContext(UserContext);
  const user = profiles.find((p) => p.userId === normalizedId);

  const handleDeleteProfile = async (profileId: string) => {
    try {
      deleteFromState(profileId);
      await deleteProfile(profileId);
      router.replace(`/${ROUTES.Home}`);
    } catch (error: any) {
      console.log("error while delete profile", error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.headerInnerConatiner}>
          <View>
            <Text style={styles.profileText}>
              {PLAINTEXT.home.profileDeatils}
            </Text>
            <View style={styles.profilesDetailsConatiner}>
              <View style={styles.dotAndProfilesCount}>
                <Text style={styles.profileCountText}>{user?.fullName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.backArrow}>
            <TouchableOpacity
              onPress={() => router.push(`/${ROUTES.Tabs}/${ROUTES.Home}`)}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.userDetails}>
          <GenerateUserLogo
            bgColor={user?.bgColor || COLORS.primary}
            fullName={user?.fullName || ""}
            layoutSize={110}
            fontSize={40}
          />
          <Text style={styles.profileText}>{user?.fullName}</Text>
        </View>
        <View style={styles.userDetailsAndActionConatiner}>
          <View style={styles.userDetailsFieldsConatiner}>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Full Name</Text>
              <Text style={styles.field}>{user?.fullName}</Text>
            </View>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Age</Text>
              <Text style={styles.field}>{user?.age}</Text>
            </View>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Role</Text>
              <Text style={styles.field}>{user?.profession}</Text>
            </View>
            <View style={[styles.userDetailsFiedls, { borderBottomWidth: 0 }]}>
              <Text style={styles.fieldName}>Profile Id</Text>
              <Text style={styles.field}>#{user?.userId}</Text>
            </View>
          </View>
          {(currUser?.role === "ADMIN" || currUser.userId === normalizedId) && (
            <>
              <Button
                style={{ backgroundColor: currUser.bgColor || COLORS.primary }}
                onPress={() =>
                  router.push({
                    pathname: `/${ROUTES.EdtiProfile}`,
                    params: { userId: normalizedId },
                  })
                }
              >
                {PLAINTEXT.singleProfile.editBtn}
              </Button>
              <Button
                isDanger
                onPress={() => handleDeleteProfile(normalizedId)}
              >
                {PLAINTEXT.singleProfile.deleteBtn}
              </Button>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
  profileCountText: {
    color: COLORS.muted,
  },
  headerInnerConatiner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    width: "100%",
  },
  mainContainer: {
    padding: 25,
    marginTop: 20,
    gap: 17,
  },
  userDetails: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  userDetailsAndActionConatiner: {
    gap: 20,
  },
  userDetailsFieldsConatiner: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    justifyContent: "center",
    paddingVertical: 8,
  },
  userDetailsFiedls: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
    padding: 17,
  },
  fieldName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B0B0B0",
  },
  field: {
    fontSize: 15,
    fontWeight: "bold",
  },
  backArrow: {
    position: "absolute",
    top: 19,
    left: 2,
  },
});
