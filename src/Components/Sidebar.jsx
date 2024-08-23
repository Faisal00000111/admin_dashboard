import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { Groups, ModeNight, Summarize } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      p={1}
      sx={{
        display: { xs: "none", sm: "block" },
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: "160vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <Summarize />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <Switch checked={isDarkMode} onChange={toggleDarkMode} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
