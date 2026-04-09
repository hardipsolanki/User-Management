import { COLORS } from "@/constants/color";
import { PLAINTEXT } from "@/constants/text";
import { generateRandomBgColor } from "@/utils/generateRandomBgColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import GenerateUserLogo from "./GenerateUserLogo";
import { UnderlineInput } from "./UserLineTextInput";

const AddProfileForm = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <View style={styles.headerInnerConatiner}>
          <View>
            <Text style={styles.profileText}>{PLAINTEXT.addProfile.add}</Text>
            <View style={styles.profilesDetailsConatiner}>
              <View style={styles.dotAndProfilesCount}>
                <Text style={styles.profileCountText}>
                  {PLAINTEXT.addProfile.create}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollArea}>
        <View style={styles.mainContainer}>
          <View style={styles.userDetails}>
            <GenerateUserLogo
              bgColor={COLORS.primary}
              firstLatter="H"
              secondLatter="S"
              layoutSize={90}
              fontSize={40}
            />
            <Text style={styles.profileChangeText}>Tap to change avatar</Text>
            <View style={styles.availableAvatarConatiner}>
              {[0, 1, 2, 3, 4].map((_, idx) => (
                <GenerateUserLogo
                  key={idx}
                  bgColor={generateRandomBgColor()}
                  firstLatter="H"
                  secondLatter="S"
                  layoutSize={50}
                  fontSize={9}
                />
              ))}
            </View>
          </View>
          <View style={styles.userDetailsAndActionConatiner}>
            <UnderlineInput onChange={() => {}} value="" label="Full Name" />
            <UnderlineInput onChange={() => {}} value="" label="Age" />
            <UnderlineInput onChange={() => {}} value="" label="Role" />
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionBtnConatiner}>
        <Button onPress={() => {}}>
          {PLAINTEXT.addProfile.createProfileBtn}
        </Button>
        <Button isDiscard onPress={() => {}}>
          Discard
        </Button>
      </View>
    </View>
  );
};

export default AddProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea: {
    marginTop: 19,
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
  profileChangeText: {
    color: COLORS.muted,
  },
  profilesDetailsConatiner: {
    flexDirection: "row",
    gap: 8,
    color: COLORS.text,
  },
  headerInnerConatiner: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
    gap: 10,
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
  availableAvatarConatiner: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  actionBtnConatiner: {
    padding: 25,
    gap: 10,
  },
});
