import { Button } from "@/components/Button";
import { InputField } from "@/components/InputFields";
import { PLAINTEXT } from "@/constants/text";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { changePassord } from "@/utils/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const { COLORS } = useContext(ThemeContext); // ✅ theme access
  const styles = createStyles(COLORS); // ✅ dynamic styles

  const [fields, setFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldPassRequiredError, setOldRequiredError] = useState("");
  const [newRequiredError, setNewRequiredError] = useState("");
  const [confirmPassRequiredError, setConfirmRequiredError] = useState("");

  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const normalizedId = Array.isArray(userId) ? userId[0] : userId;

  const { user } = useContext(UserContext);

  const validation = () => {
    let isValid = true;

    if (!fields.oldPassword) {
      isValid = false;
      setOldRequiredError(PLAINTEXT.changePassword.erroMsg.oldPassRequired);
    }

    if (!fields.newPassword) {
      isValid = false;
      setNewRequiredError(PLAINTEXT.changePassword.erroMsg.newPassRequired);
    }

    if (!fields.confirmPassword) {
      isValid = false;
      setConfirmRequiredError(
        PLAINTEXT.changePassword.erroMsg.confirmPassRequired,
      );
    }

    if (
      fields.confirmPassword &&
      fields.newPassword !== fields.confirmPassword
    ) {
      isValid = false;
      setError(PLAINTEXT.changePassword.erroMsg.samePassErr);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setOldRequiredError("");
    setNewRequiredError("");
    setConfirmRequiredError("");
    setError("");

    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);
      const data = await changePassord({
        ...fields,
        userId: normalizedId,
      });

      if (data) router.back();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <View style={styles.headerInner}>
          <View>
            <Text style={styles.title}>{PLAINTEXT.changePassword.text}</Text>
            <Text style={styles.subtitle}>
              {PLAINTEXT.changePassword.tetxBio}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form */}
      <View style={styles.content}>
        <View style={styles.card}>
          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.form}>
            <InputField
              label={PLAINTEXT.changePassword.label.oldPass}
              placeHolder={PLAINTEXT.changePassword.placeHolder.oldPass}
              value={fields.oldPassword}
              error={oldPassRequiredError}
              onChange={(value) =>
                setFields((prev) => ({ ...prev, oldPassword: value }))
              }
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.text}
                />
              }
              isPassword
            />

            <InputField
              label={PLAINTEXT.changePassword.label.newPass}
              placeHolder={PLAINTEXT.changePassword.placeHolder.newPass}
              value={fields.newPassword}
              error={newRequiredError}
              onChange={(value) =>
                setFields((prev) => ({ ...prev, newPassword: value }))
              }
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.text}
                />
              }
              isPassword
            />

            <InputField
              label={PLAINTEXT.changePassword.label.confirmPass}
              placeHolder={PLAINTEXT.changePassword.placeHolder.confirmPass}
              value={fields.confirmPassword}
              error={confirmPassRequiredError}
              onChange={(value) =>
                setFields((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }))
              }
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.text}
                />
              }
              isPassword
            />

            <Button
              loading={loading}
              style={{ backgroundColor: user?.bgColor || COLORS.primary }}
              onPress={handleSubmit}
            >
              {PLAINTEXT.changePassword.submitBtn}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    profileHeader: {
      backgroundColor: COLORS.card,
      padding: 14,
      paddingHorizontal: 25,
    },

    headerInner: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    backBtn: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: COLORS.background,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: COLORS.text,
    },

    subtitle: {
      color: COLORS.muted,
      marginTop: 4,
    },

    content: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },

    card: {
      backgroundColor: COLORS.card,
      padding: 20,
      borderRadius: 12,
    },

    form: {
      gap: 20,
    },

    error: {
      color: COLORS.danger,
      textAlign: "center",
      marginBottom: 10,
    },
  });
