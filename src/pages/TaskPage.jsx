import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TaskPage = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-4">Task Management</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskPage;
