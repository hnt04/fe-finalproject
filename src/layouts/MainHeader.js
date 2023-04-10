import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const mainMenuOpen = Boolean(anchorElMenu);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{ marginTop: "8px" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap sx={{ mx: 1, color: "#616161" }}>
          Hello {user?.name}!
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1, color: "#616161" }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      {user?.department === "HR" && (
        <MenuItem
          onClick={handleMenuClose}
          to="/register"
          component={RouterLink}
          sx={{ mx: 1, color: "#616161" }}
        >
          Register
        </MenuItem>
      )}

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1, color: "#616161" }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    user && (
      <Box sx={{ mb: 3 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{
            backgroundColor: "rgba(0,0,0,0.1)",
            width: "100%",
            borderRadius: "0 0 20px 20px",
            position: "fixed",
            zIndex: "2",
            border: "1px solid green",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Logo />
            </IconButton>
            <Typography>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    color: "#119656",
                    marginTop: "10px",
                    fontWeight: 700,
                  }}
                >
                  TyCorp Social
                </Typography>
              </RouterLink>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Avatar
                src={user?.avatarUrl}
                onClick={handleProfileMenuOpen}
                sx={{
                  width: 44,
                  height: 44,
                  marginTop: "2px",
                  marginLeft: "50px",
                }}
              />
            </Box>
            
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    )
  );
}

export default MainHeader;
