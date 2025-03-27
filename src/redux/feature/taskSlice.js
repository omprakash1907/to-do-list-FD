import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, addTask, updateTask, deleteTask } from "../../services/taskService";
import socket from "../../services/socket";  // Import socket instance

// Async actions remain the same
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await getTasks();
});

export const createTask = createAsyncThunk("tasks/createTask", async (task, { rejectWithValue }) => {
  try {
    const newTask = await addTask(task);
    socket.emit("taskAdded", newTask); // Emit event to server
    return newTask;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const modifyTask = createAsyncThunk("tasks/modifyTask", async (task, { rejectWithValue }) => {
  try {
    const updatedTask = await updateTask(task);
    socket.emit("taskUpdated", updatedTask); // Emit event to server
    return updatedTask;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (taskId, { rejectWithValue }) => {
  try {
    await deleteTask(taskId);
    socket.emit("taskDeleted", taskId); // Emit event to server
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {
    // Reducers for real-time updates
    addTaskRealtime: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskRealtime: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTaskRealtime: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch tasks.";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to create task.";
      })
      .addCase(modifyTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(modifyTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to update task.";
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete task.";
      });
  },
});

export const { addTaskRealtime, updateTaskRealtime, deleteTaskRealtime } = taskSlice.actions;
export default taskSlice.reducer;
