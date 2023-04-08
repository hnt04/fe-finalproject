import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import PostCardCheck from "./PostCardCheck";
import { updatedCheckPost,getUnCheckPosts } from "./postSlice";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { deletePost } from "./postSlice";
import { updatedPostProfile } from "./postSlice";
import { Button, Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import BrowsePost from "./BrowsePost";

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

function PostUnCheck() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPosts, check } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openBrowse, setOpenBrowse] = React.useState(false);
  const [chosenId, setChosenId] = useState(null);
  const [chosenPost, setChosenPost] = useState(null);

  // const [checkStatus,setCheckStatus] = useState(check)

  const [checkStatus, setCheckStatus] = React.useState(check);

  const toggleChecked = (post) => {
    dispatch(updatedCheckPost({post, check: !checkStatus }))

  }

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

  const onChangeStatusPost =(post) => {
    console.log("post onChange",post)
    dispatch(updatedPostProfile(post));
  };

  useEffect(() => {
    if (user.department === "HR") {
      dispatch(getUnCheckPosts({ page }));
    }
  }, [dispatch, page]);

  return (
    <Box sx={{ marginTop: "4%" }}>
      {posts.map((post) => (
        <PostCardCheck
          key={post?._id}
          post={post}
          handleChoose={handleChoose}
          handleChooseBrowse={handleChooseBrowse}
        />
      ))}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5" textAlign="center">
            Delete Post
          </Typography>

          <Typography
            textAlign="center"
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Do you want to <b>delete</b> this post?
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
              color="error"
              onClick={() => handleDelete(chosenId)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openBrowse} onClose={handleCloseBrowse}>
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
              onClick={() => toggleChecked(chosenPost)}
            >
              Agree
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PostUnCheck;
