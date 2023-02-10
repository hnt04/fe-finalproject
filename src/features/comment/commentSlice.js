import { createSlice  } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null,
    commendationsList:[],
    commentsById: {},
    commentsByPost: {},
    totalCommentsByPost: {},
    currentPageByPost: {},
};

const slice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
      
          getCommentsSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { postId, comments, count, page } = action.payload;
            console.log("action.payload comment",action.payload)
            console.log("postId a1",comments)
            console.log("comments a1",comments)
            comments.forEach((comment) => (state.commentsById[comment._id] = comment));
              state.commentsByPost[postId] = comments
                .map((comment) => comment._id)
                .reverse();
              state.totalCommentsByPost[postId] = count;
              state.currentPageByPost[postId] = page;
            },
        
            createCommentSuccess(state, action) {
              state.isLoading = false;
              state.error = null;
            },
        
            sendCommentReactionSuccess(state, action) {
              state.isLoading = false;
              state.error = null;
              const { commentId, reactions } = action.payload;
              state.commentsById[commentId].reactions = reactions;
            },

            deleteCommentSuccess(state, action) {
              state.isLoading = false;
              state.error = null;
              console.log("comment", action.payload.commentId)
              const  postId = action.payload
              delete state.commentsById[action.payload.commentId]
              state.commentsByPost = state.commentsByPost[postId].filter((commentId) => commentId !== action.payload.commentId)
            },
          }
        });

export default slice.reducer;

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page,limit};
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      console.log("response comment",response)
      console.log("postID",postId)
      dispatch(
        slice.actions.getCommentsSuccess({
          ...response,
          postId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createComment = ({ postId, content }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        postId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const deleteComment = ( commentId ) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/comments/${commentId}`);
      dispatch(slice.actions.deleteCommentSuccess({...response.data, commentId}));
      toast.success("Delete successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };