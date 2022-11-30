import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { fDate } from "../../utils/formatTime";
import { deleteTask, updatedTaskProfile } from "./taskSlice";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventIcon from "@mui/icons-material/Event";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
// import UndoIcon from "@mui/icons-material/Undo";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ReviewsIcon from '@mui/icons-material/Reviews';

function TaskCard({ users, tasks }) {
  // console.log("user task",user)
  const { user } = useAuth();
  console.log("user task", user)
  const dispatch = useDispatch();
  const dayLeft = Math.ceil(
    moment(tasks?.deadlineAt).diff(moment(tasks?.createdAt), "day", true).toFixed(1)
  );
  return (
    <Card
      sx={{
        padding: "10px",
        mb: "10px",
        boxShadow: "none",
        backgroundColor: `${tasks.status === "DONE" ? "#e3e6eb" : ""}`,
        borderRight: `${
          tasks?.status !== "DONE"
            ? dayLeft > 10
              ? "12px solid #edf7f2"
              : dayLeft > 5
              ? "12px solid #f3f777"
              : "12px solid #D32F2F"
            : ""
        }`,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{
            mb: 1.5,
            textDecorationLine: `${
              tasks?.status === "DONE" ? "line-through" : ""
            }`,
          }}
          color="#616161"
        >
          {tasks?.name}
        </Typography>

        {tasks?.status === "PENDING" ? (
          `${tasks?.handler === user?.department ? (
            <IconButton
              color="error"
              aria-label="review"
              onClick={() => dispatch(updatedTaskProfile(tasks._id, "WORKING"))}
            >
              <DragHandleIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              color="success"
              aria-label="delete"
              onClick={() => dispatch(deleteTask(tasks._id))}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}`
        ) : tasks?.status === "WORKING" ? (
          `${tasks?.handler === user?.department ? (
            <Stack direction="row">
              {/* <IconButton
                color="warning"
                aria-label="working"
                onClick={() => dispatch(updatedTaskProfile(task._id, "PENDING"))}
              >
                <UndoIcon fontSize="small" />
              </IconButton> */}
              <IconButton
                color="success"
                aria-label="review"
                onClick={() => dispatch(updatedTaskProfile(tasks._id, "REVIEW"))}
              >
                <ReviewsIcon fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <VisibilityIcon color="warning" aria-label="review" />
          )}`
        ) : tasks?.status === "REVIEW" ? (
          `${tasks?.handler !== user?.department ? (
            <Stack direction="row">
              <IconButton
                color="warning"
                aria-label="review"
                onClick={() => dispatch(updatedTaskProfile(tasks._id, "WORKING"))}
              >
                <DragHandleIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="success"
                aria-label="review"
                onClick={() => dispatch(updatedTaskProfile(tasks._id, "DONE"))}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <VisibilityIcon color="warning" aria-label="review" />
          )}`
        ) : 
          `${tasks?.handler !== user?.department ? (
            <Stack direction="row">
              <IconButton
                color="warning"
                aria-label="review"
                onClick={() => dispatch(updatedTaskProfile(tasks._id, "ARCHIVE"))}
              >
                <DoneAllIcon fontSize="small" />
              </IconButton>
              </Stack>
        ) : (
          ""
        )}`
        }
      </Stack>

      <Typography
        sx={{
          mb: 1.5,
          textDecorationLine: `${tasks.status === "DONE" ? "line-through" : ""}`,
        }}
        color="text.secondary"
      >
        {tasks?.description}
      </Typography>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <EventIcon style={{ marginRight: "5px", color: "#5B5C5E" }} />
        <Typography color="text.secondary" variant="body2">
          {fDate(tasks?.deadlineAt)}
        </Typography>
      </Stack>
      <Divider light />
      <Stack direction="row" alignItems="center" pt={1}>
        <Avatar
          alt={user?.name}
          src={user?.avatarUrl}
          style={{ marginRight: 10 }}
        />
        {user?.name}
      </Stack>
    </Card>
  );
}

export default TaskCard;
