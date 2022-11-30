import React from "react";
import { Table, TableHead, Avatar, TableRow, TableBody, TableCell, Link, TableContainer, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";

function UserTable({ users }) {
  const { user } = useAuth();
  // console.log("user table",user)

  const getAction = (targetUser) => {
    const props = {
      id: targetUser._id,
    };
    return {
      action: <ActionButton {...props} />,
    };
  };
console.log("users",users)

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Role
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Department
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => {
              const { action } = getAction(user);
              console.log("user action",user)
              return (
                <TableRow key={user?._id} hover>
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
                      {user?.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user?.role}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user?.department}
                  </TableCell>
                  <TableCell align="left">{action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserTable;