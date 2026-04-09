import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.lableAndInputConatiner}>
      <View style={styles.labelAndIconConatiner}>
        {icon && icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View>
        <TextInput
          style={[styles.input, customStyle, error && { borderColor: "red" }]}
          placeholder={placeHolder}
          value={value}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={(text) => onChange(text)}
        />
        {isPassword && (
          <View style={styles.passwordHideShowContainer}>
            {showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(false)}>
                <Ionicons name="eye-off" size={17} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(true)}>
                <Ionicons name="eye" size={17} color="black" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {error && (
          <View>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lableAndInputConatiner: {
    gap: 5,
  },
  labelAndIconConatiner: {
    flexDirection: "row",
    gap: 5,
  },
  label: {
    color: "rgb(12, 7, 7)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(23, 10, 10, 0.18)",
    padding: 10,
    borderRadius: 10,
  },
  passwordHideShowContainer: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  errorMessage: {
    color: "red",
    padding: 6,
  },
});
