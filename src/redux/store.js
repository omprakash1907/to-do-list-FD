import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import taskReducer from "./feature/taskSlice";
import notificationReducer from "./feature/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    notifications: notificationReducer,
  },
});
