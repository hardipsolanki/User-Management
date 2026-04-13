import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
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
  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.btn,
        customStyle,

        // Danger button
        isDanger && {
          borderWidth: 1,
          borderColor: COLORS.danger,
          backgroundColor: COLORS.card,
        },

        // Discard button
        isDiscard && {
          borderWidth: 1,
          borderColor: COLORS.muted,
          backgroundColor: COLORS.card,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} size="small" />
      ) : (
        <Text
          style={[
            styles.btnText,
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

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: COLORS.primary,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },

    btnText: {
      color: "#fff", // keep white for primary button contrast
      fontWeight: "bold",
      fontSize: 16,
    },
  });
