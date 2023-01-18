import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getTasks, updatedTaskProfile } from "./taskSlice";
import { useSelector } from "react-redux";
import {
  Modal,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import Popup from "./Popup";
import AddIcon from "@mui/icons-material/Add";

import ListOfTask from "./ListOfTasks";

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

function TaskAllList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = useState(false);

  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  const { currentPageTasks, tasksById } = useSelector((state) => state.task);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);
  console.log("tasks", tasks);
  console.log("currentPageTasks",currentPageTasks)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks({ page: page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  console.log("currentPageTasks", currentPageTasks);
  console.log("tasksById", tasksById);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Typography
        variant="h4"
        sx={{
          color: "#616161",
          fontWeight: "700",
          textAlign: "center",
          fontSize:"60px"
        }}
        gutterBottom
      >
        Company's Tasks
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
        <AddIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TaskForm users={users} />
        </Box>
      </Modal>

      <ListOfTask  tasks={tasks} />
    </Stack>
  );
}

export default TaskAllList;
