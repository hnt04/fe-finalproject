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
  // tasksList: [],
  tasksHandle: [],
  tasksAssign: [],
  taskById: [],
  currentPageTasks: [],
  tasksById: {}, 
  countStatusType: [],
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.countStatusType = action.payload;
      
      // state.tasksList = action.payload.tasksList;
      const tasks = action.payload;
      tasks.forEach((task) => {
        state.tasksById[task._id] = task;
        if (!state.currentPageTasks.includes(task._id))
          state.currentPageTasks.push(task._id);
      })
    },

    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      delete state.tasksById[action.payload.taskId]
      
      state.currentPageTasks =  state.currentPageTasks.filter((taskId) => taskId !== action.payload.taskId)
    },

    updatedTaskProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tasksById[action.payload._id] = action.payload
    },

    getPersonalTaskSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
      state.tasksHandle = action.payload.tasksHandle;
      state.tasksAssign = action.payload.tasksAssign; 
    }
    },
  }
);

export default slice.reducer;

export const getTasks = ({ page = 1, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get("/tasks",{params});
      dispatch(slice.actions.getTasksSuccess(response.tasks));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createTask = ({ userId, task_name, handler, description, status, deadlineAt }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/tasks", {
        task_name, 
        handler, 
        assigner: userId, 
        description, 
        status, 
        deadlineAt
      });
      dispatch(slice.actions.createTaskSuccess(response.tasks));
      toast.success("Create New Task Successfully");
      dispatch(getTasks());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const getTaskOfId = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get("/tasks/me");
      console.log("response task",response)
      dispatch(slice.actions.getPersonalTaskSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

  export const deleteTask = ( taskId ) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/tasks/${taskId}`);
      dispatch(slice.actions.deleteTaskSuccess({...response.tasks, taskId}));
      toast.success("Delete successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const updatedTaskProfile = ({ _id: taskId, task_name, handler, description, status, reviewAt,deadlineAt }) => async (dispatch) => {

    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`, { task_name, handler, description, status, reviewAt,deadlineAt });
      dispatch(slice.actions.updatedTaskProfileSuccess(response));
      toast.success("Update Task successfully");
      dispatch(getTaskOfId());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  