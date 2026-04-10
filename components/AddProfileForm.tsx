import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { AddUser, User } from "@/types/user";
import { generateRandomBgColor } from "@/utils/generateRandomBgColor";
import { addProfile, updateProfile } from "@/utils/profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import {
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
  const router = useRouter();
  const [fieldsData, setFieldsData] = useState<AddUser>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    age: user?.age || "",
    password: "",
    role: "USER",
    profession: user?.profession || "",
    bgColor: user?.bgColor || "",
  });
  const [error, setError] = useState("");
  const [fullNameErrMsg, setFullNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [ageErrMsg, setAgeErrMsg] = useState("");
  const [professionErrMsg, setProfessionErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [bgColor, setBgColor] = useState(user?.bgColor || COLORS.primary);
  const [loading, setLoading] = useState<boolean>(false);
  const { setProfile, updateProfile: updateProfileState } =
    useContext(UserContext);
  const validation = () => {
    let isValid = true;
    if (!fieldsData.fullName) {
      isValid = false;
      setFullNameErrMsg(PLAINTEXT.addProfile.fullNameReqErr);
    }
    if (!fieldsData.email) {
      isValid = false;
      setEmailErrMsg(PLAINTEXT.addProfile.emailReqErr);
    }
    if (!fieldsData.age) {
      isValid = false;
      setAgeErrMsg(PLAINTEXT.addProfile.ageReqErr);
    }
    if (!fieldsData.profession) {
      isValid = false;
      setProfessionErrMsg(PLAINTEXT.addProfile.professioneqErr);
    }
    if (!user && !fieldsData.password) {
      isValid = false;
      setPasswordErrMsg(PLAINTEXT.addProfile.passwordReqErr);
    }
    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validation();
    console.log(isValid);
    if (!isValid) return;
    if (user?.userId) {
      try {
        setLoading(true);
        const data = await updateProfile({
          ...fieldsData,
          bgColor: bgColor,
          userId: user.userId,
        });
        if (data?.data) {
          updateProfileState(data.data);
          router.back();
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      return;
    } else {
      try {
        setLoading(true);
        const data = await addProfile({ ...fieldsData, bgColor: bgColor });
        if (data.data) {
          setProfile({ ...data.data, bgColor: bgColor });
          router.push(`/${ROUTES.Tabs}/${ROUTES.Home}`);
        }
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const avatarColors = useMemo(() => {
    return [0, 1, 2, 3, 4].map(() => generateRandomBgColor());
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <View style={styles.headerInnerConatiner}>
          <View>
            <Text style={styles.profileText}>
              {user?.userId
                ? PLAINTEXT.EditProfile.edit
                : PLAINTEXT.addProfile.add}
            </Text>
            <View style={styles.profilesDetailsConatiner}>
              <View style={styles.dotAndProfilesCount}>
                <Text style={styles.profileCountText}>
                  {user?.userId
                    ? PLAINTEXT.EditProfile.text
                    : PLAINTEXT.addProfile.add}
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
      <ScrollView style={styles.scrollArea}>
        <View style={styles.mainContainer}>
          <View style={styles.userDetails}>
            {error && (
              <Text style={{ color: "red", marginVertical: 8 }}>{error}</Text>
            )}
            <GenerateUserLogo
              bgColor={bgColor}
              fullName={fieldsData.fullName}
              layoutSize={90}
              fontSize={40}
            />
            <Text style={styles.profileChangeText}>Tap to change avatar</Text>
            <View style={styles.availableAvatarConatiner}>
              {avatarColors.map((avatarColor, idx) => (
                <TouchableOpacity
                  onPress={() => setBgColor(avatarColor)}
                  key={idx}
                >
                  <GenerateUserLogo
                    bgColor={avatarColor}
                    fullName={fieldsData.fullName}
                    layoutSize={50}
                    fontSize={9}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.userDetailsAndActionConatiner}>
            <UnderlineInput
              onChange={(text) => {
                setFieldsData((prev) => ({ ...prev, fullName: text }));
              }}
              value={fieldsData.fullName}
              label="Full Name"
              error={fullNameErrMsg}
            />
            <UnderlineInput
              onChange={(text) =>
                setFieldsData((prev) => ({ ...prev, email: text }))
              }
              value={fieldsData.email}
              label="Email"
              error={emailErrMsg}
            />
            <UnderlineInput
              onChange={(text) =>
                setFieldsData((prev) => ({ ...prev, age: text }))
              }
              value={String(fieldsData.age)}
              label="Age"
              error={ageErrMsg}
            />
            <UnderlineInput
              onChange={(text) => {
                setFieldsData((prev) => ({ ...prev, profession: text }));
              }}
              value={fieldsData.profession}
              label="Profession"
              error={professionErrMsg}
            />
            {!user && (
              <UnderlineInput
                onChange={(text) => {
                  setFieldsData((prev) => ({ ...prev, password: text }));
                }}
                value={fieldsData.password}
                label="Password"
                error={passwordErrMsg}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionBtnConatiner}>
        <Button loading={loading} onPress={onSubmit}>
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
  );
};

export default AddProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea: {
    marginTop: 19,
  },
  profileHeader: {
    backgroundColor: COLORS.card,
    padding: 14,
    paddingHorizontal: 30,
  },
  profileText: {
    fontSize: 29,
    fontWeight: "bold",
  },
  profileChangeText: {
    color: COLORS.muted,
  },
  profilesDetailsConatiner: {
    flexDirection: "row",
    gap: 8,
    color: COLORS.text,
  },
  headerInnerConatiner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
  backArrow: {
    position: "absolute",
    top: 19,
    left: 2,
  },
  mainContainer: {
    padding: 25,
    marginTop: 20,
    gap: 17,
  },
  userDetails: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  userDetailsAndActionConatiner: {
    gap: 10,
  },
  userDetailsFieldsConatiner: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    justifyContent: "center",
    paddingVertical: 8,
  },
  userDetailsFiedls: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
    padding: 17,
  },
  fieldName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B0B0B0",
  },
  field: {
    fontSize: 20,
    fontWeight: "bold",
  },
  availableAvatarConatiner: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  actionBtnConatiner: {
    padding: 25,
    gap: 10,
  },
});
