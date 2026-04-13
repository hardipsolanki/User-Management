import { admin } from "@/constants/admin";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/color";
import { Color } from "@/types/color";
import { User } from "@/types/user";
import { getProfiles } from "@/utils/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { UserContext } from "./UserContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //  Admin state
  const [user, setUser] = useState<Omit<User, "password">>({
    email: "",
    fullName: "",
    age: null,
    role: "USER",
    userId: "",
    profession: "",
    bgColor: "",
  });
  const [profiles, setProfile] = useState<User[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const loadProfiles = async () => {
      const initalProfiles = await getProfiles();
      const curUser: any = await AsyncStorage.getItem("currUser");
      const currentUserObject = JSON.parse(curUser);
      const availableUserProfile = initalProfiles?.filter(
        (p) => p.email !== admin.adminEmail,
      );
      setUser(currentUserObject);
      setProfile(availableUserProfile || []);

      const isDarkMode = await AsyncStorage.getItem("isDarkMode");
      if (isDarkMode) {
        setTheme(isDarkMode === "true" ? "dark" : "light");
      }
    };

    loadProfiles();
  }, []);
  const handleSetProfile = (newProfile: User) => {
    setProfile((prev) => [newProfile, ...prev]);
  };

  const deleteProfile = (profileId: string) => {
    setProfile((prev) => prev.filter((p) => p.userId !== profileId));
  };

  const updateProfile = (updatedProfile: User) => {
    const profileIndex = profiles.findIndex(
      (p) => p.userId === updatedProfile.userId,
    );
    if (profileIndex !== -1) {
      const updatedProfiles = [...profiles];
      updatedProfiles[profileIndex] = updatedProfile;
      setProfile(updatedProfiles);
    }
  };

  const toggleTheme = async () => {
    await AsyncStorage.setItem(
      "isDarkMode",
      theme === "light" ? "true" : "false",
    );
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const COLORS: Color = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const adminValue = useMemo(
    () => ({
      user,
      setUser,
      profiles,
      setProfile: handleSetProfile,
      deleteProfile,
      updateProfile,
    }),
    [user, profiles],
  );
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      COLORS,
    }),
    [theme, COLORS],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={adminValue}>{children}</UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default AppProvider;
