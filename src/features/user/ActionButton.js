import React,{useState} from "react";
import {Button, MenuItem, Modal} from "@mui/material";
import { useDispatch } from "react-redux";
import {getUsers} from "./userSlice";
import { createCommendations } from "../commendtionboard/commendationSlice";


function ActionButton(id,sx){
  const dispatch = useDispatch();

  const [commendationAction, setCommendationAction] = useState(false);

  const handleAddEmployee = () => {
    setCommendationAction(true)
  };

  const handleDeleteEmployee = () => {
    setCommendationAction(false)
  };


  const btnAddUser = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(createCommendations())}
    >
      Add
    </Button>
  )

  return btnAddUser
}

export default ActionButton;