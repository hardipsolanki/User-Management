import { Button } from "@/components/Button";
import GenerateUserLogo from "@/components/GenerateUserLogo";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { deleteProfile } from "@/utils/profile";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

  const user = profiles.find((p) => p.userId === normalizedId);

  const handleDeleteProfile = async (profileId: string) => {
    try {
      router.replace(`/${ROUTES.Home}`);
      deleteFromState(profileId);
      await deleteProfile(profileId);
    } catch (error: any) {
      console.log("error while delete profile", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <View style={styles.headerInnerConatiner}>
          <View style={styles.backArrowAndProfileText}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.text} />
            </TouchableOpacity>

            <View>
              <Text style={styles.profileText}>
                {PLAINTEXT.home.profileDeatils}
              </Text>

              <View style={styles.profilesDetailsConatiner}>
                <Text style={styles.profileCountText}>{user?.fullName}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.mainConatiner}>
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
                <Text style={styles.fieldName}>Email</Text>
                <Text style={styles.field}>{user?.email}</Text>
              </View>

              <View style={styles.userDetailsFiedls}>
                <Text style={styles.fieldName}>Age</Text>
                <Text style={styles.field}>{user?.age}</Text>
              </View>

              <View style={styles.userDetailsFiedls}>
                <Text style={styles.fieldName}>Role</Text>
                <Text style={styles.field}>{user?.profession}</Text>
              </View>

              <View
                style={[styles.userDetailsFiedls, { borderBottomWidth: 0 }]}
              >
                <Text style={styles.fieldName}>Profile Id</Text>
                <Text style={styles.field}>#{user?.userId}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actionContainer}>
        {(currUser?.role === "ADMIN" || currUser.userId === normalizedId) && (
          <Button
            style={{
              backgroundColor: currUser.bgColor || COLORS.primary,
            }}
            onPress={() =>
              router.push({
                pathname: `/${ROUTES.EdtiProfile}`,
                params: { userId: normalizedId },
              })
            }
          >
            {PLAINTEXT.singleProfile.editBtn}
          </Button>
        )}

        {currUser.role === "ADMIN" && (
          <Button isDanger onPress={() => handleDeleteProfile(normalizedId)}>
            {PLAINTEXT.singleProfile.deleteBtn}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingBottom: 20,
    },

    profileHeader: {
      backgroundColor: COLORS.card,
      padding: 14,
      paddingHorizontal: 30,
    },

    profileText: {
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.text,
    },

    profilesDetailsConatiner: {
      marginTop: 2,
    },

    profileCountText: {
      color: COLORS.muted,
    },

    backArrowAndProfileText: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },

    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    },

    headerInnerConatiner: {
      justifyContent: "center",
    },

    mainContainer: {
      padding: 25,
      marginTop: 20,
      gap: 17,
    },

    mainConatiner: {
      flex: 1,
    },

    userDetails: {
      backgroundColor: COLORS.card,
      padding: 20,
      borderRadius: 20,
      alignItems: "center",
      gap: 10,
    },

    userDetailsAndActionConatiner: {
      gap: 20,
    },

    userDetailsFieldsConatiner: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      paddingVertical: 8,
    },

    userDetailsFiedls: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.muted,
      alignItems: "center",
      padding: 17,
    },

    fieldName: {
      fontSize: 15,
      fontWeight: "bold",
      color: COLORS.muted,
    },

    field: {
      fontSize: 15,
      fontWeight: "bold",
      color: COLORS.text,
    },

    actionContainer: {
      paddingHorizontal: 25,
      paddingVertical: 20,
      gap: 10,
      backgroundColor: COLORS.background,
    },
  });
