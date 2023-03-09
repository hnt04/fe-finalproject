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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchInput from "../../components/SearchInput";

function MemberList() {
  const { user } = useAuth();
  console.log("user", user);

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [filterDepart, setFilterDepart] = useState([]);
  const [filterRole, setFilterRole] = useState([]);

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
    <Container maxWidth="lg" sx={{ marginTop: "5%" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginLeft: {xs:"10%", md:"-10vw"} }}
      >
        {breadcrumbs}
      </Breadcrumbs>
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
            <TableBody sx={{ marginTop: "2%", border: "2px dashed #800055" }}>
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
  );
}

// function applyFilter(products, filters) {
//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     filteredProducts = products.filter((product) =>
//       filters.gender.includes(product.gender)
//     );
//   }
//   if (filters.category !== "All") {
//     filteredProducts = products.filter(
//       (product) => product.category === filters.category
//     );
//   }
//   return filteredProducts;
// }

export default MemberList;
