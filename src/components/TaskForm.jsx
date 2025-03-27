import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/feature/taskSlice";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    assignedTo: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async  (e) => {
    e.preventDefault();
    dispatch(createTask({ ...task, dueDate: task.dueDate })); // Keep as string
    try {
      await axios.post("/api/notifications", {
        userId: task.assignedTo, // Assuming task is assigned to someone
        message: `New Task Assigned: ${task.title}`,
      });
    } catch (error) {
      console.error("Error sending notification", error);
    }
  
    setTask({ title: "", description: "", priority: "medium", status: "pending", dueDate: "", assignedTo: "" });
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <input type="text" placeholder="Task Title" className="border p-2 w-full mb-2"
        value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />

      <textarea placeholder="Task Description" className="border p-2 w-full mb-2"
        value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />

      <select className="border p-2 w-full mb-2" value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select className="border p-2 w-full mb-2" value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <input type="date" className="border p-2 w-full mb-2"
        value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />

      <input type="text" placeholder="Assigned To (User ID)" className="border p-2 w-full mb-2"
        value={task.assignedTo} onChange={(e) => setTask({ ...task, assignedTo: e.target.value })} />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
