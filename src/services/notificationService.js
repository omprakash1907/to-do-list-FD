// src/services/notificationService.js
import axios from "axios";

const API_URL = "http://localhost:5000/notifications";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchNotifications = async (token) => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const markAsRead = async (id, token) => {
  const response = await axios.put(
    `${API_URL}/${id}/read`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const markAllAsRead = async (token) => {
  const response = await axios.put(
    `${API_URL}/mark-all-read`,
    {},
    getAuthHeaders()
  );
  return response.data;
};