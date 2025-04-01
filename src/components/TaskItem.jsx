import { useDispatch } from "react-redux";
import { modifyTask, removeTask } from "../redux/feature/taskSlice";
import { Calendar, CheckCircle, Trash2, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  if (!task) return null;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

    // Handle task completion
    const handleMarkCompleted = () => {
      const updatedTask = { ...task, status: "completed" };
      dispatch(modifyTask(updatedTask)); 
      toast.success("Task marked as completed!");
    };
  
    // Handle task removal
    const handleRemoveTask = () => {
      dispatch(removeTask(task._id));
      toast.error("Task removed!");
    };

  return (
    <Card className="mb-4 border-l-4 hover:shadow-md transition-all">
      <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium">Discription : </span>

            <p className="text-sm text-gray-600 "> {task.description}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            {/* Status Label */}
            <div className="flex items-center gap-1">
              <span className="font-medium">Status:</span>
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>

            {/* Due Date Label */}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Due Date:</span>
                <Calendar className="h-4 w-4" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}

            {/* Assigned To Label */}
            <div className="flex items-center gap-1">
              <span className="font-medium">Assigned To:</span>
              <User className="h-4 w-4" />
              <span>{task.assignedTo?.name || "Unassigned"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-3 md:mt-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-green-600 hover:text-green-800 bg-gray-100 cursor-pointer"
            onClick={handleMarkCompleted} // Use onClick instead of onDoubleClick
            aria-label="Mark as completed"
          >
            <CheckCircle className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-800 bg-gray-100 cursor-pointer"
            onClick={handleRemoveTask}
            aria-label="Remove task"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
