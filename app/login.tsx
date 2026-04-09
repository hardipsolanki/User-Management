import { Button } from "@/components/Button";
import { InputField } from "@/components/InputFields";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { signInUser } from "@/utils/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailRequiredError, setEmailRequiredError] = useState<string>("");
  const [passwordRequiredError, setPasswordRequiredError] =
    useState<string>("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const validation = () => {
    let isValid = true;
    if (!email) {
      isValid = false;
      setEmailRequiredError(PLAINTEXT.login.errorMsg.email);
    }
    if (!password) {
      isValid = false;
      setPasswordRequiredError(PLAINTEXT.login.errorMsg.password);
    }
    return isValid;
  };

  const handleLogin = async () => {
    setEmailRequiredError("");
    setPasswordRequiredError("");
    setError("");
    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);
      const data = await signInUser(email, password);
      if (data) {
        if (data.user) {
          const currentUser = {
            age: data.user.age,
            email: data.user.email,
            fullName: data.user.fullName,
            profession: data.user.profession,
            role: data.user.role,
            userId: data.user.userId,
          };
          await AsyncStorage.setItem("currUser", JSON.stringify(currentUser));

          setUser(currentUser);
        } else {
          const currentUser = {
            age: "",
            email: data.admin.adminEmail,
            userId: data.admin.adminId,
            fullName: "",
            profession: "",
            role: data.admin.role as "ADMIN" | "USER",
          };
          await AsyncStorage.setItem("currUser", JSON.stringify(currentUser));
          setUser(currentUser);
        }
      }
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace(`/${ROUTES.Home}`);
      setLoading(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginConatiner}>
        <Text style={styles.loginText}>{PLAINTEXT.login.Login}</Text>
        {error && <Text style={styles.errorMsg}>{error}</Text>}
        <View style={styles.loginFieldsContainer}>
          <View style={styles.textInputConatiner}>
            <InputField
              label={PLAINTEXT.login.label.Email}
              placeHolder={PLAINTEXT.login.label.Email}
              onChange={(value) => {
                setEmail(value);
              }}
              value={email}
              error={emailRequiredError}
              icon={<Ionicons name="mail-outline" size={24} color="black" />}
            />
          </View>
          <View style={styles.textInputConatiner}>
            <InputField
              label={PLAINTEXT.login.label.Password}
              placeHolder={PLAINTEXT.login.label.Password}
              onChange={(value) => {
                setPassword(value);
              }}
              value={password}
              error={passwordRequiredError}
              icon={
                <Ionicons name="lock-closed-outline" size={24} color="black" />
              }
            />
          </View>
          <Button
            loading={loading}
            style={styles.loginBtn}
            onPress={handleLogin}
          >
            {PLAINTEXT.login.Login}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginText: {
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
  },
  loginConatiner: {
    width: "100%",
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
});
