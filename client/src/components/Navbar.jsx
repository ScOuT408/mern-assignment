import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import "../styles/components/navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  const renderConditionalNavLinks = () => {
    if (user) {
      // Add JSX for routes after being logged in
      return (
        <>
          <li className="navbar__item">
            <NavLink
              to={"/create"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Create
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to={`/user`}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Profile
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
              onClick={() => handleLogout()}
            >
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="navbar__item">
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to={"/"} className="navbar__link navbar__logo active">
          #MERN-Blog
        </NavLink>
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              Home
            </NavLink>
          </li>

          {renderConditionalNavLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
