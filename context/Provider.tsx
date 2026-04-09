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
  });
  const [profiles, setProfile] = useState<User[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      const initalProfiles = await getProfiles();
      setProfile(initalProfiles || []);

      const curUser = await AsyncStorage.getItem("currUser");
      curUser && setUser(JSON.parse(curUser));
    };

    loadProfiles();
  }, []);
  const handleSetProfile = (newProfile: User) => {
    setProfile((prev) => [newProfile, ...prev]);
  };

  const adminValue = useMemo(
    () => ({ user, setUser, profiles, setProfile: handleSetProfile }),
    [user, profiles],
  );

  return (
    <UserContext.Provider value={adminValue}>{children}</UserContext.Provider>
  );
};

export default AppProvider;
