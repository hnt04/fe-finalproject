import React, { useEffect, useState } from "react";
import _ from "lodash";
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
import { getTaskOfId } from "./taskSlice";


function TaskList({ tasks }) {

  console.log("tasks", tasks);

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
            maxWidth="auto"
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
        {tasks.map((task) => {
          return (
            <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height:"50%",

                }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
            <Card
              sx={{
                p: 3,
                backgroundColor: "background",
                boxShadow: "none",
                maxHeight: "100vh",
                marginLeft:"10%",
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
