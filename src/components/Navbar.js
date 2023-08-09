import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dark from "../Image/night-mode.png";
import Light from "../Image/brightness.png";
import User from "../Image/user.png";
// import { useNavigate } from "react-router-dom";

const Navbar = ({ setSignedin, initialState }) => {
  const [mode, setMode] = useState("light");
  // const navigate = useNavigate();
  const handleSignout = () => {
    setSignedin(false);
  };
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#333333";
      document.body.style.color = "white";
    }
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          mode === "light" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsSphere
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/Business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
          <img
            src={mode === "light" ? Dark : Light}
            alt="Mode"
            onClick={toggleMode}
            style={{ width: "48px", backgroundColor: "white", padding: "5px" }}
          ></img>
          <img
            className="btn btn-secondary dropdown-toggle"
            src={User}
            style={{ width: "48px", padding: "5px" }}
            alt="user"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "absolute",
              top: 60,
              right: 160,
            }}
          >
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/savedarticle">
                  Saved Article
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/signin"
                  onClick={() => {
                    handleSignout();
                  }}
                >
                  Signout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
