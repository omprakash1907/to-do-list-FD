import { useDispatch } from "react-redux";
import { modifyTask, removeTask } from "../redux/feature/taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <div>
        <p className="font-bold">
          {task.title} - {task.priority}
        </p>
        <p className="text-sm">{task.description}</p>
        <p className="text-sm">Status: {task.status}</p>
        <p className="text-sm">
          Due Date:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>
        <p className="text-sm">
          Assigned To: {task.assignedTo?.name || "Unassigned"}
        </p>
      </div>

      <div>
        <button
          onClick={() => dispatch(modifyTask({ ...task, status: "completed" }))}
          className="text-green-600"
        >
          ✔
        </button>
        <button
          onClick={() => dispatch(removeTask(task._id))}
          className="text-red-600 ml-2"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
