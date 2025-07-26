/** Primary Import Declaration */
import React, {
  useEffect,
  useContext,
  useState,
  useReducer,
  useMemo,
  useCallback,
} from "react";

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
import { decryptText } from "./CommonMethods/Encryption.js";
import MainRoutes from "./Template/MainRoutes.jsx";
import { debugRender, logError, measurePerformance } from "./CommonMethods/DebugUtils.js";

// Memoized loading component
const LoadingSpinner = React.memo(() => {
  debugRender('LoadingSpinner');
  return (
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
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default function App(props) {
  debugRender('App');
  
  /** State and Reducer for Authentication Context */
  const initialState = {
    isAuthenticated: false,
    user: null,
    permissions: null,
    usertype: null,
    token: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  
  /** State and Reducer for Theme Context */
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;

  // Memoized theme to prevent unnecessary re-renders
  const theme = useMemo(() => {
    return measurePerformance('Theme Creation', () => darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  // Memoized auth context value
  const authContextValue = useMemo(() => ({ state, dispatch }), [state]);

  // Memoized verification function - removed dependencies to prevent infinite loop
  const verifyAuth = useCallback(() => {
    return measurePerformance('Auth Verification', () => {
      try {
        const userbytes = localStorage.getItem("user") && decryptText(localStorage.getItem("user"));
        const user = userbytes ? JSON.parse(userbytes) : null;
        
        const accessbytes = localStorage.getItem("permissions") && decryptText(localStorage.getItem("permissions"));
        const permissions = accessbytes ? JSON.parse(accessbytes) : null;
        
        const usertypebytes = localStorage.getItem("usertype") && decryptText(localStorage.getItem("usertype"));
        const usertype = usertypebytes ? JSON.parse(usertypebytes) : null;
        
        const token = localStorage.getItem("token");

        if (user && permissions && usertype && token) {
          dispatch({
            type: "LOGIN",
            payload: {
              user,
              permissions,
              token,
              usertype,
            },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        logError(error, 'Auth Verification');
        dispatch({ type: "LOGOUT" });
      }
    });
  }, []); // Empty dependency array to prevent infinite loop

  useEffect(() => {
    // Set theme based on preference
    if (prefersDarkMode && localStorage.getItem("darkMode") === "true") {
      themeMode.dispatch({ type: "DARKMODE" });
    } else {
      themeMode.dispatch({ type: "LIGHTMODE" });
    }
    
    // Verify authentication
    verifyAuth();
    setLoading(false);
  }, []); // Empty dependency array to run only once on mount

  // Early return for loading state
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
