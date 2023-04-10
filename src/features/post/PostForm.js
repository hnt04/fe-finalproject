import React, { useState } from "react";
import {
  Box,
  Card,
  alpha,
  Stack,
  Avatar,
  Grid,
  Button,
  Modal,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import PostFormModal from "./PostFormModal";

const defaultValues = {
  content: "",
  image: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  p: 4,
};

function PostForm() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack>
        <Button  onClick={handleOpen} variant="outlined" sx={{width:"84%"}}>Hey {user.name}, do you want to share something... ?</Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <PostFormModal />
          </Box>
        </Modal>
      </Stack>
      </>
  );
}

export default PostForm;
