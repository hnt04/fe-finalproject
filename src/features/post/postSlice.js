import { createSlice } from "@reduxjs/toolkit";
// import { id } from "date-fns/locale";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
  check: false
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

      const { posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });

      const { count } = action.payload;
      state.totalPosts = count;
    },

    getPostsUnSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { posts } = action.payload;
      console.log("action.payload", action.payload);
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });

      const { count } = action.payload;
      state.totalPosts = count;
    },

    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
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
      delete state.postsById[action.payload.postId];

      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== action.payload.postId
      );
    },

    deleteUnCheckPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      delete state.postsById[action.payload.postId];

      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== action.payload.postId
      );
    },

    updatedCheckPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.postsById[action.payload._id] = action.payload;
    },

    updatedPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.postsById[action.payload._id] = action.payload;
    },
  },
});

export default slice.reducer;

export const getPosts =
  ({ userId, page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUnCheckPosts =
  ({  page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/uncheck`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostsUnSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      console.log("response create", response);
      dispatch(slice.actions.createPostSuccess(response));
      toast.success("Your Post will be browsed before upload");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/posts/${postId}`);
    dispatch(slice.actions.deletePostSuccess({ ...response, postId }));
    toast.success("Delete successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteUnCheckPost = (postId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/posts/uncheck/${postId}`);
    dispatch(slice.actions.deleteUnCheckPostSuccess({ ...response, postId }));
    toast.success("Delete successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
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
          reactions: response,
        })
      );
      console.log("response reaction", response);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updatedPostProfile =
  ({ content, postId, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image,
      });
      dispatch(slice.actions.updatedPostSuccess(response));
      toast.success("Update Post successfully");
      dispatch(getPosts());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const updatedCheckPost =
  ({  post, check}) =>
  async (dispatch) => {
    console.log("check post", {  post, check})
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/posts/uncheck/${post}`, {
        check
      });
      console.log("response update",response)
      dispatch(slice.actions.updatedCheckPostSuccess(response));
      toast.success("Post is browsed");
      dispatch(getUnCheckPosts());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
