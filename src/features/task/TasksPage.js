import { Stack, Typography, Button, Modal, Box, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTasks } from "./taskSlice";
import RectangleIcon from "@mui/icons-material/Rectangle";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from '@mui/material/Collapse';


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

const TasksPage = () => {
  const { tasksHandle, tasksAssign } = useSelector((state) => state.task);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [openHandleList, setOpenHandleList] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);

  const handleClickOpenHandleList = () => {
    setOpenHandleList(!openHandleList);
  };

  const handleClickOpenAssignList = () => {
    setOpenAssignList(!openAssignList);
  };

  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  const { currentPageTasks, tasksById } = useSelector((state) => state.task);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);
  console.log("tasks", tasks);
  console.log("currentPageTasks", currentPageTasks);

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
      Personal Tasks
    </Typography>,
  ];

  return (
    <Stack sx={{ marginBottom: "700px", marginTop: "5%" }}>
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
          color: "#616161",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "60px",
        }}
        gutterBottom
      >
        Your Task
      </Typography>

      <Button
        onClick={handleOpen}
        sx={{
          maxWidth: "100%",
          width: "15vw",
          fontSize: "20px",
          marginRight: "10px",
          display: "flex",
          alignSelf: "center",
        }}
        size="small"
        variant="contained"
        color="success"
      >
        Create New Task
        {/* <AddIcon /> */}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TaskForm users={users} />
        </Box>
      </Modal>
      <Typography
        sx={{
          color: "#616161",
          fontWeight: "300",
          fontSize: "20px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        ( <b>Note:</b> The color of right bar is display for deadline status
        <Typography
          sx={{
            color: "#616161",
            fontWeight: "300",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          <RectangleIcon
            sx={{
              border: "solid 1px #1c1b1b",
              width: "50px",
              color: "#edf7f2",
              backgroundColor: "#edf7f2",
            }}
          />{" "}
          : More than 10 days left
        </Typography>
        <Typography
          sx={{
            color: "#616161",
            fontWeight: "300",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          <RectangleIcon
            sx={{
              border: "solid 1px #1c1b1b",
              width: "50px",
              color: "#f3f777",
              backgroundColor: "#f3f777",
            }}
          />{" "}
          : Deadline in 5 - 10 days
        </Typography>
        <Typography
          sx={{
            color: "#616161",
            fontWeight: "300",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          <RectangleIcon
            sx={{
              border: "solid 1px #1c1b1b",
              width: "50px",
              color: "#D32F2F",
              backgroundColor: "#D32F2F",
            }}
          />{" "}
          : Less than 5 days left )
        </Typography>
      </Typography>
      <List>
        <ListItemButton onClick={handleClickOpenHandleList}>
          <Typography
            sx={{
              color: "#616161",
              fontWeight: "600",
              fontSize: "40px",
              marginTop: "50px",
              marginBottom: "100px",
              marginLeft: "30px",
            }}
          >
            Task Handler{" "}
          </Typography>
          {openHandleList ? (
            <ExpandLess sx={{ marginLeft: "4%", marginTop: "-2%" }} />
          ) : (
            <ExpandMore sx={{ marginLeft: "4%", marginTop: "-2%" }} />
          )}
        </ListItemButton>
        <Collapse in={openHandleList} timeout="auto" unmountOnExit>
          <TaskList tasks={tasksHandle} />
        </Collapse>
      </List>

      <List>
        <ListItemButton onClick={handleClickOpenAssignList}>
          <Typography
            sx={{
              color: "#616161",
              fontWeight: "600",
              fontSize: "40px",
              marginBottom: "100px",
              marginLeft: "30px",
            }}
          >
            Task Assigner
          </Typography>
          {openAssignList ? (
            <ExpandLess sx={{ marginLeft: "4%", marginTop: "-6%" }} />
          ) : (
            <ExpandMore sx={{ marginLeft: "4%", marginTop: "-6%" }} />
          )}
        </ListItemButton>
        <Collapse in={openAssignList} timeout="auto" unmountOnExit>
          <TaskList tasks={tasksAssign} />
        </Collapse>
      </List>
    </Stack>
  );
};

export default TasksPage;
