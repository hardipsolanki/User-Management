import { ThemeContext } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import GenerateUserLogo from "./GenerateUserLogo";

type ProfileCartProps = {
  fullName: string;
  age: number | null;
  profession: string;
  bgColor?: string;
};
const ProfileCart = ({
  fullName,
  profession,
  age,
  bgColor,
}: ProfileCartProps) => {
  const { COLORS, theme, toggleTheme } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

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
            {age && <Text style={styles.profileCountText}>{age}</Text>}
            <Text style={styles.dot}>.</Text>
            <Text style={styles.profileCountText}>{profession}</Text>
          </View>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
    </View>
  );
};

export default ProfileCart;

const createStyles = (COLORS: any) =>
  StyleSheet.create({
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
      color: COLORS.text,
    },

    dotAndProfilesCount: {
      flexDirection: "row",
      gap: 7,
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
