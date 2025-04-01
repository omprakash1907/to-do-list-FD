// src/redux/feature/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications, markAsRead, markAllAsRead } from "../../services/notificationService";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications", 
  async (token, { rejectWithValue }) => {
    try {
      const notifications = await fetchNotifications(token);
      return notifications.map(notification => ({
        ...notification,
        // Ensure createdAt is properly parsed if it's a string
        createdAt: notification.createdAt ? new Date(notification.createdAt) : new Date()
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await markAsRead(id, token);
      return {
        ...response,
        // Ensure we have the updated notification data
        _id: id,
        isRead: true,
        // Handle date parsing if needed
        createdAt: response.createdAt ? new Date(response.createdAt) : new Date()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (token, { rejectWithValue }) => {
    try {
      await markAllAsRead(token);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
    unreadCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        ...action.payload,
        createdAt: action.payload.createdAt ? new Date(action.payload.createdAt) : new Date()
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    updateNotification: (state, action) => {
      const index = state.notifications.findIndex(
        n => n._id === action.payload._id
      );
      if (index !== -1) {
        state.notifications[index] = {
          ...action.payload,
          createdAt: action.payload.createdAt ? new Date(action.payload.createdAt) : state.notifications[index].createdAt
        };
        state.unreadCount = state.notifications.filter(n => !n.isRead).length;
      }
    },
    refreshNotifications: (state) => {
      state.unreadCount = state.notifications.filter(n => !n.isRead).length;
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
      state.notifications = state.notifications.map(n => ({
        ...n,
        isRead: true
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          n => n._id === action.payload._id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
          state.unreadCount = state.notifications.filter(n => !n.isRead).length;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.loading = false;
        state.notifications = state.notifications.map(n => ({
          ...n,
          isRead: true
        }));
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  addNotification, 
  updateNotification,
  refreshNotifications,
  resetUnreadCount 
} = notificationSlice.actions;

export default notificationSlice.reducer;