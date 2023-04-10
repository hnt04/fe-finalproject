import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PostDeleteConfirmation from "./PostDeleteConfirm";
import PostFormUpdate from "./PostFormUpdate";
import { Button, Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";

function PostCard({ post, handleChoose, handleChooseEdit }) {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "option-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Button onClick={() => handleChoose(post._id)}>Delete Post</Button>
        <Modal>
          <PostDeleteConfirmation />
        </Modal>
      </MenuItem>

      <MenuItem>
        <Button onClose={handleClose} onClick={() => handleChooseEdit(post)}>
          Edit Post
        </Button>
        <Modal>
          <PostFormUpdate />
        </Modal>
      </MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ width: {xs:"90%", md:"85%"}, backgroundColor: "#f7fafa" }}>
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
        action={
          <Box onClick={handleProfileMenuOpen}>
            <IconButton>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
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
            sx={{ fontWeight: 600,fontSize: "20px",
          }}
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
        <Typography sx={{ color: "#616161",fontSize: "20px",
 }}>{post?.content}</Typography>

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

        <PostReaction post={post} />
        <CommentList postId={post?._id} />
        <CommentForm postId={post?._id} />
      </Stack>
      {renderMenu}
    </Card>
  );
}

export default PostCard;
