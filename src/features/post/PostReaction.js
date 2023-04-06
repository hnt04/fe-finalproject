import React, {useState} from 'react';
import { sendPostReaction } from "./postSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

function PostReaction({ post }) {
    const dispatch = useDispatch();

    // const [active, setActive] = useState(false)
    const [active, setActive] = useState(post.reaction.heart === 0 ? false : true );

  const handleClick = (emoji) => {
    dispatch(sendPostReaction({ postId: post._id, emoji }));
    setActive(!active)
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("heart")}>
        <FavoriteBorderIcon sx={{ fontSize: 20, color: active ? "red" : "blue" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.heart}
      </Typography>
    </Stack>
  );
}

export default PostReaction;
