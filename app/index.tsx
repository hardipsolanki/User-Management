import { ROUTES } from "@/constants/routesName";
import { AdminContext } from "@/context/AdminContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const { setIsAdmin } = useContext(AdminContext);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        if (isLoggedIn !== "true") {
          return <Redirect href={`/${ROUTES.Login}`} />;
        }
        const isAdmin = await AsyncStorage.getItem("isAdmin");
        setIsAdmin(isAdmin === "true" ? true : false);
        return router.push(`/${ROUTES.Tabs}/${ROUTES.Home}`);
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    })();
  });
};

export default index;
