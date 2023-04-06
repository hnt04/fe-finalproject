import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import PostCardCheck from "./PostCardCheck";
import { getUnCheckPosts } from "./postSlice";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { deletePost } from "./postSlice";
import { updatedPostProfile } from "./postSlice";
import { Button, Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BrowsePost({post}) {
  const {user} = useAuth();
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPosts } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);
  
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openBrowse, setOpenBrowse] = React.useState(false);
  const [chosenId, setChosenId] = useState(null);
  const [chosenPost, setChosenPost] = useState(null);

  const [checkStatus,setCheckStatus]=useState(post.check)
  console.log("checkStatus",checkStatus)

  const handleChoose = (id) => {
    setOpen(true);
    setChosenId(id);
  };

  const handleChooseBrowse = (post) => {
    setOpenBrowse(true);
    setChosenPost(post);
  };

  const handleClose = () => setOpen(false);
  const handleCloseBrowse = () => setOpenBrowse(false);

  const handleDelete = (id) => dispatch(deletePost(id));
  const handleBrowse = (post) => dispatch(updatedPostProfile({ ...post, check: !checkStatus }));

  const toggleCheckStatus = () => {
    console.log("test test")
    setCheckStatus(checkStatus => !checkStatus);
  };

  useEffect(() => {
    if (user.department === "HR") {
    dispatch(getUnCheckPosts({ page }));
}}, [dispatch,  page]);

  //state -> initialValue === post.check -> onChange set state => !state 

  return (
        <Box sx={style}>
          <Typography variant="h5" textAlign="center">
            Browse Post
          </Typography>

          <Typography
            textAlign="center"
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Do you agree to <b>browse</b> this post?
          </Typography>

          <Box
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleBrowse(chosenPost)}
            >
              Agree
            </Button>
          </Box>
        </Box>
  );
}

export default BrowsePost;
