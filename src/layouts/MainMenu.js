import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { Divider, List, Card, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";

function MainMenu() {
  const { user } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const handleClickOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#DFE3E8",
        marginLeft: { xs: "6%", md: "20%" },
        width: "84%",
      }}
    >
      <List>
        <ListItemButton onClick={handleClickOpenMenu}>
          <Typography
            sx={{
              color: "#616161",
              fontWeight: "600",
              fontSize: "30px",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "30px",
            }}
          >
            Menu
          </Typography>
          {openMenu ? (
            <ExpandLess sx={{ marginLeft: "4%", marginTop: "-2%" }} />
          ) : (
            <ExpandMore sx={{ marginLeft: "4%", marginTop: "-2%" }} />
          )}
        </ListItemButton>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <MenuItem
            to="/member"
            component={RouterLink}
            sx={{
              mx: 1,
              color: "#5c8072",
              fontSize: "20px",
              fontWeight: "600",
              marginTop: "3%",
              marginRight: "50px",
              marginBottom: "3%",
              "&:hover": { color: "#757575", textDecoration: "none" },
            }}
          >
            Member
          </MenuItem>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MenuItem
            to="/commendation"
            component={RouterLink}
            sx={{
              mx: 1,
              color: "#5c8072",
              fontSize: "20px",
              fontWeight: "600",
              marginTop: "3%",
              marginRight: "50px",
              marginBottom: "3%",
              "&:hover": { color: "#757575", textDecoration: "none" },
            }}
          >
            Honor
          </MenuItem>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MenuItem
            to="/tasks"
            component={RouterLink}
            sx={{
              mx: 1,
              color: "#5c8072",
              fontSize: "20px",
              fontWeight: "600",
              marginTop: "3%",
              marginRight: "50px",
              marginBottom: "3%",
              "&:hover": { color: "#757575", textDecoration: "none" },
            }}
          >
            Task
          </MenuItem>
          <Divider sx={{ borderStyle: "dashed" }} />
          {user?.department === "HR" && (
            <MenuItem
              to="/post-box"
              component={RouterLink}
              sx={{
                mx: 1,
                color: "#5c8072",
                fontSize: "20px",
                fontWeight: "600",
                marginTop: "3%",
                marginRight: "50px",
                marginBottom: "3%",
                "&:hover": { color: "#757575", textDecoration: "none" },
              }}
            >
              Check Post
            </MenuItem>
          )}
        </Collapse>
      </List>
    </Card>
  );
}

export default MainMenu;
