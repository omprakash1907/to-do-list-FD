import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/feature/authSlice";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../services/SocketContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]); // Ensure it's always an array

  useEffect(() => {
    // Fetch existing notifications from backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data.notifications || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();

    // Listen for real-time notifications
    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
      toast.info(notification.message, { position: "top-right" }); // Show toast notification
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <h1 className="text-3xl">
        {user ? `Welcome, ${user.name}` : "Welcome to Task Manager"}
      </h1>

      {user && (
        <div className="mt-4">
          <button
            onClick={() => navigate("/tasks")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Create Task
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <h2 className="mt-4 text-xl">Notifications:</h2>
      <ul className="bg-gray-100 p-4 rounded w-80">
        {notifications.length > 0 ? (
          notifications.map((note, index) => (
            <li key={index} className="p-2 border-b">
              {note.message}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
