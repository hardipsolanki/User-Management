import { createContext } from "react";

export const AdminContext = createContext<{ isAdmin: boolean ; setIsAdmin: (value: boolean) => void}>({
    isAdmin: false,
    setIsAdmin: () => {}
});