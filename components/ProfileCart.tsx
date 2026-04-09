import { COLORS } from "@/constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GenerateUserLogo from "./GenerateUserLogo";

type ProfileCartProps = {
  bgColor?: string;
};
const ProfileCart = ({ bgColor }: ProfileCartProps) => {
  return (
    <View style={styles.conatainer}>
      <View style={styles.logoAndUserTextCoantiner}>
        <GenerateUserLogo
          bgColor={bgColor ? bgColor : COLORS.primary}
          firstLatter="H"
          secondLatter="S"
          layoutSize={80}
          fontSize={30}
        />
        <View style={styles.userDetailsConatiner}>
          <Text style={styles.userName}>Hardip Solanki</Text>
          <View style={styles.dotAndProfilesCount}>
            <Text style={styles.profileCountText}>Age 20</Text>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.profileCountText}>Developer</Text>
          </View>
        </View>
      </View>
      <View>
        <Ionicons name="arrow-forward-circle" size={28} />
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
    justifyContent: "center",
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
