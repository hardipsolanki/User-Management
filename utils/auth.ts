import { admin } from "@/constants/admin"
import { getProfiles } from "./profile"

const signInUser = async (email: string, password: string) => {
    try {
        if (email === admin.adminEmail) {
            if (password !== admin.adminPassword)
                throw new Error("Invalid Password")
            // const data = await addProfile({
            //     age: "",
            //     bgColor: COLORS.primary,
            //     email: admin.adminEmail,
            //     fullName: "",
            //     profession: "",
            //     role: "ADMIN",
            //     password: admin.adminPassword
            // })
            return { admin }
        } else {
            const users = await getProfiles()
            if (users?.length) {
                const user = users.find(u => u.email === email)
                if (!user) throw new Error("User not found....!")
                if (user.password !== password) throw new Error("Invalid Password...!")
                return { user }
            } else throw new Error("User not found...!")
        }
    } catch (error) {
        throw error
    }
}

export { signInUser }

