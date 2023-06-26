import { Routes, Route } from "react-router-dom";
import {
  CreatePost,
  EditPost,
  Home,
  Login,
  Register,
  UserProfile,
} from "./pages";
import Navbar from "./components/Navbar";
import NotLoggedInRoutes from "./utils/NotLoggedInRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="center-top"
        toastOptions={{
          style: {
            marginTop: "3rem",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          },
        }}
      />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
