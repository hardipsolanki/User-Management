import { COLORS } from "@/constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UnderlineInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  editable?: boolean;
  style?: any;
  error?: string;
  isPassword?: boolean; // ← new prop add karyu
};

export const UnderlineInput = ({
  label,
  value,
  placeholder,
  onChange,
  keyboardType = "default",
  editable = true,
  style: customStyle,
  error,
  isPassword = false,
}: UnderlineInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.label}>{label}</Text>

      {/* Input + Eye icon ek row ma */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChange}
          placeholderTextColor="#9E9E9E"
          secureTextEntry={isPassword && !showPassword} // ← password hide/show
        />

        {/* Eye icon — sirf isPassword=true hoy tyare */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={17}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.border} />

      {error && (
        <View>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
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
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row", // ← input ane icon side by side
    alignItems: "center",
  },
  input: {
    flex: 1, // ← baaki space input le
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  eyeIcon: {
    paddingLeft: 8, // ← icon thi thodu space
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 6,
  },
  errorMessage: {
    color: "red",
    padding: 6,
  },
});
