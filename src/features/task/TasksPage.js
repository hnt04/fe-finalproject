import {
  Stack,
  Typography,
  Button,
  Modal,
  Box,
  List,
  Grid,
  Divider,
  Card,
} from "@mui/material";
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
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../hooks/useAuth";

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
  const { user } = useAuth();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openHandleList, setOpenHandleList] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);

  const handleClickOpenHandleList = () => {
    setOpenHandleList(!openHandleList);
  };

  const handleClickOpenAssignList = () => {
    setOpenAssignList(!openAssignList);
  };

  const handleClickOpenMore = () => {
    setOpenMore(!openMore);
  };

  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  const { currentPageTasks, tasksById } = useSelector((state) => state.task);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks({ page: page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

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
    <Grid container spacing={3} sx={{ paddingTop: "2%", marginLeft: "-2%" }}>
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
        <Stack spacing={3} sx={{ marginLeft: "4vw", marginTop: "4vh" }}>
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
          >
            Your Task
          </Typography>
          <List>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "center"}}
              onClick={handleClickOpenMore}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#616161",
                  fontWeight: "500",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {" "}
                More
              </Typography>
              {openMore ? (
                <ExpandLess sx={{ marginLeft: "4%", marginTop: "0%" }} />
              ) : (
                <ExpandMore sx={{ marginLeft: "4%", marginTop: "0%" }} />
              )}
              <Collapse in={openMore} timeout="auto" unmountOnExit>
                <Card
                  sx={{
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={handleOpen}
                    sx={{
                      marginLeft: "32%",
                      maxWidth: "40%",
                      width: { xs: "50vw", md: "15vw" },
                      fontSize: "20px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                    size="small"
                    variant="contained"
                    color="success"
                  >
                    Create Task
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
                      marginTop: "5%",
                    }}
                  >
                    ( <b>Note:</b> The color of right bar is display for
                    deadline status
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
                </Card>
              </Collapse>
            </ListItemButton>
          </List>
          <List>
            <ListItemButton onClick={handleClickOpenHandleList}>
              <Typography
                sx={{
                  color: "#405c53",
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
                  color: "#405c53",
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
      </Grid>
    </Grid>
  );
};

export default TasksPage;
