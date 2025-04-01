// src/context/SocketProvider.js
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNotification } from "../redux/feature/notificationSlice";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    // Connect socket with authentication
    socket.auth = { token: localStorage.getItem("token") };
    socket.connect();

    // Join user's room
    socket.emit("join", user._id);

    // Notification handlers
    const handleNewNotification = (notification) => {
      dispatch(addNotification(notification));
      toast.info(notification.message, {
        position: "top-right",
        autoClose: 5000,
      });
    };

    const handleUpdateNotification = (updatedNotification) => {
      dispatch({
        type: 'notifications/updateNotification',
        payload: updatedNotification
      });
    };

    const handleRefreshNotifications = () => {
      dispatch({
        type: 'notifications/refreshNotifications'
      });
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:update", handleUpdateNotification);
    socket.on("notifications:refresh", handleRefreshNotifications);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:update", handleUpdateNotification);
      socket.off("notifications:refresh", handleRefreshNotifications);
      socket.disconnect();
    };
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <ToastContainer />
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;