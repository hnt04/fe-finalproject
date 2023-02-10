import React from "react";
import {
  MenuList,
  Divider,
  Paper,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

function MainBody() {
  const FixedMenu = styled("div")(({ theme }) => ({
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ece4f2",
    height: "50vh",
    width: "20vw",

    // marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: "-24vw",
    //   marginTop:"10px",
    //   width:"200px",
    //   height:"50px",
    //   borderRadius:"28px"
    // },
  }));

  return (
    <Grid 
      sx={{ 
        display: { xs: "none", md: "flex" },
        flexDirection: "space-between",
      }}
    >
      {/* <Grid container sx={{backgroundColor:"#ffff"}} columnSpacing={{ xs: 1, sm: 2}}> */}
      <Paper sx={{ marginLeft: "0", borderRadius: "28px" }}>
        <FixedMenu>
          <MenuList>
            <MenuItem>
              {/* <ListItemIcon>
                        <ContentCut fontSize="small" />
                    </ListItemIcon> */}
              {/* <ListItemText>Cut</ListItemText> */}
              <RouterLink to="/member">
                <Typography
                  color="#757575"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginTop: "3%",
                    marginLeft: "5%",
                    marginBottom: "3%",
                    "&:hover": { color: "#4a148c" },
                  }}
                >
                  Member
                </Typography>
              </RouterLink>
            </MenuItem>
            <Divider />
            <MenuItem>
              {/* <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon> */}
              {/* <ListItemText>Copy</ListItemText> */}
              <RouterLink to="/commendation">
                <Typography
                  color="#757575"
                  sx={{
                    textDecoration:"none",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginTop: "3%",
                    marginLeft: "5%",
                    marginBottom: "3%",
                    "&:hover": { color: "#4a148c" },
                  }}
                >
                  Commendation Board
                </Typography>
              </RouterLink>
            </MenuItem>
            <Divider />
            <MenuItem>
              {/* <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText> */}
              <RouterLink to="/tasks">
                <Typography
                  color="#757575"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginTop: "3%",
                    marginLeft: "5%",
                    marginBottom: "3%",
                    "&:hover": { color: "#4a148c" },
                  }}
                >
                  Task
                </Typography>
              </RouterLink>
            </MenuItem>
            <Divider />
          </MenuList>
        </FixedMenu>
      </Paper>
      {/* </Grid> */}
      <Grid maxWidth="100%" maxHeight="100%" sx={{width:"100%",height:"100%"}}>
        <Outlet maxWidth="100%" maxHeight="100%" sx={{width:"100%",height:"100%"}}/>
      </Grid>
    </Grid>
  );
}

export default MainBody;
