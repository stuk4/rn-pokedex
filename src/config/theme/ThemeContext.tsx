import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ThemeColors, darkColors, lightColors } from "./theme";
import { useColorScheme } from "react-native";

export type ThemeColor = "light" | "dark";

interface ThemeContextProps {
  currentTheme: string;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeColor) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const isDark = currentTheme === "dark";
  const colors = isDark ? darkColors : lightColors;
  useEffect(() => {
    if (colorScheme === "dark") {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, [colorScheme]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     const colorScheme = Appearance.getColorScheme();
  //     setCurrentTheme(colorScheme === "dark" ? "dark" : "light");
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
  };
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: currentTheme,
        isDark: isDark,
        colors: colors,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
