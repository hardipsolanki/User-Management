import { ROUTES } from "@/constants/routesName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        // add ! this for test
        if (isLoggedIn !== "true") {
          return router.push(`/${ROUTES.Login}`);
        }
        router.push(`/${ROUTES.Tabs}/${ROUTES.Home}`);
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    })();
  });
};

export default index;
