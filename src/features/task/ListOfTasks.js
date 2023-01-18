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
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function ListOfTask({tasks}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 1500, marginTop:"50px", marginLeft:"20%"}}
      component="nav"
      // aria-labelledby="nested-list-subheader"
    >
      {tasks.map((task) => {
        return (
          <>
            <ListItemButton onClick={handleClick} sx={{color:"#f08c1a",fontWeight:"900",fontSize:"24px"}}>
              {task?.task_name}
              <ListItemText  />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Typography sx={{color:"#616161",fontWeight:"600", fontSize:"20px"}}>
                    Description: {task?.description}
                  </Typography>
                </ListItemButton>
              </List>
              
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Typography sx={{color:"#bd4631",fontWeight:"600", fontSize:"20px"}}>
                    Status: {task?.status}
                  </Typography>
                  <ListItemText />
                </ListItemButton>
              </List>

              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Typography sx={{color:"#616161",fontWeight:"600", fontSize:"20px"}}>
                    DeadlineAt: {task?.deadlineAt}
                  </Typography>
                  <ListItemText />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
}

export default ListOfTask;
