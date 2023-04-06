import { IconButton, Stack, Typography } from "@mui/material";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { sendCommentReaction } from "./commentSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const handleClick = (emoji) => {
    setActive(!active)
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("heart")}
      >
        <FavoriteBorderIcon sx={{ fontSize: 20, color: active ? "red" : "green" }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        {comment?.reactions?.heart}
      </Typography>

    </Stack>
  );
}

export default CommentReaction;