import React, { useState, createContext } from "react";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";


export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setTheme] = useState("light");
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setTheme: () => setTheme(mode === "dark" ? {lightTheme} : {darkTheme})
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
