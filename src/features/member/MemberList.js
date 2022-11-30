import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {departmentQuery} from "../user/userSlice";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Box, Link, Container, Grid, Avatar, Pagination, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { DepartType, MemberType } from "./MemberType";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { departmentType } from "./departmentType";
import { getUsers } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Skeleton from "@mui/material/Skeleton";
import { changePage } from "../user/userSlice";

function MemberList() {
  const { user } = useAuth();
  console.log("user", user);

  // const getAction = (targetUser) => {
  //   const props = {
  //     id: targetUser._id,
  //   };
  //   return {
  //     action: <ActionButton {...props} />,
  //   };
  // };
  // const [expanded, setExpanded] = useState(false);
  // const [next, setNext] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState();
  const [openDepart, setOpenDepart] = React.useState(false);
  const [departItem,setDepartItem] = React.useState();

  const dispatch = useDispatch();
  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  useEffect(() => {
    dispatch(getUsers({ filterName, department: departItem, page: page, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage, departItem]);

  useEffect(() => {
        if (departItem === users?.department) {
          console.log(departItem)
          dispatch(getUsers({ department: departItem }));
      } 
  }, [dispatch,departItem]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          color: "#616161",
          fontWeight: "700",
          // paddingLeft: "2%",
          textAlign: "center",
        }}
        gutterBottom
      >
        Company's Employees
      </Typography>
      {/* <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpenDepart(!openDepart)}
              sx={{
                pt: 2.5,
                color:"#f3e5f5",
                pb: openDepart ? 0 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: openDepart ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Department Filter"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="Department"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: openDepart ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDownIcon
                sx={{
                  opacity: 0,
                  transform: openDepart ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {openDepart &&
              departmentType.map((item) => (
                <ListItemButton
                  onClick={() => setDepartItem(item)}
                  key={item}
                  sx={{ py: 0, minHeight: 40, color: "#f3e5f5" }}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: "light",
                    }}
                  />
                </ListItemButton>
              ))}
            {/* <Divider sx={{ marginTop: 3 }} /> */}
          <Grid
            container
            maxWidth="md"
            spacing={{ xs: 0, md: 4 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
            {users.map((user) => (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "0!important",
                }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
              >
                <Card 
                  component={Link}
                  to={`users/${user._id}`}
                  sx={{
                    width: "12rem",
                    height: "19rem",
                    textDecoration: "none",
                  }}
                  elevation={0}
                >
                  <div
                    style={{
                      borderRadius: 50,
                      padding: 30,
                    }}
                  >
                    <Avatar
                      alt="Missing image"
                      src={`${user?.avatarUrl}`}
                      sx={{ margin: "auto", width: 120, height: 120 }}
                    />
                  </div>
                  <CardContent sx={{ paddingBottom: 0, textAlign:"center" }}>
                    <Typography variant="small" color="#dbabf5" fontWeight="600">
                      {`${user?.employeeId}`}
                    </Typography>
                    <Typography>
                      <Link
                        variant="subtitle2"
                        sx={{ fontWeight: 600 }}
                        component={RouterLink}
                        to={`/users/${user?._id}`}
                      >
                        {user?.name}
                      </Link>
                    </Typography>
                    <Typography variant="small" color="gray">
                      {`${user?.department}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box >
            <Pagination
            page={page}
            onChange={handleChangePage}
            sx={{display:"flex", justifyContent:"center"}}
          />
        </Box>
      {/* </Card> */}
    </Container>
  );
}

export default MemberList;
