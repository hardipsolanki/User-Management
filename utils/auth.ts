import { admin } from "@/constants/admin"
import { ChangePassword } from "@/types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfiles } from "./profile"

const signInUser = async (email: string, password: string) => {
    try {
        if (email === admin.adminEmail) {
            if (password !== admin.adminPassword)
                throw new Error("Invalid Password")
            return { admin }
        } else {
            const users = await getProfiles()
            if (users?.length) {
                const user = users.find(u => email === u.email)
                if (!user) throw new Error("User not found....!")
                if (user.password !== password) throw new Error("Invalid Password...!")
                return { user }
            } else throw new Error("User not found...!")
        }
    } catch (error) {
        throw error
    }
}

const changePassord = async ({ userId, oldPassword, newPassword, confirmPassword }: ChangePassword) => {
    try {
        const profiles = await getProfiles()
        const profileIndex = profiles?.findIndex(p => p.userId === userId)
        if (profileIndex !== undefined && profileIndex !== -1 && profiles?.length) {
            const userProfile = profiles[profileIndex]
            if (userProfile.password !== oldPassword) throw new Error("Invalid old password")
            if (newPassword !== confirmPassword) throw new Error("Confirm password do not match")
            profiles?.splice(profileIndex, 1, { ...userProfile, password: confirmPassword })
            await AsyncStorage.setItem("profiles", JSON.stringify(profiles))
            return userProfile
        } else throw new Error("Something want to wrong...!")
    } catch (error) {
        throw error
    }
}

export {
    changePassord, signInUser
}

