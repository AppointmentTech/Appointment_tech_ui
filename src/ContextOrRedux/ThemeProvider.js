import React, { createContext, useReducer, useMemo } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      localStorage.setItem("darkMode", "false");
      return { darkMode: false };
    case "DARKMODE":
      localStorage.setItem("darkMode", "true");
      return { darkMode: true };
    default:
      return state;
  }
};

export function ModeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
