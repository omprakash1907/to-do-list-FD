// src/services/socket.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false, // We'll connect manually after auth
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;