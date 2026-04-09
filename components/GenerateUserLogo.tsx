import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GenerateUserLogo = {
  firstLatter: string;
  secondLatter: string;
  fontSize: number;
  bgColor: string;
  layoutSize?: number;
};

const GenerateUserLogo = ({
  firstLatter,
  secondLatter,
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
      <Text style={[styles.firstLatter, { fontSize }]}>{firstLatter}</Text>
      <Text style={[styles.secondLatter, { fontSize }]}>{secondLatter}</Text>
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
