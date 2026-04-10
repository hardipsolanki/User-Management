import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GenerateUserLogo = {
  fullName: string;
  fontSize: number;
  bgColor: string;
  layoutSize?: number;
};

const GenerateUserLogo = ({
  fullName,
  bgColor,
  fontSize,
  layoutSize = 50,
}: GenerateUserLogo) => {
  return (
    <View
      style={[
        styles.conatiner,
        { width: layoutSize, height: layoutSize, backgroundColor: bgColor },
      ]}
    >
      <Text style={[styles.firstLatter, { fontSize }]}>
        {fullName?.charAt(0)}
      </Text>
      <Text style={[styles.secondLatter, { fontSize }]}>
        {fullName?.split(" ")?.[1]?.charAt(0)}
      </Text>
    </View>
  );
};

export default GenerateUserLogo;

const styles = StyleSheet.create({
  conatiner: {
    padding: 20,
    borderRadius: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  firstLatter: {
    color: "white",
  },
  secondLatter: {
    color: "white",
  },
});
