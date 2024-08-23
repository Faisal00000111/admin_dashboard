import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import UserProfile from "./Components/UserProfile";
import { Stack } from "@mui/system";
import { lightTheme, darkTheme } from "./theme";
import Dashboard from "./Components/Dashboard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar />
        <Stack direction={"row"} justifyContent="space-between">
          <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/user/:docId" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Stack>
      </Router>
    </ThemeProvider>
  );
}

export default App;
