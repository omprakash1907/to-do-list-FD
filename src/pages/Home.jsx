
import { useSelector } from "react-redux";
import Notifications from "../components/Notifications";
import { Card, CardContent } from "@/components/ui/card";


const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <div className="container mx-auto px-4 py-8 flex flex-col items-start lg:flex-row h-full gap-8">
        {/* Left side with images */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
          <div className="relative w-full ">
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/task-management-6253704-5122443.png"
                alt="Task Management"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">
                  Organize your tasks efficiently
                </h3>
                <p className="text-white/80 mt-2">
                  Boost your productivity with our task management system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <Card className="w-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {user ? `Welcome, ${user.name}` : "Welcome to Task Manager"}
                  </h1>
                  <p className="mt-2 text-slate-600">
                    {user
                      ? "Manage your tasks efficiently and stay organized"
                      : "Sign in to start managing your tasks and boost productivity"}
                  </p>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <Notifications />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
