import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import UserProfile from "./Components/UserProfile";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Dashboard from "./Components/Dashboard";
import LoginPage from "./Components/LoginPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showHeaderAndSidebar = location.pathname !== "/login";

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: isDarkMode
            ? darkTheme.palette.background.default
            : lightTheme.palette.background.default,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {showHeaderAndSidebar && <Navbar />}
      <Box
        sx={{
          display: "flex",
          flexDirection: showHeaderAndSidebar ? "row" : "column",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {showHeaderAndSidebar && (
          <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        )}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: showHeaderAndSidebar ? "64px" : "0px",
            bgcolor: "background.default",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={authenticated ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/"
              element={authenticated ? <Feed /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/user/:docId"
              element={
                authenticated ? <UserProfile /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
