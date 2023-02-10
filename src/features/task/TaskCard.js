import {
  Modal,
  Card,
  Divider,
  Button,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { fDate } from "../../utils/formatTime";
import { deleteTask, updatedTaskProfile } from "./taskSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EventIcon from "@mui/icons-material/Event";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
// import UndoIcon from "@mui/icons-material/Undo";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { format } from "date-fns";
import PostFormUpdate from "../post/PostFormUpdate";
import TaskDeleteConfirmation from "./TaskDeleteConfirm";
import _ from "lodash";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PersonIcon from '@mui/icons-material/Person';

function TaskCard({ tasks, task, handleChooseTask, handleChooseEdit }) {
  // console.log("moment(tasks?.deadlineAt)", moment(tasks?.deadlineAt));
  // console.log("moment(tasks?.createdAt)", moment(tasks?.createdAt));
  // console.log(
  //   "moment(tasks?.deadlineAt).diff(moment(tasks?.createdAt)",
  //   moment(tasks?.deadlineAt).diff(moment(tasks?.createdAt), "day", true)
  // );
  console.log("tasks in taskcard", tasks);
  console.log("task", task)


  const { user } = useAuth();
  console.log("user task", user);
  const dispatch = useDispatch();
  const dayLeft = Math.ceil(
    moment(tasks?.deadlineAt)
      .diff(moment(tasks?.createdAt), "day", true)
      .toFixed(1)
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [taskStatus, setTaskStatus] = React.useState("PENDING");

  const isMenuOpen = Boolean(anchorEl);

  const handleClose = () => setOpen(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   dispatch(() => {
  //     dispatch(updatedTaskProfile({status}))
  //   })
  // }, [dispatch, status]);
  const onChangeStatus =(event) => {
    console.log("event",event.target.name)
    dispatch(updatedTaskProfile({ ...tasks, status: event.target.name }));
  };

  const menuId = "option-menu";
  const renderMenuTask = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Button onClick={() => handleChooseTask(task._id)}>Delete Post</Button>
        <Modal>
          <TaskDeleteConfirmation />
        </Modal>
      </MenuItem>

      <MenuItem>
        <Button onClose={handleClose} onClick={() => handleChooseEdit(task)}>
          Edit Task
        </Button>
        <Modal>
          <PostFormUpdate />
        </Modal>
      </MenuItem>
    </Menu>
  );

  return (
    <Card
      sx={{
        padding: "10px",
        mb: "10px",
        boxShadow: "none",
        width: "300px",
        height: "400px",
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
          {tasks?.task_name}
        </Typography>
      </Stack>

      <Typography
        sx={{
          mb: 1.5,
          textDecorationLine: `${
            tasks.status === "DONE" ? "line-through" : ""
          }`,
        }}
        color="text.secondary"
      >
        {tasks?.description}
      </Typography>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <EventIcon style={{ marginRight: "5px", color: "#5B5C5E" }} />
        <Typography color="text.secondary" variant="body2">
          {moment(tasks?.deadlineAt).format("MM DD YYYY")}
        </Typography>
      </Stack>
      <Typography
        sx={{
          mb: 1.5,
          textDecorationLine: `${
            tasks.status === "DONE" ? "line-through" : ""
          }`,
        }}
        color="text.secondary"
      >
        Status: <b>{tasks?.status}</b>
      </Typography>
      <Stack direction="row" alignItems="center" pt={1}>
        <PersonIcon />{tasks?.handler.map((item) => (
          <Typography>{item.name}</Typography>
        ))}
      </Stack>
      <Divider light />
      <FormControl sx={{marginTop:"10px"}} component="fieldset">
        <FormLabel component="legend">Process:</FormLabel>
        <FormGroup aria-label="position">
          <FormControlLabel
            value="PENDING"
            control={<Checkbox />}
            label="PENDING"
            labelPlacement="PENDING"
          />
          <FormControlLabel
            value="WORKING"
            control={<Checkbox name="WORKING" onChange={onChangeStatus} />}
            label="WORKING"
            labelPlacement="WORKING"
          />
          {user?._id === tasks.assigner ? (
            <FormControlLabel
              value="REVIEW"
              control={<Checkbox name="REVIEW" onChange={onChangeStatus} />}
              label="REVIEW"
              labelPlacement="REVIEW"
            />
          ) : (
            <Typography><DoNotDisturbAltIcon /> REVIEW - You can not choose this status</Typography>
          )}
          {user?._id === tasks.assigner ? (
            <FormControlLabel
              value="DONE"
              control={<Checkbox name="DONE" onChange={onChangeStatus} />}
              label="DONE"
              labelPlacement="DONE"
            />
          ) : (
            <Typography><DoNotDisturbAltIcon /> DONE - You can not choose this status</Typography>
          )}
          {user?._id === tasks.assigner ? (
            <FormControlLabel
              value="ARCHIVE"
              control={<Checkbox name="ARCHIVE" onChange={onChangeStatus} />}
              label="ARCHIVE"
              labelPlacement="ARCHIVE"
            />
          ) : (
            <Typography><DoNotDisturbAltIcon /> ARCHIVE - You can not choose this status</Typography>
          )}
        </FormGroup>
      </FormControl>
      {renderMenuTask}
    </Card>
  );
}

export default TaskCard;
