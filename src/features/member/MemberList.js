import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Container,
  Avatar,
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Divider,
  Card,
  Stack
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchInput from "../../components/SearchInput";
import MenuItem from "@mui/material/MenuItem";

function MemberList() {
  const { user } = useAuth();
  console.log("user", user);

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const [departItem] = React.useState();

  const dispatch = useDispatch();
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.user
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const users = currentPageUsers.map((userId) => usersById[userId]);
  console.log("users list", users);

  useEffect(() => {
    dispatch(
      getUsers({
        filterName,
        department: departItem,
        page: page + 1,
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

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
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
      Member
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
              Commendation Page
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
        <Box sx={{ marginTop: "4%" }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginLeft: "2%" }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Container maxWidth="lg">
            <Box sx={{ overflowX: "auto" }}>
              <TableContainer sx={{ minWidth: 800, marginTop: "2%" }}>
                <SearchInput handleSubmit={handleSubmit} />

                <Table sx={{ marginTop: "4%" }}>
                  <TableHead
                    sx={{
                      marginTop: "2%",
                      paddingTop: "2%",
                      backgroundColor: "#800055",
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <b>Employee ID</b>
                      </TableCell>
                      <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                        <b>Name</b>
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <b>Email</b>
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
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
                  <TableBody
                    sx={{ marginTop: "2%", border: "2px dashed #800055" }}
                  >
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        hover
                        sx={{ marginTop: "2%", border: "2px dashed #800055" }}
                      >
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
            <Typography
              variant="subtitle"
              sx={{
                color: "text.secondary",
                ml: 1,
                marginTop: "20px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              {totalUsers > 1
                ? `${totalUsers} employees found`
                : totalUsers === 1
                ? `${totalUsers} employee found`
                : "No employee found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: "center",
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 20]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MemberList;
