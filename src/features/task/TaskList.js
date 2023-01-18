import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { getTaskOfId, updatedTaskProfile } from "./taskSlice";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
// import { updateUserProfile } from "../user/userSlice";
// import PostDeleteConfirmation from "../post/PostDeleteConfirm";
// import PostFormUpdate from "../post/PostFormUpdate";

function TaskList({ tasks }) {
  // const { tasks } = useSelector((state) => state.task);
  // console.log("tasks",tasks)
  console.log("tasks", tasks);
  // console.log("taskHandle",tasksHandle)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskOfId());
  }, [dispatch]);

    const [openMenu, setOpenMenu] = React.useState(false);
    const [chosenIdTask, setChosenIdTask] = useState(null);
    const [openEditTask, setOpenEditTask] = React.useState(false);
    const [chosenTask, setChosenTask] = useState(null)

    const handleChooseTask = (id)=> {
      setOpenMenu(true)
      setChosenIdTask(id)
  }

    const handleChooseEdit = (task)=> {
      setOpenEditTask(true)
      setChosenTask(task)
  }

  return (
    <Grid
            container
            maxWidth="2000px"
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
        {tasks.map((task) => {
          return (
            <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // marginBottom:"100px"
                  // paddingLeft: "0!important",
                  height:"600px",
                  
                }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
              >
            <Card
              sx={{
                p: 3,
                backgroundColor: "background",
                boxShadow: "none",
                maxHeight: "100vh",
                color: "#616161",
              }}
            >
              <TaskCard
                tasks={task}
                handleChooseEdit={handleChooseEdit}
                handleChooseTask={handleChooseTask}
              />
            </Card>
            </Grid>
          );
        })}
      
    </Grid>
  );
}

export default TaskList;
