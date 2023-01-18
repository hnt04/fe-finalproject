import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Box, Link, Container, Grid, Avatar, Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";
import Skeleton from "@mui/material/Skeleton";

function MemberList() {
  const { user } = useAuth();
  console.log("user", user);

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
  console.log("users list",users)

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
          fontSize:"60px"
        }}
        gutterBottom
      >
        Company's Employees
      </Typography>
     
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
                    <Typography variant="small" color="#4a148c" fontWeight="600">
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
