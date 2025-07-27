/** Primary Import Declaration */
import React, { useEffect, useContext, useState, useReducer, useMemo } from "react";

/** MUI Themes */
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
/** App Route Component */
/** Theming and Styling */
import { darkTheme, lightTheme } from "./theme.js";
import { ThemeContext } from "./ContextOrRedux/ThemeProvider.js";
import { AuthContext, reducer } from "./ContextOrRedux/AuthContext.js";
import { decryptText } from "commonmethods/Encryption.js";
import MainRoutes from "./Template/MainRoutes.jsx";

// Simple loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export default function App() {
  // Auth state
  const initialState = {
    isAuthenticated: false,
    user: null,
    permissions: null,
    usertype: null,
    token: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  
  // Theme context
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useContext(ThemeContext);
  
  // Memoized theme
  const theme = useMemo(() => {
    return themeMode.state.darkMode ? darkTheme : lightTheme;
  }, [themeMode.state.darkMode]);

  // Memoized auth context value
  const authContextValue = useMemo(() => ({ state, dispatch }), [state]);

  // Initialize app - run only once
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Set theme
        const savedDarkMode = localStorage.getItem("darkMode");
        if (prefersDarkMode && savedDarkMode === "true") {
          themeMode.dispatch({ type: "DARKMODE" });
        } else {
          themeMode.dispatch({ type: "LIGHTMODE" });
        }
        
        // Check authentication
        const userbytes = localStorage.getItem("user");
        const accessbytes = localStorage.getItem("permissions");
        const usertypebytes = localStorage.getItem("usertype");
        const token = localStorage.getItem("token");

        if (userbytes && accessbytes && usertypebytes && token) {
          try {
            const user = JSON.parse(decryptText(userbytes));
            const permissions = JSON.parse(decryptText(accessbytes));
            const usertype = JSON.parse(decryptText(usertypebytes));

            if (user && permissions && usertype) {
              dispatch({
                type: "LOGIN",
                payload: { user, permissions, usertype, token },
              });
            } else {
              dispatch({ type: "LOGOUT" });
            }
          } catch (error) {
            console.error("Error parsing auth data:", error);
            dispatch({ type: "LOGOUT" });
          }
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        dispatch({ type: "LOGOUT" });
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []); // Empty dependency array - run only once

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeMode}>
          <CssBaseline />
          <MainRoutes />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
