import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TaskPage from "../pages/TaskPage";
import TaskList from "../components/TaskList";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes without layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes with layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/tasks-list" element={<TaskList />} />
        </Route>
      </Routes>
    </Router>
  );
};

// Protected Layout Component
const ProtectedLayout = () => {
  const isAuthenticated = localStorage.getItem("token");
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Layout />;
};

export default AppRoutes;