import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTaskRealtime,
  updateTaskRealtime,
  deleteTaskRealtime,
} from "../redux/feature/taskSlice";
import TaskItem from "./TaskItem";
import socket from "../services/socket"; // Import socket instance
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());

    // Listen for real-time task updates
    socket.on("taskAdded", (newTask) => {
      dispatch(addTaskRealtime(newTask));
    });

    socket.on("taskUpdated", (updatedTask) => {
      dispatch(updateTaskRealtime(updatedTask));
    });

    socket.on("taskDeleted", (taskId) => {
      dispatch(deleteTaskRealtime(taskId));
    });

    // Cleanup event listeners when component unmounts
    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="mt-4 container mx-auto p-4 bg-white shadow-md rounded min-w-5xl">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex gap-3 mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        <ArrowBigLeft/>
        Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) =>
            task._id ? <TaskItem key={task._id} task={task} /> : null
          )
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
