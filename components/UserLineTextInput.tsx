import { ThemeContext } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useState } from "react";
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
  isPassword?: boolean;
  color: string;
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
  color,
}: UnderlineInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

  return (
    <View style={[styles.container, customStyle]}>
      <Text style={[styles.label, { color: color }]}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChange}
          placeholderTextColor={COLORS.muted}
          secureTextEntry={isPassword && !showPassword}
        />

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

      <View style={[styles.border, { borderColor: color }]} />

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const createStyles = (COLORS: any) =>
  StyleSheet.create({
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
      flexDirection: "row",
      alignItems: "center",
    },

    input: {
      flex: 1,
      fontSize: 16,
      color: COLORS.text,
      paddingVertical: 4,
    },

    eyeIcon: {
      paddingLeft: 8,
    },

    border: {
      borderBottomWidth: 1,
      borderBottomColor: COLORS.muted,
      marginTop: 6,
    },

    errorMessage: {
      color: COLORS.danger,
      paddingTop: 6,
    },
  });
