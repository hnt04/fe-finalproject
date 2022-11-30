import React from 'react';
import { sendPostReaction } from "./postSlice";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

function PostReaction({ posts }) {
    const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendPostReaction({ postId: posts._id, emoji }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ fontSize: 20, color: "blue" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {posts?.reactions?.like}
      </Typography>
    </Stack>
  );
}

export default PostReaction;
