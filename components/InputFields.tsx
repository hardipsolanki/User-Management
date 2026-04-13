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

type InputFieldProps = {
  label: string;
  placeHolder: string;
  value: string;
  icon?: React.ReactNode;
  onChange: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: "email-address" | "numeric" | "default";
  error?: string;
  style?: any;
  multiline?: boolean;
};

export const InputField = ({
  label,
  isPassword = false,
  onChange,
  placeHolder,
  value,
  error,
  icon,
  keyboardType = "default",
  style: customStyle,
  multiline = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

  return (
    <View style={styles.lableAndInputConatiner}>
      <View style={styles.labelAndIconConatiner}>
        {icon && icon}
        <Text style={styles.label}>{label}</Text>
      </View>

      <View>
        <TextInput
          style={[
            styles.input,
            customStyle,
            error && { borderColor: COLORS.danger },
          ]}
          placeholder={placeHolder}
          placeholderTextColor={COLORS.muted}
          value={value}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={(text) => onChange(text)}
        />

        {isPassword && (
          <View style={styles.passwordHideShowContainer}>
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={17}
                color={COLORS.text}
              />
            </TouchableOpacity>
          </View>
        )}

        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </View>
  );
};

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    lableAndInputConatiner: {
      gap: 5,
    },

    labelAndIconConatiner: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },

    label: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 6,
    },

    input: {
      borderWidth: 1.5,
      borderColor: COLORS.muted,
      padding: 10,
      borderRadius: 10,
      color: COLORS.text,
      backgroundColor: COLORS.card,
    },

    passwordHideShowContainer: {
      position: "absolute",
      right: 10,
      top: 12,
    },

    errorMessage: {
      color: COLORS.danger,
      paddingTop: 6,
    },
  });
