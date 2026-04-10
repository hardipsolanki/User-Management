import { Button } from "@/components/Button";
import { InputField } from "@/components/InputFields";
import { COLORS } from "@/constants/color";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { changePassord } from "@/utils/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const changePassword = () => {
  const [fields, setFields] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [oldPassRequiredError, setOldRequiredError] = useState<string>("");
  const [newRequiredError, setNewRequiredError] = useState<string>("");
  const [confirmPassRequiredError, setConfirmRequiredError] =
    useState<string>("");
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
      fields.newPassword != fields.confirmPassword
    ) {
      isValid = false;
      setError(PLAINTEXT.changePassword.erroMsg.samePassErr);
    }
    return isValid;
  };

  const handleLogin = async () => {
    setOldRequiredError("");
    setNewRequiredError("");
    setConfirmRequiredError("");
    setError("");
    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);
      const data = await changePassord({ ...fields, userId: normalizedId });
      if (data) router.back();
      setLoading(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.headerInnerConatiner}>
          <View>
            <Text style={styles.profileText}>
              {PLAINTEXT.changePassword.text}
            </Text>
            <View style={styles.profilesDetailsConatiner}>
              <View style={styles.dotAndProfilesCount}>
                <Text style={styles.profileCountText}>
                  {PLAINTEXT.changePassword.tetxBio}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.loginConatiner}>
        <View style={styles.loginInnerConatiner}>
          {error && <Text style={styles.errorMsg}>{error}</Text>}
          <View style={styles.loginFieldsContainer}>
            <View style={styles.textInputConatiner}>
              <InputField
                label={PLAINTEXT.changePassword.label.oldPass}
                placeHolder={PLAINTEXT.changePassword.placeHolder.oldPass}
                onChange={(value) =>
                  setFields((prev) => ({ ...prev, oldPassword: value }))
                }
                value={fields.oldPassword}
                error={oldPassRequiredError}
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="black"
                  />
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <InputField
                label={PLAINTEXT.changePassword.label.newPass}
                placeHolder={PLAINTEXT.changePassword.placeHolder.newPass}
                onChange={(value) =>
                  setFields((prev) => ({ ...prev, newPassword: value }))
                }
                value={fields.newPassword}
                error={newRequiredError}
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="black"
                  />
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <InputField
                label={PLAINTEXT.changePassword.label.confirmPass}
                placeHolder={PLAINTEXT.changePassword.placeHolder.confirmPass}
                onChange={(value) =>
                  setFields((prev) => ({ ...prev, confirmPassword: value }))
                }
                value={fields.confirmPassword}
                error={confirmPassRequiredError}
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="black"
                  />
                }
              />
            </View>
            <Button
              loading={loading}
              style={{ backgroundColor: user.bgColor }}
              onPress={handleLogin}
            >
              {PLAINTEXT.changePassword.submitBtn}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default changePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loginText: {
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
  },
  loginConatiner: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 25,
  },
  loginInnerConatiner: {
    backgroundColor: COLORS.card,
    padding: 19,
    borderRadius: 10,
  },
  errorMsg: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  textInputConatiner: {
    width: "100%",
  },
  loginFieldsContainer: {
    gap: 30,
  },
  loginBtn: {
    marginTop: 10,
  },
  profileHeader: {
    backgroundColor: COLORS.card,
    padding: 14,
    paddingHorizontal: 30,
  },
  profileText: {
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
  },
  profilesDetailsConatiner: {
    flexDirection: "row",
    gap: 8,
    color: COLORS.text,
  },
  dotAndProfilesCount: {
    height: "100%",
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCountText: {
    color: COLORS.muted,
  },
  headerInnerConatiner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    width: "100%",
  },

  backArrow: {
    position: "absolute",
    top: 19,
    left: 2,
  },
});
