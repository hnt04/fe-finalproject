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
import ListItemButton from "@mui/material/ListItemButton";
import { LoadingButton } from "@mui/lab";
import { getCommendations } from "./commendationSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CommendationsEachMonth from "./CommendationsEachMonth";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";


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

const monthOfYear = [
  { id: "January", name: "January" },
  { id: "February", name: "February" },
  { id: "March", name: "March" },
  { id: "April", name: "April" },
  { id: "May", name: "May" },
  { id: "June", name: "June" },
  { id: "July", name: "July" },
  { id: "August", name: "August" },
  { id: "September", name: "September" },
  { id: "October", name: "October" },
  { id: "November", name: "November" },
  { id: "December", name: "December" },
];

function CommendationsBoardPage() {
  const { user } = useAuth();
  console.log("user1", user);
  const [open, setOpen] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState();

  const dispatch = useDispatch();

  const { currentPageCommendations, commendationsById, isLoading,totalCommendations } = useSelector(
    (state) => state.commendation
  );
console.log("currentPageCommendations",currentPageCommendations)

  const { currentPageUsers, usersById } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  console.log("usersById", usersById);

  // const commendation = commendationsList.map(())

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  const [mth, setMth] = useState(() => {
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

  const commendations = currentPageCommendations.map((month) => commendationsById[month])
  console.log("commendations page",commendations)
  
  useEffect(() => {
    console.log("month", mth);
    dispatch(getCommendations(mth));
  }, [dispatch, mth]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <Stack width="100%">
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
        Edit
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

      <Stack
        container
        spacing={2}
        sx={{ marginLeft: "20%" }}
      >
          {commendations.map((commendation) =>(
            <>
            <Typography sx={{ marginTop:"20px",color: "#616161", fontWeight: "600", fontSize: "40px" }}>
            {commendation.month}</Typography>
          
          <CommendationsEachMonth commendation={commendation} users={users} />
          </>))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalCommendations ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalCommendations) && commendations.length >= totalCommendations}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No More</Typography>
        )}
      </Box>
    </Stack>
  );
}

export default CommendationsBoardPage;
