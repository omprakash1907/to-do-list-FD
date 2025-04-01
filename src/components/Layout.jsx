import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/feature/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, LogOut, Plus } from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
import Notifications from "@/components/Notifications";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Common Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={() => navigate("/home")}
          >
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <Button
                  onClick={() => navigate("/tasks")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
                <Button
                  onClick={() => navigate("/tasks-list")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  size="sm"
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Task List
                </Button>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  size="sm"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
            <div className="relative">
              <NotificationBell />
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;