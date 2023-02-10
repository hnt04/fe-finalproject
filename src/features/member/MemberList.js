import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Container,
  Grid,
  Avatar,
  Pagination,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
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
  const [departItem, setDepartItem] = React.useState();

  const dispatch = useDispatch();
  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  console.log("users list", users);

  useEffect(() => {
    dispatch(
      getUsers({
        filterName,
        department: departItem,
        page: page,
        limit: rowsPerPage,
      })
    );
  }, [dispatch, filterName, page, rowsPerPage, departItem]);

  useEffect(() => {
    if (departItem === users?.department) {
      console.log(departItem);
      dispatch(getUsers({ department: departItem }));
    }
  }, [dispatch, departItem]);

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
          fontSize: "60px",
        }}
        gutterBottom
      >
        Company's Employees
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Employee ID</b>
                </TableCell>
                <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                  <b>Name</b>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  <b>Email</b>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  <b>Role</b>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                    width: "20%",
                  }}
                >
                  <b>Department</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <Grid
        container
        maxWidth="lg"
        spacing={{ xs: 0, md: 4 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      > */}
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.employeeId}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={user?.name}
                      src={user?.avatarUrl}
                      sx={{ mr: 2 }}
                    />

                    <Link
                      variant="subtitle2"
                      sx={{ fontWeight: 600 }}
                      component={RouterLink}
                      to={`/users/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.role}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    {user.department}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
<Typography variant="subtitle" sx={{ color: "text.secondary", ml: 1, marginTop:"10px", marginBottom:"10px", display:"flex", justifyContent:"end" }}>
  {totalUsers > 1
    ? `${totalUsers} employees found`
    : totalUsers === 1
    ? `${totalUsers} employee found`
    : "No employee found"}
</Typography>

<Box>
  <Pagination
    page={page}
    onChange={handleChangePage}
    sx={{ display: "flex", justifyContent: "center" }}
  />
</Box>
   </Container>
   );
 }

export default MemberList;
