import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { Groups, ModeNight, Summarize } from "@mui/icons-material"
import React from "react";

const Sidebar = () => {
  return (
    <Box
      flex={1}
      p={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <List>
      <ListItem disablePadding>
          <ListItemButton component="a" href="#manageUsers">
            <ListItemIcon>
              <Groups/>
            </ListItemIcon>
            <ListItemText primary="Manage users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#summary">
            <ListItemIcon>
              <Summarize/>
            </ListItemIcon>
            <ListItemText primary="summary" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#summary">
            <ListItemIcon>
              <ModeNight/>
            </ListItemIcon>
            <Switch/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
