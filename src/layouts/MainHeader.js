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
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


import SearchInput from "../components/SearchInput";
import AuthRequiredHR from "../routes/AuthRequiredHR";

function MainHeader() {
  const { user, logout } = useAuth();
  console.log("user",user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "250px",
      marginTop:"10px",
      width: "700px",
      height:"50px",
      borderRadius:"28px"
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        marginTop:"7px",
        fontWeight:300,
        width: "700px",
      },
    },
  }));

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
      sx={{marginTop:"8px"}}
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
         <Typography variant="subtitle2" noWrap sx={{ mx: 1, color:"#f3e5f5"}}>
           Hello {user?.name}!
         </Typography>
       </Box> 

      <Divider sx={{ borderStyle: "dashed" }} />

     <MenuItem
        onClick={handleMenuClose}
        to="/me"
        component={RouterLink}
        sx={{ mx: 1, color:"#f3e5f5"}}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1, color:"#f3e5f5" }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/tasks/me"
        component={RouterLink}
        sx={{ mx: 1,color:"#f3e5f5" }}
      >
        My Task
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/users"
        component={RouterLink}
        sx={{ mx: 1, color:"#f3e5f5" }}
      >
        Company's Member
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleMenuClose}
          to="/register"
          component={RouterLink}
          sx={{ mx: 1,color:"#f3e5f5" }}
        >
          Register
        </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1,color:"#f3e5f5" }}>
        Logout
      </MenuItem>
    </Menu>
  );
  console.log("renderMenu-Header",renderMenu)

  return user && (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent" sx={{backgroundColor:"#4a148c", height:"74px"}}>
        <Toolbar >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton> */}
          <Typography>
            <RouterLink to="/">
              <Typography variant="h4"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, color:"#f3e5f5", marginTop:"10px", fontWeight:700 }}>Company Private Social</Typography></RouterLink>
          </Typography>
          {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
              
                // name="q"
                placeholder="Search"
                // defaultValue={q ?? undefined}
                // inputProps={{ "arial-label": "search" }}
              />
            </Search> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <CircleNotificationsIcon sx={{ width: 56, height: 56, marginTop:"16px", marginRight:"12px", color:"#f3e5f5" }} />
          </Box> 

          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              // src={user?.avatarUrl}
              // alt={user?.name}
              sx={{ width: 44, height: 44, marginTop:"10px" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
