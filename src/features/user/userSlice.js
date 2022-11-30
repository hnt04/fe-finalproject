import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { POST_PER_PAGE } from "../../app/config";


const initialState = {
  isLoading: false,
  error: null,
  // updatedProfile: null,
  currentPageUsers: [],
  usersById: {},
  userList: [],
  currentUserById:{},
  totalPages: 1,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    departmentQuery: (state, action) => {
      state.department = action.payload;
  },

    changePage: (state, action) => {
      if (action.payload) {
          state.page = action.payload;
      } else {
          state.page++;
      }
  },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      
      const { users, count, totalPages } = action.payload;
      console.log("users users",users)
      console.log("action.payload users",action.payload)
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },

    getSingleUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      
      const users = action.payload;
      console.log("action.payload",action.payload)


    },
    // getAllUsersSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const { users } = action.payload;
    //   state.userList = users;
    // },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({ userId, employeeId,name, email,avatarUrl,department,role, phone, tasks}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        employeeId,
        name,
        email,
        avatarUrl,
        department,
        role,
        phone,
        tasks
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.users));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUsers = ({filterName, page = 1, limit = POST_PER_PAGE}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
  try {
      const params = { page, limit };
    if (filterName) params.name = filterName;
    const response = await apiService.get("/users",{params});
    console.log("response user",response)
    dispatch(slice.actions.getUserSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.users));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getSingleUser = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${userId}`);
    console.log("response userId", response)
    dispatch(slice.actions.getSingleUserSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};