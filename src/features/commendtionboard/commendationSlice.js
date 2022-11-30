import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { POST_PER_PAGE } from "../../app/config";


const initialState = {
  isLoading: false,
  error: null,
  // updatedProfile: null,
  commendationsById: {},
  commendationsByUser: {},
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

    updateCommendationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedCommendation = action.payload;
      state.updatedProfile = updatedCommendation;
    },

    getCommendationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      
      const commendations = action.payload;
      console.log("commendations",commendations)
      commendations.forEach((commendation) => {
        state.commendationsByUser[commendation._id] = commendation;
      });
    },

  },
});

export default slice.reducer;

  export const getCommendations = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/commendation`);
      dispatch(
        slice.actions.getCommendationSuccess(response.commendations)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
