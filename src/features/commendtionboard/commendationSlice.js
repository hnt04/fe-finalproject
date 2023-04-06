import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";


const initialState = {
  isLoading: false,
  error: null,
  // updatedProfile: null,
  commendationsById: {},
  commendationsList: [],
  currentPageCommendations: [],
};

const slice = createSlice({
  name: "commendation",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetCommendations(state, action) {
      state.postsById = {};
      state.currentPageCommendations = [];
    },

    updateCommendationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedCommendation = action.payload;
      state.updatedProfile = updatedCommendation;
    },

    createCommendationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getCommendationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const commendations = action.payload;
      commendations.forEach((commendation) => {
        state.commendationsById[commendation._id] = commendation;
        if (!state.currentPageCommendations.includes(commendation._id))
          state.currentPageCommendations.push(commendation._id);
      })
      const { count } = action.payload;
      state.totalCommendations = count;
    },
  }})

export default slice.reducer;

export const getCommendations = ({month, page = 1, limit = POST_PER_PAGE}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { page, limit };   
    const response = await apiService.get(`/commendations/${month}`,{params});
    if (page === 1) dispatch(slice.actions.resetCommendations());
    dispatch(
      slice.actions.getCommendationSuccess(response.commendations)
    );
    toast.success("Get Commendation successfully");
    
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createCommendations = ({month,name,year}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await apiService.post(`/commendations`,{
        month,
        name,
        year
      });
      dispatch(
        slice.actions.createCommendationSuccess(response));
        toast.success("Create New Commendation Of This Month");
        // dispatch(getCommendations(month));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
};


