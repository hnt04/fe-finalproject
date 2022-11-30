import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  Stack,
  Modal,
  Typography,
  MenuItem,
  TablePagination,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import ActionButton from "../user/ActionButton";
import UserTable from "../user/UserTable";
// import AuthRequiredHR from "../../routes/AuthRequiredHR";
import useAuth from "../../hooks/useAuth";
import { getUsers } from "../user/userSlice";
// import SearchInput from "../../components/SearchInput";
// import UserCard from "../user/UserCard";

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

function CommendationBoardPage() {
  const { user } = useAuth();
  console.log("user1", user);
  const [open, setOpen] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [commendationAction, setCommendationAction] = useState(false);

  const dispatch = useDispatch();
  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEmployee = () => {
    setCommendationAction(true)
  };

  const handleDeleteEmployee = () => {
    setCommendationAction(false)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  // useEffect(() => {
  //   dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
  // }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Stack width="100%">
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
        Best Employee Of Month
      </Typography>
      <Button
        onClick={handleOpen}
        sx={{
          width: "20px",
          fontSize: "20px",
          marginRight: "10px",
          display: "flex",
          alignSelf: "center",
        }}
        size="small"
        variant="contained"
        color="success"
      >
        Add
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {user?.department === "HR" ? (
            <UserTable users={users} />
          ) : (
            <h1>You can not add Employee</h1>
          )}
        </Box>
      </Modal>
      
          {/* <UserCard users={users} /> */}
    </Stack>
  );
}

export default CommendationBoardPage;
