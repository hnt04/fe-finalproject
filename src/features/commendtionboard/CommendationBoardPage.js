import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Modal,
  Typography,
  Grid,
  Divider,
  Card,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../user/UserTable";
import useAuth from "../../hooks/useAuth";
import { getUsers } from "../user/userSlice";
import { LoadingButton } from "@mui/lab";
import { getCommendations } from "./commendationSlice";
import CommendationsEachMonth from "./CommendationsEachMonth";
import moment from "moment";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "#ffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CommendationsBoardPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [filterName] = useState("");
  const [rowsPerPage] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();

  const {
    currentPageCommendations,
    commendationsById,
    isLoading,
    totalCommendations,
  } = useSelector((state) => state.commendation);

  const { currentPageUsers, usersById } = useSelector((state) => state.user);

  const users = currentPageUsers.map((userId) => usersById[userId]);

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  const [mth] = useState(() => {
    const currentMonth = moment().month();
    switch (currentMonth) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "January";
    }
  });

  const commendations = currentPageCommendations.map(
    (month) => commendationsById[month]
  );

  useEffect(() => {
    dispatch(getCommendations(mth));
  }, [dispatch, mth]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const breadcrumbs = [
    <RouterLink
      underline="hover"
      color="inherit"
      to="/"
      style={{ textDecoration: "none" }}
    >
      <Typography>HomePage</Typography>
    </RouterLink>,
    <Typography key="3" color="text.primary">
      Honor
    </Typography>,
  ];

  return (
    <Grid container spacing={3} sx={{ padding: "2%" }}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            width: "70%",
            marginTop: "4vh",
            marginLeft: "4vw",
            paddingBottom: "4vh",
            paddingTop: "4vh",
          }}
        >
          <Stack spacing={3} sx={{ marginLeft: "2vw", marginRight: "2vw" }}>
            <MenuItem
              to="/member"
              component={RouterLink}
              sx={{
                mx: 1,
                color: "#5c8072",
                fontSize: "20px",
                fontWeight: "600",
                marginTop: "3%",
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
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack width="100%" sx={{ marginTop: "5%" }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginLeft: "2%" }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "900",
              // paddingLeft: "2%",
              textAlign: "center",
              fontSize: "70px",
              marginTop: "5%",
              fontFamily:"Lucida Handwriting"
            }}
          >
            HONOR
            {user?.department === "HR" && (
              <IconButton onClick={handleOpen}>
                <PersonAddAltIcon
                  sx={{
                    fontSize: "50px",
                    marginLeft: "20px",
                    "&:hover": { color: "green" },
                  }}
                />
              </IconButton>
            )}
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <UserTable users={users} />
              </Box>
            </Modal>
          </Typography>

          <Stack container spacing={2}>
            {commendations.map((commendation) => (
              <>
                <Typography
                  sx={{
                    marginTop: "5%",
                    color: "#ffff",
                    paddingLeft:"2%",
                    paddingTop:"0.5%",
                    paddingBottom:"0.5%",
                    borderRadius:"40px 0 0 40px",
                    fontWeight: "600",
                    fontSize: "30px",
                    width:"24%",
                    marginLeft: "-3%",
                    backgroundImage: "linear-gradient(to right, #0ffa61, #77fca5)",
                    position: "relative",
                    // MozTransform:"rotate(60deg)",WebkitTransform:"rotate(60deg)",
                    // msTransform:"rotate(60deg)",
                    // transform:"rotate(60deg)",
                    zIndex:"2"
                  }}
                >
                  {commendation.month} - {commendation.year} <LocalFireDepartmentIcon sx={{fontSize:"30px"}} />
                </Typography>

                <Stack
                  sx={{
                    boxShadow:"16",
                    position: "absolute",
                    paddingTop:"3%",
                    width: "62%",
                    marginLeft: "5%",
                    marginTop: "2%! important",
                    backgroundColor:"#DFE3E8"
                  }}
                >
                  <CommendationsEachMonth
                    commendation={commendation}
                    users={users}
                  />
                </Stack>
              </>
            ))}
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {totalCommendations ? (
              <LoadingButton
                variant="outlined"
                size="small"
                loading={isLoading}
                onClick={() => setPage((page) => page + 1)}
                disabled={
                  Boolean(totalCommendations) &&
                  commendations.length >= totalCommendations
                }
              >
                Load more
              </LoadingButton>
            ) : (
              <Typography variant="h6">No More</Typography>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CommendationsBoardPage;
