import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemaProvider = (props) => {
  const [theme, setTheme] = useState("darko");

  const toggleTheme = () =>
    theme === "darko" ? setTheme("lighto") : setTheme("darko");

  const value = {
    toggleTheme,
    theme,
  };

  return <ThemeContext.Provider value={value} {...props} />;
};

const useTheme = () => useContext(ThemeContext);

export { ThemaProvider as default, useTheme };
