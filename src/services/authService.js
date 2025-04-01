import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

export const getUsers  = async (userData) => {
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
};
