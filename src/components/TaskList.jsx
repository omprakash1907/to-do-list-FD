import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTaskRealtime, updateTaskRealtime, deleteTaskRealtime } from "../redux/feature/taskSlice";
import TaskItem from "./TaskItem";
import socket from "../services/socket";  // Import socket instance

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

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

  return (
    <div className="mt-4">
      {tasks.length > 0 ? tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      )) : <p className="text-gray-500">No tasks available.</p>}
    </div>
  );
};

export default TaskList;
