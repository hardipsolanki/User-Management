import { COLORS } from "@/constants/color";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type UnderlineInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  editable?: boolean;
  style?: any;
};

export const UnderlineInput = ({
  label,
  value,
  placeholder,
  onChange,
  keyboardType = "default",
  editable = true,
  style: customStyle,
}: UnderlineInputProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={onChange}
        placeholderTextColor="#9E9E9E"
      />

      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 17,
  },

  label: {
    color: COLORS.primary, // green like your image
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },

  input: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 6,
  },
});
