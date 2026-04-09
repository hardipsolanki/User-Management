import { COLORS } from "@/constants/color";
import { ROUTES } from "@/constants/routesName";
import { PLAINTEXT } from "@/constants/text";
import { UserContext } from "@/context/UserContext";
import { AddUser, User } from "@/types/user";
import { generateRandomBgColor } from "@/utils/generateRandomBgColor";
import { addProfile } from "@/utils/profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
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
    fullName: "",
    email: "",
    age: "",
    password: "",
    role: "USER",
    profession: "",
    bgColor: "",
  });
  const [error, setError] = useState("");
  const [fullNameErrMsg, setFullNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [ageErrMsg, setAgeErrMsg] = useState("");
  const [roleErrMsg, setRoleErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [bgColor, setBgColor] = useState(COLORS.primary);
  const [loading, setLoading] = useState<boolean>(false);
  const { setProfile } = useContext(UserContext);
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
    if (!fieldsData.role) {
      isValid = false;
      setRoleErrMsg(PLAINTEXT.addProfile.roleReqErr);
    }
    if (!fieldsData.password) {
      isValid = false;
      setPasswordErrMsg(PLAINTEXT.addProfile.passwordReqErr);
    }
    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validation();
    if (!isValid) return;
    if (user?.userId) {
      // update logic
    } else {
      try {
        setLoading(true);
        const data = await addProfile({ ...fieldsData });
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
          <View>
            <Ionicons name="arrow-back" size={20} color={COLORS.muted} />
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
              firstLatter="H"
              secondLatter="S"
              layoutSize={90}
              fontSize={40}
            />
            <Text style={styles.profileChangeText}>Tap to change avatar</Text>
            <View style={styles.availableAvatarConatiner}>
              {[0, 1, 2, 3, 4].map((_, idx) => {
                const bgColor = generateRandomBgColor();
                return (
                  <TouchableOpacity
                    onPress={() => setBgColor(bgColor)}
                    key={idx}
                  >
                    <GenerateUserLogo
                      bgColor={bgColor}
                      firstLatter="H"
                      secondLatter="S"
                      layoutSize={50}
                      fontSize={9}
                    />
                  </TouchableOpacity>
                );
              })}
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
                setFieldsData((prev) => ({ ...prev, Profession: text }));
              }}
              value={fieldsData.profession}
              label="Role"
              error={roleErrMsg}
            />
            <UnderlineInput
              onChange={(text) => {
                setFieldsData((prev) => ({ ...prev, password: text }));
              }}
              value={fieldsData.password}
              label="Password"
              error={passwordErrMsg}
            />
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
          <Button isDiscard onPress={() => {}}>
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
    justifyContent: "space-between",
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
