import { COLORS } from "@/constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GenerateUserLogo from "./GenerateUserLogo";

type ProfileCartProps = {
  fullName: string;
  age: string;
  profession: string;
  bgColor?: string;
};
const ProfileCart = ({
  fullName,
  profession,
  age,
  bgColor,
}: ProfileCartProps) => {
  return (
    <View style={styles.conatainer}>
      <View style={styles.logoAndUserTextCoantiner}>
        <GenerateUserLogo
          bgColor={bgColor ? bgColor : COLORS.primary}
          fullName={fullName}
          layoutSize={80}
          fontSize={30}
        />
        <View style={styles.userDetailsConatiner}>
          <Text style={styles.userName}>{fullName}</Text>
          <View style={styles.dotAndProfilesCount}>
            <Text style={styles.profileCountText}>{age}</Text>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.profileCountText}>{profession}</Text>
          </View>
        </View>
      </View>
      <View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </View>
  );
};

export default ProfileCart;

const styles = StyleSheet.create({
  conatainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 20,
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
  dot: {
    position: "relative",
    top: -3,
    color: COLORS.muted,
  },
  profileCountText: {
    color: COLORS.muted,
  },
  userDetailsConatiner: {
    gap: 2,
  },
});
