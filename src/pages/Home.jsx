import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/feature/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl">{user ? `Welcome, ${user.name}` : "Welcome to Task Manager"}</h1>
      {user && <button onClick={() => { dispatch(logout()); navigate("/login"); }} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>}
    </div>
  );
};

export default Home;
