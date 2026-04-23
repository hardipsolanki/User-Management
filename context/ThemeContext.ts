import { DARK_COLORS, LIGHT_COLORS } from "@/constants/color";
import { createContext } from "react";

export const ThemeContext = createContext<{
    theme: "light" | "dark";
    toggleTheme: () => void;
    COLORS: typeof LIGHT_COLORS | typeof DARK_COLORS;
}>({
    theme: "light",
    toggleTheme: () => { },
    COLORS: LIGHT_COLORS,
});