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
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { format } from "date-fns";
import PostFormUpdate from "../post/PostFormUpdate";
import TaskDeleteConfirmation from "./TaskDeleteConfirm";
import _ from "lodash";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PersonIcon from "@mui/icons-material/Person";

function TaskCard({ tasks, task, handleChooseTask, handleChooseEdit }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const dayLeft = Math.ceil(
    moment(tasks?.deadlineAt)
      .diff(moment(tasks?.createdAt), "day", true)
      .toFixed(1)
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [taskStatus, setTaskStatus] = React.useState({
    WORKING: true,
    REVIEW: false,
    PENDING: false,
    DONE: false,
    ARCHIVE:false
  });

  const isMenuOpen = Boolean(anchorEl);

  const handleClose = () => setOpen(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onChangeStatus = (event) => {
    console.log("event", event.target.name);
    dispatch(updatedTaskProfile({ ...tasks, status: event.target.name }));
  };

  const { WORKING, REVIEW, PENDING, DONE, ARCHIVE } = taskStatus;
  const error = [WORKING, REVIEW, PENDING, DONE, ARCHIVE].filter((v) => v).length !== 2;

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
        paddingLeft: "8%",
        paddingBottom:"8%",
        paddingTop:"8%",
        mb: "10px",
        boxShadow: "30",
        width: "44em",
        height: "auto",
        backgroundColor: `${tasks.status === "ARCHIVE" ? "#E6EEFF" : "#ffff"}`,
        borderLeft: `${
          tasks?.status !== "ARCHIVE"
            ? dayLeft > 10
              ? "12px solid #edf7f2"
              : dayLeft > 5
              ? "12px solid #f3f777"
              : "12px solid #D32F2F"
            : ""
        }`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" position="relative" sx={{paddingTop:"1%"}}>
        <Typography
          sx={{
            mb: 1.5,
            fontSize:"20px",
            fontWeight:"600",
            textDecorationLine: `${
              tasks?.status === "ARCHIVE" ? "line-through" : ""
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
            tasks.status === "ARCHIVE" ? "line-through" : ""
          }`,
        }}
        color="text.secondary"
      >
        {tasks?.description}
      </Typography>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <EventIcon style={{ marginRight: "5px", color: "#5B5C5E" }} />
        <Typography color="text.secondary" variant="body2">
        {moment(tasks?.createdAt).format("MM DD YYYY")} - {moment(tasks?.deadlineAt).format("MM DD YYYY")}
        </Typography>
      </Stack>
      <Typography
        sx={{
          mb: 1.5,
          textDecorationLine: `${
            tasks.status === "ARCHIVE" ? "line-through" : ""
          }`,
        }}
        color="text.secondary"
      >
        Status: <b>{tasks?.status}</b>
      </Typography>
      <Stack direction="row" alignItems="center" pt={1}>
        {tasks?.handler.map((item) => (
          <Avatar title={`${item.name}`}>{item.avatarUrl}</Avatar>
        ))}
      </Stack>
      <Card
        sx={{
          backgroundColor: `${tasks.status === "ARCHIVE" ? "#E6EEFF" : "#ffff"}`,
          position: "absolute",
          marginTop: "-32%",
          marginLeft: "60%",
          boxShadow:"0"
        }}
      >
        <FormControl
          sx={{ marginTop: "10px" }}
          component="fieldset"
          error={error}
        >
          <FormLabel component="legend">Process:</FormLabel>
          <RadioGroup aria-label="position">
            <FormControlLabel
              value="PENDING"
              control={<Radio name="PENDING" onChange={onChangeStatus} />}
              label="PENDING"
              labelPlacement="PENDING"
            />
            <FormControlLabel
              value="WORKING"
              control={<Radio name="WORKING" onChange={onChangeStatus} />}
              label="WORKING"
              labelPlacement="WORKING"
            />
            {user?._id === tasks.assigner ? (
              <FormControlLabel
                value="REVIEW"
                control={<Radio name="REVIEW" onChange={onChangeStatus} />}
                label="REVIEW"
                labelPlacement="REVIEW"
              />
            ) : (
              <Typography>
                <DoNotDisturbAltIcon /> REVIEW - You can not choose this status
              </Typography>
            )}
            {user?._id === tasks.assigner ? (
              <FormControlLabel
                value="DONE"
                control={<Radio name="DONE" onChange={onChangeStatus} />}
                label="DONE"
                labelPlacement="DONE"
              />
            ) : (
              <Typography>
                <DoNotDisturbAltIcon /> DONE - You can not choose this status
              </Typography>
            )}
            {user?._id === tasks.assigner ? (
              <FormControlLabel
                value="ARCHIVE"
                control={<Radio name="ARCHIVE" onChange={onChangeStatus} />}
                label="ARCHIVE"
                labelPlacement="ARCHIVE"
              />
            ) : (
              <Typography>
                <DoNotDisturbAltIcon /> ARCHIVE - You can not choose this status
              </Typography>
            )}
          </RadioGroup>
        </FormControl>
      </Card>
      {renderMenuTask}
    </Card>
  );
}

export default TaskCard;
