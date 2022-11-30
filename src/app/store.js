import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import taskReducer from "../features/task/taskSlice";

const rootReducer = {
    comment: commentReducer,
    post: postReducer,
    user: userReducer,
    task: taskReducer
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

