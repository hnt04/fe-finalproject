import React,{useState} from "react";
import {Button, MenuItem, Modal} from "@mui/material";
import { useDispatch } from "react-redux";
import {getUsers} from "./userSlice";
import { getCommendations } from "../commendtionboard/commendationSlice";


function ActionButton(id,sx){
  const dispatch = useDispatch();

  const [commendationAction, setCommendationAction] = useState(false);

  const handleAddEmployee = () => {
    setCommendationAction(true)
  };

  const handleDeleteEmployee = () => {
    setCommendationAction(false)
  };
  // if (currentUserId === targetUserId) return null;

  // const btnGetUser = (
  //   <Button
  //     sx={{ fontSize: "0.6rem", ...sx }}
  //     size="small"
  //     variant="contained"
  //     onClick={() => dispatch(getUsers())}
  //   >
  //     Add
  //   </Button>
  // );

  const btnAddUser = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(getCommendations())}
    >
      Add
    </Button>
  )

  return btnAddUser
}

export default ActionButton;