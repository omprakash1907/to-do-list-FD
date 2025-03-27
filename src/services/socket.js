import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Replace with your backend URL

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // Ensures real-time connection
});

export default socket;
