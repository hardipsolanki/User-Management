import { admin } from "@/constants/admin";
import { User } from "@/types/user";
import { getProfiles } from "@/utils/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //  Admin state
  const [user, setUser] = useState<Omit<User, "password">>({
    email: "",
    fullName: "",
    age: "",
    role: "USER",
    userId: "",
    profession: "",
    bgColor: "",
  });
  const [profiles, setProfile] = useState<User[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      const initalProfiles = await getProfiles();
      const availableUserProfile = initalProfiles?.filter(
        (p) => p.email !== admin.adminEmail,
      );
      setProfile(availableUserProfile || []);

      const curUser = await AsyncStorage.getItem("currUser");
      curUser && setUser(JSON.parse(curUser));
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
    setProfile((prev) =>
      prev.map((p) =>
        p.userId === updatedProfile.userId ? updatedProfile : p,
      ),
    );
  };

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

  return (
    <UserContext.Provider value={adminValue}>{children}</UserContext.Provider>
  );
};

export default AppProvider;
