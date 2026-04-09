import { User } from "@/types/user";
import { createContext } from "react";

export const UserContext = createContext<
    {
        user: Omit<User, "password">;
        setUser: (value: Omit<User, "password">) => void,
        profiles: User[],
        setProfile: (value: User) => void
    }>({
        user: {
            userId: "",
            fullName: "",
            email: "",
            age: "",
            role: "USER",
            profession: ""
        },
        profiles: [],
        setProfile: () => { },
        setUser: () => { }
    });