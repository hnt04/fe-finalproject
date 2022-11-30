import { createSlice } from "@reduxjs/toolkit";
// import { id } from "date-fns/locale";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";
import PostDeleteConfirmation from "./PostDeleteConfirm";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetPosts(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },

    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const posts = action.payload;
      console.log("action.payload",action.payload)
      console.log("posts a1",posts)
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
          console.log("post",post)
      });
    },

    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      console.log("action",action.payload)
      console.log("newPost",newPost)
      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },

    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },

    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("action",action.payload.postId)
      delete state.postsById[action.payload.postId]
      
      state.currentPagePosts =  state.currentPagePosts.filter((postId) => postId !== action.payload.postId)
    },

    updatedPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload)
      state.postsById[action.payload._id] = action.payload
    },
    },
  }
);

export default slice.reducer;

export const getPosts = ({ userId, page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/users/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetPosts());
      console.log("response",response)
      dispatch(slice.actions.getPostsSuccess(response.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createPost = ({ content, image }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("content")
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.posts));
      console.log("response create",response)
      toast.success("Post successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const deletePost = ( postId ) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/posts/${postId}`);
      dispatch(slice.actions.deletePostSuccess({...response.posts, postId}));
      toast.success("Delete successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendPostReaction = ({ postId, emoji }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.posts,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const updatedPostProfile = ({ content, postId, image }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/posts/${postId}`, {content, image});
      console.log("response", response)
      dispatch(slice.actions.updatedPostSuccess(response.posts));
      toast.success("Update Post successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
