import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  Button,
  Modal,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from "@mui/icons-material/Delete";

function PostCardCheck({ post, handleChoose, handleChooseBrowse }) {
  const { user } = useAuth();

  return (
    <Card sx={{ width: { xs: "90%", md: "85%" }, backgroundColor: "#f7fafa" }}>
      {user?.name === post?.author?.name ? (
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="#7b228f"
              component={RouterLink}
              sx={{ fontWeight: 600 }}
              to={`/users/${post?.author?._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post?.createdAt)}
            </Typography>
          }
        ></CardHeader>
      ) : (
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="#7b228f"
              component={RouterLink}
              sx={{ fontWeight: 600 }}
              to={`/users/${post?.author?._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post?.createdAt)}
            </Typography>
          }
        ></CardHeader>
      )}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography sx={{ color: "#616161" }}>{post?.content}</Typography>

        {post?.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post?.image} alt="post" />
          </Box>
        )}
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleChoose(post._id)}
          color="error"
        >
          Delete Post
        </Button>

        <Button
          variant="outlined"
          color="success"
          startIcon={<DoneAllIcon />}
          onClick={() => handleChooseBrowse(post._id)}
        >
          Check Post
        </Button>
      </Stack>
    </Card>
  );
}

export default PostCardCheck;
