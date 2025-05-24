import React, { createContext, useReducer } from "react";
export const ThemeContext = createContext();
const initialState = {
  darkMode: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      localStorage.setItem("darkMode", false);
      return { darkMode: false };
    case "DARKMODE":
      localStorage.setItem("darkMode", true);
      return { darkMode: true };
    default:
      return state;
  }
};

export function ModeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
