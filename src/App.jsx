import "./App.css";
import AppRoutes from "./routes/routes";
import SocketProvider from "./services/SocketContext"; // Import Socket Provider

function App() {
  return (
    <SocketProvider>
      <AppRoutes />
    </SocketProvider>
  );
}

export default App;
