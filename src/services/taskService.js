import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Function to get the token from localStorage (or any other storage)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve token from storage
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  };
};

export const getTasks = async () => {
  try {
    const res = await axios.get(API_URL, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    console.log("Sending task:", task);
    const res = await axios.post(API_URL, task, getAuthHeaders());
    console.log("Task added:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error adding task:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const res = await axios.put(`${API_URL}/${task._id}`, task, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error updating task:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting task:", error.response ? error.response.data : error.message);
    throw error;
  }
};
