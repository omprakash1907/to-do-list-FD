import { createContext, useEffect } from "react";
import socket from "./socket"; // Import the initialized socket

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Listening for notifications
    socket.on("notification", (notification) => {
      console.log("📩 New Notification:", notification);
      // Handle notifications (e.g., show toast)
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
