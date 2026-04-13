import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { AddUser, User } from "@/types/user";
import { generateRandomBgColor } from "@/utils/generateRandomBgColor";
import { addProfile, updateProfile } from "@/utils/profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "./Button";
import GenerateUserLogo from "./GenerateUserLogo";
import { UnderlineInput } from "./UserLineTextInput";

const AddProfileForm = ({ user }: { user?: User }) => {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const normalizedId = Array.isArray(userId) ? userId[0] : userId;

  const {
    user: currUser,
    setUser,
    setProfile,
    updateProfile: updateProfileState,
  } = useContext(UserContext);

  const { COLORS } = useContext(ThemeContext);
  const styles = createStyles(COLORS);

  const [fieldsData, setFieldsData] = useState<AddUser>({
    fullName:
      user?.fullName || (currUser.role !== "ADMIN" && currUser.fullName) || "",
    email: user?.email || (currUser.role !== "ADMIN" && currUser.email) || "",
    age: user?.age || (currUser.role !== "ADMIN" && currUser.age) || null,
    password: user?.password || "",
    role: "USER",
    profession:
      user?.profession ||
      (currUser.role !== "ADMIN" && currUser.profession) ||
      "",
    bgColor:
      user?.bgColor || (currUser.role !== "ADMIN" && currUser.bgColor) || "",
  });

  const [error, setError] = useState("");
  const [fullNameErrMsg, setFullNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [ageErrMsg, setAgeErrMsg] = useState("");
  const [professionErrMsg, setProfessionErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [bgColor, setBgColor] = useState(user?.bgColor || COLORS.primary);
  const [loading, setLoading] = useState(false);

  const validation = () => {
    let isValid = true;

    setFullNameErrMsg("");
    setEmailErrMsg("");
    setAgeErrMsg("");
    setProfessionErrMsg("");
    setPasswordErrMsg("");

    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!fieldsData.fullName.trim()) {
      isValid = false;
      setFullNameErrMsg(PLAINTEXT.addProfile.fullNameReqErr);
    } else if (!nameRegex.test(fieldsData.fullName)) {
      isValid = false;
      setFullNameErrMsg("Only letters allowed, min 2 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fieldsData.email.trim()) {
      isValid = false;
      setEmailErrMsg(PLAINTEXT.addProfile.emailReqErr);
    } else if (!emailRegex.test(fieldsData.email)) {
      isValid = false;
      setEmailErrMsg(PLAINTEXT.addProfile.invalidEmailErr);
    }

    const ageRegex = /^[0-9]+$/;
    if (!fieldsData.age) {
      isValid = false;
      setAgeErrMsg(PLAINTEXT.addProfile.ageReqErr);
    } else if (!ageRegex.test(String(fieldsData.age))) {
      isValid = false;
      setAgeErrMsg(PLAINTEXT.addProfile.ageMustNumberErr);
    } else if (Number(fieldsData.age) < 1 || Number(fieldsData.age) > 100) {
      isValid = false;
      setAgeErrMsg(PLAINTEXT.addProfile.invalidAgeErr);
    }

    const professionRegex = /^[a-zA-Z\s]{2,}$/;
    if (!fieldsData.profession.trim()) {
      isValid = false;
      setProfessionErrMsg(PLAINTEXT.addProfile.professioneqErr);
    } else if (!professionRegex.test(fieldsData.profession)) {
      isValid = false;
      setProfessionErrMsg(PLAINTEXT.addProfile.invalidProfessionErr);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (currUser?.role === "ADMIN" && !fieldsData.password) {
      isValid = false;
      setPasswordErrMsg(PLAINTEXT.addProfile.passwordReqErr);
    } else if (
      currUser?.role === "ADMIN" &&
      !passwordRegex.test(fieldsData.password)
    ) {
      isValid = false;
      setPasswordErrMsg(PLAINTEXT.addProfile.invalidPasswordErr);
    }

    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);

      if (user?.userId || normalizedId) {
        const data = await updateProfile({
          ...fieldsData,
          bgColor,
          userId: user?.userId || normalizedId,
        });

        updateProfileState({
          ...fieldsData,
          bgColor,
          userId: user?.userId || normalizedId,
        });

        if (data?.data) {
          const updatedData = { ...data.data, bgColor };
          currUser.role !== "ADMIN" && setUser(updatedData);
          router.back();
        }
      } else {
        const data = await addProfile({
          ...fieldsData,
          bgColor,
        });

        if (data.data) {
          setProfile({ ...data.data, bgColor });
          router.push(`/${ROUTES.Tabs}/${ROUTES.Home}`);
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const avatarColors = useMemo(
    () => [0, 1, 2, 3, 4].map(() => generateRandomBgColor()),
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.headerInnerConatiner}>
            <View style={styles.backArrowAndProfileText}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={20} color={COLORS.text} />
              </TouchableOpacity>

              <View>
                <Text style={styles.profileText}>
                  {PLAINTEXT.EditProfile.edit}
                </Text>

                <View style={styles.profilesDetailsConatiner}>
                  <Text style={styles.profileCountText}>
                    {PLAINTEXT.EditProfile.text}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.mainContainer}>
            <View style={styles.userDetails}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <GenerateUserLogo
                bgColor={bgColor}
                fullName={fieldsData.fullName}
                layoutSize={90}
                fontSize={40}
              />

              <Text style={styles.profileChangeText}>
                {PLAINTEXT.EditProfile.change}
              </Text>

              <View style={styles.availableAvatarConatiner}>
                <ScrollView
                  horizontal={true}
                  directionalLockEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.content}
                >
                  {avatarColors.map((color, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => setBgColor(color)}
                    >
                      <GenerateUserLogo
                        bgColor={color}
                        fullName={fieldsData.fullName}
                        layoutSize={50}
                        fontSize={9}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.userDetailsAndActionConatiner}>
              <UnderlineInput
                color={user?.bgColor || COLORS.primary}
                label="Full Name"
                value={fieldsData.fullName}
                onChange={(text) =>
                  setFieldsData((p) => ({ ...p, fullName: text }))
                }
                error={fullNameErrMsg}
              />

              <UnderlineInput
                color={user?.bgColor || COLORS.primary}
                label="Email"
                value={fieldsData.email}
                onChange={(text) =>
                  setFieldsData((p) => ({ ...p, email: text }))
                }
                error={emailErrMsg}
              />

              <UnderlineInput
                color={user?.bgColor || COLORS.primary}
                label="Age"
                keyboardType="numeric"
                value={fieldsData.age?.toString() ?? ""}
                onChange={(text) =>
                  setFieldsData((p) => ({
                    ...p,
                    age: Number(text),
                  }))
                }
                error={ageErrMsg}
              />

              <UnderlineInput
                color={user?.bgColor || COLORS.primary}
                label="Profession"
                value={fieldsData.profession}
                onChange={(text) =>
                  setFieldsData((p) => ({
                    ...p,
                    profession: text,
                  }))
                }
                error={professionErrMsg}
              />

              {currUser.role === "ADMIN" && (
                <UnderlineInput
                  color={user?.bgColor || COLORS.primary}
                  isPassword
                  label="Password"
                  value={fieldsData.password}
                  onChange={(text) =>
                    setFieldsData((p) => ({
                      ...p,
                      password: text,
                    }))
                  }
                  error={passwordErrMsg}
                />
              )}
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View style={styles.actionBtnConatiner}>
          <Button
            loading={loading}
            onPress={onSubmit}
            style={{
              backgroundColor:
                currUser.role === "ADMIN"
                  ? COLORS.primary
                  : user?.bgColor || COLORS.primary,
            }}
          >
            {!user
              ? PLAINTEXT.addProfile.createProfileBtn
              : PLAINTEXT.EditProfile.editBtn}
          </Button>

          {user?.userId && (
            <Button isDiscard onPress={() => router.back()}>
              Discard
            </Button>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProfileForm;

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    profileTextContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    profileChangeText: {
      color: COLORS.muted,
    },

    scrollArea: {
      marginTop: 10,
    },

    mainContainer: {
      padding: 25,
      gap: 17,
    },

    userDetails: {
      backgroundColor: COLORS.card,
      padding: 20,
      borderRadius: 20,
      alignItems: "center",
      gap: 10,
    },

    userDetailsAndActionConatiner: {
      gap: 10,
    },

    availableAvatarConatiner: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
    },

    actionBtnConatiner: {
      padding: 25,
      gap: 10,
      backgroundColor: COLORS.background,
    },

    errorText: {
      color: COLORS.danger,
    },

    profileHeader: {
      backgroundColor: COLORS.card,
      padding: 14,
      paddingHorizontal: 30,
    },

    profileText: {
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.text,
    },

    profilesDetailsConatiner: {
      marginTop: 2,
    },

    profileCountText: {
      color: COLORS.muted,
    },

    backArrowAndProfileText: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },

    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    },

    headerInnerConatiner: {
      justifyContent: "center",
    },
    content: { paddingHorizontal: 20, gap: 10 },
  });
