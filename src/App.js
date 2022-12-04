import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from "./context/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
