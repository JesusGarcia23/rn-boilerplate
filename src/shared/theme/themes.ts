import { DefaultTheme } from "@react-navigation/native";

export const palette = {
    primary: "#0564d4",
    white: "#fff",
    black: "#101214",
};

export const LightTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      ...palette,
    },
};

export const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...LightTheme.colors,
    }
};