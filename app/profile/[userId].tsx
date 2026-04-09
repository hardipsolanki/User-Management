import { Button } from "@/components/Button";
import GenerateUserLogo from "@/components/GenerateUserLogo";
import { COLORS } from "@/constants/color";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useContext(UserContext);
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
                <Text style={styles.profileCountText}>Hardip Solanki</Text>
              </View>
            </View>
          </View>
          <View>
            <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.userDetails}>
          <GenerateUserLogo
            bgColor={COLORS.primary}
            firstLatter="H"
            secondLatter="S"
            layoutSize={110}
            fontSize={40}
          />
          <Text style={styles.profileText}>Hardp Solanki</Text>
        </View>
        <View style={styles.userDetailsAndActionConatiner}>
          <View style={styles.userDetailsFieldsConatiner}>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Full Name</Text>
              <Text style={styles.field}>Hardip Solanki</Text>
            </View>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Age</Text>
              <Text style={styles.field}>99</Text>
            </View>
            <View style={styles.userDetailsFiedls}>
              <Text style={styles.fieldName}>Role</Text>
              <Text style={styles.field}>Developer</Text>
            </View>
            <View style={[styles.userDetailsFiedls, { borderBottomWidth: 0 }]}>
              <Text style={styles.fieldName}>Profile Id</Text>
              <Text style={styles.field}>#TO878FA</Text>
            </View>
          </View>
          {user.role === "ADMIN" && (
            <>
              <Button onPress={() => {}}>
                {PLAINTEXT.singleProfile.editBtn}
              </Button>
              <Button isDanger onPress={() => {}}>
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#B0B0B0",
  },
  field: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
