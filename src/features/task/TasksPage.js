import { Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import TaskList from "./TaskList";

const TasksPage = () => {
  const { tasksHandle, tasksAssign } = useSelector((state) => state.task);

  return (
    <Stack             sx={{marginBottom:"700px"}}
    >
      <Typography
        sx={{ color: "#616161", fontWeight: "600", fontSize: "40px", marginBottom:"100px" }}
      >
        Task Handler
      </Typography>
      <TaskList tasks={tasksHandle} />
      <Typography
        sx={{ color: "#616161", fontWeight: "600", fontSize: "40px",marginBottom:"100px" }}
      >
        Task Assigner
      </Typography>
      <TaskList tasks={tasksAssign} />
    </Stack>
  );
};

export default TasksPage;
