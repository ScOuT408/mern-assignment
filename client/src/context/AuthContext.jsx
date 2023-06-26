import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(result?.data));
      setUser(result?.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async (name, email, password, avatar) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!result.data) throw new Error("");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    await axios.get("http://localhost:5000/api/users/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getUserProfile = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUser(result.data);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleRegister,
        handleLogout,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
