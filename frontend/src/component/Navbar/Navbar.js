import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("failed to logout");
    }
  };

  return (
    <>
      <nav>
        <div className="navbar__container">
          <div className="navbar__header">
            <Link to="/">
              <a href="" className="navbar__logo">
                Logo
              </a>
            </Link>
          </div>
          <div className="navbar__options">
            <ul>
              <li className="navbar__options_li">
                <Link to="/">
                  <a className="navbar__a" href="">
                    Home
                  </a>
                </Link>
              </li>
              <li className="navbar__options_li"></li>
              <li className="navbar__options_li">
                {currentUser ? (
                  <Link to="/login">
                    <a href="" className="navbar__a" onClick={handleLogout}>
                      Logout{" "}
                    </a>
                  </Link>
                ) : (
                  <Link to="/Login">
                    <a href="" className="navbar__a">
                      Login
                    </a>
                  </Link>
                )}
              </li>
              <li className="navbar__options_li">
                {currentUser ? (
                  <Link to="/Profile">
                    <a href="" className="navbar__a">
                      Profile
                    </a>
                  </Link>
                ) : (
                  <Link to="/register">
                    <a href="" className="navbar__a">
                      Register
                    </a>
                  </Link>
                )}
              </li>
              <li className="navbar__options_li"></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
