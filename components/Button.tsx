import { COLORS } from "@/constants/color";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isDanger?: boolean;
  isDiscard?: boolean;
};

export const Button = ({
  children,
  onPress,
  loading,
  disabled = false,
  style: customStyle,
  textStyle: customTextStyle,
  isDanger = false,
  isDiscard = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        style.btn,
        customStyle,
        isDanger && {
          borderWidth: 1,
          borderColor: "#E57373",
          backgroundColor: COLORS.card,
        },
        isDiscard && {
          borderWidth: 1,
          borderColor: "#E0E0E0",
          backgroundColor: COLORS.card,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text
          style={[
            style.btnText,
            customTextStyle,
            isDanger && { color: COLORS.danger },
            isDiscard && { color: COLORS.muted },
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // elevation: 4,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
