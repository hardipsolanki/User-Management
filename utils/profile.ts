import { AddUser, User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateId } from "./generateId";


const getProfiles = async (): Promise<User[] | null> => {
    try {
        const data = await AsyncStorage.getItem("profiles")
        if (!data) return null
        const profiles = JSON.parse(data)
        return profiles
    } catch (error) {
        throw error
    }
}


const addProfile = async (user: AddUser) => {
    try {
        const profiles = await getProfiles();
        if (profiles?.length) {
            const isProfileExist = profiles.find(p => p.email === user.email)
            if (isProfileExist) throw new Error("User profile already exist...!")
            const userId = generateId()
            const newUserAddProfiles = [{ ...user, userId: userId }, ...profiles]
            await AsyncStorage.setItem("profiles", JSON.stringify(newUserAddProfiles))
            return {
                success: true,
                statusCode: 201,
                data: { ...user, userId: userId },
                message: "Profile created successfully"
            }
        } else {
            const profiles: Array<User> = [];

            const userId = generateId()
            profiles.push({ ...user, userId: userId })
            await AsyncStorage.setItem("profiles", JSON.stringify(profiles));
            return {
                success: true,
                statusCode: 201,
                data: { ...user, userId: userId },
                message: "Profile created successfully"
            }
        }
    } catch (error) {
        throw error;
    }
}



export { addProfile, getProfiles };

